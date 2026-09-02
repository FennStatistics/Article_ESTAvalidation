# Development and Validation of an Empirical Ethics Scale for Technology Assessment - Challenges and Perspectives for a Real Time Ethics for Emerging Technologies

by Julius Fenn, Philipp Höfele, Paul Sölder, Markus Langer, Andrea Kiesel

---

This repository provides open **materials and analysis pipelines** for the Ethics Scale for Technology Assessment (**ESTA**): a multidimensional survey instrument that measures how people evaluate the moral acceptability of emerging technologies through six ethical perspectives (deontology, utilitarianism, hedonism, virtue ethics, contractualism, and relativism). It accompanies the manuscript currently under review at *Technology in Society* (TECHIS-D-26-01212).

For a detailed map of folders to manuscript sections (§2.1 scoping review; §3 validation), see **[structureProject.md](structureProject.md)**.


## Folder structure

- [Analyses](https://github.com/FennStatistics/Article_ESTAvalidation/tree/main/Analyses) — Analysis pipelines for the online studies (preparation, R/Quarto analyses, LLM notebook for probing, Mplus/JASP for SEM).
- [Materials](https://github.com/FennStatistics/Article_ESTAvalidation/tree/main/Materials) — Item-related materials, lay wording of ethical theories, scenario texts, and figures.
- [Online Study Files](https://github.com/FennStatistics/Article_ESTAvalidation/tree/main/Online%20Study%20Files) — lab.js / JATOS implementations of all online studies.
- [Scoping Review](https://github.com/FennStatistics/Article_ESTAvalidation/tree/main/Scoping%20Review) — Data and R code for the MES-focused scoping review (article §2.1).

Folder-level notes: [Analyses/readme.md](Analyses/readme.md), [Materials/readme.md](Materials/readme.md), [Online Study Files/readme.md](Online%20Study%20Files/readme.md), [Scoping Review/readme.md](Scoping%20Review/readme.md).


## Analyses explained

Pipelines are numbered `1_`–`4_` chronologically. The article’s **three validation studies** correspond to folders **2, 3, and 4** (combined N = 1106). Folder **1** is a scenario pretest that supports the design but is not one of those three studies.

### Scoping review (article §2.1)

Focused mapping of quantitative ethics scales in the lineage of Reidenbach & Robin’s Multidimensional Ethics Scale (citation-anchored eligibility). Search yielded 906 records; after screening, **40 studies** were included. Repository contents include the Rayyan-derived database, findings spreadsheets (included articles, ethics scales identified, additional related sources), and R code for tables and exploratory text outputs (e.g., wordclouds, bigram helpers, LDA experiments).

### Study 1 — Scenario pretests (`1_pretestingScenarios`)

Pilots of scenario texts for Nano-Pat-Parka, HomeMate (social robot), and Stratospheric Aerosol Injection (SAI; descriptive and narrative framings). Analyses check understandability and related pretest criteria (including affective imagery) so scenarios are suitable for later ESTA administration. Entry point: `Analyses/1_pretestingScenarios/pretests_ethicScale_SAI_studies.Rmd`.

### Study 2 — Web probing / substantive validity (`2_webProbing`)

**N = 92** Prolific participants evaluated SAI (narrative) and answered category-selection and comprehension probes for **21** selected ESTA items (seven items randomly assigned per person). Pipeline: `01_prepareData.qmd` → `02_analyzeData.qmd` → `03_analyzeDataLLMs.ipynb`. Qualitative probe responses were summarized with **Llama-3.1-70B-Instruct**; the article also reports manual assessment of whether key terms were understood as intended. Outputs live under `Analyses/2_webProbing/output/` (including `output/LLM/`).

### Study 3 — Structural validity (`3_factor_IRT_Analyses`)

**N = 297** participants ethically evaluated **three technologies within subjects** (Nano-Pat-Parka, HomeMate, SAI narrative), presented in randomized order. Analyses cover exploratory factor analysis, confirmatory factor analysis of the six ethical dimensions, item response modeling, reliability, and item retention/deletion across technologies. Pipeline: `01_prepareData.qmd` → `02_analyzeData.qmd` (helpers in `functions/`). Technology presentation order is stored as `techOrderTotal` in the prepared questionnaire file.

### Study 4 — External / construct validity (`4_SEM`)

Reanalysis of a Prolific SAI (descriptive) dataset documented in Fenn et al. (2023); after data-quality exclusions, **N = 579**. After a **second-order CFA** (six first-order ethical factors under a general ESTA factor), a **SEM** links ESTA to positive/negative affect, trust, perceived risk and benefit, and acceptability. Data preparation: `Analyses/4_SEM/01_prepareData.qmd`. Primary model files: `Analyses/4_SEM/output/secondOrder_ESTA.inp` and `SEM_ESTA.inp` (Mplus); related projects also under `Analyses/JASP/`.

### Software stack

| Component | Use |
|-----------|-----|
| R + Quarto / R Markdown | Data preparation and most psychometric analyses |
| lavaan, psych, mirt | CFA / EFA / IRT (Study 3) |
| Mplus | Second-order CFA and SEM (Study 4) |
| JASP | Supplementary SEM / EFA projects |
| lab.js + JATOS | Online study delivery |
| Python notebook + LLM API | Probe summarization (Study 2) |


## License

This project is licensed under the GNU General Public License v3 (see [LICENSE](LICENSE)).


## Contact Information

For any inquiries or questions, please contact Julius Fenn ([julius.fenn@psychologie.uni-freiburg.de](mailto:julius.fenn@psychologie.uni-freiburg.de)).

---

*This repository supports transparent, reproducible research for developing the Ethics Scale for Technology Assessment (ESTA).*


## Citation

If you use these materials or analyses, please cite the manuscript as follows:

```text
Fenn, J., Höfele, P., Sölder, P., Langer, M., & Kiesel, A. (2026).
Development and validation of an empirical ethics scale for technology assessment
[Manuscript under review, Technology in Society, TECHIS-D-26-01212].
```

BibTeX:

```bibtex
@unpublished{fenn2026esta,
  author = {Fenn, Julius and H{\"o}fele, Philipp and S{\"o}lder, Paul and Langer, Markus and Kiesel, Andrea},
  title  = {Development and Validation of an Empirical Ethics Scale for Technology Assessment},
  note   = {Manuscript under review, Technology in Society (TECHIS-D-26-01212)},
  year   = {2026},
  url    = {https://github.com/FennStatistics/Article_ESTAvalidation}
}
```
