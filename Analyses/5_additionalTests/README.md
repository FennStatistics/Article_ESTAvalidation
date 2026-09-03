# Additional tests (revision analyses)

Supplementary R scripts for peer-review revision analyses that do not belong to the main Study 1–4 pipelines.

## `compare_SAI_narrative_vs_descriptive.R`

**Purpose:** Compare ESTA subscale and total scores between SAI **narrative** (Study 3, Charlie scenario) and SAI **descriptive** (Study 4 / Fenn et al., 2023). Supports exploratory checks for reviewer point R1-16 (Charlie priming).

**Inputs:**

| Group | Source |
|-------|--------|
| Narrative | `../3_factor_IRT_Analyses/outputs_prepareData/questionnaire.rds` |
| Descriptive | `../4_SEM/data/questionnaire.xlsx` if present, else `../4_SEM/output/ESTA_CFA.dat` |

**Prerequisite:** Run `../3_factor_IRT_Analyses/01_prepareData.qmd` if `questionnaire.rds` is missing.

**Run:**

```bash
cd Analyses/5_additionalTests
Rscript compare_SAI_narrative_vs_descriptive.R
```

**Outputs:** `compare_SAI_narrative_vs_descriptive/SAI_scenario_comparison.csv`, `compare_SAI_narrative_vs_descriptive/SAI_scenario_comparison.html`, individual boxplots per subdimension (`boxplot_mean_deontology.png`, …), and `compare_SAI_narrative_vs_descriptive/boxplot_all_subdimensions.png` (faceted six-panel figure).

**Limitations:** This is a **cross-study** comparison (N ≈ 297 vs N ≈ 579), not a randomized within-subjects A/B test. Differences may reflect sample, timing, or study context—not only scenario framing. Study 3 participants also rated Nano-Pat-Parka and HomeMate (possible order effects). Scores use the **final retained item set** from `../4_SEM/output/secondOrder_ESTA.inp` (slightly lower than Study 3 published subscale means, which used all items per theory).

## `item_deletion_log_analysis.R`

**Purpose:** Reconstruct the ESTA item-purification trail (Study 2 web probing + Study 3 structural CFA) for supplementary documentation. Supports reviewer points **R1-12** and **R2-Struct-03** (P-04 item deletion log).

**Inputs:**

| Source | Use |
|--------|-----|
| `../2_webProbing/output/loop.csv` | Study 2 probe coverage (21 items, SAI narrative) |
| `../3_factor_IRT_Analyses/outputs_prepareData/questionnaire.rds` | Study 3 pre-purification CFA (46 items × 3 technologies) |
| `../4_SEM/output/secondOrder_ESTA.inp` | Final retained item set (`! remove:` comments) |

**Prerequisite:** Run `../3_factor_IRT_Analyses/01_prepareData.qmd` if `questionnaire.rds` is missing.

**Run:**

```bash
cd Analyses/5_additionalTests
Rscript item_deletion_log_analysis.R
```

**Outputs** (folder `item_deletion_log/`):

| File | Description |
|------|-------------|
| `table_item_id_lineage.csv` | Pool ↔ Study 3 ↔ appendix-final ID mapping |
| `table_probing_coverage.csv` | Probe counts per pool item |
| `table_substantive_decisions.csv` | Study 2 substantive actions |
| `table_cfa_item_stats.csv` | Uni-factor loadings and R² by item × technology |
| `table_cfa_residual_pairs.csv` | Residual correlations / MI flags |
| `table_cfa_crossloadings.csv` | Six-factor cross-loading flags |
| `table_cfa_sixfactor_fit.csv` | Before-deletion six-factor fit (df = 974) |
| `table_deletion_log_long.csv` | Item × technology × criterion log |
| `table_deletion_log_summary.csv` | One row per pool item (reviewer-facing) |
| `draft_supplementary_deletion_log.md` | Draft supplementary document skeleton |

**Note:** Item IDs differ across phases (e.g. pool `deontology07` = respect/dignity probing deletion vs Study 3 `deontology07` = ecological environment). See `table_item_id_lineage.csv`.
