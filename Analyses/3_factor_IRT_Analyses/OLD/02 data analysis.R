questionnaire[, str_detect(string = colnames(questionnaire),
                           pattern = "_NPP$|_SAI$|_SR$")] <- lapply(questionnaire[, str_detect(string = colnames(questionnaire),
                                                                                    pattern = "_NPP$|_SAI$|_SR$")], as.numeric)




psych::cor.plot(r = cor(questionnaire[, str_detect(string = colnames(questionnaire),
                                                   pattern = "_NPP$")]
                        , use = "pairwise.complete.obs"),
                upper = FALSE, xlas = 2, main = "NPP")

psych::cor.plot(r = cor(questionnaire[, str_detect(string = colnames(questionnaire),
                                                   pattern = "_SAI$")]
                        , use = "pairwise.complete.obs"),
                upper = FALSE, xlas = 2, main = "SAI")

psych::cor.plot(r = cor(questionnaire[, str_detect(string = colnames(questionnaire),
                                                   pattern = "_SR$")]
                        , use = "pairwise.complete.obs"),
                upper = FALSE, xlas = 2, main = "SR")




sort(colnames(questionnaire))
questionnaire$contractualist02_NPP




corr_rel_EFA <- function(constructlist = NULL, constnum = NULL,
                         data = NULL,
                         nfacs = 1){
  ### correlation measures:
  # spearman
  cor_mat <- cor(data[,constructlist[[constnum]]],
                 use = "pairwise.complete.obs",
                 method = "spearman")

  ### reliability measures:
  # Cronbachs
  rel_cronbach <- psych::alpha(cor_mat)

  ### EFA (PAF):
  fit_efa <- fa(r = data[,constructlist[[constnum]]], nfactors = nfacs,
                rotate = "Promax", fm = "pa", max.iter = 500)


  ### return objects as list
  return_list <- list(round(x = cor_mat, digits = 2),
                      rel_cronbach,
                      fit_efa
  )
  names(return_list) <- c("Cor: Spearman",
                          "Reliability: Cronbach",
                          "fit EFA (PAF)")

  # > print
  cat("mean inter-item-correlation (Spearman):",
      round(x = mean(colMeans(x = cor_mat)), digits = 2), "\n\n")

  cat("Cronbachs Alpha:",
      round(x = rel_cronbach$total[[1]], digits = 2), "\n\n")

  cat("EFA (PAF) variance accounted first factor:",
      round(x = fit_efa$Vaccounted[2], digits = 2), "for", nfacs, "factors", "\n")
  tmpKMO <- psych::KMO(cor_mat)
  if(any(tmpKMO$MSAi < .6)){
    cat("KMO criteria is to low (< .6) for:", "\n",
        names(tmpKMO$MSAi[tmpKMO$MSAi < .6]), "\n",
        "mean KMO:", round(x = tmpKMO$MSA, digits = 2), "\n")
  }
  #

  return(return_list)
}


ethicTheories <- c("contractualist", "deontology", "hedonism", "relativist", "utilitarian", "virtue")
constructs_list <- list()

(vars_tmp <- sort(colnames(questionnaire)[str_detect(string = colnames(questionnaire),
                                                     "_NPP$")]))
constructs_list[[1]] <- vars_tmp
for(e in ethicTheories){
  questionnaire[[paste0("mean_", e, "NPP")]] <-
    rowMeans(questionnaire[, str_subset(string = vars_tmp, pattern = e)])
}






(vars_tmp <- sort(colnames(questionnaire)[str_detect(string = colnames(questionnaire),
                                                     "_SAI$")]))
constructs_list[[2]] <- vars_tmp
for(e in ethicTheories){
  questionnaire[[paste0("mean_", e, "SAI")]] <-
    rowMeans(questionnaire[, str_subset(string = vars_tmp, pattern = e)])
}



(vars_tmp <- sort(colnames(questionnaire)[str_detect(string = colnames(questionnaire),
                                                     "_SR$")]))
