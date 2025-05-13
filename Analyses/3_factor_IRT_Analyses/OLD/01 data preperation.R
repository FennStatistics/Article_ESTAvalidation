## https://labjs.readthedocs.io/en/latest/learn/deploy/3c-jatos.html
## https://labjs.readthedocs.io/en/latest/learn/deploy/3-third-party.html


# sets the directory of location of this script as the current directory
setwd(dirname(rstudioapi::getSourceEditorContext()$path))

rm(list=ls(all=TRUE))
graphics.off()

############################################################################
# Pakete, Daten laden
############################################################################
################
# Pakete
################
# This code relies on the pacman, tidyverse and jsonlite packages
require(pacman)
p_load('tidyverse', 'jsonlite', 'magrittr', 'xlsx',
       'stargazer', 'psych', 'tm')



################
# Daten
################
# Read the text file from JATOS ...
dir()
read_file('jatos_results_20221025140620.txt') %>%
  # ... split it into lines ...
  str_split('\n') %>% first() %>%
  # ... filter empty rows ...
  discard(function(x) x == '') %>%
  # ... parse JSON into a data.frame
  map_dfr(fromJSON, flatten=TRUE) -> dat


dim(dat)



prolific <- read.csv(file = "prolific_export_6356b951d4a85033b6f5a321.csv", header = TRUE)

################
# sub functions
################


############################################################################
# run code -> data files dat1, dat3
############################################################################
################
# ID Variable erstellen dat
################
### Deskreptiv N
## N:

### ID variable dat 1
dat$ID <- NA
tmp_IDcounter <- 0
for(i in 1:nrow(dat)){
  if(!is.na(dat$sender[i]) && dat$sender[i] == "Greetings"){
    # tmp <- dat$prolific_pid[i]
    tmp_IDcounter = tmp_IDcounter + 1
  }
  dat$ID[i] <- tmp_IDcounter
}

rm(i); rm(tmp_IDcounter)
table(dat$ID); length(unique(dat$ID))
sum(table(dat$ID) == max(table(dat$ID)))

glimpse(dat)


dat[is.na(dat$sender),] # pseudo data?


## keep only full datasets
dat <- dat[dat$ID %in% names(table(dat$ID))[table(dat$ID) == max(table(dat$ID))],]


################
# save single variables as excel files
################
### save feedback as Excel file
varsSingExcel <- "feedback_critic"
write.xlsx2(x = data.frame(ID = dat[, "ID"][!is.na(dat[, varsSingExcel]) & dat[, varsSingExcel] != ""],
                           feedback = dat[, varsSingExcel][!is.na(dat[, varsSingExcel]) & dat[, varsSingExcel] != ""]),
            file = paste0(varsSingExcel, ".xlsx"))

# varsSingExcel <- c("attCheck_array", "attCheck_text")
# write.xlsx2(x = data.frame(ID = dat[, "ID"][!is.na(dat[, varsSingExcel])],
#                            knowSRM = dat[, varsSingExcel[1]][!is.na(dat[, varsSingExcel][1])],
#                            knowSRMdefinition = dat[, varsSingExcel[2]][!is.na(dat[, varsSingExcel][2])]),
#             file = paste0("attCheck", ".xlsx"))



################
# create questionnaire
################
colnames(dat)

tmp <- str_subset(string = colnames(dat), pattern = "^meta")
tmp <- str_subset(string = tmp, pattern = "labjs|location", negate = TRUE)

ques_mixed <- c("PROLIFIC_PID",

                "dummy_informedconsent",
                str_subset(string = colnames(dat), pattern = "_NPP$"),
                str_subset(string = colnames(dat), pattern = "_SR$"),
                str_subset(string = colnames(dat), pattern = "_SAI$"),

                tmp,
               "feedback_critic", "attCheck_text")


vec_notNumeric = c("PROLIFIC_PID",
                   str_subset(string = colnames(dat), pattern = "_NPP$"),
                   str_subset(string = colnames(dat), pattern = "_SR$"),
                   str_subset(string = colnames(dat), pattern = "_SAI$"),
                   tmp,
                   "feedback_critic", "attCheck_text")
