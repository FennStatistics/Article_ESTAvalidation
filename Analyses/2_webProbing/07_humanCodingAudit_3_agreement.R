# Human-coding audit: step 3 -- compute LLM-human agreement (R1-4 / R2-Subst-01 / R2-Subst-02)
#
# Reads:
#   - output/humanCodingAudit/coding_sheet_BLINDED.xlsx  (sheet "coding_sheet", `human_code` filled in by hand)
#   - output/humanCodingAudit/llm_rerun_output.csv        (from 07_humanCodingAudit_2_llmRerun.py)
# Computes percent agreement and Cohen's kappa (unweighted, base-R implementation --
# no external `irr` dependency), benchmarked against the LLM-vs-human qualitative-coding
# literature (median kappa = .74 across a 39-study systematic review; see manuscript
# citation). Writes a summary to output/humanCodingAudit/agreement_results.csv and
# prints the numbers to paste into the manuscript `\responseRC{}` placeholder.
#
# Run from: Article_ESTAvalidation/Analyses/2_webProbing/
#   Rscript 08_humanCodingAudit_3_agreement.R

setwd("/Volumes/storage/WORK_University/Article_ESTA/Article_ESTAvalidation/Analyses/2_webProbing")

usePackage <- function(p) {
  if (!is.element(p, installed.packages()[, 1]))
    install.packages(p, dep = TRUE, repos = "http://cran.us.r-project.org")
  require(p, character.only = TRUE)
}
usePackage("readxl")
usePackage("dplyr")

CODING_SHEET <- "output/humanCodingAudit/coding_sheet_BLINDED.xlsx"
LLM_OUTPUT <- "output/humanCodingAudit/llm_rerun_output.csv"

# ---- unweighted Cohen's kappa, computed directly from a confusion matrix ----
cohens_kappa <- function(rater1, rater2, levels) {
  rater1 <- factor(rater1, levels = levels)
  rater2 <- factor(rater2, levels = levels)
  tab <- table(rater1, rater2)
  n <- sum(tab)
  po <- sum(diag(tab)) / n
  row_marg <- rowSums(tab) / n
  col_marg <- colSums(tab) / n
  pe <- sum(row_marg * col_marg)
  kappa <- (po - pe) / (1 - pe)
  list(kappa = kappa, percent_agreement = po, n = n, confusion = tab)
}

if (!file.exists(CODING_SHEET)) {
  stop("Coding sheet not found at ", CODING_SHEET,
       ". Run 06_humanCodingAudit_1_sample.R first, then fill in `human_code` by hand.")
}
if (!file.exists(LLM_OUTPUT)) {
  stop("LLM re-run output not found at ", LLM_OUTPUT,
       ". Run 07_humanCodingAudit_2_llmRerun.py first.")
}

human <- read_excel(CODING_SHEET, sheet = "coding_sheet")
llm <- read.csv(LLM_OUTPUT, stringsAsFactors = FALSE)

if (any(is.na(human$human_code) | trimws(human$human_code) == "")) {
  n_missing <- sum(is.na(human$human_code) | trimws(human$human_code) == "")
  stop(n_missing, " row(s) in `human_code` are still blank -- finish coding before running this script.")
}

VALID_CODES <- c("Understood", "Partially Understood", "Not Understood")
if (!all(human$human_code %in% VALID_CODES)) {
  bad <- unique(human$human_code[!human$human_code %in% VALID_CODES])
  stop("Found human_code value(s) not in ", paste(VALID_CODES, collapse = "/"), ": ",
       paste(bad, collapse = ", "))
}

merged <- inner_join(human, llm, by = "sample_id")
if (nrow(merged) != nrow(human)) {
  warning(nrow(human) - nrow(merged), " sampled row(s) had no matching LLM output -- check for a partial 07_ run.")
}
merged <- merged[merged$llm_raw != "" & !is.na(merged$llm_raw), ]

result <- cohens_kappa(merged$human_code, merged$llm_raw, levels = VALID_CODES)

cat("=== LLM (Llama-3.3-70B-Instruct) vs. human-coder agreement ===\n")
cat("N compared:", result$n, "of", nrow(human), "sampled responses\n")
cat("Percent agreement:", sprintf("%.1f%%", 100 * result$percent_agreement), "\n")
cat("Cohen's kappa:", sprintf("%.2f", result$kappa), "\n")
cat("(Literature benchmark: median kappa = .74, range .38-.82, across a 39-study\n")
cat(" systematic review of LLM-vs-human qualitative coding agreement.)\n\n")
cat("Confusion matrix (rows = human, cols = LLM):\n")
print(result$confusion)

# per-item breakdown, useful for spotting whether disagreement clusters on specific items
by_item <- merged %>%
  group_by(item) %>%
  summarise(
    n = n(),
    percent_agreement = mean(human_code == llm_raw),
    .groups = "drop"
  ) %>%
  arrange(percent_agreement)
cat("\n=== Per-item percent agreement (lowest first) ===\n")
print(as.data.frame(by_item))

out_dir <- "output/humanCodingAudit"
write.csv(merged, file.path(out_dir, "agreement_matched_rows.csv"), row.names = FALSE)
write.csv(
  data.frame(n = result$n, percent_agreement = result$percent_agreement, kappa = result$kappa),
  file.path(out_dir, "agreement_results.csv"), row.names = FALSE
)
write.csv(by_item, file.path(out_dir, "agreement_by_item.csv"), row.names = FALSE)

cat("\nWrote results to", out_dir, "\n")
