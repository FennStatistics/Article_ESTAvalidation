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