rm(tmp)



# dataset = dat
# listvars = ques_mixed
# notNumeric = vec_notNumeric
questionnairetype <- function(dataset,
                              listvars = ques_mixed,
                              notNumeric = vec_notNumeric){

  datasetques <- data.frame(ID = unique(dataset$ID))

  for(c in 1:length(listvars)){
    print(c)
    if(any(colnames(dataset) == listvars[c])){
      print(listvars[c])
      ## tmp IDs
      tmpid <- dataset$ID[!is.na(dataset[, listvars[c]])]
      ## tmp value variable
      tmpvalue <- dataset[, listvars[c]][!is.na(dataset[, listvars[c]])]
      datasetques[listvars[c]]  <- NA

      if(listvars[c] %in% notNumeric){
        datasetques[datasetques$ID %in% tmpid, listvars[c]] <- tmpvalue
      }else if(is.list(tmpvalue)){
        tmpvalue_tmp <- unique(tmpvalue)
        tmpvalue <- c()
        counter = 1
        for(i in 1:length(tmpvalue_tmp)){
          if(!is.null(tmpvalue_tmp[[i]])){
            tmpvalue[counter] <- paste0(tmpvalue_tmp[[i]], collapse = " - ")
            counter = counter + 1
          }
        }
        datasetques[datasetques$ID %in% tmpid, listvars[c]] <- tmpvalue
      }else{
        datasetques[datasetques$ID %in% tmpid, listvars[c]] <- as.numeric(tmpvalue)
      }
    }
  }
  return(datasetques)
}


questionnaire <- questionnairetype(dataset = dat, listvars = ques_mixed)
head(questionnaire)


### for list add columns manually
lapply(dat, class)


# > add attCheck_array, techOrderTotal
questionnaire$attCheck_array <- NA
questionnaire$techOrderTotal <- NA
for(i in 1:length(dat$techOrderTotal)){
  if(!is.null(dat$techOrderTotal[[i]])){
    questionnaire$techOrderTotal[questionnaire$ID == dat$ID[i]] <- paste0(dat$techOrderTotal[[i]], collapse = " ")
  }

  if(!is.null(dat$attCheck_array[[i]])){
    questionnaire$attCheck_array[questionnaire$ID == dat$ID[i]] <- paste0(dat$attCheck_array[[i]], collapse = " ")
  }

}


### add prolific data

prolific <- prolific[prolific$Participant.id %in% questionnaire$PROLIFIC_PID,]
prolific <- prolific %>%
  arrange(sapply(Participant.id, function(y) which(y == questionnaire$PROLIFIC_PID)))

if(nrow(prolific) == nrow(questionnaire)){
  questionnaire$socio_age <- prolific$Age
  questionnaire$socio_sex <- prolific$Sex
  questionnaire$socio_ethnicity <- prolific$Ethnicity.simplified
  questionnaire$socio_student <- prolific$Student.status
  questionnaire$socio_employment <- prolific$Employment.status
}



questionnaire[questionnaire == "DATA_EXPIRED"] <- NA
questionnaire[questionnaire == ""] <- NA


write.xlsx2(x = questionnaire,
            file = paste0("questionnaire", ".xlsx"))

haven::write_sav(data = questionnaire,
                 path = paste0("questionnaire", ".sav"))



################
# paradata
################

### > defocus events
vec_ID <- NULL
vec_PROLIFIC_PID <- NULL
vec_durationblur <- NULL
vec_senderblur <- NULL