constructs_list[[3]] <- vars_tmp
for(e in ethicTheories){
  questionnaire[[paste0("mean_", e, "SR")]] <-
    rowMeans(questionnaire[, str_subset(string = vars_tmp, pattern = e)])
}


result_tmp <- corr_rel_EFA(constructlist = constructs_list,
                           constnum = 1, data = questionnaire, nfacs = 1)
round(x = result_tmp$`Reliability: Cronbach`$alpha.drop, digits = 2)
print(result_tmp$`fit EFA (PAF)`$loadings, cutoff = .4)

result_tmp <- corr_rel_EFA(constructlist = constructs_list,
                           constnum = 2, data = questionnaire, nfacs = 6)
round(x = result_tmp$`Reliability: Cronbach`$alpha.drop, digits = 2)
print(result_tmp$`fit EFA (PAF)`$loadings, cutoff = .4)

result_tmp <- corr_rel_EFA(constructlist = constructs_list,
                           constnum = 3, data = questionnaire, nfacs = 6)
round(x = result_tmp$`Reliability: Cronbach`$alpha.drop, digits = 2)
print(result_tmp$`fit EFA (PAF)`$loadings, cutoff = .4)


#################################

plot(questionnaire$mean_hedonismNPP, questionnaire$mean_utilitarianNPP)
psych::cor.plot(r = cor(questionnaire[, str_detect(string = colnames(questionnaire),
                                                   pattern = "mean_")]
                        , use = "pairwise.complete.obs"),
                upper = FALSE, xlas = 2, main = "SR")

summary(questionnaire$mean_hedonismNPP)
summary(questionnaire$mean_hedonismSAI)
summary(questionnaire$mean_hedonismSR)

plot(questionnaire$mean_hedonismNPP, questionnaire$mean_hedonismSAI)
cor(questionnaire$mean_hedonismNPP, questionnaire$mean_hedonismSAI)
plot(questionnaire$mean_hedonismNPP, questionnaire$mean_hedonismSR)
cor(questionnaire$mean_hedonismNPP, questionnaire$mean_hedonismSR)
plot(questionnaire$mean_hedonismSAI, questionnaire$mean_hedonismSR)
cor(questionnaire$mean_hedonismSAI, questionnaire$mean_hedonismSR)

attach(questionnaire)
longdat <- data.frame(tech = c(rep(x = "SAI", times = nrow(questionnaire)),
                    rep(x = "NPP", times = nrow(questionnaire)),
                    rep(x = "SR", times = nrow(questionnaire))),
           PID = c(PROLIFIC_PID, PROLIFIC_PID, PROLIFIC_PID),
           mean_hedonism = c(mean_hedonismSAI,
                             mean_hedonismNPP,
                             mean_hedonismSR),
           mean_utilitarian = c(mean_utilitarianSAI,
                             mean_utilitarianNPP,
                             mean_utilitarianSR),
           mean_contractualist = c(mean_contractualistSAI,
                                mean_contractualistNPP,
                                mean_contractualistSR),
           mean_deontology = c(mean_deontologySAI,
                                mean_deontologyNPP,
                                mean_deontologySR),
           mean_relativist = c(mean_relativistSAI,
                                mean_relativistNPP,
                                mean_relativistSR),
           mean_virtue = c(mean_virtueSAI,
                                mean_virtueNPP,
                                mean_virtueSR))
longdat$PID <- as.factor(longdat$PID)
str(longdat)



boxplot(longdat$mean_hedonism ~ longdat$tech, main = "hedonism")
fit <- afex::aov_car(mean_hedonism ~ tech + Error(PID/tech), data=longdat)
fit
EMMs <- emmeans::emmeans(fit, ~ tech)
pairs(EMMs, adjust="bon")

boxplot(longdat$mean_utilitarian ~ longdat$tech, main = "utilitarian")
fit <- afex::aov_car(mean_utilitarian ~ tech + Error(PID/tech), data=longdat)
fit
EMMs <- emmeans::emmeans(fit, ~ tech)
pairs(EMMs, adjust="bon")

