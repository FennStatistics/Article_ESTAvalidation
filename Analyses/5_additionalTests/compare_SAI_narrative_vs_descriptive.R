# Compare ESTA scores: SAI narrative (Study 3) vs SAI descriptive (Study 4)
#
# Cross-study exploratory comparison for R1-16 (Charlie / scenario priming).
# Not a randomized A/B design — interpret with caution.
#
# Packages: tidyverse, effectsize (install via install.packages if needed)

script_dir <- tryCatch(
  dirname(normalizePath(sys.frame(1)$ofile)),
  error = function(e) getwd()
)
setwd(script_dir)

out_dir <- "compare_SAI_narrative_vs_descriptive"
if (!dir.exists(out_dir)) dir.create(out_dir)

suppressPackageStartupMessages({
  library(tidyverse)
  library(effectsize)
})

# Final retained items (secondOrder_ESTA.inp USEVARIABLES)
items_by_theory <- list(
  hedonism = c(
    "hedonism01", "hedonism04", "hedonism05", "hedonism06",
    "hedonism07", "hedonism08"
  ),
  utilitarian = sprintf("utilitarian%02d", 1:9),
  contractualist = sprintf("contractualist%02d", 1:6),
  deontology = c(
    "deontology02", "deontology03", "deontology04", "deontology05",
    "deontology06", "deontology08"
  ),
  virtue = c(
    "virtue01", "virtue02", "virtue03", "virtue04", "virtue05",
    "virtue08", "virtue09"
  ),
  relativist = sprintf("relativist%02d", 1:5)
)

all_retained_items <- unlist(items_by_theory, use.names = FALSE)

# Manuscript-aligned subdimension labels (Table: six ethical theories)
subdimension_labels <- c(
  deontology = "Deontology",
  utilitarian = "Utilitarianism",
  hedonism = "Hedonism",
  virtue = "Virtue ethics",
  contractualist = "Contractualism",
  relativist = "Relativism"
)

subscale_outcomes <- paste0("mean_", names(items_by_theory))

load_narrative <- function() {
  path_rds <- "../3_factor_IRT_Analyses/outputs_prepareData/questionnaire.rds"
  if (!file.exists(path_rds)) {
    stop(
      "Missing ", path_rds,
      ". Run 3_factor_IRT_Analyses/01_prepareData.qmd first."
    )
  }
  dat <- readRDS(path_rds)
  dat$scenario <- "narrative"
  dat
}

load_descriptive <- function() {
  path_xlsx <- "../4_SEM/data/questionnaire.xlsx"
  path_dat <- "../4_SEM/output/ESTA_CFA.dat"

  if (file.exists(path_xlsx)) {
    if (!requireNamespace("readxl", quietly = TRUE)) {
      stop("Install 'readxl' or provide ESTA_CFA.dat only.")
    }
    dat <- readxl::read_excel(path_xlsx)
    dat <- dat %>%
      mutate(across(all_of(all_retained_items), as.numeric))
    dat$scenario <- "descriptive"
    return(dat)
  }

  if (!file.exists(path_dat)) {
    stop("Missing Study 4 data: ", path_xlsx, " and ", path_dat)
  }

  dat <- read.table(path_dat, header = FALSE)
  if (ncol(dat) != length(all_retained_items)) {
    stop(
      "ESTA_CFA.dat has ", ncol(dat), " columns; expected ",
      length(all_retained_items), " retained items."
    )
  }
  colnames(dat) <- all_retained_items
  dat$scenario <- "descriptive"
  dat
}

map_sai_columns <- function(dat, items, suffix = "_SAI") {
  cols <- paste0(items, suffix)
  missing <- setdiff(cols, colnames(dat))
  if (length(missing) > 0) {
    stop("Missing columns in narrative data: ", paste(missing, collapse = ", "))
  }
  dat[, cols, drop = FALSE]
}

compute_scores <- function(item_mat, items_by_theory) {
  out <- tibble(
    mean_ESTA_total = rowMeans(item_mat, na.rm = TRUE)
  )

  subscale_means <- map_dfc(items_by_theory, function(items) {
    cols <- intersect(colnames(item_mat), items)
    if (length(cols) == 0) {
      stop("No matching columns for theory items in item matrix.")
    }
    rowMeans(item_mat[, cols, drop = FALSE], na.rm = TRUE)
  })

  names(subscale_means) <- paste0("mean_", names(items_by_theory))
  out <- bind_cols(out, subscale_means)
  out$mean_ESTA_subscales <- rowMeans(as.matrix(subscale_means), na.rm = TRUE)
  out
}

