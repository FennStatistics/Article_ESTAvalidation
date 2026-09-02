# Discriminant validity — Study 3/4 (R1-01, R2-Struct-01/02, R1-06)
#
# Paste into 02_analyzeData.qmd or run standalone:
#   Rscript discriminant_validity_analysis.R
#
# Assumption: uses outputs_prepareData/questionnaire.rds as-is (N = 297);
# no additional IER exclusion in this script (same as order_effects_analysis.R).
# Final retained item set from secondOrder_ESTA.inp (41 items).

script_dir <- tryCatch(
  dirname(normalizePath(sys.frame(1)$ofile)),
  error = function(e) getwd()
)
setwd(script_dir)

set.seed(2024)
Sys.setenv(OMP_NUM_THREADS = 1)

required_pkgs <- c("tidyverse", "lavaan", "semTools", "boot", "stargazer")
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
  library(semTools)
  library(boot)
  library(stargazer)
})

out_dir <- "outputs_analyzeData"
if (!dir.exists(out_dir)) dir.create(out_dir)

# ---- Item definitions (secondOrder_ESTA.inp USEVARIABLES) ----
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

factor_labels <- c(
  relativist = "Relativism",
  contractualist = "Contractualism",
  hedonism = "Hedonism",
  utilitarian = "Utilitarianism",
  deontology = "Deontology",
  virtue = "Virtue"
)

factor_order <- unname(factor_labels[names(items_by_theory)])

# Manuscript appendix ω targets (alpha/omega) for sanity check
appendix_omega <- list(
  contractualist = list(NPP = c(.95, .95), SR = c(.93, .94), SAI = c(.94, .95)),
  utilitarian = list(NPP = c(.97, .97), SR = c(.97, .97), SAI = c(.97, .97)),
  relativist = list(NPP = c(.95, .95), SR = c(.95, .95), SAI = c(.96, .96)),
  deontology = list(NPP = c(.91, .91), SR = c(.92, .92), SAI = c(.91, .91)),
  hedonism = list(NPP = c(.95, .95), SR = c(.92, .93), SAI = c(.93, .93)),
  virtue = list(NPP = c(.95, .95), SR = c(.94, .95), SAI = c(.94, .94))
)

tech_map_sanity <- c(
  NPP = "NPP",
  SR = "SR",
  SAI_narrative = "SAI",
  SAI_descriptive = NA_character_
)

theory_key_from_label <- setNames(names(factor_labels), factor_labels)

