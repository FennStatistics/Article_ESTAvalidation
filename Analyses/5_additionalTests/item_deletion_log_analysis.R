# Item deletion log — Study 2 probing + Study 3 CFA (R1-12, R2-Struct-03 / P-04)
#
# Reconstructs the ESTA item-purification trail for supplementary documentation.
# Does not auto-delete items; extracts statistics and flags per manuscript criteria.
#
# Run:
#   cd Analyses/5_additionalTests
#   Rscript item_deletion_log_analysis.R
#
# Prerequisites: 3_factor_IRT_Analyses/01_prepareData.qmd (questionnaire.rds)
# Packages: tidyverse, lavaan, stargazer

script_dir <- tryCatch(
  dirname(normalizePath(sys.frame(1)$ofile)),
  error = function(e) getwd()
)
setwd(script_dir)

set.seed(2024)
Sys.setenv(OMP_NUM_THREADS = 1)

required_pkgs <- c("tidyverse", "lavaan", "stargazer")
missing_pkgs <- required_pkgs[!vapply(required_pkgs, requireNamespace, logical(1), quietly = TRUE)]
if (length(missing_pkgs) > 0) {
  stop(
    "Install required packages: ", paste(missing_pkgs, collapse = ", "),
    "\n  install.packages(c('", paste(missing_pkgs, collapse = "', '"), "'))",
    sep = ""
  )
}

suppressPackageStartupMessages({
  library(tidyverse)
  library(lavaan)
  library(stargazer)
  library(stringr)
})

source("../3_factor_IRT_Analyses/functions/CFA_functions.R", encoding = "UTF-8")

out_dir <- "item_deletion_log"
if (!dir.exists(out_dir)) dir.create(out_dir)

# ---- Thresholds (manuscript / 02_analyzeData.qmd) ----
loading_flag <- 0.40
r2_flag <- 0.30
residual_corr_flag <- 0.10
mi_flag <- 10
crossloading_flag <- 0.30
manuscript_gof_df_before <- 974

ethic_theories <- c(
  "contractualist", "deontology", "hedonism",
  "relativist", "utilitarian", "virtue"
)

factor_labels <- c(
  relativist = "Relativism",
  contractualist = "Contractualism",
  hedonism = "Hedonism",
  utilitarian = "Utilitarianism",
  deontology = "Deontology",
  virtue = "Virtue"
)

tech_suffix <- c(NPP = "_NPP", SR = "_SR", SAI = "_SAI")
tech_label <- c(NPP = "NPP", SR = "HM", SAI = "SAI")

study3_items_by_theory <- list(
  relativist = sprintf("relativist%02d", 1:5),
  contractualist = sprintf("contractualist%02d", 1:6),
  hedonism = sprintf("hedonism%02d", 1:9),
  utilitarian = sprintf("utilitarian%02d", 1:9),
  deontology = sprintf("deontology%02d", 1:8),
  virtue = sprintf("virtue%02d", 1:9)
)

all_study3_items <- unlist(study3_items_by_theory, use.names = FALSE)

# Final retained items (secondOrder_ESTA.inp USEVARIABLES; study3 / Mplus column names)
items_retained_mplus <- c(
  "hedonism01", "hedonism04", "hedonism05", "hedonism06", "hedonism07", "hedonism08",
  sprintf("utilitarian%02d", 1:9),
  sprintf("contractualist%02d", 1:6),
  "deontology02", "deontology03", "deontology04", "deontology05", "deontology06", "deontology08",
  "virtue01", "virtue02", "virtue03", "virtue04", "virtue05", "virtue08", "virtue09",
  sprintf("relativist%02d", 1:5)
)

structural_drops_study3 <- c(
  "deontology01", "deontology07",
  "hedonism02", "hedonism03", "hedonism09",
  "virtue06", "virtue07"
)

