# Order effects — Study 3 structural validity (R1-10)
#
# Paste after longdat_long creation in 02_analyzeData.qmd (section ANOVAs),
# or run standalone: Rscript order_effects_analysis.R
#
# Primary test: six counterbalanced presentation sequences (techOrderTotal).
# Secondary test: presentation slot (1st / 2nd / 3rd technology in sequence).
# Note: technology and presentation slot are aliased within each participant.

script_dir <- tryCatch(
  dirname(normalizePath(sys.frame(1)$ofile)),
  error = function(e) getwd()
)
setwd(script_dir)

suppressPackageStartupMessages({
  library(tidyverse)
  library(afex)
  library(emmeans)
})

out_dir <- "outputs_analyzeData"
if (!dir.exists(out_dir)) dir.create(out_dir)

ethic_theories <- c(
  "contractualist", "deontology", "hedonism",
  "relativist", "utilitarian", "virtue"
)

# ---- Load and prepare wide data ----
dat <- readRDS("outputs_prepareData/questionnaire.rds")

for (suffix in c("NPP", "SAI", "SR")) {
  vars_tmp <- sort(colnames(dat)[str_detect(colnames(dat), paste0("_", suffix, "$"))])
  for (e in ethic_theories) {
    dat[[paste0("mean_", e, suffix)]] <-
      rowMeans(dat[, str_subset(vars_tmp, pattern = e), drop = FALSE])
  }
}

# ---- Long format (matches 02_analyzeData.qmd) ----
longdat <- tibble(
  tech = rep(c("SAI", "NPP", "SR"), each = nrow(dat)),
  PID = rep(dat$PROLIFIC_PID, times = 3),
  mean_hedonism = c(dat$mean_hedonismSAI, dat$mean_hedonismNPP, dat$mean_hedonismSR),
  mean_utilitarian = c(dat$mean_utilitarianSAI, dat$mean_utilitarianNPP, dat$mean_utilitarianSR),
  mean_contractualist = c(dat$mean_contractualistSAI, dat$mean_contractualistNPP, dat$mean_contractualistSR),
  mean_deontology = c(dat$mean_deontologySAI, dat$mean_deontologyNPP, dat$mean_deontologySR),
  mean_relativist = c(dat$mean_relativistSAI, dat$mean_relativistNPP, dat$mean_relativistSR),
  mean_virtue = c(dat$mean_virtueSAI, dat$mean_virtueNPP, dat$mean_virtueSR)
)
longdat$PID <- factor(longdat$PID)

longdat_long <- longdat %>%
  pivot_longer(
    cols = starts_with("mean_"),
    names_to = "theory",
    values_to = "score"
  ) %>%
  mutate(theory = str_remove(theory, "^mean_"))

# ---- Order variables ----
order_lookup <- dat %>%
  select(PROLIFIC_PID, techOrderTotal) %>%
  mutate(
    order_group = factor(techOrderTotal),
    order_NPP = map_int(techOrderTotal, ~ which(str_split(.x, " ", simplify = TRUE) == "NPP")),
    order_SAI = map_int(techOrderTotal, ~ which(str_split(.x, " ", simplify = TRUE) == "SAI")),
    order_SR = map_int(techOrderTotal, ~ which(str_split(.x, " ", simplify = TRUE) == "SR"))
  )

longdat_long <- longdat_long %>%
  left_join(order_lookup, by = c("PID" = "PROLIFIC_PID")) %>%
  mutate(
    present_pos = factor(case_when(
      tech == "NPP" ~ order_NPP,
      tech == "SAI" ~ order_SAI,
      tech == "SR" ~ order_SR
    ), levels = 1:3, labels = c("1st", "2nd", "3rd"))
  )

cat("Order group counts:\n")
print(table(order_lookup$order_group))

# ---- Model 1: six presentation sequences ----
afex::afex_options(type = 3)

fit_order <- afex::aov_ez(
  id = "PID",
  dv = "score",
  data = longdat_long,
  within = c("theory", "tech"),
  between = "order_group",
  factorize = TRUE,
  detailed = TRUE
)

cat("\n=== Model 1: order_group (six sequences) ===\n")
print(anova(fit_order))
anova_pes <- anova(fit_order, es = "pes")
print(anova_pes)

# ---- Model 2: presentation slot ----
longdat_pos <- longdat_long %>%
  group_by(PID, present_pos, theory) %>%
  summarise(score = mean(score, na.rm = TRUE), .groups = "drop")

fit_position <- afex::aov_ez(
  id = "PID",
  dv = "score",
  data = longdat_pos,
  within = c("theory", "present_pos"),
  factorize = TRUE,
  detailed = TRUE
)

cat("\n=== Model 2: presentation slot (1st/2nd/3rd) ===\n")
print(anova(fit_position))
anova_pos_pes <- anova(fit_position, es = "pes")
print(anova_pos_pes)

