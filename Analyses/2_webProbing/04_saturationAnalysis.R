# Saturation analysis for web-probing responses (R2-Subst-03 / R1-9)
#
# Reviewer concern: is the per-item sample size (N = 23-40, see main text) adequate
# for cognitive interviewing / web probing?
#
# This script re-analyzes the EXISTING raw probe responses (output/loop.csv) --
# no new data collection. For each item, it builds a vocabulary-accumulation
# (rarefaction) curve: repeatedly resampling increasing numbers of responses and
# tracking how many distinct content words are newly introduced. This is the
# standard "diminishing returns" signature used as a fast, transparent proxy for
# qualitative saturation (cf. rarefaction curves in ecology / vocabulary growth
# curves in corpus linguistics), reported alongside the literature-based defense
# (Willis, 2005; Squire et al., 2024) in the manuscript.
#
# Run from: Article_ESTAvalidation/Analyses/2_webProbing/
#   Rscript 04_saturationAnalysis.R
#
# Plots (output/saturation_curves_facets.png, output/saturation_curves_overlay.png)
# follow the standard qualitative-saturation-curve convention (cumulative
# information captured vs. sample size, flattening asymptotically; cf. Hennink,
# Kaiser & Weber, 2019, PLOS ONE "A simple method to assess and report thematic
# saturation"): x = accumulated sample size k, y = % of the item's full-sample
# vocabulary captured, with a 90% near-saturation reference line and the observed
# per-item N marked.

usePackage <- function(p) {
  if (!is.element(p, installed.packages()[, 1]))
    install.packages(p, dep = TRUE, repos = "http://cran.us.r-project.org")
  require(p, character.only = TRUE)
}
usePackage("dplyr")
usePackage("tidyr")
usePackage("stringr")
usePackage("ggplot2")

set.seed(20260903)

# ---- minimal built-in English stopword list (avoids external `stopwords` package) ----
STOPWORDS <- c(
  "a","about","above","after","again","against","all","am","an","and","any","are","as",
  "at","be","because","been","before","being","below","between","both","but","by","could",
  "did","do","does","doing","down","during","each","few","for","from","further","had","has",
  "have","having","he","her","here","hers","herself","him","himself","his","how","i","if",
  "in","into","is","it","its","itself","just","me","more","most","my","myself","no","nor",
  "not","now","of","off","on","once","only","or","other","our","ours","ourselves","out",
  "over","own","same","she","should","so","some","such","than","that","the","their","theirs",
  "them","themselves","then","there","these","they","this","those","through","to","too",
  "under","until","up","very","was","we","were","what","when","where","which","while","who",
  "whom","why","will","with","would","you","your","yours","yourself","yourselves","would",
  "also","would","really","think","because","would","dont","doesnt","im","ive","its","thats",
  "theyre","cant","isnt","technology","would"
)

tokenize_content_words <- function(text) {
  text <- tolower(text)
  text <- str_replace_all(text, "[^a-z\\s]", " ")
  words <- unlist(str_split(text, "\\s+"))
  words <- words[nchar(words) >= 3]
  words <- words[!words %in% STOPWORDS]
  words
}

# ---- load raw responses ----
dat <- read.csv2("output/loop.csv", stringsAsFactors = FALSE, fileEncoding = "latin1")

# pool category-selection + comprehension free text as the per-response corpus for that item
dat$pooled_text <- paste(
  ifelse(is.na(dat$category_probe_again), dat$category_probe, dat$category_probe_again),
  ifelse(is.na(dat$comp_probe_again), dat$comp_probe, dat$comp_probe_again),
  sep = " "
)

B <- 500  # bootstrap resamples per sample size

items <- sort(unique(dat$item))
summary_rows <- list()
curve_rows <- list()