boxplot(longdat$mean_contractualist ~ longdat$tech, main = "contractualist")
fit <- afex::aov_car(mean_contractualist ~ tech + Error(PID/tech), data=longdat)
fit
EMMs <- emmeans::emmeans(fit, ~ tech)
pairs(EMMs, adjust="bon")

boxplot(longdat$mean_deontology ~ longdat$tech, main = "deontology")
fit <- afex::aov_car(mean_deontology ~ tech + Error(PID/tech), data=longdat)
fit
EMMs <- emmeans::emmeans(fit, ~ tech)
pairs(EMMs, adjust="bon")

boxplot(longdat$mean_relativist ~ longdat$tech, main = "relativist")
fit <- afex::aov_car(mean_relativist ~ tech + Error(PID/tech), data=longdat)
fit
EMMs <- emmeans::emmeans(fit, ~ tech)
pairs(EMMs, adjust="bon")

boxplot(longdat$mean_virtue ~ longdat$tech, main = "virtue")
fit <- afex::aov_car(mean_virtue ~ tech + Error(PID/tech), data=longdat)
fit
EMMs <- emmeans::emmeans(fit, ~ tech)
pairs(EMMs, adjust="bon")


# ggplot(data = longdat, mapping = aes(x = mean_hedonism, y = mean_utilitarian)) +
#   geom_point() + facet_grid(tech ~ .) + geom_smooth()


psych::pairs.panels(x = longdat[, str_subset(string = colnames(longdat), pattern = "mean_")])



ggplot(data = longdat, mapping = aes(x = mean_hedonism, y = tech)) +
  geom_boxplot()



## selecting subset of the data
df_disgust <- dplyr::filter(bugs_long, condition %in% c("LDHF", "HDHF"))

## parametric t-test
p1 <- ggwithinstats(
  data = df_disgust,
  x = condition,
  y = desire,
  type = "p",
  effsize.type = "d",
  conf.level = 0.99,
  title = "Parametric test",
  package = "ggsci",
  palette = "nrc_npg"
)



library(ggstatsplot)
library(PMCMRplus) # for pairwise comparisons
# # create a plot
# p <- ggbetweenstats(longdat, tech, mean_utilitarian)
#
# # looking at the plot
# p



# ggwithinstats(
#   data = longdat,
#   x = tech,
#   y = mean_utilitarian
# )

### hedonism
fit1 <- afex::aov_car(mean_hedonism ~ tech + Error(PID/tech), data=longdat)
fit1
fit1a <- afex::aov_ez(id = "PID", dv = "mean_hedonism",
                      data = longdat, between=c("tech"), within = c("tech", "PID"))
fit1a

fit1_emmeans <-emmeans(fit1, ~tech)
fit1_emmeans
pairs(fit1_emmeans)

# # partical eta squared
anova(fit1, es = "pes")
# # generalized eta squared
fit1a

### utilitarianism
longdat %>%
  group_by(tech) %>%
  summarise(N = n(),
            mean = mean(mean_utilitarian),
            median = median(mean_utilitarian),
            SD = sd(mean_utilitarian))




fit1 <- afex::aov_car(mean_utilitarian ~ tech + Error(PID/tech), data=longdat)
fit1
fit1a <- afex::aov_ez(id = "PID", dv = "mean_utilitarian",
                      data = longdat, between=c("tech"), within = c("tech", "PID"))
fit1a

fit1_emmeans <-emmeans(fit1, ~tech)
fit1_emmeans
pairs(fit1_emmeans)

# # partical eta squared
anova(fit1, es = "pes")
# # generalized eta squared
fit1a


######################################

colnames(questionnaire)


fit <- lm(formula = mean_utilitarianSR ~ mean_virtueSR+mean_relativistSR+mean_hedonismSR+mean_deontologySR+mean_contractualistSR, data = questionnaire)
summary(fit)
# plot(fit)
fit <- lm(formula = mean_virtueSR ~ mean_utilitarianSR+mean_relativistSR+mean_hedonismSR+mean_deontologySR+mean_contractualistSR, data = questionnaire)
summary(fit)



