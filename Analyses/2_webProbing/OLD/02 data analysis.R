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
library(tidytext)


################
# Daten
################
# Read the text file from JATOS ...
dir()
dat <- read.xlsx2(file = "loop_adjusted.xlsx", sheetIndex = 1)
glimpse(dat)





################
# data preperation overwrite when shown again
################

dat$comp_probe[nchar(x = dat$comp_probe_again) > 0]
dat$category_probe[nchar(x = dat$category_probe_again) > 0]


dat$category_probe[nchar(x = dat$category_probe_again) > 0] <-
  dat$category_probe_again[nchar(x = dat$category_probe_again) > 0]

dat$comp_probe[nchar(x = dat$comp_probe_again) > 0] <-
  dat$comp_probe_again[nchar(x = dat$comp_probe_again) > 0]



################
# functions
################



############################################################################
# virtue ethics
############################################################################
table(dat$ID)
sort(table(dat$item))
unique(dat$questionComprehension[str_detect(string = dat$item, pattern = "virtue")])


### only virtue item
# "For the development of the technology  which <b>which people or groups of people</b> did you have in mind?"
whoResponsible <- dat$comp_probe[str_detect(string = dat$item, pattern = "virtue")]

whoResponsible_clean <- cleanUp(charvec = whoResponsible)
whoResponsible_clean

nchar(whoResponsible_clean) == nchar(whoResponsible)
t <- 5
whoResponsible_clean[t]
whoResponsible[t]



text_df <- tibble(person = 1:length(whoResponsible_clean), text = whoResponsible_clean)

text_df <- text_df %>%
  unnest_tokens(word, text) %>%
  anti_join(stop_words)

text_df <- text_df %>%
  count(word, sort = TRUE)


threshold <- .8
# i <- 2
for(i in 1:length(text_df$word)){
 tmp <- stringdist::stringsim(a = text_df$word[i], text_df$word[-i])
 if(any(tmp > threshold)){
   tmp_match <- text_df$word[-i][tmp > threshold]
   cat(tmp_match, "\n")
   cat("replaced by: ", text_df$word[i], "round:", i, "\n\n")

   whoResponsible_clean <- str_replace_all(string = whoResponsible_clean,
                                           pattern = paste0(tmp_match, collapse = "|"),
                                           replacement = text_df$word[i])

   # paste0("^", tmp_match, "$", collapse = "|")
 }
}

text_df <- tibble(person = 1:length(whoResponsible_clean), text = whoResponsible_clean)

text_df <- text_df %>%
  unnest_tokens(word, text) %>%
  anti_join(stop_words)

text_df <- text_df %>%
  count(word, sort = TRUE)



text_df$perc <- round(x = text_df$n / length(whoResponsible_clean), digits = 2)*100
text_df

backup_df <- text_df

text_df %>%
  filter(perc > 2) %>%
  mutate(word = reorder(word, perc)) %>%
  ggplot(aes(perc, word)) +
  geom_vline(xintercept = 10, linetype="dotted") +
  geom_vline(xintercept = 20, linetype="dotted") +
  geom_vline(xintercept = 30, linetype="dotted") +
  geom_col() +
  labs(y = NULL)





############################################################################
# utilitarian ethics
############################################################################
### only virtue item
# "For the development of the technology  which <b>which people or groups of people</b> did you have in mind?"

unique(dat$questionComprehension[str_detect(string = dat$item, pattern = "utilitarian")])

whichUtilities <- dat$comp_probe[str_detect(string = dat$item, pattern = "utilitarian")]

whichUtilities_clean <- cleanUp(charvec = whichUtilities)
whichUtilities_clean

nchar(whichUtilities_clean) == nchar(whichUtilities)
t <- 1
whichUtilities_clean[t]
whichUtilities[t]



text_df <- tibble(person = 1:length(whichUtilities_clean), text = whichUtilities_clean)

text_df <- text_df %>%
  unnest_tokens(word, text) %>%
  anti_join(stop_words)

text_df <- text_df %>%
  count(word, sort = TRUE)


threshold <- .8
# i <- 2
for(i in 1:length(text_df$word)){
  tmp <- stringdist::stringsim(a = text_df$word[i], text_df$word[-i])
  if(any(tmp > threshold)){
    tmp_match <- text_df$word[-i][tmp > threshold]
    cat(tmp_match, "\n")
    cat("replaced by: ", text_df$word[i], "round:", i, "\n\n")

    whichUtilities_clean <- str_replace_all(string = whichUtilities_clean,
                                            pattern = paste0(tmp_match, collapse = "|"),
                                            replacement = text_df$word[i])

    # paste0("^", tmp_match, "$", collapse = "|")
  }
}

text_df <- tibble(person = 1:length(whichUtilities_clean), text = whichUtilities_clean)

text_df <- text_df %>%
  unnest_tokens(word, text) %>%
  anti_join(stop_words)

text_df <- text_df %>%
  count(word, sort = TRUE)



text_df$perc <- round(x = text_df$n / length(whoResponsible_clean), digits = 2)*100
text_df



text_df %>%
  filter(perc > 2) %>%
  mutate(word = reorder(word, perc)) %>%
  ggplot(aes(perc, word)) +
  geom_vline(xintercept = 10, linetype="dotted") +
  geom_vline(xintercept = 20, linetype="dotted") +
  geom_vline(xintercept = 30, linetype="dotted") +
  geom_col() +
  labs(y = NULL)





### save
require(openxlsx)
list_of_datasets <- list("virtue - developers" = backup_df, "utilitarian - utilities" = text_df)
write.xlsx(list_of_datasets, file = "frequency_words.xlsx")
