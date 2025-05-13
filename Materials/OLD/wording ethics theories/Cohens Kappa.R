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
p_load('tidyverse', 'xlsx',
       'stargazer', 'psych')


# install.packages("DescTools")
library(DescTools)

################
# Daten
################
# Read the text file from JATOS ...
dir()
dat <- read.xlsx2(file = "items ESTA ratings Lars, Julius.xlsx", sheetIndex = 1)


dat$binaryR1 <- as.numeric(dat$Rating.Inclusion.depending.on.Comprehension.0.no..1.yes....R1)
dat$binaryR2 <- as.numeric(dat$Rating.Inclusion.depending.on.Comprehension.0.no..1.yes....R2)



ratertab <- xtabs (~ dat$binaryR1 + dat$binaryR2)
ratertab
CohenKappa(ratertab, conf.level = 0.95)

# https://bjoernwalther.com/cohens-kappa-in-r-berechnen/

dat$relatednessR1 <- as.numeric(dat$Relatability.to.life.of.an.individual..1.7....R1)
dat$relatednessR2 <- as.numeric(dat$Relatability.to.life.of.an.individual..1.7....R2)


plot(dat$relatednessR1, dat$relatednessR2)

ggplot(data = dat, mapping = aes(x = relatednessR1, y = relatednessR2)) +
  geom_jitter(width = 0.5, height = 0.5) +
  geom_smooth()
cor(dat$relatednessR1, dat$relatednessR2)