# ---- Item pool metadata (appendix poolItems) + lineage ----
build_item_lineage <- function() {
  pool_rows <- tribble(
    ~pool_id, ~theory, ~stem_pool,
    "relativist01", "relativist", "...is culturally unacceptable / acceptable",
    "relativist02", "relativist", "...unacceptable / acceptable to my family",
    "relativist03", "relativist", "...traditionally unacceptable / acceptable",
    "relativist04", "relativist", "...individually unacceptable / acceptable",
    "relativist05", "relativist", "...unacceptable / acceptable to people I admire",
    "contractualist01", "contractualist", "...is unjust / just",
    "contractualist02", "contractualist", "...is unfair / fair",
    "contractualist03", "contractualist", "...respects an unwritten contract",
    "contractualist04", "contractualist", "...respects an unspoken promise",
    "contractualist05", "contractualist", "...equal distribution of good and bad",
    "contractualist06", "contractualist", "...violates my ideas of fairness",
    "hedonism01", "hedonism", "...personally unsatisfactory / satisfactory",
    "hedonism02", "hedonism", "...would be selfish for me to use",
    "hedonism03", "hedonism", "...requires sacrifices in order to use it",
    "hedonism04", "hedonism", "...not in the best interests of my person",
    "hedonism05", "hedonism", "...minimizes / maximizes my pleasure",
    "hedonism06", "hedonism", "...hindrance / promotes a good personal life",
    "hedonism07", "hedonism", "...harms / promotes my health",
    "hedonism08", "hedonism", "...harms / promotes my freedom",
    "hedonism09", "hedonism", "...harms / promotes my safety",
    "utilitarian01", "utilitarian", "...least / greatest utility for society",
    "utilitarian02", "utilitarian", "...minimizes / maximizes benefits for society",
    "utilitarian03", "utilitarian", "...maximizes / minimizes harm for society",
    "utilitarian04", "utilitarian", "...bad / good for society overall",
    "utilitarian05", "utilitarian", "...OK if justified by consequences for society",
    "utilitarian06", "utilitarian", "...least / greatest good for greatest number",
    "utilitarian07", "utilitarian", "...greatest / least ill for greatest number",
    "utilitarian08", "utilitarian", "...negative / positive cost-benefit ratio",
    "utilitarian09", "utilitarian", "...inefficient / efficient for society",
    "utilitarian10", "utilitarian", "...future harm / benefit for society",
    "deontology01", "deontology", "...moral obligation to act in a certain way",
    "deontology02", "deontology", "...harms / promotes autonomy of users",
    "deontology03", "deontology", "...obliges immoral / moral behaviour",
    "deontology04", "deontology", "...not morally right / morally right",
    "deontology05", "deontology", "...goes against moral rule by which I live",
    "deontology06", "deontology", "...moral obligation to act otherwise",
    "deontology07", "deontology", "PROBING: respect in interactions (deleted before Study 3)",
    "deontology08", "deontology", "PROBING: dignity in interactions (deleted before Study 3)",
    "deontology09", "deontology", "...intrinsic value of nature",
    "deontology10", "deontology", "...value of the ecological environment",
    "deontology11", "deontology", "...value of the cultural environment",
    "virtue01", "virtue", "...wrong / good motivations (developer)",
    "virtue02", "virtue", "...wrong / good desires (developer)",
    "virtue03", "virtue", "...bad / good character (developer)",
    "virtue04", "virtue", "...not prudent / prudent (developer)",
    "virtue05", "virtue", "...not reasonable / reasonable (developer)",
    "virtue06", "virtue", "...not striving for professional excellence",
    "virtue07", "virtue", "...indifferent / respectful towards nature",
    "virtue08", "virtue", "...insensitive / sensitive to society",
    "virtue09", "virtue", "...ill / good intentions (developer)"
  )

  study3_map_deon <- c(
    deontology01 = "deontology01",
    deontology02 = "deontology02",
    deontology03 = "deontology03",
    deontology04 = "deontology04",
    deontology05 = "deontology05",
    deontology09 = "deontology06",
    deontology10 = "deontology07",
    deontology11 = "deontology08"
  )

  pool_rows %>%
    mutate(
      study3_id = case_when(
        theory == "deontology" & pool_id %in% names(study3_map_deon) ~ study3_map_deon[pool_id],
        theory == "deontology" ~ NA_character_,
        pool_id == "utilitarian10" ~ NA_character_,
        pool_id %in% all_study3_items ~ pool_id,
        TRUE ~ NA_character_
      ),
      in_study3 = !is.na(study3_id),
      appendix_final_id = case_when(
        pool_id == "hedonism04" ~ "hedonism02",
        pool_id == "hedonism05" ~ "hedonism03",
        pool_id == "hedonism06" ~ "hedonism04",
        pool_id == "hedonism07" ~ "hedonism05",
        pool_id == "hedonism08" ~ "hedonism06",
        pool_id %in% c("hedonism02", "hedonism03", "hedonism09") ~ NA_character_,
        pool_id == "deontology02" ~ "deontology01",
        pool_id == "deontology03" ~ "deontology02",
        pool_id == "deontology04" ~ "deontology03",
        pool_id == "deontology05" ~ "deontology04",
        pool_id == "deontology06" ~ "deontology05",
        pool_id == "deontology09" ~ "deontology06",
        pool_id == "deontology11" ~ "deontology07",
        pool_id %in% c("deontology01", "deontology07", "deontology08", "deontology10") ~ NA_character_,
        pool_id == "virtue08" ~ "virtue06",
        pool_id == "virtue09" ~ "virtue07",
        pool_id %in% c("virtue06", "virtue07") ~ NA_character_,
        pool_id %in% items_retained_mplus ~ pool_id,
        TRUE ~ ifelse(pool_id %in% items_retained_mplus, pool_id, NA_character_)
      ),
      mplus_column_id = study3_id,
      in_mplus_final = !is.na(mplus_column_id) & mplus_column_id %in% items_retained_mplus
    )
}

