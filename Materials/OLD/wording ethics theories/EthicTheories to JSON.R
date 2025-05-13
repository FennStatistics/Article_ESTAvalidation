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
ethicTheories <- read.xlsx2(file = "definitions ethic theories readable.xlsx", sheetIndex = 1)
############################################################################
# to JSON
############################################################################


json_string <- toJSON(x = ethicTheories)
json_string
# cat(json_string)
