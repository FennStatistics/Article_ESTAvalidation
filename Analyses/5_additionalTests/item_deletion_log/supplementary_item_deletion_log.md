# Online supplementary material: ESTA item deletion log

**Manuscript:** *Development and Validation of an Empirical Ethics Scale for Technology Assessment (ESTA)* (TECHIS-D-26-01212)

**Addresses reviewer points:**

- **R1-12:** Complete item deletion log by technology and criterion
- **R2 – Structural Validity 3:** Justify item deletion decisions more transparently

**Companion machine-readable tables** (same folder): see [Section 10](#10-data-availability). Analysis script: `../item_deletion_log_analysis.R`.

---

## 1. Purpose

The main text reports only items that were **deleted across all three Study 3 technologies** after confirmatory factor analysis (CFA). Reviewers requested a fuller log: (a) which items were removed or revised at each validation phase, (b) by technology and statistical/judgmental criterion, and (c) what happened to items that showed problems in only one or two technologies.

This document provides that trail. **External validity (Study 4) did not delete further items**; the purified 41-item set was used as-is.

---

## 2. Overview of the purification pipeline

ESTA validation followed three conventional phases of construct validation. Item content changed only in the first two:

| Phase | Study | Technology context | What happened to items |
|-------|-------|--------------------|------------------------|
| **A. Substantive validity** | Study 2 (web probing, *N* = 92) | SAI narrative only | 2 items **deleted**; 2 **revised**; 2 **flagged** (not yet deleted) |
| **B. Structural validity** | Study 3 (CFA, *N* = 297) | Nano-Pat-Parka (NPP), HomeMate (HM), SAI narrative | 7 items **deleted** when problems were consistent across all three technologies; 1 item **retained despite a flag** |
| **C. External validity** | Study 4 (SEM, *N* = 579) | SAI descriptive | **No item deletions** — 41 retained items used in second-order CFA / SEM |

```text
Initial item pool (appendix poolItems)
        │
        ▼
  Substantive (Study 2)  ──►  −2 deleted (respect/dignity)
                             ──►  2 revised (contractualism wording)
                             ──►  2 flagged for later CFA check
        │
        ▼
  Structural (Study 3)   ──►  −7 deleted (CFA purification)
                             ──►  1 retained despite flag (autonomy)
        │
        ▼
  External (Study 4)     ──►  41-item set unchanged
```

---

## 3. Decision rules (structural phase)

Item deletion in Study 3 followed an iterative scale-purification process integrating **statistical** and **judgmental** criteria (Wieland et al., 2017, 2018), as described in the manuscript (§3.3):

| Criterion type | Indicators used |
|----------------|-----------------|
| Statistical | Low explained variance (*R*²), high residual variance, large residual correlations / modification indices (local dependence), modification indices / loadings suggesting cross-loadings |
| Judgmental | Theoretical representativeness, semantic distinctiveness, parsimony, alignment with the ethical-theory definition |

**Deletion rule used in the manuscript:** Only items that **consistently** showed statistical problems **across all three technologies** (NPP, HM, SAI) were removed. Items with concerns in only one or two technologies were retained (see [Section 8](#8-items-flagged-in-only-one-or-two-technologies)).

**Flagging thresholds** used when reconstructing the log from Study 3 data (`item_deletion_log_analysis.R`):

| Flag | Threshold |
|------|-----------|
| Low standardized loading | &lt; .40 |
| Low *R*² (communality) | &lt; .30 |
| Residual correlation / dependence | \|*r*\| ≥ .10 (and/or modification index ≥ 10 for residual covariances) |
| Cross-loading | non-target loading ≥ .30 |

These thresholds support transparency of the reconstructed log; final keep/drop decisions also reflect the judgmental criteria and the manuscript’s “across all three technologies” rule.

---

## 4. Item ID lineage (important)

The same numeric suffix can refer to **different stems** across phases. Supplementary tables therefore distinguish **pool IDs** (appendix initial set / Study 2) from **Study 3 column IDs** (data file / CFA).

### 4.1 Known collision: `deontology07` / `deontology08`

| Phase | ID | Stem (short) | Decision |
|-------|-----|--------------|----------|
| Study 2 (pool) | `deontology07` | Respect in interactions | **Deleted** (comprehension) |
| Study 2 (pool) | `deontology08` | Dignity in interactions | **Deleted** (comprehension) |
| Study 3 (column) | `deontology07` | Ecological environment (pool `deontology10`) | **Deleted** (residual redundancy with nature item) |
| Study 3 (column) | `deontology08` | Cultural environment (pool `deontology11`) | **Retained** |

After probing removed pool respect/dignity items, remaining deontology stems were renumbered in Study 3:

| Pool ID (appendix) | Study 3 ID | Stem (short) |
|--------------------|------------|--------------|
| `deontology09` | `deontology06` | Intrinsic value of nature |
| `deontology10` | `deontology07` | Ecological environment |
| `deontology11` | `deontology08` | Cultural environment |

Full mapping: [`table_item_id_lineage.csv`](table_item_id_lineage.csv).

---

## 5. Phase A — Substantive validity (Study 2)

**Design.** Web probing with category-selection and comprehension probes on 21 ESTA items; technology = **SAI narrative** only.

### 5.1 Items deleted

| Pool ID | Theory | Stem (short) | Criterion | Justification (summary) |
|---------|--------|--------------|-----------|-------------------------|
| `deontology07` | Deontology | Respect in interactions | Comprehension confusion | Participants struggled with “treatment with respect”; answers drifted to consent, non-maleficence, harm avoidance |
| `deontology08` | Deontology | Dignity in interactions | Comprehension confusion | Uncertainty about “dignity”; many questioned relevance for SAI (little person-to-person interaction) |

### 5.2 Items revised (kept, reworded)

| Pool ID | Criterion | Original focus | Final wording (appendix finalItems) |
|---------|-----------|----------------|-------------------------------------|
| `contractualist03` | Comprehension confusion | Unwritten contract | Supports / works against **implicit moral conventions** |
| `contractualist04` | Comprehension confusion | Unspoken promise | Violates / does not violate **important social norms** |

### 5.3 Items flagged but not deleted in Study 2

| Pool ID | Criterion | Note | Later outcome (Study 3) |
|---------|-----------|------|-------------------------|
| `hedonism02` | Ambiguous interpretation | “Selfish” read as personal vs societal scope | **Deleted** (low *R*²) |
| `hedonism03` | Ambiguous interpretation | “Sacrifices” read as personal vs collective | **Deleted** (low *R*² / residual dependence) |

Probe coverage for all probed items: [`table_probing_coverage.csv`](table_probing_coverage.csv). Author decision list: [`table_author_decisions.csv`](table_author_decisions.csv).

---

## 6. Phase B — Structural validity (Study 3)

**Design.** Within-subjects ethical evaluation of three technologies (*N* = 297): Nano-Pat-Parka (**NPP**), HomeMate (**HM**), SAI narrative (**SAI**). Uni-factor CFAs per ethical theory × technology, then six-factor models; purification as in §3.

### 6.1 Model fit before item deletion (six-factor CFA)

Re-estimated from Study 3 data (MLR, FIML); df matches the manuscript “before deleting items” row (df = 974):

| Technology | χ² | df | CFI | RMSEA [90% CI] | SRMR |
|------------|-----|-----|-----|----------------|------|
| NPP | 2426.08 | 974 | .904 | .071 [.067, .074] | .059 |
| HM | 2163.20 | 974 | .913 | .064 [.060, .068] | .051 |
| SAI | 2083.86 | 974 | .923 | .062 [.058, .066] | .051 |

Source: [`table_cfa_sixfactor_fit.csv`](table_cfa_sixfactor_fit.csv).

### 6.2 Master structural deletion log (item × technology × criterion)

Only the seven items below were **removed**. Columns **R² (NPP / HM / SAI)** are from uni-factor CFAs on the pre-purification item set ([`table_cfa_item_stats.csv`](table_cfa_item_stats.csv)). *R*² rank = rank within that theory’s items for that technology (1 = lowest).

#### Deontology

| Study 3 ID | Pool ID (if remapped) | Stem (short) | Criterion | *R*² NPP (rank) | *R*² HM (rank) | *R*² SAI (rank) | Decision |
|------------|----------------------|--------------|-----------|-----------------|----------------|-----------------|----------|
| `deontology01` | same | Moral obligation to act in a certain way | Low *R*² | .395 (1) | .293 (1) | .434 (1) | **Deleted** |
| `deontology07` | pool `deontology10` | Ecological environment | Residual correlation with `deontology06` (nature) | .699 (6) | .516 (2) | .772 (8) | **Deleted** |

Residual MI / dependence `deontology06` ~~ `deontology07`: NPP .34; HM .40; SAI .45 ([`table_cfa_residual_pairs.csv`](table_cfa_residual_pairs.csv)). Judgmental note: nature-focused content redundancy (local dependence).

#### Hedonism

| Study 3 ID | Stem (short) | Criterion | *R*² NPP (rank) | *R*² HM (rank) | *R*² SAI (rank) | Decision |
|------------|--------------|-----------|-----------------|----------------|-----------------|----------|
| `hedonism02` | Selfish for me to use | Low *R*² (+ probing ambiguity) | .232 (1) | .443 (2) | .383 (2) | **Deleted** |
| `hedonism03` | Requires sacrifices to use | Low *R*² / residual dependence | .597 (2) | .382 (1) | .290 (1) | **Deleted** |
| `hedonism09` | Harms/promotes my safety | Residual correlation with health/pleasure items; weak conceptual fit to hedonism | .632 (3) | .628 (6) | .797 (8) | **Deleted** |

Example residual flags involving `hedonism09`: with `hedonism07` (health) MI-implied dependence NPP .72, HM .33, SAI .31; also with pleasure-related items (see residual table).

#### Virtue ethics

| Study 3 ID | Stem (short) | Criterion | *R*² NPP (rank) | *R*² HM (rank) | *R*² SAI (rank) | Decision |
|------------|--------------|-----------|-----------------|----------------|-----------------|----------|
| `virtue06` | Professional excellence | Low *R*²; within-factor residual correlations | .494 (2) | .375 (1) | .453 (1) | **Deleted** |
| `virtue07` | Respectful towards nature | Cross-loadings to Deontology / Utilitarianism | .493 (1) | .515 (2) | .580 (4) | **Deleted** |

No structural deletions for **relativism**, **contractualism**, or **utilitarianism**.

### 6.3 Compact decision summary (structural)

| Study 3 ID | Technologies affected | Primary criterion | Final action |
|------------|----------------------|-------------------|--------------|
| `deontology01` | NPP, HM, SAI | Low *R*² | Deleted |
| `deontology07` (= pool ecological) | NPP, HM, SAI | Residual dependence | Deleted |
| `hedonism02` | NPP, HM, SAI | Low *R*² | Deleted |
| `hedonism03` | NPP, HM, SAI | Low *R*² / residuals | Deleted |
| `hedonism09` | NPP, HM, SAI | Residual dependence + conceptual | Deleted |
| `virtue06` | NPP, HM, SAI | Low *R*² | Deleted |
| `virtue07` | NPP, HM, SAI | Cross-loading | Deleted |

---

## 7. Retained despite a statistical flag

| Study 3 ID | Stem (short) | Flag observed | Why retained |
|------------|--------------|---------------|--------------|
| `deontology02` | Promotes autonomy of users | Indications of cross-loading with Hedonism; residual flags in 2/3 technologies | Autonomy is central to deontological ethics; item kept on **theoretical** grounds |

---

## 8. Items flagged in only one or two technologies

Under the manuscript rule, these items were **not deleted**. They showed residual-correlation and/or other flags in **one or two** (not all three) technologies in the reconstructed log. This section answers the transparency request that the main text omitted such cases.

| Pool ID | Study 3 ID | *n* tech with residual flag | Final status |
|---------|------------|----------------------------|--------------|
| `relativist02` | `relativist02` | 2 | Retained |
| `relativist05` | `relativist05` | 1 | Retained |
| `contractualist02` | `contractualist02` | 2 | Retained |
| `contractualist03` | `contractualist03` | 1 | Revised (wording; Study 2) then retained |
| `contractualist04` | `contractualist04` | 1 | Revised (wording; Study 2) then retained |
| `contractualist05` | `contractualist05` | 1 | Retained |
| `contractualist06` | `contractualist06` | 1 | Retained |
| `hedonism08` | `hedonism08` | 2 | Retained |
| `utilitarian03` | `utilitarian03` | 1 | Retained |
| `utilitarian04` | `utilitarian04` | 1 | Retained |
| `utilitarian06` | `utilitarian06` | 2 | Retained |
| `utilitarian08` | `utilitarian08` | 1 | Retained |
| `utilitarian09` | `utilitarian09` | 1 | Retained |
| `deontology02` | `deontology02` | 2 | Retained (see §7) |
| `deontology03` | `deontology03` | 2 | Retained |
| `deontology05` | `deontology05` | 2 | Retained |
| `deontology11` | `deontology08` | 2 | Retained |
| `virtue02` | `virtue02` | 2 | Retained |
| `virtue03` | `virtue03` | 1 | Retained |
| `virtue04` | `virtue04` | 1 | Retained |

Full item × technology × criterion rows: [`table_deletion_log_long.csv`](table_deletion_log_long.csv). One-row-per-item overview: [`table_deletion_log_summary.csv`](table_deletion_log_summary.csv).

---

## 9. Net inventory

| Stage | Count (approximate) | Notes |
|-------|---------------------|--------|
| Initial theoretical pool | 51 items (appendix poolItems) | Relativism 5, contractualism 6, hedonism 9, utilitarianism 10, deontology 11, virtue 9 |
| After substantive deletions | −2 | Pool `deontology07`, `deontology08` (respect/dignity) |
| Fielded in Study 3 | 46 items × 3 technologies | e.g. `utilitarian10` not in Study 3 data; deontology renumbered after probing |
| After structural deletions | −7 | See §6.2 |
| Final validated set | **41 items** | Mplus `secondOrder_ESTA.inp` `USEVARIABLES`; appendix finalItems (some stems renumbered for publication) |
| Study 4 external validity | 41 items | **No further deletions** |

Authoritative structural drop list in Mplus comments (`! remove:`): `hedonism02`, `hedonism03`, `hedonism09`, `deontology01`, `deontology07`, `virtue06`, `virtue07`.

---

## 10. Data availability

Folder (public repository):  
`Analyses/5_additionalTests/item_deletion_log/`

| File | Content |
|------|---------|
| `supplementary_item_deletion_log.md` | This document |
| `table_item_id_lineage.csv` | Pool ↔ Study 3 ↔ appendix-final IDs |
| `table_author_decisions.csv` | Manuscript-anchored keep/drop/revise decisions |
| `table_probing_coverage.csv` | Study 2 probe counts |
| `table_substantive_decisions.csv` | Substantive-phase actions for all pool items |
| `table_cfa_item_stats.csv` | Uni-factor loadings and *R*² by item × technology |
| `table_cfa_residual_pairs.csv` | Flagged residual / MI pairs |
| `table_cfa_modindices_top.csv` | Top residual modification indices |
| `table_cfa_crossloadings.csv` | Six-factor non-target loading flags |
| `table_cfa_scale_fit.csv` | Uni-factor fit by theory × technology |
| `table_cfa_sixfactor_fit.csv` | Six-factor fit before deletion |
| `table_deletion_log_long.csv` | Full item × technology × criterion log |
| `table_deletion_log_summary.csv` | One row per pool item |

Reproduce with:

```bash
cd Analyses/5_additionalTests
Rscript item_deletion_log_analysis.R
```

Prerequisite: Study 3 `outputs_prepareData/questionnaire.rds` (from `01_prepareData.qmd`).

---

*End of supplementary item deletion log.*