build_author_decisions <- function() {
  bind_rows(
    tribble(
      ~id_used, ~id_system, ~phase, ~action, ~criterion, ~manuscript_note,
      "deontology07", "pool", "substantive", "deleted", "comprehension_confusion",
      "Respect in interactions: participants confused about 'treatment with respect'.",
      "deontology08", "pool", "substantive", "deleted", "comprehension_confusion",
      "Dignity in interactions: uncertainty about dignity; relevance to SAI questioned.",
      "contractualist03", "pool", "substantive", "revised", "comprehension_confusion",
      "Unwritten contract: revised to implicit moral conventions (appendix finalItems).",
      "contractualist04", "pool", "substantive", "revised", "comprehension_confusion",
      "Unspoken promise: revised to important social norms (appendix finalItems).",
      "hedonism02", "pool", "substantive", "flagged", "ambiguous_interpretation",
      "Selfishness interpreted variably (personal vs societal scope).",
      "hedonism03", "pool", "substantive", "flagged", "ambiguous_interpretation",
      "Sacrifices required: divergent personal vs collective interpretations."
    ),
    tribble(
      ~id_used, ~id_system, ~phase, ~action, ~criterion, ~manuscript_note,
      "deontology01", "study3", "structural", "deleted", "low_R2",
      "Lowest R² across technologies; moral-obligation wording.",
      "deontology07", "study3", "structural", "deleted", "residual_correlation",
      "Strong residual correlation with deontology06 (nature); ecological environment item.",
      "deontology02", "study3", "structural", "retained_despite_flag", "cross_loading",
      "Cross-loading indication with Hedonism; retained for theoretical centrality of autonomy.",
      "hedonism02", "study3", "structural", "deleted", "low_R2",
      "Weak explained variance; aligns with probing ambiguity.",
      "hedonism03", "study3", "structural", "deleted", "low_R2",
      "Lowest R² and high residual variance; local dependence.",
      "hedonism09", "study3", "structural", "deleted", "residual_correlation",
      "Residual covariances with health/pleasure items; weak hedonism alignment (safety).",
      "virtue06", "study3", "structural", "deleted", "low_R2",
      "Lowest R²; within-factor residual correlations (professional excellence).",
      "virtue07", "study3", "structural", "deleted", "cross_loading",
      "Cross-loadings to Deontology and Utilitarianism (respectful towards nature)."
    )
  )
}

parse_mplus_removals <- function(path = "../4_SEM/output/secondOrder_ESTA.inp") {
  lines <- readLines(path, warn = FALSE)
  remove_lines <- grep("^\\s*!\\s+(Hedonism|Deontology|Virtue)", lines, value = TRUE)
  txt <- paste(remove_lines, collapse = " ")
  ids <- str_extract_all(txt, "[a-z]+[0-9]{2}")[[1]]
  unique(ids)
}

write_table_pair <- function(df, basename, title = NULL, notes = NULL) {
  csv_path <- file.path(out_dir, paste0(basename, ".csv"))
  html_path <- file.path(out_dir, paste0(basename, ".html"))
  write.csv(df, csv_path, row.names = FALSE)
  if (nrow(df) > 0) {
    df_disp <- df
    num_cols <- vapply(df_disp, is.numeric, logical(1))
    df_disp[num_cols] <- lapply(df_disp[num_cols], function(x) round(x, 3))
    capture.output(
      stargazer(
        df_disp,
        type = "html",
        summary = FALSE,
        out = html_path,
        title = title,
        notes = notes,
        notes.append = FALSE,
        rownames = FALSE
      )
    )
  }
  invisible(list(csv = csv_path, html = html_path))
}

fit_cfa_safe <- function(model, data, label = "") {
  tryCatch(
    withCallingHandlers(
      cfa(
        model,
        data = data,
        estimator = "MLR",
        std.lv = TRUE,
        missing = "fiml",
        ncpus = 1
      ),
      warning = function(w) {
        cat("WARNING:", label, "—", conditionMessage(w), "\n")
        invokeRestart("muffleWarning")
      }
    ),
    error = function(e) {
      cat("NON-CONVERGENCE:", label, "—", conditionMessage(e), "\n")
      NULL
    }
  )
}

subset_tech_data <- function(dat, items, suffix) {
  cols <- paste0(items, suffix)
  missing <- setdiff(cols, colnames(dat))
  if (length(missing) > 0) {
    stop("Missing columns for ", suffix, ": ", paste(missing, collapse = ", "))
  }
  out <- dat[, cols, drop = FALSE]
  colnames(out) <- items
  out[] <- lapply(out, as.numeric)
  out
}

build_six_factor_model <- function(items_by_theory = study3_items_by_theory) {
  lines <- vapply(names(items_by_theory), function(th) {
    paste0(factor_labels[[th]], " =~ ", paste(items_by_theory[[th]], collapse = " + "))
  }, character(1))
  paste(lines, collapse = "\n")
}

fit_indices_row <- function(fit, technology, model) {
  if (is.null(fit) || !lavInspect(fit, "converged")) {
    return(tibble(
      technology = technology, model = model,
      chisq = NA, df = NA, pvalue = NA, cfi = NA, tli = NA,
      rmsea = NA, rmsea_lo = NA, rmsea_hi = NA, srmr = NA,
      converged = FALSE
    ))
  }
  fm <- fitMeasures(
    fit,
    c("chisq", "df", "pvalue", "cfi", "tli", "rmsea",
      "rmsea.ci.lower", "rmsea.ci.upper", "srmr")
  )
  tibble(
    technology = technology,
    model = model,
    chisq = unname(fm["chisq"]),
    df = unname(fm["df"]),
    pvalue = unname(fm["pvalue"]),
    cfi = unname(fm["cfi"]),
    tli = unname(fm["tli"]),
    rmsea = unname(fm["rmsea"]),
    rmsea_lo = unname(fm["rmsea.ci.lower"]),
    rmsea_hi = unname(fm["rmsea.ci.upper"]),
    srmr = unname(fm["srmr"]),
    converged = TRUE
  )
}