emm_pos <- emmeans(fit_position, ~ present_pos | theory)
cat("\nPairwise presentation-slot contrasts by theory (Bonferroni):\n")
print(pairs(emm_pos, adjust = "bonferroni"))

emm_order_tech <- emmeans(fit_order, ~ order_group | theory + tech)

# ---- Export ANOVA table ----
extract_anova_rows <- function(anova_obj, model_label) {
  tab <- as.data.frame(anova_obj)
  tab$Effect <- rownames(tab)
  rownames(tab) <- NULL
  tab$model <- model_label
  tab
}

anova_export <- bind_rows(
  extract_anova_rows(anova_pes, "order_group"),
  extract_anova_rows(anova_pos_pes, "present_pos")
)
write.csv(anova_export, file.path(out_dir, "order_effects_table.csv"), row.names = FALSE)

emm_to_df <- function(emm_obj) {
  as.data.frame(summary(emm_obj)) %>%
    mutate(
      lower.CL = if ("asymp.LCL" %in% names(.)) asymp.LCL else lower.CL,
      upper.CL = if ("asymp.UCL" %in% names(.)) asymp.UCL else upper.CL
    )
}

# ---- Figures ----
p_group <- ggplot(longdat_long, aes(x = order_group, y = score, fill = tech)) +
  geom_boxplot(outlier.alpha = 0.2, position = position_dodge(0.8), width = 0.7) +
  facet_wrap(~ theory, ncol = 3) +
  labs(
    title = "ESTA subscale scores by counterbalanced presentation order",
    x = "Presentation order (NPP / SAI / SR)",
    y = "Mean subscale score",
    fill = "Technology"
  ) +
  theme_classic() +
  theme(
    axis.text.x = element_text(angle = 45, hjust = 1, size = 8),
    strip.text = element_text(size = 10)
  )

ggsave(
  file.path(out_dir, "order_effects_by_group.png"),
  plot = p_group, width = 12, height = 8, dpi = 150
)

p_position <- ggplot(
  longdat_long,
  aes(x = present_pos, y = score, fill = present_pos)
) +
  geom_boxplot(outlier.alpha = 0.2, width = 0.6) +
  facet_wrap(~ theory, ncol = 3) +
  labs(
    title = "ESTA subscale scores by presentation slot in sequence",
    x = "Presentation slot",
    y = "Mean subscale score"
  ) +
  theme_classic() +
  theme(legend.position = "none", strip.text = element_text(size = 10))

ggsave(
  file.path(out_dir, "order_effects_by_position.png"),
  plot = p_position, width = 10, height = 7, dpi = 150
)

# ANOVA emmeans line plots
emm_pos_df <- emm_to_df(emm_pos)

p_line_pos <- ggplot(emm_pos_df, aes(x = present_pos, y = emmean, group = 1)) +
  geom_line(linewidth = 0.8, color = "steelblue") +
  geom_point(size = 2.5, color = "steelblue") +
  geom_errorbar(
    aes(ymin = lower.CL, ymax = upper.CL),
    width = 0.12,
    linewidth = 0.6,
    color = "steelblue"
  ) +
  facet_wrap(~ theory, ncol = 3) +
  labs(
    title = "Estimated marginal means by presentation slot (ANOVA)",
    subtitle = "Model 2: within theory and presentation slot",
    x = "Presentation slot",
    y = "Estimated marginal mean (95% CI)"
  ) +
  theme_classic() +
  theme(strip.text = element_text(size = 10))

ggsave(
  file.path(out_dir, "order_effects_lineplot_position.png"),
  plot = p_line_pos, width = 10, height = 7, dpi = 150
)

emm_order_df <- emm_to_df(emm_order_tech)

p_line_order <- ggplot(
  emm_order_df,
  aes(x = order_group, y = emmean, color = tech, group = tech)
) +
  geom_line(linewidth = 0.7) +
  geom_point(size = 2) +
  geom_errorbar(
    aes(ymin = lower.CL, ymax = upper.CL),
    width = 0.15,
    linewidth = 0.5
  ) +
  facet_wrap(~ theory, ncol = 3) +
  labs(
    title = "Estimated marginal means by presentation order (ANOVA)",
    subtitle = "Model 1: order group x technology x theory",
    x = "Presentation order (NPP / SAI / SR)",
    y = "Estimated marginal mean (95% CI)",
    color = "Technology"
  ) +
  theme_classic() +
  theme(
    axis.text.x = element_text(angle = 45, hjust = 1, size = 7),
    strip.text = element_text(size = 10),
    legend.position = "top"
  )

ggsave(
  file.path(out_dir, "order_effects_lineplot_order.png"),
  plot = p_line_order, width = 12, height = 8, dpi = 150
)

cat("\nOutputs written to", out_dir, "\n")