for(i in 1:length(dat$para_defocuscount)){
  if(!is.null(dat$para_defocuscount[[i]])){
    if(is.null(vec_durationblur)){
      vec_durationblur <- dat$para_defocuscount[[i]]$durationblur
      vec_senderblur <- dat$para_defocuscount[[i]]$senderblur

      vec_ID <- rep(x = dat$ID[i], times = length(dat$para_defocuscount[[i]]$durationblur))
      vec_PROLIFIC_PID <- rep(x = questionnaire$PROLIFIC_PID[questionnaire$ID == dat$ID[i]],
                              times = length(dat$para_defocuscount[[i]]$durationblur))

    }else{
      vec_durationblur <-c(vec_durationblur, dat$para_defocuscount[[i]]$durationblur)
      vec_senderblur <- c(vec_senderblur, dat$para_defocuscount[[i]]$senderblur)

      vec_ID <-c(vec_ID, rep(x = dat$ID[i], times = length(dat$para_defocuscount[[i]]$durationblur)))
      vec_PROLIFIC_PID <- c(vec_PROLIFIC_PID, rep(x = questionnaire$PROLIFIC_PID[questionnaire$ID == dat$ID[i]],
                                                  times = length(dat$para_defocuscount[[i]]$durationblur)))
    }
  }
}

para_defocus <- data.frame(ID = vec_ID,
                           PROLIFIC_PID = vec_PROLIFIC_PID,
                           durationblur = vec_durationblur, senderblur = vec_senderblur)

write.xlsx2(x = para_defocus,
            file = paste0("para_defocus", ".xlsx"))






### > clicks on ESTA
vec_ID <- NULL
vec_PROLIFIC_PID <- NULL
vec_ET_tech <- NULL
vec_countclicks <- NULL

vec_senderESTA <- NULL
vec_durationESTA <- NULL

vec_senderDefinition <- NULL
vec_durationDefinition <- NULL


for(i in 1:nrow(dat)){
  if(!is.na(dat$para_ET_tech[i])){
    if(is.null(vec_ET_tech)){

      vec_ID <- dat$ID[i]
      vec_PROLIFIC_PID <- questionnaire$PROLIFIC_PID[questionnaire$ID == dat$ID[i]]
      vec_ET_tech <- dat$para_ET_tech[i]
      vec_countclicks <- dat$para_countclicks[i]

      vec_senderESTA <- dat$sender[i-1]
      vec_durationESTA <- dat$duration[i-1]

      vec_senderDefinition <- dat$sender[i-2]
      vec_durationDefinition <- dat$duration[i-2]

    }else{
      vec_ID <- c(vec_ID, dat$ID[i])
      vec_PROLIFIC_PID <- c(vec_PROLIFIC_PID, questionnaire$PROLIFIC_PID[questionnaire$ID == dat$ID[i]])
      vec_ET_tech <- c(vec_ET_tech, dat$para_ET_tech[i])
      vec_countclicks <- c(vec_countclicks, dat$para_countclicks[i])

      vec_senderESTA <- c(vec_senderESTA,  dat$sender[i-1])
      vec_durationESTA <- c(vec_durationESTA, dat$duration[i-1])

      vec_senderDefinition <- c(vec_senderDefinition,  dat$sender[i-2])
      vec_durationDefinition <- c(vec_durationDefinition, dat$duration[i-2])
    }
  }
}

para_clicksDurationESTA <- data.frame(ID = vec_ID,
                           PROLIFIC_PID = vec_PROLIFIC_PID,
                           durationblur = vec_ET_tech, senderblur = vec_countclicks,
                           senderESTA = vec_senderESTA, durationESTA = vec_durationESTA,
                           senderDefinition = vec_senderDefinition, durationDefinition = vec_durationDefinition)



write.xlsx2(x = para_clicksDurationESTA,
            file = paste0("para_clicksDurationESTA", ".xlsx"))




############################################################################
# duration times
############################################################################
# for(i in 1:length(unique(dat$ID))){
#   tmp <- data.frame(duration = dat$duration[dat$ID == unique(dat$ID)[i]] / 1000,
#                     sender = dat$sender[dat$ID == unique(dat$ID)[i]] )
#
#   tmp <- tmp[str_detect(string = tmp$sender, pattern = "Sequence", negate = TRUE),]
#   tmp <- tmp[!is.na(tmp$sender),]
#
#   plot(tmp$duration, main = paste0(unique(dat$ID)[i]))
# }