extract_item_stats <- function(fit, theory, technology, items) {
  if (is.null(fit) || !lavInspect(fit, "converged")) {
    return(tibble())
  }
  ss <- standardizedSolution(fit)
  fac_lab <- factor_labels[[theory]]
  ss %>%
    filter(op == "=~", lhs == fac_lab) %>%
    transmute(
      study3_id = rhs,
      loading = est.std,
      loading_se = se,
      loading_p = pvalue,
      r2 = est.std^2,
      residual_var = 1 - est.std^2,
      theory = theory,
      technology = technology,
      flag_low_loading = est.std < loading_flag,
      flag_low_r2 = est.std^2 < r2_flag
    )
}

extract_residual_pairs <- function(fit, theory, technology, threshold = residual_corr_flag) {
  if (is.null(fit) || !lavInspect(fit, "converged")) {
    return(tibble())
  }
  rows <- list()

  res <- tryCatch(lavResiduals(fit, type = "cor"), error = function(e) NULL)
  if (!is.null(res)) {
    mat <- as.matrix(res[[1]])
    items <- rownames(mat)
    for (i in seq_along(items)) {
      for (j in seq_along(items)) {
        if (j <= i) next
        val <- mat[i, j]
        if (!is.na(val) && abs(val) >= threshold) {
          rows[[length(rows) + 1]] <- tibble(
            technology = technology,
            theory = theory,
            item_i = items[i],
            item_j = items[j],
            residual_r = val,
            source = "lavResiduals"
          )
        }
      }
    }
  }

  mi <- modificationindices(fit, sort. = TRUE, maximum.number = 500)
  mi_pairs <- mi %>%
    filter(op == "~~", lhs != rhs, mi >= mi_flag) %>%
    transmute(
      technology = technology,
      theory = theory,
      item_i = lhs,
      item_j = rhs,
      residual_r = epc,
      source = "modification_index"
    )

  bind_rows(rows, mi_pairs) %>%
    distinct(technology, theory, item_i, item_j, .keep_all = TRUE)
}

extract_top_modindices <- function(fit, theory, technology, top_n = 5) {
  if (is.null(fit) || !lavInspect(fit, "converged")) {
    return(tibble())
  }
  mi <- modificationindices(fit, sort. = TRUE, maximum.number = 200)
  mi %>%
    filter(op == "~~") %>%
    head(top_n) %>%
    transmute(
      technology = technology,
      theory = theory,
      lhs = lhs,
      rhs = rhs,
      op = op,
      mi = mi,
      epc = epc,
      flagged = mi >= mi_flag
    )
}

extract_crossloadings <- function(fit, technology) {
  if (is.null(fit) || !lavInspect(fit, "converged")) {
    return(tibble())
  }
  ss <- standardizedSolution(fit) %>%
    filter(op == "=~") %>%
    mutate(
      target_factor = lhs,
      study3_id = rhs,
      loading = est.std
    )

  item_theory <- enframe(study3_items_by_theory, name = "theory", value = "items") %>%
    unnest(items) %>%
    rename(study3_id = items) %>%
    mutate(home_factor = factor_labels[theory])

  ss %>%
    left_join(item_theory, by = "study3_id") %>%
    filter(target_factor != home_factor) %>%
    group_by(study3_id) %>%
    slice_max(abs(loading), n = 1, with_ties = FALSE) %>%
    ungroup() %>%
    transmute(
      technology = technology,
      study3_id = study3_id,
      home_theory = theory,
      cross_factor = target_factor,
      cross_loading = loading,
      flagged = abs(loading) >= crossloading_flag
    )
}

pool_id_from_study3 <- function(study3_id, lineage) {
  row <- lineage %>% filter(study3_id == !!study3_id)
  if (nrow(row) == 1) {
    return(row$pool_id[[1]])
  }
  study3_id
}

# ---- Metadata exports ----
cat("\n=== Building item lineage and author decisions ===\n")
item_lineage <- build_item_lineage()
author_decisions <- build_author_decisions()
mplus_removed <- parse_mplus_removals()

item_lineage <- item_lineage %>%
  mutate(
    mplus_removed = mplus_column_id %in% mplus_removed,
    structural_drop_study3 = mplus_column_id %in% structural_drops_study3
  )

write_table_pair(
  item_lineage, "table_item_id_lineage",
  title = "Item ID lineage (pool, Study 3, appendix final)"
)
write_table_pair(
  author_decisions, "table_author_decisions",
  title = "Author item decisions (manuscript anchors)"
)

