## https://labjs.readthedocs.io/en/latest/learn/deploy/3c-jatos.html
## https://labjs.readthedocs.io/en/latest/learn/deploy/3-third-party.html


# sets the directory of location of this script as the current directory
setwd(dirname(rstudioapi::getSourceEditorContext()$path))

rm(list=ls(all=TRUE))
graphics.off()



############################################################################
# load packages, data
############################################################################
################
# packages
################
# This code relies on the pacman, tidyverse and jsonlite packages
require(pacman)
p_load('xlsx', 'jsonlite', 'stringr')



################
# data
################
dir()
esta <- read.xlsx2(file = "items ESTA readable.xlsx", sheetIndex = 1)
esta <- esta[nchar(esta$probe) > 0, ]


esta$scale <- str_replace_all(esta$scale, "[^[:alnum:]]", "")
esta$left <- str_replace_all(esta$left, "[^[:alnum:]]", " ")
esta$left <- str_trim(string = esta$left)
esta$right <- str_replace_all(esta$right, "[^[:alnum:]]", " ")
esta$right <- str_trim(string = esta$right)
esta$probe <- str_replace_all(esta$probe, "[^[:alnum:]|</|>|\\?]", " ")
esta$probe <- str_trim(string = esta$probe)
############################################################################
# to JSON
############################################################################
json_string <- toJSON(x = esta)
cat(json_string)
