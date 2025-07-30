 # Online study files

Contains the study files of all online studies run in the article, whereby we conducted four studies.

## Folder Strucutre:

Online Study Files:

- [1_pretestingScenarios](https://github.com/FennStatistics/Article_ESTAvalidation/tree/main/Online%20Study%20Files/1_pretestingScenarios) - Pretest of the scenario texts.
- [2_webProbing](https://github.com/FennStatistics/Article_ESTAvalidation/tree/main/Online%20Study%20Files/2_webProbing) - Web probing study of a subset of items.
- [3_factor_IRT_Analyses](https://github.com/FennStatistics/Article_ESTAvalidation/tree/main/Online%20Study%20Files/3_factor_IRT_Analyses) - Investigating the dimensionality and response structure of ESTA regarding three different technologies.
- [4_SEM](https://github.com/FennStatistics/Article_ESTAvalidation/tree/main/Online%20Study%20Files/4_SEM) - Test for construct validity regarding one technology.

***

## To run/adapt these studies locally

These online studies were developed and hosted using a **local JATOS server** (https://www.jatos.org/), and were **programmed with lab.js** (https://lab.js.org/). You can test and modify them locally before deployment:

### To adapt these files:

* **Use VS Code Live Server for edits**  
   - Install the **Live Server** extension by Ritwick Dey.  
   - Download these repository (unzip it if needed).
   - Open your study `.html` file, click **Go Live**, and you’ll get auto-reload preview in your browser.
   - Adjust files as needed and add components as needed (lab.js packages, HTML, CSS, ...).

### To run these studies online:

-  **Export locally adjusted files**  
   - Copy the adjusted files in JATOS’s `study_assets` folder.  
    Then in **local** JATOS:  
   - Click **On Study → Export** to generate a `.jzip` ready for JATOS.    

- **Start your local JATOS server**  
   Set up JATOS on your machine (e.g., via Docker or direct install) and navigate to `http://localhost:9000`.
   - Press **Run component** in the JATOS GUI to test.
   - Once content is as desired, export the study from local JATOS and import it into your production server.