# ---- Study 2: web probing ----
cat("\n=== Study 2: web probing coverage ===\n")
loop_path <- "../2_webProbing/output/loop.csv"
if (!file.exists(loop_path)) {
  stop("Missing ", loop_path)
}

loop_dat <- read.csv(loop_path, sep = ";", stringsAsFactors = FALSE)
probed_items <- sort(unique(loop_dat$item))

probe_counts <- loop_dat %>%
  group_by(item) %>%
  summarise(
    n_category_probes = sum(!is.na(category_probe)),
    n_comprehension_probes = sum(!is.na(comp_probe)),
    .groups = "drop"
  ) %>%
  rename(pool_id = item)

probing_coverage <- item_lineage %>%
  left_join(probe_counts, by = "pool_id") %>%
  mutate(
    probed_in_study2 = pool_id %in% probed_items,
    n_category_probes = coalesce(n_category_probes, 0L),
    n_comprehension_probes = coalesce(n_comprehension_probes, 0L)
  )

write_table_pair(
  probing_coverage %>% select(pool_id, theory, probed_in_study2, n_category_probes, n_comprehension_probes),
  "table_probing_coverage",
  title = "Study 2 web probing coverage (pool IDs; SAI narrative only)"
)

substantive_decisions <- item_lineage %>%
  left_join(
    probing_coverage %>%
      select(pool_id, probed_in_study2, n_category_probes, n_comprehension_probes),
    by = "pool_id"
  ) %>%
  left_join(
    author_decisions %>%
      filter(phase == "substantive") %>%
      select(pool_id = id_used, substantive_action = action, substantive_criterion = criterion, substantive_note = manuscript_note),
    by = "pool_id"
  ) %>%
  mutate(
    technology = "SAI_narrative",
    substantive_action = if_else(
      is.na(substantive_action),
      if_else(probed_in_study2, "probed_no_change", "not_probed"),
      substantive_action
    ),
    substantive_criterion = coalesce(substantive_criterion, NA_character_),
    substantive_note = coalesce(substantive_note, NA_character_)
  )

write_table_pair(
  substantive_decisions %>%
    select(pool_id, theory, technology, probed_in_study2, substantive_action, substantive_criterion, substantive_note),
  "table_substantive_decisions",
  title = "Substantive validity decisions (Study 2)"
)

# ---- Study 3: CFA ----
cat("\n=== Study 3: structural CFA (pre-purification, 46 items) ===\n")
path_rds <- "../3_factor_IRT_Analyses/outputs_prepareData/questionnaire.rds"
if (!file.exists(path_rds)) {
  stop("Missing ", path_rds, ". Run 01_prepareData.qmd first.")
}
questionnaire <- readRDS(path_rds)

item_stats_rows <- list()
residual_rows <- list()
mi_rows <- list()
scale_fit_rows <- list()
sixfactor_fit_rows <- list()
crossloading_rows <- list()

six_factor_syntax <- build_six_factor_model()

for (tech in names(tech_suffix)) {
  suf <- tech_suffix[[tech]]
  dat_full <- subset_tech_data(questionnaire, all_study3_items, suf)

  cat("  Technology:", tech_label[[tech]], "\n")
  fit6 <- fit_cfa_safe(six_factor_syntax, dat_full, paste(tech, "six-factor before deletion"))
  sixfactor_fit_rows[[length(sixfactor_fit_rows) + 1]] <- fit_indices_row(
    fit6, tech_label[[tech]], "six_factor_before_deletion"
  )
  crossloading_rows[[length(crossloading_rows) + 1]] <- extract_crossloadings(fit6, tech_label[[tech]])

  for (th in ethic_theories) {
    items <- study3_items_by_theory[[th]]
    reg_ex <- paste0("^", th)
    dat_th <- dat_full[, items, drop = FALSE]
    mod <- model_lavaan(vars = items, labelLatentVar = factor_labels[[th]])
    fit <- fit_cfa_safe(mod, dat_th, paste(tech, th, "uni-factor"))

    scale_fit_rows[[length(scale_fit_rows) + 1]] <- fit_indices_row(
      fit, tech_label[[tech]], paste0("uni_", th)
    )

    stats <- extract_item_stats(fit, th, tech_label[[tech]], items)
    if (nrow(stats) > 0) {
      stats <- stats %>%
        group_by(technology) %>%
        mutate(
          r2_rank = rank(r2, ties = "min"),
          loading_rank = rank(loading, ties = "min")
        ) %>%
        ungroup()
      item_stats_rows[[length(item_stats_rows) + 1]] <- stats
    }

    residual_rows[[length(residual_rows) + 1]] <- extract_residual_pairs(
      fit, th, tech_label[[tech]]
    )
    mi_rows[[length(mi_rows) + 1]] <- extract_top_modindices(
      fit, th, tech_label[[tech]]
    )
  }
}

table_cfa_item_stats <- bind_rows(item_stats_rows)
table_cfa_residual_pairs <- bind_rows(residual_rows)
table_cfa_modindices_top <- bind_rows(mi_rows)
table_cfa_scale_fit <- bind_rows(scale_fit_rows)
table_cfa_sixfactor_fit <- bind_rows(sixfactor_fit_rows)
table_cfa_crossloadings <- bind_rows(crossloading_rows)

