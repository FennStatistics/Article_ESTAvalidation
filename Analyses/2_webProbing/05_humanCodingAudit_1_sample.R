# Human-coding audit: step 1 -- draw a stratified sample and export coding materials
# (R1-4 / R2-Subst-01 / R2-Subst-02: human verification of the LLM comprehension-probe judgments)
#
# Scope: comprehension-probe responses only (the probe type the manuscript already
# claims, at line ~552, was "manually assessed ... to ensure participants' understanding
# of key terms and concepts" -- this script formalizes that claim with a documented,
# quantifiable check). No new participant data collection: this samples from the
# EXISTING raw responses in output/loop.csv.
#
# Outputs (all in output/humanCodingAudit/):
#   - llm_rerun_input.csv       : {sample_id, item, item_question, response_text}
#                                  -> feed to 07_humanCodingAudit_2_llmRerun.py
#   - coding_sheet_BLINDED.xlsx : same rows, for YOU to fill in the `human_code` column
#                                  by hand (Understood / Partially Understood / Not Understood).
#                                  Does NOT contain any LLM output -- keep it that way while coding.
#
# Run from: Article_ESTAvalidation/Analyses/2_webProbing/
#   Rscript 06_humanCodingAudit_1_sample.R

usePackage <- function(p) {
  if (!is.element(p, installed.packages()[, 1]))
    install.packages(p, dep = TRUE, repos = "http://cran.us.r-project.org")
  require(p, character.only = TRUE)
}
usePackage("dplyr")
usePackage("writexl")

set.seed(20260903)

SAMPLE_FRACTION <- 0.22  # ~22% per item; adjust if you have more/less time
MIN_PER_ITEM <- 5

dat <- read.csv2("output/loop.csv", stringsAsFactors = FALSE, fileEncoding = "latin1")

dat$comp_text <- ifelse(is.na(dat$comp_probe_again) | dat$comp_probe_again == "",
                         dat$comp_probe, dat$comp_probe_again)
dat <- dat[!is.na(dat$comp_text) & nchar(trimws(dat$comp_text)) > 0, ]

items <- sort(unique(dat$item))
sampled <- list()

for (it in items) {
  item_rows <- dat[dat$item == it, ]
  n_item <- nrow(item_rows)
  k <- max(MIN_PER_ITEM, ceiling(n_item * SAMPLE_FRACTION))
  k <- min(k, n_item)
  idx <- sample.int(n_item, k, replace = FALSE)
  sampled[[it]] <- item_rows[idx, ]
}

sample_df <- bind_rows(sampled)
sample_df$sample_id <- sprintf("S%03d", seq_len(nrow(sample_df)))

# shuffle row order so items aren't blocked together (reduces coder fatigue/anchoring bias)
sample_df <- sample_df[sample(nrow(sample_df)), ]

out_dir <- "output/humanCodingAudit"
dir.create(out_dir, showWarnings = FALSE, recursive = TRUE)

# 1) input for the LLM re-run (clean, minimal columns)
llm_input <- sample_df %>%
  select(sample_id, item, questionComprehension, comp_text) %>%
  rename(item_question = questionComprehension, response_text = comp_text)
write.csv(llm_input, file.path(out_dir, "llm_rerun_input.csv"), row.names = FALSE)

# 2) blinded coding sheet for the human coder (you)
coding_sheet <- sample_df %>%
  select(sample_id, item, questionComprehension, comp_text) %>%
  rename(item_question = questionComprehension, response_text = comp_text) %>%
  mutate(human_code = "")  # fill in: Understood / Partially Understood / Not Understood

write_xlsx(
  list(coding_sheet = coding_sheet,
       instructions = data.frame(
         instructions = c(
           "For each row, read `item_question` and `response_text`.",
           "In `human_code`, enter exactly one of: Understood / Partially Understood / Not Understood",
           "  - Understood: the response clearly and correctly reflects the intended meaning of the question/term.",
           "  - Partially Understood: the response is on-topic but vague, incomplete, or partially off-target.",
           "  - Not Understood: the response reflects a clear misunderstanding, non-answer, or unrelated content.",
           "Please code independently -- do not look at output/LLM/ files while coding.",
           "Save this file when done; keep the filename or update 08_humanCodingAudit_3_agreement.R accordingly.",
           sprintf("Total rows to code: %d (%.0f%% of %d total comprehension-probe responses across %d items)",
                   nrow(coding_sheet), 100 * nrow(coding_sheet) / nrow(dat), nrow(dat), length(items))
         )
       )),
  path = file.path(out_dir, "coding_sheet_BLINDED.xlsx")
)

cat("Sampled", nrow(sample_df), "of", nrow(dat), "comprehension-probe responses",
    sprintf("(%.1f%%)", 100 * nrow(sample_df) / nrow(dat)), "across", length(items), "items.\n")
cat("Wrote:\n  -", file.path(out_dir, "llm_rerun_input.csv"), "\n  -",
    file.path(out_dir, "coding_sheet_BLINDED.xlsx"), "\n")
cat("\nNext: run 07_humanCodingAudit_2_llmRerun.py (needs your Hugging Face API key),\n")
cat("      and independently fill in coding_sheet_BLINDED.xlsx by hand.\n")