for (it in items) {
  responses <- dat$pooled_text[dat$item == it]
  responses <- responses[!is.na(responses) & nchar(str_trim(responses)) > 0]
  n_total <- length(responses)
  if (n_total < 3) next

  # tokenize each response once
  tokens_per_response <- lapply(responses, tokenize_content_words)
  full_vocab_size <- length(unique(unlist(tokens_per_response)))

  ks <- 2:n_total
  expected_vocab <- numeric(length(ks))

  for (i in seq_along(ks)) {
    k <- ks[i]
    vocab_sizes <- replicate(B, {
      idx <- sample.int(n_total, k, replace = FALSE)
      length(unique(unlist(tokens_per_response[idx])))
    })
    expected_vocab[i] <- mean(vocab_sizes)
  }

  pct_of_full <- expected_vocab / full_vocab_size
  curve_rows[[it]] <- data.frame(item = it, k = ks, expected_vocab = expected_vocab,
                                  pct_of_full_vocab = pct_of_full)

  # near-saturation point: smallest k reaching >=90% of the full-sample vocabulary
  near_sat_idx <- which(pct_of_full >= 0.90)[1]
  near_sat_k <- if (is.na(near_sat_idx)) NA else ks[near_sat_idx]

  summary_rows[[it]] <- data.frame(
    item = it,
    n_responses = n_total,
    full_vocab_size = full_vocab_size,
    near_saturation_k = near_sat_k,
    near_saturation_pct_of_N = if (is.na(near_sat_k)) NA else round(near_sat_k / n_total, 3)
  )
}

summary_df <- bind_rows(summary_rows)
curve_df <- bind_rows(curve_rows)

dir.create("output", showWarnings = FALSE)
write.csv(summary_df, "output/saturation_summary_by_item.csv", row.names = FALSE)
write.csv(curve_df, "output/saturation_curves_by_item.csv", row.names = FALSE)

# ---- plots: cumulative vocabulary captured (%) vs. accumulated sample size ----
curve_df <- curve_df %>% left_join(summary_df %>% select(item, n_responses), by = "item")

p_facets <- ggplot(curve_df, aes(x = k, y = pct_of_full_vocab * 100)) +
  geom_line(color = "steelblue", linewidth = 0.7) +
  geom_hline(yintercept = 90, linetype = "dashed", color = "grey40") +
  geom_vline(aes(xintercept = n_responses), linetype = "dotted", color = "firebrick") +
  facet_wrap(~item, ncol = 5) +
  labs(x = "Accumulated sample size (k)", y = "% of item's full-sample vocabulary captured",
       title = "Vocabulary-accumulation (saturation) curves by item",
       subtitle = "Dashed: 90% near-saturation reference. Dotted red: observed per-item N.") +
  theme_minimal(base_size = 9)
ggsave("output/saturation_curves_facets.png", p_facets, width = 12, height = 10, dpi = 300)

p_overlay <- ggplot(curve_df, aes(x = k, y = pct_of_full_vocab * 100, group = item)) +
  geom_line(color = "grey70", linewidth = 0.4) +
  stat_summary(aes(group = 1), fun = mean, geom = "line", color = "steelblue", linewidth = 1.2) +
  geom_hline(yintercept = 90, linetype = "dashed", color = "grey40") +
  labs(x = "Accumulated sample size (k)", y = "% of full-sample vocabulary captured",
       title = "Saturation curves across all 21 items",
       subtitle = "Grey: individual items. Blue: mean across items. Dashed: 90% reference.") +
  theme_minimal(base_size = 11)
ggsave("output/saturation_curves_overlay.png", p_overlay, width = 7, height = 5, dpi = 300)

cat("\n=== Saturation summary across", nrow(summary_df), "items ===\n")
cat("Observed per-item N range:", min(summary_df$n_responses), "-", max(summary_df$n_responses), "\n")
cat("Near-saturation k (90% of item's full vocabulary) range:",
    min(summary_df$near_saturation_k, na.rm = TRUE), "-",
    max(summary_df$near_saturation_k, na.rm = TRUE), "\n")
cat("Median near-saturation k as % of observed N:",
    round(median(summary_df$near_saturation_pct_of_N, na.rm = TRUE) * 100, 1), "%\n")
print(summary_df)