write_table_pair(table_cfa_item_stats, "table_cfa_item_stats", title = "CFA item statistics (uni-factor, pre-purification)")
write_table_pair(table_cfa_residual_pairs, "table_cfa_residual_pairs", title = "Standardized residual correlations (|r| >= threshold)")
write_table_pair(table_cfa_modindices_top, "table_cfa_modindices_top", title = "Top residual modification indices per scale")
write_table_pair(table_cfa_crossloadings, "table_cfa_crossloadings", title = "Six-factor model: largest non-target loadings")
write_table_pair(table_cfa_scale_fit, "table_cfa_scale_fit", title = "Uni-factor CFA fit by theory and technology")
write_table_pair(
  table_cfa_sixfactor_fit, "table_cfa_sixfactor_fit",
  title = "Six-factor CFA fit before item deletion",
  notes = paste0("Manuscript target df (before deletion) = ", manuscript_gof_df_before)
)

cat("\nSix-factor df by technology:\n")
print(table_cfa_sixfactor_fit %>% select(technology, df, cfi, rmsea, srmr))

# ---- Master deletion log ----
cat("\n=== Building master deletion log ===\n")

structural_by_study3 <- author_decisions %>%
  filter(phase == "structural") %>%
  select(study3_id = id_used, structural_action = action, structural_criterion = criterion, structural_note = manuscript_note)

item_stats_flags <- table_cfa_item_stats %>%
  group_by(study3_id, technology) %>%
  summarise(
    flag_low_r2 = any(flag_low_r2, na.rm = TRUE),
    flag_low_loading = any(flag_low_loading, na.rm = TRUE),
    r2 = min(r2, na.rm = TRUE),
    loading = min(loading, na.rm = TRUE),
    .groups = "drop"
  )

residual_flags <- if (nrow(table_cfa_residual_pairs) == 0) {
  tibble(
    technology = character(), study3_id = character(),
    study3_id2 = character(), residual_r = numeric()
  )
} else {
  table_cfa_residual_pairs %>%
    transmute(
      technology = technology,
      study3_id = item_i,
      study3_id2 = item_j,
      residual_r = residual_r
    )
}

cross_flags <- table_cfa_crossloadings %>%
  filter(flagged) %>%
  select(technology, study3_id, cross_factor, cross_loading)

long_rows <- list()

for (i in seq_len(nrow(item_lineage))) {
  pool_id <- item_lineage$pool_id[[i]]
  study3_id <- item_lineage$study3_id[[i]]
  theory <- item_lineage$theory[[i]]

  sub_row <- substantive_decisions %>% filter(pool_id == !!pool_id)
  if (nrow(sub_row) == 1 && !is.na(sub_row$substantive_action[[1]]) &&
      sub_row$substantive_action[[1]] %in% c("deleted", "revised", "flagged")) {
    long_rows[[length(long_rows) + 1]] <- tibble(
      pool_id = pool_id,
      study3_id = study3_id,
      theory = theory,
      technology = "SAI_narrative",
      phase = "substantive",
      criterion = sub_row$substantive_criterion[[1]],
      statistic = NA_real_,
      threshold = NA_real_,
      flagged = TRUE,
      action_taken = sub_row$substantive_action[[1]]
    )
  }

  if (is.na(study3_id)) next

  for (tech in unique(item_stats_flags$technology)) {
    st <- item_stats_flags %>% filter(study3_id == !!study3_id, technology == tech)
    if (nrow(st) == 1 && st$flag_low_r2[[1]]) {
      long_rows[[length(long_rows) + 1]] <- tibble(
        pool_id = pool_id, study3_id = study3_id, theory = theory, technology = tech,
        phase = "structural", criterion = "low_R2", statistic = st$r2[[1]],
        threshold = r2_flag, flagged = TRUE,
        action_taken = if_else(study3_id %in% structural_drops_study3, "deleted", "flagged")
      )
    }
    if (nrow(st) == 1 && st$flag_low_loading[[1]]) {
      long_rows[[length(long_rows) + 1]] <- tibble(
        pool_id = pool_id, study3_id = study3_id, theory = theory, technology = tech,
        phase = "structural", criterion = "low_loading", statistic = st$loading[[1]],
        threshold = loading_flag, flagged = TRUE,
        action_taken = if_else(study3_id %in% structural_drops_study3, "deleted", "flagged")
      )
    }
  }

  res_i <- residual_flags %>% filter(study3_id == !!study3_id | study3_id2 == !!study3_id)
  if (nrow(res_i) > 0) {
    for (j in seq_len(nrow(res_i))) {
      long_rows[[length(long_rows) + 1]] <- tibble(
        pool_id = pool_id, study3_id = study3_id, theory = theory,
        technology = res_i$technology[[j]],
        phase = "structural", criterion = "residual_correlation",
        statistic = res_i$residual_r[[j]],
        threshold = residual_corr_flag, flagged = TRUE,
        action_taken = if_else(study3_id %in% structural_drops_study3, "deleted", "flagged")
      )
    }
  }

  cross_i <- cross_flags %>% filter(study3_id == !!study3_id)
  if (nrow(cross_i) > 0) {
    for (j in seq_len(nrow(cross_i))) {
      long_rows[[length(long_rows) + 1]] <- tibble(
        pool_id = pool_id, study3_id = study3_id, theory = theory,
        technology = cross_i$technology[[j]],
        phase = "structural", criterion = "cross_loading",
        statistic = cross_i$cross_loading[[j]],
        threshold = crossloading_flag, flagged = TRUE,
        action_taken = case_when(
          study3_id == "deontology02" ~ "retained_despite_flag",
          study3_id %in% structural_drops_study3 ~ "deleted",
          TRUE ~ "flagged"
        )
      )
    }
  }
}

