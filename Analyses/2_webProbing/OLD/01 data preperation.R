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
read_file('jatos_results_20221003075820.txt') %>%
  # ... split it into lines ...
  str_split('\n') %>% first() %>%
  # ... filter empty rows ...
  discard(function(x) x == '') %>%
  # ... parse JSON into a data.frame
  map_dfr(fromJSON, flatten=TRUE) -> dat


head(dat); dim(dat)


### desc. stats:
# length(dat$url.srid[!is.na(dat$url.srid)])



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
sum(!is.na(dat1$url.srid)); sum(dat1$sender_id == "0", na.rm = TRUE)

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

varsSingExcel <- c("knowSRM", "knowSRMdefinition")
write.xlsx2(x = data.frame(ID = dat[, "ID"][!is.na(dat[, varsSingExcel])],
                           knowSRM = dat[, varsSingExcel[1]][!is.na(dat[, varsSingExcel][1])],
                           knowSRMdefinition = dat[, varsSingExcel[2]][!is.na(dat[, varsSingExcel][2])]),
            file = paste0("knowSRM", ".xlsx"))



################
# save single variables as excel files
################
##############
# Fragen ohne Loop (Fragebogen + demographische Fragen)
##############

colnames(dat)

# treat "index_ESTA" special
ques_mixed <- c("PROLIFIC_PID",
                "dummy_informedconsent",
                str_subset(string = colnames(dat), pattern = "^R"),
                str_subset(string = colnames(dat), pattern = "^affImg"),
                "knowSRM", "knowSRMdefinition",
                "index_ESTA", "feedback_critic")


vec_notNumeric = c("PROLIFIC_PID", str_subset(string = colnames(dat), pattern = "^R"),
                   "knowSRM", "knowSRMdefinition", "feedback_critic")



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

write.xlsx2(x = questionnaire,
            file = paste0("questionnaire", ".xlsx"))



##########################################
# dat[, c("ID", "sender", "sender_id", "counter", "virtue09", "deontology04", "hedonism03", "p_item",
#         "category_probe", "category_probe_again",
#         "comp_probe", "comp_probe_again")]
#
# write.xlsx2(x = dat[, c("ID", "sender", "sender_id", "counter", "virtue09", "deontology04", "hedonism03", "p_item",
#                         "category_probe", "category_probe_again",
#                         "comp_probe", "comp_probe_again")],
#             file = paste0("aaa", ".xlsx"))
#
# sort(unique(dat$p_item))
# sort(table(dat$p_item))



### prepare data
dat_loop <- dat
dat_loop <- dat_loop[!is.na(dat_loop$counter),]

for(i in 1:nrow(dat_loop)){
  if(!is.na(dat_loop$p_item[i])){
    ## fill up item i-1
    dat_loop$p_item[i-1] <- dat_loop$p_item[i]
  }
}

for(i in 1:nrow(dat_loop)){
  if(!is.na(dat_loop$p_item[i])){
    ## fill up missing items
    tmp <- dat_loop$p_item[i]
  }else{
    dat_loop$p_item[i] <- tmp
  }
}
# dat_loop$p_item
table(dat_loop$p_item)



### include probes, questions:
esta <- read.xlsx2(file = "items ESTA readable.xlsx", sheetIndex = 1)
esta <- esta[nchar(esta$probe) > 0, ]
esta$scale <- str_replace_all(esta$scale, "[^[:alnum:]]", "")
esta$left <- str_replace_all(esta$left, "[^[:alnum:]]", " ")
esta$left <- str_trim(string = esta$left)
esta$right <- str_replace_all(esta$right, "[^[:alnum:]]", " ")
esta$right <- str_trim(string = esta$right)
esta$probe <- str_replace_all(esta$probe, "[^[:alnum:]|</|>|\\?]", " ")
esta$probe <- str_trim(string = esta$probe)

# dataset = dat_loop
loopType <- function(dataset, estadat){

  vars_sorted <- sort(unique(dat_loop$p_item))
  dat_out <- data.frame(ID = NA, item = NA,
                        questionItem = NA,
                        value = NA,
                        category_probe = NA, category_probe_again = NA,
                        questionComprehension = NA,
                        comp_probe = NA, comp_probe_again = NA)
  checkRound = 1

  for(i in unique(dat_loop$ID)){
    tmp_dat_person <- dat_loop[dat_loop$ID == i,c("ID", "p_item", vars_sorted,
                                               "category_probe", "category_probe_again",
                                               "comp_probe", "comp_probe_again"
                                               )]
    for(v in unique(tmp_dat_person$p_item)){
      tmp_dat <- tmp_dat_person[tmp_dat_person$p_item == v,c("ID", "p_item", v,
                                                 "category_probe", "category_probe_again",
                                                 "comp_probe", "comp_probe_again")]

      tmp_estadat <- estadat[estadat$scale == v,]

      ## NA if value is missing
      tmp_category_probe_again <- tmp_dat[,"category_probe_again"][!is.na(tmp_dat[, "category_probe_again"])]
      if(identical(tmp_category_probe_again, character(0))){
        tmp_category_probe_again <- NA
      }
      tmp_comp_probe_again <- tmp_dat[,"comp_probe_again"][!is.na(tmp_dat[, "comp_probe_again"])]
      if(identical(tmp_comp_probe_again, character(0))){
        tmp_comp_probe_again <- NA
      }


      tmp_dat_out <- c(i,
                       unique(tmp_dat[,"p_item"][!is.na(tmp_dat[, "p_item"])]),
                       paste0(c(tmp_estadat$left, tmp_estadat$right), collapse = "..."),
                       tmp_dat[,v][!is.na(tmp_dat[, v])],
                       tmp_dat[,"category_probe"][!is.na(tmp_dat[, "category_probe"])],
                       tmp_category_probe_again,
                       tmp_estadat$probe,
                       tmp_dat[,"comp_probe"][!is.na(tmp_dat[, "comp_probe"])],
                       tmp_comp_probe_again)

      if(checkRound == 1){
        dat_out[checkRound,] <- tmp_dat_out
      }else{
        dat_out <- rbind(dat_out, tmp_dat_out)
      }

      checkRound = checkRound + 1
    }
  }



  return(dat_out)
}


loop <- loopType(dataset = dat_loop, estadat = esta)
write.xlsx2(x = loop,
            file = paste0("loop", ".xlsx"))




loop$ID <- as.numeric(loop$ID)
loop$value <- as.numeric(loop$value)

vec_id <- c()
vec_mean <- c()
vec_sd <- c()
counter = 1
for(i in unique(loop$ID)){
  tmp <- loop$value[loop$ID == i]
  vec_id[counter] <- i
  vec_mean[counter] <- mean(tmp)
  vec_sd[counter] <- sd(tmp)
  counter = counter + 1

}
hist(vec_mean); summary(vec_mean)
hist(vec_sd); summary(vec_sd)

plot(vec_mean, vec_sd)



vec_id[vec_sd > 2]

loop[loop$ID %in% vec_id[vec_sd > 2], ]