######################################
df <- questionnaire[, str_detect(string = colnames(questionnaire),
                                  pattern = "mean_.+SAI$")]
colnames(df)
df <- scale(df)
dist.eucl <- dist(df, method = "euclidean")
round(as.matrix(dist.eucl)[1:3, 1:3], 1)
library(factoextra)
fviz_dist(dist.eucl)


set.seed(123)
km.res <- kmeans(df, 3, nstart = 25)
km.res
table(km.res$cluster)

fviz_cluster(km.res, data = df, geom = c("point"), ellipse.type = "euclid")


aggregate(df, by=list(cluster=km.res$cluster), mean)


##############################
##############################


a <- longdat
a$PID <- NULL

a %>%
  pivot_longer(!tech, names_to = "moralTheory", values_to = "value")


longdat2 <- longdat %>%
  pivot_longer(
    cols = starts_with("mean_"),
    names_to = "moralTheory",
    names_prefix = "mean_",
    values_to = "value",
    values_drop_na = TRUE
  )



table(longdat2$tech)
table(longdat2$moralTheory)


tmp <- longdat2[longdat2$tech == "SAI",]
# tmp <- tmp[tmp$moralTheory != "virtue",]
boxplot(tmp$value ~ tmp$moralTheory, main = "SAI")
fit <- afex::aov_car(value ~ moralTheory + Error(PID/moralTheory), data=tmp)
fit
EMMs <- emmeans::emmeans(fit, ~ moralTheory)
pairs(EMMs, adjust="bon")


tmp <- longdat2[longdat2$tech == "NPP",]
tmp <- tmp[tmp$moralTheory != "virtue",]
boxplot(tmp$value ~ tmp$moralTheory, main = "NPP")
fit <- afex::aov_car(value ~ moralTheory + Error(PID/moralTheory), data=tmp)
fit
EMMs <- emmeans::emmeans(fit, ~ moralTheory)
pairs(EMMs, adjust="bon")



tmp <- longdat2[longdat2$tech == "SR",]
tmp <- tmp[tmp$moralTheory != "virtue",]
boxplot(tmp$value ~ tmp$moralTheory, main = "SR")
fit <- afex::aov_car(value ~ moralTheory + Error(PID/moralTheory), data=tmp)
fit
EMMs <- emmeans::emmeans(fit, ~ moralTheory)
pairs(EMMs, adjust="bon")



# load library ggplot
# library(ggplot2)

# Plot boxplot using ggplot function
# diamonds dataset used here is inbuilt in the R Language
plot <- ggplot(longdat2, aes(x=factor(tech), y=value, color = factor(moralTheory)))+
  geom_boxplot()

# print boxplot
plot




# longdat2_tmp <- longdat2[longdat2$moralTheory == "hedonism",]
# longdat2_tmp <- longdat2_tmp[longdat2_tmp$PID %in% unique(longdat2_tmp$PID)[1:5],]
# longdat2_tmp[longdat2_tmp$PID == "5f6067975552dc000aa21f2a",]
# longdat2_tmp[longdat2_tmp$PID == "55b237e6fdf99b19ea79d2f7",]





longdat2_tmp <- longdat2[longdat2$moralTheory == "hedonism",]
longdat2_tmp <- longdat2_tmp[longdat2_tmp$PID %in%
                               sample(x = unique(longdat2_tmp$PID), size = 100),]
plot <- ggplot(longdat2_tmp, aes(x=factor(tech), y=value)) +
  geom_line(aes(group = PID, col = PID)) + theme(legend.position = "none")
plot


longdat2_tmp %>%
  group_by(PID) %>%
  summarise(mean(value), sd(value))



longdat2_tmp <- longdat2[longdat2$moralTheory == "hedonism",]
tmp <- longdat2_tmp %>%
  group_by(PID) %>%
  summarise(mean = mean(value), sd = sd(value))
plot(tmp$mean, tmp$sd)
hist(tmp$sd)

sum(tmp$sd == 0)