table_deletion_log_long <- bind_rows(long_rows) %>%
  distinct()

write_table_pair(
  table_deletion_log_long, "table_deletion_log_long",
  title = "Item deletion log (long format: item x technology x criterion)"
)

summary_base <- item_lineage %>%
  left_join(
    substantive_decisions %>%
      select(pool_id, substantive_action, substantive_note),
    by = "pool_id"
  )

structural_pool <- item_lineage %>%
  filter(!is.na(study3_id)) %>%
  left_join(structural_by_study3, by = "study3_id") %>%
  select(pool_id, structural_action, structural_criterion, structural_note)

flag_counts <- table_deletion_log_long %>%
  filter(phase == "structural") %>%
  group_by(pool_id, criterion) %>%
  summarise(n_tech = n_distinct(technology), .groups = "drop") %>%
  pivot_wider(names_from = criterion, values_from = n_tech, values_fill = 0, names_prefix = "n_tech_")

for (col in c("n_tech_low_R2", "n_tech_low_loading", "n_tech_residual_correlation", "n_tech_cross_loading")) {
  if (!col %in% names(flag_counts)) {
    flag_counts[[col]] <- 0L
  }
}

table_deletion_log_summary <- summary_base %>%
  left_join(structural_pool, by = "pool_id") %>%
  left_join(flag_counts, by = "pool_id") %>%
  mutate(
    n_tech_low_R2 = coalesce(n_tech_low_R2, 0L),
    n_tech_low_loading = coalesce(n_tech_low_loading, 0L),
    n_tech_residual_correlation = coalesce(n_tech_residual_correlation, 0L),
    n_tech_cross_loading = coalesce(n_tech_cross_loading, 0L),
    final_status = case_when(
      pool_id %in% c("deontology07", "deontology08") ~ "deleted_substantive",
      substantive_action == "revised" ~ "revised",
      !is.na(structural_action) & structural_action == "deleted" ~ "deleted_structural",
      !is.na(structural_action) & structural_action == "retained_despite_flag" ~ "retained",
      pool_id == "utilitarian10" | pool_id == "deontology06" ~ "not_fielded_study3",
      in_mplus_final ~ "retained",
      TRUE ~ "not_in_final_set"
    ),
    manuscript_rationale = coalesce(
      structural_note,
      substantive_note,
      if_else(in_mplus_final, "Retained in final ESTA.", NA_character_)
    ),
    flagged_all_three_tech = coalesce(n_tech_low_R2, 0L) >= 3 |
      coalesce(n_tech_residual_correlation, 0L) >= 3 |
      coalesce(n_tech_cross_loading, 0L) >= 3,
    flagged_one_or_two_tech = !flagged_all_three_tech &
      (coalesce(n_tech_low_R2, 0L) %in% 1:2 |
         coalesce(n_tech_residual_correlation, 0L) %in% 1:2 |
         coalesce(n_tech_cross_loading, 0L) %in% 1:2)
  )

write_table_pair(
  table_deletion_log_summary, "table_deletion_log_summary",
  title = "Item deletion log summary (one row per pool item)"
)

# ---- Draft supplementary markdown ----
cat("\n=== Writing draft supplementary markdown ===\n")

deleted_summary <- table_deletion_log_summary %>%
  filter(final_status %in% c("deleted_substantive", "deleted_structural"))

revised_summary <- table_deletion_log_summary %>%
  filter(final_status == "revised")

retained_flag <- table_deletion_log_summary %>%
  filter(structural_action == "retained_despite_flag")

partial_tech <- table_deletion_log_summary %>%
  filter(flagged_one_or_two_tech, !final_status %in% c("deleted_substantive", "deleted_structural"))

fmt_bullets <- function(df) {
  if (nrow(df) == 0) {
    return("_None._\n")
  }
  paste0(
    "- **", df$pool_id, "** (Study 3: `", coalesce(df$study3_id, "—"), "`): ",
    df$manuscript_rationale,
    collapse = "\n"
  )
}