compare_groups <- function(x_narr, x_des, outcome) {
  x_narr <- x_narr[is.finite(x_narr)]
  x_des <- x_des[is.finite(x_des)]

  tt <- t.test(x_narr, x_des, var.equal = FALSE)
  d <- effectsize::cohens_d(x_narr, x_des, var.equal = FALSE)

  tibble(
    outcome = outcome,
    n_narrative = length(x_narr),
    n_descriptive = length(x_des),
    M_narrative = mean(x_narr),
    SD_narrative = sd(x_narr),
    M_descriptive = mean(x_des),
    SD_descriptive = sd(x_des),
    t = unname(tt$statistic),
    df = unname(tt$parameter),
    p = tt$p.value,
    cohens_d = d$Cohens_d
  )
}

narr_raw <- load_narrative()
des_raw <- load_descriptive()

narr_items <- map_sai_columns(narr_raw, all_retained_items)
colnames(narr_items) <- all_retained_items

des_items <- des_raw[, all_retained_items, drop = FALSE]

scores_narr <- compute_scores(narr_items, items_by_theory) %>%
  mutate(scenario = "narrative")
scores_des <- compute_scores(des_items, items_by_theory) %>%
  mutate(scenario = "descriptive")

scores_all <- bind_rows(scores_narr, scores_des)

outcomes <- c(
  "mean_ESTA_total",
  "mean_ESTA_subscales",
  subscale_outcomes
)

results <- map_dfr(outcomes, function(outcome) {
  compare_groups(
    scores_narr[[outcome]],
    scores_des[[outcome]],
    outcome
  )
})

results <- results %>%
  mutate(
    subdimension = case_when(
      outcome %in% subscale_outcomes ~ subdimension_labels[str_remove(outcome, "^mean_")],
      outcome == "mean_ESTA_total" ~ "ESTA total (all items)",
      outcome == "mean_ESTA_subscales" ~ "ESTA total (subscale means)",
      TRUE ~ outcome
    ),
    across(c(M_narrative, SD_narrative, M_descriptive, SD_descriptive, t, cohens_d),
           ~ round(.x, 3)),
    df = round(df, 2),
    p = signif(p, 3)
  ) %>%
  relocate(subdimension, .after = outcome)

write.csv(results, file.path(out_dir, "SAI_scenario_comparison.csv"), row.names = FALSE)

html_table <- knitr::kable(
  results,
  caption = "SAI narrative (Study 3) vs descriptive (Study 4): Welch t-tests on retained ESTA items"
)
writeLines(
  c(
    "<!DOCTYPE html><html><head><meta charset='utf-8'><title>SAI comparison</title></head><body>",
    as.character(html_table),
    "</body></html>"
  ),
  file.path(out_dir, "SAI_scenario_comparison.html")
)

plot_boxplot <- function(data, outcome, title) {
  ggplot(data, aes(x = scenario, y = .data[[outcome]], fill = scenario)) +
    geom_boxplot(outlier.alpha = 0.3) +
    labs(title = title, x = NULL, y = "Mean subscale score (retained items)") +
    theme_bw() +
    theme(legend.position = "none")
}

# Individual boxplots: ESTA total + all six subdimensions
plot_specs <- c(
  setNames("ESTA total (all retained items)", "mean_ESTA_total"),
  setNames(subdimension_labels, subscale_outcomes)
)

walk2(names(plot_specs), plot_specs, function(outcome, title) {
  p <- plot_boxplot(scores_all, outcome, paste("SAI scenario comparison:", title))
  ggsave(
    filename = file.path(out_dir, paste0("boxplot_", outcome, ".png")),
    plot = p,
    width = 6,
    height = 4,
    dpi = 150
  )
})

# Combined faceted plot: all six ethical subdimensions
scores_long <- scores_all %>%
  select(scenario, all_of(subscale_outcomes)) %>%
  pivot_longer(
    cols = all_of(subscale_outcomes),
    names_to = "outcome",
    values_to = "score"
  ) %>%
  mutate(
    subdimension = subdimension_labels[str_remove(outcome, "^mean_")]
  )

p_all <- ggplot(scores_long, aes(x = scenario, y = score, fill = scenario)) +
  geom_boxplot(outlier.alpha = 0.3) +
  facet_wrap(~ subdimension, ncol = 3) +
  labs(
    title = "SAI narrative vs descriptive: all ESTA subdimensions",
    x = NULL,
    y = "Mean subscale score (retained items)"
  ) +
  theme_bw() +
  theme(legend.position = "none")

ggsave(
  filename = file.path(out_dir, "boxplot_all_subdimensions.png"),
  plot = p_all,
  width = 10,
  height = 7,
  dpi = 150
)

cat("\n=== SAI narrative vs descriptive ESTA comparison ===\n")
cat("Narrative (Study 3): n =", nrow(scores_narr), "\n")
cat("Descriptive (Study 4): n =", nrow(scores_des), "\n\n")
print(results)

cat("\n--- Interpretation note ---\n")
cat(
  "Cross-study comparison only. Significant or null effects cannot be attributed\n",
  "solely to narrative vs descriptive framing. Combine with Study 1 pretest\n",
  "(moral intensity p = .199) for R1-16 discussion.\n",
  sep = ""
)