# ---- Helpers ----
write_table_pair <- function(df, basename, title = NULL, notes = NULL) {
  csv_path <- file.path(out_dir, paste0(basename, ".csv"))
  html_path <- file.path(out_dir, paste0(basename, ".html"))
  write.csv(df, csv_path, row.names = FALSE)
  df_disp <- df
  num_cols <- vapply(df_disp, is.numeric, logical(1))
  df_disp[num_cols] <- lapply(df_disp[num_cols], function(x) round(x, 3))
  if (nrow(df_disp) > 0) {
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

add_result <- function(results, technology, entity, index, estimate,
                       ci_lo = NA_real_, ci_hi = NA_real_,
                       threshold = NA_real_, flag = NA_character_) {
  bind_rows(
    results,
    tibble(
      technology = technology,
      entity = entity,
      index = index,
      estimate = estimate,
      ci_lo = ci_lo,
      ci_hi = ci_hi,
      threshold = threshold,
      flag = flag
    )
  )
}

build_six_factor_model <- function(items = items_by_theory) {
  lines <- vapply(names(items), function(th) {
    lab <- factor_labels[[th]]
    paste0(lab, " =~ ", paste(items[[th]], collapse = " + "))
  }, character(1))
  paste(lines, collapse = "\n")
}

build_second_order_model <- function() {
  paste0(
    build_six_factor_model(), "\n",
    "ESTA =~ Relativism + Contractualism + Hedonism + ",
    "Utilitarianism + Deontology + Virtue"
  )
}

build_one_factor_model <- function(items = all_retained_items) {
  paste0("ESTA =~ ", paste(items, collapse = " + "))
}

build_merged_util_deon_model <- function() {
  util_items <- items_by_theory$utilitarian
  deon_items <- items_by_theory$deontology
  other <- items_by_theory[setdiff(names(items_by_theory), c("utilitarian", "deontology"))]
  lines <- c(
    paste0("UtilDeon =~ ", paste(c(util_items, deon_items), collapse = " + ")),
    vapply(names(other), function(th) {
      paste0(factor_labels[[th]], " =~ ", paste(other[[th]], collapse = " + "))
    }, character(1))
  )
  paste(lines, collapse = "\n")
}

build_merged_rel_hed_model <- function() {
  rel_items <- items_by_theory$relativist
  hed_items <- items_by_theory$hedonism
  other <- items_by_theory[setdiff(names(items_by_theory), c("relativist", "hedonism"))]
  lines <- c(
    paste0("RelHed =~ ", paste(c(rel_items, hed_items), collapse = " + ")),
    vapply(names(other), function(th) {
      paste0(factor_labels[[th]], " =~ ", paste(other[[th]], collapse = " + "))
    }, character(1))
  )
  paste(lines, collapse = "\n")
}

build_bifactor_model <- function() {
  specs <- names(items_by_theory)
  g_line <- paste0("G =~ ", paste(all_retained_items, collapse = " + "))
  s_lines <- vapply(specs, function(th) {
    paste0(factor_labels[[th]], " =~ ", paste(items_by_theory[[th]], collapse = " + "))
  }, character(1))
  ortho_g <- paste0(factor_labels[specs], " ~~ 0*G", collapse = "\n")
  ortho_s <- c()
  for (i in seq_along(specs)) {
    for (j in seq_along(specs)) {
      if (j > i) {
        ortho_s <- c(ortho_s, paste0(factor_labels[[specs[i]]], " ~~ 0*", factor_labels[[specs[j]]]))
      }
    }
  }
  paste(c(g_line, s_lines, ortho_g, ortho_s), collapse = "\n")
}

fit_cfa_safe <- function(model, data, label = "") {
  tryCatch(
    cfa(
      model,
      data = data,
      estimator = "MLR",
      std.lv = TRUE,
      missing = "fiml",
      ncpus = 1
    ),
    error = function(e) {
      cat("NON-CONVERGENCE:", label, "—", conditionMessage(e), "\n")
      NULL
    },
    warning = function(w) {
      cat("WARNING:", label, "—", conditionMessage(w), "\n")
      invokeRestart("muffleWarning")
    }
  )
}

extract_comp_rel <- function(cr_list) {
  nm <- setdiff(names(cr_list), ".TOTAL.")
  stats::setNames(vapply(cr_list[nm], as.numeric, numeric(1)), nm)
}

subset_tech_data <- function(dat, suffix) {
  cols <- paste0(all_retained_items, suffix)
  stopifnot(all(cols %in% colnames(dat)))
  out <- dat[, cols, drop = FALSE]
  colnames(out) <- all_retained_items
  out[] <- lapply(out, as.numeric)
  out
}

load_study3_datasets <- function() {
  path_rds <- "outputs_prepareData/questionnaire.rds"
  if (!file.exists(path_rds)) {
    stop("Missing ", path_rds, ". Run 01_prepareData.qmd first.")
  }
  dat <- readRDS(path_rds)
  list(
    NPP = subset_tech_data(dat, "_NPP"),
    SR = subset_tech_data(dat, "_SR"),
    SAI_narrative = subset_tech_data(dat, "_SAI")
  )
}

load_study4_cfa <- function() {
  path_xlsx <- "../4_SEM/data/questionnaire.xlsx"
  path_dat <- "../4_SEM/output/ESTA_CFA.dat"

  if (file.exists(path_xlsx)) {
    if (!requireNamespace("readxl", quietly = TRUE)) {
      stop("Install 'readxl' or provide ESTA_CFA.dat.")
    }
    dat <- readxl::read_excel(path_xlsx)
    dat <- dat %>% mutate(across(all_of(all_retained_items), as.numeric))
    return(dat[, all_retained_items, drop = FALSE])
  }

  if (!file.exists(path_dat)) {
    cat("Study 4 CFA data not found; skipping SAI_descriptive.\n")
    return(NULL)
  }

  dat <- read.table(path_dat, header = FALSE)
  if (ncol(dat) != length(all_retained_items)) {
    stop(
      "ESTA_CFA.dat has ", ncol(dat), " columns; expected ",
      length(all_retained_items), "."
    )
  }
  colnames(dat) <- all_retained_items
  dat[] <- lapply(dat, as.numeric)
  dat
}

load_study4_sem <- function() {
  path_dat <- "../4_SEM/output/ESTA_SEM.dat"
  path_inp <- "../4_SEM/output/SEM_ESTA.inp"
  if (!file.exists(path_dat)) {
    cat("Study 4 SEM data not found; skipping incremental R2 block.\n")
    return(NULL)
  }

  inp <- readLines(path_inp)
  start <- grep("NAMES ARE", inp)
  end <- grep(";", inp)
  end <- end[end > start][1]
  block <- paste(inp[(start + 1):(end - 1)], collapse = " ")
  sem_names <- strsplit(block, "[[:space:]]+")[[1]]
  sem_names <- sem_names[sem_names != ""]

  dat <- read.table(path_dat, header = FALSE)
  if (ncol(dat) != length(sem_names)) {
    stop(
      "ESTA_SEM.dat has ", ncol(dat), " columns; expected ",
      length(sem_names), " (from SEM_ESTA.inp NAMES)."
    )
  }
  colnames(dat) <- sem_names
  dat[] <- lapply(dat, as.numeric)
  dat
}

# semTools discriminantValidity() nested LRTs need `data` in the calling
# environment (lavaan 0.6.21 no longer exposes fit@Data$data).

fit_indices_row <- function(fit, technology, model) {
  if (is.null(fit) || !lavInspect(fit, "converged")) {
    return(tibble(
      technology = technology, model = model,
      chisq = NA, df = NA, pvalue = NA, cfi = NA, tli = NA,
      rmsea = NA, rmsea_lo = NA, rmsea_hi = NA, srmr = NA, aic = NA, bic = NA,
      converged = FALSE
    ))
  }
  fm <- fitMeasures(
    fit,
    c(
      "chisq", "df", "pvalue", "cfi", "tli", "rmsea",
      "rmsea.ci.lower", "rmsea.ci.upper", "srmr", "aic", "bic"
    )
  )
  tibble(
    technology = technology,
    model = model,
    chisq = fm["chisq"],
    df = fm["df"],
    pvalue = fm["pvalue"],
    cfi = fm["cfi"],
    tli = fm["tli"],
    rmsea = fm["rmsea"],
    rmsea_lo = fm["rmsea.ci.lower"],
    rmsea_hi = fm["rmsea.ci.upper"],
    srmr = fm["srmr"],
    aic = fm["aic"],
    bic = fm["bic"],
    converged = TRUE
  )
}

htmt_lower_tri <- function(mat) {
  f <- colnames(mat)
  out <- list()
  for (i in seq_along(f)) {
    for (j in seq_along(f)) {
      if (j < i) {
        out[[length(out) + 1]] <- tibble(
          factor_i = f[i],
          factor_j = f[j],
          htmt = mat[i, j]
        )
      }
    }
  }
  bind_rows(out)
}

bootstrap_htmt_ci <- function(model, data, R = 1000, htmt2 = TRUE,
                              cache_file = NULL) {
  if (!is.null(cache_file) && file.exists(cache_file)) {
    cat("  Loading HTMT bootstrap cache:", cache_file, "\n")
    return(readRDS(cache_file))
  }

  mat_point <- htmt(model, data = data, htmt2 = htmt2, absolute = TRUE)
  pairs <- htmt_lower_tri(mat_point)
  n <- nrow(data)
  boot_mat <- matrix(NA_real_, nrow = R, ncol = nrow(pairs))

  cat("  HTMT bootstrap (R =", R, ", htmt2 =", htmt2, ")...\n")
  for (b in seq_len(R)) {
    idx <- sample.int(n, n, replace = TRUE)
    mat_b <- tryCatch(
      htmt(model, data = data[idx, , drop = FALSE], htmt2 = htmt2, absolute = TRUE),
      error = function(e) NULL
    )
    if (!is.null(mat_b)) {
      boot_mat[b, ] <- purrr::pmap_dbl(
        list(pairs$factor_i, pairs$factor_j),
        function(i, j) mat_b[i, j]
      )
    }
  }

  pairs$ci_lo <- apply(boot_mat, 2, quantile, probs = 0.025, na.rm = TRUE)
  pairs$ci_hi <- apply(boot_mat, 2, quantile, probs = 0.975, na.rm = TRUE)
  pairs$htmt2 <- htmt2
  pairs$point <- pairs$htmt

  if (!is.null(cache_file)) {
    saveRDS(pairs, cache_file)
  }
  pairs
}

compute_loading_stats <- function(fit) {
  ss <- standardizedSolution(fit)
  loadings <- ss %>% filter(op == "=~")
  loadings %>%
    group_by(lhs) %>%
    summarise(
      min_loading = min(est.std, na.rm = TRUE),
      max_loading = max(est.std, na.rm = TRUE),
      flag_below_50 = any(est.std < 0.50, na.rm = TRUE),
      flag_below_70 = any(est.std < 0.70, na.rm = TRUE),
      .groups = "drop"
    ) %>%
    rename(factor = lhs)
}

compute_fornell_larcker <- function(fit) {
  ave <- AVE(fit, obs.var = FALSE)
  cor_lv <- lavInspect(fit, "cor.lv")
  f <- colnames(cor_lv)
  sqrt_ave <- sqrt(ave[f])
  names(sqrt_ave) <- f

  rows <- list()
  for (i in seq_along(f)) {
    for (j in seq_along(f)) {
      if (j <= i) {
        rows[[length(rows) + 1]] <- tibble(
          factor_i = f[i],
          factor_j = f[j],
          value = if (i == j) sqrt_ave[i] else cor_lv[i, j],
          type = if (i == j) "sqrt_AVE" else "latent_r",
          fl_pass = if (i == j) NA else {
            ave[f[i]] > cor_lv[i, j]^2 && ave[f[j]] > cor_lv[i, j]^2
          }
        )
      }
    }
  }
  bind_rows(rows)
}

check_omega_sanity <- function(technology, omega, alpha) {
  sanity_tech <- tech_map_sanity[[technology]]
  if (is.na(sanity_tech)) {
    cat("  (no appendix reference for", technology, ")\n")
    return(invisible(NULL))
  }
  for (fac in names(omega)) {
    th <- theory_key_from_label[[fac]]
    if (is.null(th) || is.null(appendix_omega[[th]])) next
    target <- appendix_omega[[th]][[sanity_tech]]
    if (is.null(target)) next
    d_omega <- abs(omega[[fac]] - target[2])
    d_alpha <- abs(alpha[[fac]] - target[1])
    status <- if (d_omega <= 0.02 && d_alpha <= 0.02) "PASS" else "CHECK"
    cat(sprintf(
      "  %s [%s]: omega=%.3f (target %.2f), alpha=%.3f (target %.2f) — %s\n",
      fac, technology, omega[[fac]], target[2], alpha[[fac]], target[1], status
    ))
  }
}

# ---- Load data ----
cat("\n=== Loading data ===\n")
datasets <- load_study3_datasets()
s4_cfa <- load_study4_cfa()
if (!is.null(s4_cfa)) {
  datasets$SAI_descriptive <- s4_cfa
}

cat("Technologies:", paste(names(datasets), collapse = ", "), "\n")
for (nm in names(datasets)) {
  cat(" ", nm, ": N =", nrow(datasets[[nm]]), "\n")
}

six_factor_model <- build_six_factor_model()
results_long <- tibble()

# ---- Per-technology CFA and indices ----
cat("\n=== Fitting six-factor CFA models (M1) ===\n")
fits_m1 <- list()
reliability_rows <- list()
fl_rows <- list()
htmt_rows <- list()
dv_rows <- list()
model_comp_rows <- list()

for (tech in names(datasets)) {
  dat_tech <- datasets[[tech]]
  cat("\n---", tech, "---\n")

  fit <- fit_cfa_safe(six_factor_model, dat_tech, label = paste(tech, "M1"))
  fits_m1[[tech]] <- fit
  if (is.null(fit)) next

  cat("  M1 converged; computing reliability / AVE / FL / HTMT / DV...\n")

  omega <- extract_comp_rel(compRelSEM(fit))
  alpha <- extract_comp_rel(compRelSEM(fit, tau.eq = TRUE))
  check_omega_sanity(tech, omega, alpha)

  ave_latent <- AVE(fit, obs.var = FALSE)
  ave_obs <- AVE(fit, obs.var = TRUE)
  load_stats <- compute_loading_stats(fit)

  for (fac in names(omega)) {
    reliability_rows[[length(reliability_rows) + 1]] <- tibble(
      technology = tech,
      factor = fac,
      alpha = alpha[[fac]],
      omega = omega[[fac]],
      AVE_latent = ave_latent[[fac]],
      AVE_obs = ave_obs[[fac]],
      sqrt_AVE = sqrt(ave_latent[[fac]]),
      min_loading = load_stats$min_loading[load_stats$factor == fac],
      max_loading = load_stats$max_loading[load_stats$factor == fac],
      flag_loading_below_50 = load_stats$flag_below_50[load_stats$factor == fac],
      flag_loading_below_70 = load_stats$flag_below_70[load_stats$factor == fac]
    )
    results_long <- add_result(results_long, tech, fac, "omega", omega[[fac]])
    results_long <- add_result(results_long, tech, fac, "alpha", alpha[[fac]])
    results_long <- add_result(results_long, tech, fac, "AVE_latent", ave_latent[[fac]])
    results_long <- add_result(results_long, tech, fac, "AVE_obs", ave_obs[[fac]])
  }

  fl_mat <- compute_fornell_larcker(fit)
  fl_rows[[length(fl_rows) + 1]] <- fl_mat %>% mutate(technology = tech)
  for (k in seq_len(nrow(fl_mat))) {
    if (fl_mat$type[k] == "latent_r") {
      results_long <- add_result(
        results_long, tech,
        paste(fl_mat$factor_i[k], fl_mat$factor_j[k], sep = "–"),
        "Fornell_Larcker_pass", as.numeric(fl_mat$fl_pass[k]),
        threshold = NA, flag = if (fl_mat$fl_pass[k]) "pass" else "fail"
      )
    }
  }

  cache_htmt2 <- file.path(out_dir, paste0("htmt_boot_", tech, "_htmt2.rds"))
  htmt2_boot <- bootstrap_htmt_ci(
    six_factor_model, dat_tech, R = 1000, htmt2 = TRUE, cache_file = cache_htmt2
  )
  htmt2_boot <- htmt2_boot %>%
    mutate(
      technology = tech,
      flag_85 = ci_hi < 0.85,
      flag_90 = ci_hi < 0.90,
      flag_100 = ci_hi < 1.00
    )
  htmt_rows[[length(htmt_rows) + 1]] <- htmt2_boot

  for (k in seq_len(nrow(htmt2_boot))) {
    results_long <- add_result(
      results_long, tech,
      paste(htmt2_boot$factor_i[k], htmt2_boot$factor_j[k], sep = "–"),
      "HTMT2", htmt2_boot$point[k],
      ci_lo = htmt2_boot$ci_lo[k], ci_hi = htmt2_boot$ci_hi[k],
      threshold = 0.85,
      flag = if (htmt2_boot$flag_85[k]) "pass_85" else "fail_85"
    )
  }

  cat("  discriminantValidity (Rönkkö & Cho, 2022)...\n")
  data <- dat_tech
  dv_cut <- tryCatch(
    discriminantValidity(fit, cutoff = 0.9, merge = FALSE),
    error = function(e) { cat("  DV cutoff failed:", conditionMessage(e), "\n"); NULL }
  )
  if (!is.null(dv_cut)) {
    dv_cut <- as_tibble(dv_cut) %>% mutate(technology = tech, test = "r_fixed_0.9")
    dv_rows[[length(dv_rows) + 1]] <- dv_cut
  }

  dv_merge <- tryCatch(
    discriminantValidity(fit, merge = TRUE),
    error = function(e) { cat("  DV merge failed:", conditionMessage(e), "\n"); NULL }
  )
  if (!is.null(dv_merge)) {
    dv_merge <- as_tibble(dv_merge) %>% mutate(technology = tech, test = "factor_merge")
    dv_rows[[length(dv_rows) + 1]] <- dv_merge
  }

  cat("  Competing models M1–M5...\n")
  fit_m2 <- fit_cfa_safe(build_one_factor_model(), dat_tech, paste(tech, "M2"))
  fit_m3 <- fit_cfa_safe(build_second_order_model(), dat_tech, paste(tech, "M3"))
  fit_m4 <- fit_cfa_safe(build_merged_util_deon_model(), dat_tech, paste(tech, "M4"))
  fit_m4b <- fit_cfa_safe(build_merged_rel_hed_model(), dat_tech, paste(tech, "M4b"))
  fit_m5 <- fit_cfa_safe(build_bifactor_model(), dat_tech, paste(tech, "M5"))

  comp_list <- list(
    M1 = fit, M2 = fit_m2, M3 = fit_m3, M4 = fit_m4,
    M4b = fit_m4b, M5 = fit_m5
  )
  for (mn in names(comp_list)) {
    model_comp_rows[[length(model_comp_rows) + 1]] <-
      fit_indices_row(comp_list[[mn]], tech, mn)
  }

  if (!is.null(fit_m3) && lavInspect(fit_m3, "converged")) {
    cr2 <- tryCatch(compRelSEM(fit_m3), error = function(e) NULL)
    if (!is.null(cr2)) {
      omega_vals <- extract_comp_rel(cr2)
      cat("  Second-order factor loadings reliability (omega_L1):\n")
      print(round(omega_vals, 3))
      for (nm in names(omega_vals)) {
        results_long <- add_result(
          results_long, tech, nm, "omega_L1_second_order", omega_vals[[nm]]
        )
      }
    }
  }

  if (!is.null(fit_m5) && lavInspect(fit_m5, "converged") &&
      requireNamespace("BifactorIndicesCalculator", quietly = TRUE)) {
    bi <- tryCatch(
      BifactorIndicesCalculator::bifactorIndices(fit_m5),
      error = function(e) NULL
    )
    if (!is.null(bi) && !is.null(bi$ModelLevelIndices)) {
      mli <- bi$ModelLevelIndices
      cat(
        "  Bifactor indices (M5): ECV =", round(mli[["ECV.G"]], 3),
        ", omega_H =", round(mli[["OmegaH.G"]], 3), "\n"
      )
      results_long <- add_result(results_long, tech, "G", "ECV", mli[["ECV.G"]])
      results_long <- add_result(results_long, tech, "G", "omega_H", mli[["OmegaH.G"]])
      results_long <- add_result(results_long, tech, "G", "omega_G", mli[["Omega.G"]])
      results_long <- add_result(results_long, tech, "G", "PUC", mli[["PUC"]])
    }
  }
}

# ---- Study 4 incremental R² (R1-06) ----
incremental_rows <- list()
cat("\n=== Incremental prediction (Study 4, R1-06) ===\n")

tryCatch({
  sem_dat <- load_study4_sem()
  if (is.null(sem_dat)) {
    cat("No Study 4 SEM data; skipping incremental R2.\n")
  } else {
  accept_items <- c(
    "bi01", "gen01", "bi02", "genr02", "bir03", "gen03", "bir04", "genr04",
    "bi05", "gen05", "bir06", "bi07", "bir08", "bi09"
  )
  risk_items <- paste0("r", sprintf("%02d", 1:5))
  benefit_items <- paste0("b", sprintf("%02d", 1:5))

  sem_dat$mean_accept <- rowMeans(sem_dat[, accept_items, drop = FALSE], na.rm = TRUE)
  sem_dat$mean_risk <- rowMeans(sem_dat[, risk_items, drop = FALSE], na.rm = TRUE)
  sem_dat$mean_benefit <- rowMeans(sem_dat[, benefit_items, drop = FALSE], na.rm = TRUE)
  sem_dat$mean_ESTA_general <- rowMeans(
    sem_dat[, all_retained_items, drop = FALSE], na.rm = TRUE
  )

  for (th in names(items_by_theory)) {
    cols <- items_by_theory[[th]]
    sem_dat[[paste0("mean_", th)]] <- rowMeans(sem_dat[, cols, drop = FALSE], na.rm = TRUE)
  }

  subscale_preds <- paste0("mean_", names(items_by_theory))
  outcomes <- c("mean_accept", "mean_risk", "mean_benefit")
  outcome_labels <- c(
    mean_accept = "Acceptability",
    mean_risk = "Risk",
    mean_benefit = "Benefit"
  )

  for (out in outcomes) {
    f_general <- as.formula(paste(out, "~ mean_ESTA_general"))
    f_sub <- as.formula(paste(out, "~", paste(subscale_preds, collapse = " + ")))

    m_general <- lm(f_general, data = sem_dat)
    m_sub <- lm(f_sub, data = sem_dat)
    a <- anova(m_general, m_sub)

    incremental_rows[[length(incremental_rows) + 1]] <- tibble(
      outcome = outcome_labels[[out]],
      R2_general = summary(m_general)$r.squared,
      adj_R2_general = summary(m_general)$adj.r.squared,
      R2_subscales = summary(m_sub)$r.squared,
      adj_R2_subscales = summary(m_sub)$adj.r.squared,
      delta_R2 = summary(m_sub)$r.squared - summary(m_general)$r.squared,
      anova_F = a$F[2],
      anova_p = a$`Pr(>F)`[2]
    )
  }
  print(bind_rows(incremental_rows))
  }
}, error = function(e) {
  cat("Incremental R2 block failed:", conditionMessage(e), "\n")
})

# ---- Assemble export tables ----
cat("\n=== Writing outputs ===\n")

table_reliability_AVE <- bind_rows(reliability_rows)
table_FornellLarcker <- bind_rows(fl_rows)
table_HTMT_matrix <- bind_rows(htmt_rows)
table_model_comparison <- bind_rows(model_comp_rows)
table_discriminantValidity <- bind_rows(dv_rows)
table_incremental_R2 <- bind_rows(incremental_rows)

write.csv(results_long, file.path(out_dir, "discriminant_validity_results.csv"), row.names = FALSE)

write_table_pair(
  table_reliability_AVE, "table_reliability_AVE",
  title = "Composite reliability, AVE, and factor loadings by technology",
  notes = c(
    "McDonald omega and alpha-type coefficient from semTools::compRelSEM.",
    "AVE latent vs observed (obs.var). Fornell & Larcker (1981)."
  )
)

write_table_pair(
  table_HTMT_matrix, "table_HTMT_matrix",
  title = "HTMT2 ratios with bootstrap 95% CI (lower triangle)",
  notes = c(
    "HTMT2 geometric mean (Roemer et al., 2021). R = 1000 bootstrap resamples.",
    "Pass if upper CI < .85 (conservative) or < .90 (liberal)."
  )
)

write_table_pair(
  table_FornellLarcker, "table_FornellLarcker",
  title = "Fornell-Larcker criterion: sqrt(AVE) diagonal, latent r off-diagonal",
  notes = "Pair passes if AVE_i > r_ij^2 and AVE_j > r_ij^2 (Fornell & Larcker, 1981)."
)

write_table_pair(
  table_model_comparison, "table_model_comparison",
  title = "Competing CFA models (MLR estimator)",
  notes = c(
    "M1: six correlated factors; M2: unidimensional; M3: second-order ESTA;",
    "M4: merged Utilitarianism+Deontology; M4b: merged Relativism+Hedonism; M5: bifactor."
  )
)

if (nrow(table_discriminantValidity) > 0) {
  write_table_pair(
    table_discriminantValidity, "table_discriminantValidity",
    title = "CI-based discriminant validity tests (Rönkkö & Cho, 2022)",
    notes = "Nested model comparisons: r fixed at .90 and factor-merging LRT."
  )
}

if (nrow(table_incremental_R2) > 0) {
  write_table_pair(
    table_incremental_R2, "table_incremental_R2",
    title = "Incremental prediction: six subscales vs general ESTA (Study 4)",
    notes = "Outcome composites from SEM items; N = 579 SAI descriptive sample."
  )
}

writeLines(capture.output(sessionInfo()), file.path(out_dir, "discriminant_validity_session_info.txt"))

summary_md <- paste0(
  "# Discriminant validity — draft Results/Discussion text\n\n",
  "## Results\n\n",
  "After scale purification, we re-estimated six-factor CFA models (MLR, FIML) ",
  "for each technology. McDonald's ω ranged from {{PLACEHOLDER_omega_min}} to ",
  "{{PLACEHOLDER_omega_max}} across factors and technologies (see ",
  "`table_reliability_AVE.csv`). Average variance extracted (AVE) exceeded ",
  "{{PLACEHOLDER_AVE_threshold}} for {{PLACEHOLDER_AVE_pass_n}} of ",
  "{{PLACEHOLDER_AVE_total_n}} factor–technology combinations. ",
  "Fornell–Larcker discriminant validity was supported for ",
  "{{PLACEHOLDER_FL_pass_pct}}% of factor pairs (see `table_FornellLarcker.csv`). ",
  "HTMT2 ratios with bootstrap 95% CIs (R = 1000) exceeded the conservative ",
  ".85 upper-CI threshold for {{PLACEHOLDER_HTMT_fail_n}} of ",
  "{{PLACEHOLDER_HTMT_total_n}} pairs (see `table_HTMT_matrix.csv`). ",
  "CI-based latent-correlation tests (Rönkkö & Cho, 2022) indicated ",
  "{{PLACEHOLDER_DV_summary}}.\n\n",
  "## Discussion\n\n",
  "Moderate-to-high latent correlations (e.g., Utilitarianism–Deontology ",
  "r = {{PLACEHOLDER_util_deon_max}}) are consistent with a shared evaluative ",
  "stance rather than a failure of measurement specificity. The second-order ",
  "ESTA model (M3) {{PLACEHOLDER_M3_vs_M1}} relative to the six-factor baseline ",
  "(M1), supporting a hierarchical structure in which theory-specific ",
  "dimensions load on a general moral-evaluation factor. We report multiple ",
  "discriminant-validity criteria because the Fornell–Larcker test has known ",
  "false-positive and false-negative rates (Rönkkö & Cho, 2022; Voorhees et al., 2016).\n\n",
  "## Subscale vs general score (R1-06)\n\n",
  "In Study 4 (N = 579), six subscale scores {{PLACEHOLDER_incremental_summary}} ",
  "over a single general ESTA mean when predicting acceptability, risk, and ",
  "benefit perceptions (see `table_incremental_R2.csv`). Subscale scores add ",
  "interpretive value when profiling which normative lens drives judgments, ",
  "even when incremental R² for global outcomes is {{PLACEHOLDER_delta_R2_qualitative}}.\n"
)

fill_placeholder <- function(text, key, value) {
  gsub(paste0("{{", key, "}}"), value, text, fixed = TRUE)
}

if (nrow(table_reliability_AVE) > 0) {
  summary_md <- fill_placeholder(
    summary_md, "PLACEHOLDER_omega_min",
    sprintf("%.2f", min(table_reliability_AVE$omega, na.rm = TRUE))
  )
  summary_md <- fill_placeholder(
    summary_md, "PLACEHOLDER_omega_max",
    sprintf("%.2f", max(table_reliability_AVE$omega, na.rm = TRUE))
  )
  summary_md <- fill_placeholder(
    summary_md, "PLACEHOLDER_AVE_threshold", "0.50"
  )
  summary_md <- fill_placeholder(
    summary_md, "PLACEHOLDER_AVE_pass_n",
    as.character(sum(table_reliability_AVE$AVE_latent >= 0.50, na.rm = TRUE))
  )
  summary_md <- fill_placeholder(
    summary_md, "PLACEHOLDER_AVE_total_n",
    as.character(nrow(table_reliability_AVE))
  )
}
if (nrow(table_FornellLarcker) > 0) {
  fl_pairs <- table_FornellLarcker %>% filter(type == "latent_r")
  if (nrow(fl_pairs) > 0) {
    pct <- round(100 * mean(fl_pairs$fl_pass, na.rm = TRUE), 1)
    summary_md <- fill_placeholder(
      summary_md, "PLACEHOLDER_FL_pass_pct", as.character(pct)
    )
  }
}
if (nrow(table_HTMT_matrix) > 0) {
  summary_md <- fill_placeholder(
    summary_md, "PLACEHOLDER_HTMT_fail_n",
    as.character(sum(!table_HTMT_matrix$flag_85, na.rm = TRUE))
  )
  summary_md <- fill_placeholder(
    summary_md, "PLACEHOLDER_HTMT_total_n",
    as.character(nrow(table_HTMT_matrix))
  )
}
if (nrow(table_FornellLarcker) > 0) {
  ud <- table_FornellLarcker %>%
    filter(
      type == "latent_r",
      (factor_i == "Utilitarianism" & factor_j == "Deontology") |
        (factor_i == "Deontology" & factor_j == "Utilitarianism")
    )
  if (nrow(ud) > 0) {
    summary_md <- fill_placeholder(
      summary_md, "PLACEHOLDER_util_deon_max",
      sprintf("%.2f", max(abs(ud$value), na.rm = TRUE))
    )
  }
}
if (nrow(table_incremental_R2) > 0) {
  delta_txt <- if (any(table_incremental_R2$delta_R2 > 0.01, na.rm = TRUE)) {
    "incrementally improved prediction"
  } else {
    "did not substantially improve prediction"
  }
  summary_md <- fill_placeholder(
    summary_md, "PLACEHOLDER_incremental_summary", delta_txt
  )
  max_delta <- max(table_incremental_R2$delta_R2, na.rm = TRUE)
  qual <- if (max_delta >= 0.05) "meaningful" else if (max_delta >= 0.01) "modest" else "minimal"
  summary_md <- fill_placeholder(
    summary_md, "PLACEHOLDER_delta_R2_qualitative", qual
  )
}

writeLines(summary_md, file.path(out_dir, "discriminant_validity_summary.md"))

cat("\nOutputs written to", out_dir, "\n")
cat("Done.\n")