draft_md <- c(
  "# Supplementary material: ESTA item deletion log (draft)",
  "",
  "_Auto-generated by `item_deletion_log_analysis.R`. Review before submission._",
  "",
  "## 1. Procedure overview",
  "",
  "Item purification followed two phases (see manuscript Section 3.2–3.3):",
  "",
  "1. **Substantive validity (Study 2, web probing, SAI narrative):** category-selection and comprehension probes; LLM-assisted summaries with manual review.",
  "2. **Structural validity (Study 3, N = 297):** unidimensional CFA per ethical theory × technology (Nano-Pat-Parka, HomeMate, SAI narrative), integrating statistical flags (low $R^2$, residual correlations, modification indices, cross-loadings) with judgmental criteria (Wieland et al.).",
  "",
  "Statistical flags in exported tables use: loading < ", loading_flag,
  ", $R^2$ < ", r2_flag, ", |residual $r$| ≥ ", residual_corr_flag,
  ", MI ≥ ", mi_flag, ", cross-loading ≥ ", crossloading_flag, ".",
  "",
  "## 2. Item ID lineage (important)",
  "",
  "Three numbering systems appear in the manuscript and data. **The suffix `deontology07` refers to different items in probing vs. structural phases:**",
  "",
  "| Phase | `deontology07` refers to |",
  "|-------|--------------------------|",
  "| Study 2 probing (pool ID) | Respect in interactions — **deleted** |",
  "| Study 3 CFA (column name) | Ecological environment (pool `deontology10`) — **deleted** |",
  "",
  "See `table_item_id_lineage.csv` for full pool ↔ Study 3 ↔ appendix-final mapping.",
  "",
  "## 3. Exported tables",
  "",
  "| File | Description |",
  "|------|-------------|",
  "| `table_item_id_lineage.csv` | Pool, Study 3, and appendix-final IDs |",
  "| `table_probing_coverage.csv` | Probe counts per item (Study 2) |",
  "| `table_substantive_decisions.csv` | Substantive-phase actions |",
  "| `table_cfa_item_stats.csv` | Loadings and $R^2$ by item × technology |",
  "| `table_cfa_residual_pairs.csv` | Flagged residual correlations |",
  "| `table_cfa_crossloadings.csv` | Six-factor cross-loading flags |",
  "| `table_cfa_sixfactor_fit.csv` | Before-deletion six-factor fit |",
  "| `table_deletion_log_long.csv` | Full item × technology × criterion log |",
  "| `table_deletion_log_summary.csv` | One row per pool item |",
  "",
  "## 4. Items deleted or revised",
  "",
  "### Substantive / structural deletions",
  "",
  fmt_bullets(deleted_summary),
  "",
  "### Wording revisions (Study 2)",
  "",
  fmt_bullets(revised_summary),
  "",
  "### Retained despite statistical flag",
  "",
  fmt_bullets(retained_flag),
  "",
  "## 5. Items flagged in only one or two technologies",
  "",
  "These items showed statistical concerns in some but not all three Study 3 technologies (reviewer transparency request):",
  "",
  if (nrow(partial_tech) > 0) {
    paste0(
      "- **", partial_tech$pool_id, "** (`", partial_tech$study3_id, "`): ",
      "low-$R^2$ in ", coalesce(partial_tech$n_tech_low_R2, 0L), "/3 tech; ",
      "residual flags in ", coalesce(partial_tech$n_tech_residual_correlation, 0L), "/3 tech; ",
      "cross-loading flags in ", coalesce(partial_tech$n_tech_cross_loading, 0L), "/3 tech.",
      collapse = "\n"
    )
  } else {
    "_See `table_deletion_log_summary.csv`._"
  },
  "",
  "## 6. Suggested manuscript note (placeholder)",
  "",
  "```latex",
  "\\responseRC{Complete item-by-item deletion decisions are reported in Supplementary Table~S[X] ",
  "(`table_deletion_log_summary.csv` in the public repository), including substantive ",
  "(Study~2) and structural (Study~3) criteria by technology.}",
  "```",
  ""
)

writeLines(draft_md, file.path(out_dir, "draft_supplementary_deletion_log.md"))

# ---- Sanity checks ----
cat("\n=== Sanity checks ===\n")
cat("Lineage rows:", nrow(item_lineage), "(expect 50 pool items in appendix table)\n")
cat("CFA item stats rows:", nrow(table_cfa_item_stats), "(expect 138 = 46 x 3)\n")
cat("Structural drops (study3):", paste(structural_drops_study3, collapse = ", "), "\n")
cat("Mplus removed:", paste(mplus_removed, collapse = ", "), "\n")
cat("Deleted in summary:", sum(table_deletion_log_summary$final_status %in% c("deleted_substantive", "deleted_structural")), "\n")
cat("Substantive deletions (pool deon07/08):",
    sum(table_deletion_log_summary$pool_id %in% c("deontology07", "deontology08") &
          table_deletion_log_summary$final_status == "deleted_substantive"), "/ 2\n")

deon02 <- table_deletion_log_summary %>% filter(study3_id == "deontology02")
if (nrow(deon02) == 1) {
  cat("deontology02 final_status:", deon02$final_status[[1]], "\n")
}

gof <- table_cfa_sixfactor_fit %>% filter(converged)
if (nrow(gof) > 0) {
  cat("Six-factor df range:", paste(range(gof$df, na.rm = TRUE), collapse = "–"),
      "(manuscript target:", manuscript_gof_df_before, ")\n")
}

cat("\nDone. Outputs in:", normalizePath(out_dir), "\n")
