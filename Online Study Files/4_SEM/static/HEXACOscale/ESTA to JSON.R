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
HEXACO <- read.xlsx2(file = "HEXACO 60 items (item X scoring).xlsx", sheetIndex = 1)
# HEXACO$Scoring <- NULL

############################################################################
# to JSON
############################################################################


json_string <- toJSON(x = HEXACO$Scoring)
json_string
json_string <- toJSON(x = HEXACO$Item)
json_string
