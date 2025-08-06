/* Technology under investigation */
// const TechnologyScenario = "Stratospheric Aerosol Injection";
var TechnologyScenario; // placeholder for technology name
var skipSAItext = true; // skip scenrario texts
var skipSRtext = true;
var skipNPPtext = true;

/* number of components / elements to set slider */
const numElements = 50;
var numElementsCounter = 0;
/* general global variables */
var URLparams_global;
var paracountclicks = 0;

/* 
introduction phase 
*/
const Greetings_htmlForm = new lab.html.Form({
  title: "Greetings",
  content: textObj.greetings,
  messageHandlers: {
    run: () => {
      // kick out participants who not using a computer screen
      if (typeof jatos.jQuery === "function") {
        if (
          study.state.meta.screen_height < 700 &&
          study.state.meta.screen_width < 1000
        ) {
          alert(
            "It seems that your screen size you are using is smaller than 1000x700 pixels (height x width):\n" +
              "> your screen width: " +
              study.state.meta.screen_width +
              " your screen height: " +
              study.state.meta.screen_height +
              "\nStudy is aborted!"
          );
          jatos.abortStudy("study aborted - screen to small");
        }
      }
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
      // get URL params
      if (typeof jatos.jQuery === "function") {
        URLparams_global = jatos.urlQueryParameters;
        console.log("URLparams_global:", URLparams_global);

        // check if a prolific ID is provided via URL parameter !!! PROLIFIC study
        if (typeof URLparams_global.PROLIFIC_PID === "undefined") {
          alert(
            "Sorry, there may be a technical error! It was not possible to obtain all the necessary data from prolific. Please write to the study director that an error has occurred."
          );
          jatos.abortStudy("study aborted - no prolific ID");
        } else {
          study.options.datastore.set(
            "PROLIFIC_PID",
            URLparams_global.PROLIFIC_PID
          );
        }
      }
    },
  },
});

const InformConsent_htmlForm = new lab.html.Form({
  title: "InformedConsent",
  content: textObj.informCon,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("result data sent to JATOS first time");
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));
      }
    },
  },
});

const InformConsentNO_htmlForm = new lab.html.Form({
  title: "InformedConsentNO",
  content: textObj.informConNo,
  tardy: true,
  skip: "${ study.state.dummy_informedconsent == 1}",
});

const ExclusionCriteria_htmlForm = new lab.html.Form({
  title: "ExclusionCriteria",
  content: textObj.exclusionCriteria,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

// Attention Check
function continueornot() {
  if ($("fieldset :checkbox:checked").length > 0) {
    // ok
    return true;
  } else {
    alert("Please check at least one of these activities.");
    return false;
  }
}

const AttentionCheck_htmlForm = new lab.html.Form({
  title: "AttentionCheck",
  content: textObj.attentionCheck,
  messageHandlers: {
    commit: () => {
      var attCheck_array = [];
      $("fieldset :checkbox").each(function () {
        if (this.checked) {
          attCheck_array.push(this.id);
        }
      });
      attCheck_array;

      study.options.datastore.set("attCheck_array", attCheck_array);
      study.options.datastore.set(
        "attCheck_text",
        $("#attCheck_OtherText").val()
      );

      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const SetupStudy_htmlForm = new lab.html.Form({
  title: "SetupStudy",
  content: textObj.setupStudy,
  messageHandlers: {
    commit: () => {
      // save ET
      study.options.datastore.set("techOrderTotal", [
        backup_AllTechnologyScenario[index_AllTechnologyScenario[0]].abb,
        backup_AllTechnologyScenario[index_AllTechnologyScenario[1]].abb,
        backup_AllTechnologyScenario[index_AllTechnologyScenario[2]].abb,
      ]);

      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

/* 
scenario texts phase 
*/
// >>> SAI
const SAIpreKnowledge_htmlForm = new lab.html.Form({
  title: "SAIpreKnowledge",
  tardy: true,
  skip: "${skipSAItext}",
  content: textObj.SAIpreKnowledge,
  messageHandlers: {
    run: function anonymous() {
      $("#hideKnowSRMdefinition").hide();

      $("#knowSRM").on("input", () => {
        var tmpValue = $("#knowSRM option:selected")[0].value;

        if (tmpValue != "knowSRMno") {
          $("#hideKnowSRMdefinition").show();
        } else {
          $("#hideKnowSRMdefinition").hide();
        }
      });
    },
    commit: function anonymous() {
      // progress bar
      if (!skipSAItext) {
        numElementsCounter++;
        document.querySelector(".progress-bar").style.width =
          (numElementsCounter / numElements) * 100 + "%";
      }

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));
      }
    },
  },
});

const SAITextClimate_htmlForm = new lab.html.Form({
  title: "SAITextClimate",
  tardy: true,
  skip: "${skipSAItext}",
  content: textObj.SAITextClimate,
  messageHandlers: {
    run: function anonymous() {
      document.querySelector("button").style.visibility = "hidden";
      setTimeout(
        () => (document.querySelector("button").style.visibility = "visible"),
        15000 // 15000 (15 seconds)
      );
    },
    commit: () => {
      // progress bar
      if (!skipSAItext) {
        numElementsCounter++;
        document.querySelector(".progress-bar").style.width =
          (numElementsCounter / numElements) * 100 + "%";
      }
    },
  },
});

const SAITextTechnology_htmlForm = new lab.html.Form({
  title: "SAITextTechnology",
  tardy: true,
  skip: "${skipSAItext}",
  content: textObj.SAITextTechnology,
  messageHandlers: {
    run: function anonymous() {
      document.querySelector("button").style.visibility = "hidden";
      setTimeout(
        () => (document.querySelector("button").style.visibility = "visible"),
        30000 // 30000 (30 seconds)
      );
    },
    commit: () => {
      // progress bar
      if (!skipSAItext) {
        numElementsCounter++;
        document.querySelector(".progress-bar").style.width =
          (numElementsCounter / numElements) * 100 + "%";
      }
    },
  },
});

// >>> SR
const SRTextTechnology_htmlForm = new lab.html.Form({
  title: "SRTextTechnology",
  tardy: true,
  skip: "${skipSRtext}",
  content: textObj.SRTextTechnology,
  messageHandlers: {
    run: function anonymous() {
      document.querySelector("button").style.visibility = "hidden";
      setTimeout(
        () => (document.querySelector("button").style.visibility = "visible"),
        30000 // 30000 (30 seconds)
      );
    },
    commit: () => {
      // progress bar
      if (!skipSRtext) {
        numElementsCounter++;
        document.querySelector(".progress-bar").style.width =
          (numElementsCounter / numElements) * 100 + "%";
      }
    },
  },
});

// >>> NPP
const NPPTextTechnology_htmlForm = new lab.html.Form({
  title: "NPPTextTechnology",
  tardy: true,
  skip: "${skipNPPtext}",
  content: textObj.NPPTextTechnology,
  messageHandlers: {
    run: function anonymous() {
      document.querySelector("button").style.visibility = "hidden";
      setTimeout(
        () => (document.querySelector("button").style.visibility = "visible"),
        30000 // 30000 (30 seconds)
      );
    },
    commit: () => {
      // progress bar
      if (!skipNPPtext) {
        numElementsCounter++;
        document.querySelector(".progress-bar").style.width =
          (numElementsCounter / numElements) * 100 + "%";
      }
    },
  },
});

/* 
################### ESTA ###################
*/
// general information
var skipESTAgeninfo = false;
const ESTAgeninfo_htmlForm = new lab.html.Form({
  title: "ESTAgeninfo",
  tardy: true,
  skip: "${skipESTAgeninfo}",
  content: textObj.ESTAgeninfo,
  messageHandlers: {
    run: () => {
      document.querySelector("button").style.visibility = "hidden";
      setTimeout(
        () => (document.querySelector("button").style.visibility = "visible"),
        10000 // 10000 (10 seconds)
      );
    },
    commit: () => {
      // show this element only once
      skipESTAgeninfo = true;
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

// start loop
// load parameters for skipping
const intermediateScreen = new lab.html.Screen({
  title: "intermediateScreen",
  content: `
  `,
  timeout: 100,
  messageHandlers: {
    "after:end": () => {
      console.log(
        "counter_outer:",
        study.options.datastore.get("counter_outer")
      );
      console.log(
        "counter_inner:",
        study.options.datastore.get("counter_inner")
      );

      if (
        AllTechnologyScenario[study.options.datastore.get("counter_outer")]
          .abb === "SAI"
      ) {
        skipSAItext = false; // false
        skipSRtext = true;
        skipNPPtext = true;
      } else if (
        AllTechnologyScenario[study.options.datastore.get("counter_outer")]
          .abb === "SR"
      ) {
        skipSAItext = true;
        skipSRtext = false;
        skipNPPtext = true;
      } else if (
        AllTechnologyScenario[study.options.datastore.get("counter_outer")]
          .abb === "NPP"
      ) {
        skipSAItext = true;
        skipSRtext = true;
        skipNPPtext = false;
      }

      // define technology variable:
      TechnologyScenario =
        AllTechnologyScenario[study.options.datastore.get("counter_outer")]
          .name;

      // save order of technologies shown
      study.options.datastore.set(
        "techOrder",
        AllTechnologyScenario[study.options.datastore.get("counter_outer")].name
      );
    },
  },
});
// ethic theories to fill in "setEthic"
var GlobalCounter = -1;

const ESTAtheorydefinition = new lab.html.Form({
  title: "ESTAtheorydefinition",
  tardy: true,
  content: textObj.ESTAtheorydefinition,
  //timeout: 1000,
  messageHandlers: {
    "before:prepare": () => {},
    run: () => {
      GlobalCounter++;
      if (GlobalCounter == 6) {
        GlobalCounter = 0; // set global counter to zero
        index_EthicTheories = shuffleESTA(EthicTheories); // shuffle again order of ethical theories
      }
      console.log("GlobalCounter: ", GlobalCounter);
      $("#ethicTheory_def_top").text(
        EthicTheories[index_EthicTheories[GlobalCounter]].def_top
      );

      $("#ethicTheory_name").text(
        EthicTheories[index_EthicTheories[GlobalCounter]].ethicTheory
      );
      $("#ethicTheory_beforemain").text(
        EthicTheories[index_EthicTheories[GlobalCounter]].def_beforemain
      );

      $("#ethicTheory_image").attr(
        "src",
        "static/EthicTheories/" +
          EthicTheories[index_EthicTheories[GlobalCounter]].def_picture
      );

      $("#ethicTheory_definition").text(
        EthicTheories[index_EthicTheories[GlobalCounter]].def_main
      );
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

var lastValue = undefined;
var activeESTA = [];
const ESTAscale = new lab.html.Form({
  title: "ESTAscale",
  content: textObj.ESTAscale, // FirstQuesComponentText,
  tardy: true,
  //timeout: 1000,
  messageHandlers: {
    run: () => {
      $("#ethicTheory_name1").text(
        EthicTheories[index_EthicTheories[GlobalCounter]].ethicTheory
      );
      // console.log(ESTA);

      var setEthic = EthicTheories[index_EthicTheories[GlobalCounter]].itemID;

      var RegExpSetEthic = new RegExp(setEthic);
      activeESTA = [];
      ESTA.forEach((elt) => {
        if (RegExpSetEthic.test(elt.scale)) {
          // console.log("elt: ", elt);
          activeESTA.push(elt);
        }
      });

      // console.log("activeESTA: ", activeESTA);

      // remove all rows not needed
      var LengthTr = $("tr").length - 1;
      if (LengthTr > activeESTA.length) {
        for (let i = LengthTr; i >= activeESTA.length + 1; i--) {
          $("tr")[i].remove();
        }
      }

      // fill up needed rows
      var index_activeESTA = shuffleESTA(activeESTA);
      console.log("index_activeESTA: ", index_activeESTA);
      var itemName = undefined;
      for (let i = 1; i <= activeESTA.length; i++) {
        itemName =
          activeESTA[index_activeESTA[i - 1]].scale +
          "_" +
          AllTechnologyScenario[study.options.datastore.get("counter_outer")]
            .abb;

        // left and right scale
        $("tr")[i].children[0].innerHTML =
          activeESTA[index_activeESTA[i - 1]].left;
        $("tr")[i].children[8].innerHTML =
          activeESTA[index_activeESTA[i - 1]].right;

        // single radio buttons
        for (let n = 1; n <= 7; n++) {
          $("tr")[i].children[n].innerHTML = `
                <label style=\"height: 100%; padding: 5px 0\">
                  <input type=\"radio\" name=\"${itemName}\" value=\"${n}\" required=\"\">  
                </label>
              `;
        }
        // background colour
        if (i % 2 == 0) {
          $("tr")[i].style.backgroundColor = "#e9e9e9";
        }
      }

      // collect paradata
      paracountclicks = 0;
      document.querySelectorAll("input").forEach((item) => {
        item.addEventListener("click", (event) => {
          paracountclicks++;
          console.log("input clicked", paracountclicks);
        });
      });

      // console.log("Component run");
      // save index values of ESTA:
      // study.options.datastore.set("index_ESTA", index_ESTA);
    },
    commit: () => {
      // save paradata
      let numberitems = document.querySelectorAll("tbody tr").length;
      paracountclicks -= numberitems;
      study.options.datastore.set("para_countclicks", paracountclicks);
      study.options.datastore.set(
        "para_ET_tech",
        EthicTheories[index_EthicTheories[GlobalCounter]].itemID +
          "_" +
          AllTechnologyScenario[study.options.datastore.get("counter_outer")]
            .abb
      );

      // compute last average value
      lastValue = $("#tablerandom input[type='radio']:checked");
      var vec_values = [];
      for (let i = 0; i < lastValue.length; i++) {
        vec_values.push(Number(lastValue[i].value));
      }
      var average = vec_values.reduce((a, b) => a + b, 0) / vec_values.length;
      lastValue = average;
      console.log("average - lastValue: ", lastValue);

      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      // save data at 3th and 7th round
      if (GlobalCounter == 5) {
        if (typeof jatos.jQuery === "function") {
          // If JATOS is available, send data there
          var resultJson = study.options.datastore.exportJson();
          console.log("result data sent to JATOS x time");
          jatos
            .submitResultData(resultJson)
            .then(() => console.log("success"))
            .catch(() => console.log("error"));
        }
      }
    },
  },
});

const ESTAposteval = new lab.html.Form({
  title: "ESTAposteval",
  tardy: true,
  content: textObj.ESTAposteval,
  //timeout: 1000,
  messageHandlers: {
    run: () => {
      // save answer to which ethic theory
      study.options.datastore.set(
        "importanceETtheory",
        EthicTheories[index_EthicTheories[GlobalCounter]].ethicTheory
      );

      $("#ethicTheory_name1").text(
        EthicTheories[index_EthicTheories[GlobalCounter]].ethicTheory
      );
      $("#ethicTheory_name2").text(
        EthicTheories[index_EthicTheories[GlobalCounter]].ethicTheory
      );

      $("#setLastValue")[0].textContent = lastValue.toFixed(2);
      if (lastValue < 3) {
        $("#verbalizeLastValue")[0].textContent = "a relatively low value";
      } else if (lastValue >= 3 && lastValue <= 5) {
        $("#verbalizeLastValue")[0].textContent = "an average value";
      } else if (lastValue > 5) {
        $("#verbalizeLastValue")[0].textContent = "a relatively high value";
      }
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const SequenceInner = new lab.flow.Sequence({
  title: "SequenceInner",
  content: [
    // ESTA
    ESTAtheorydefinition,
    ESTAscale,
    // ESTAposteval
  ],
});

const LoopComponent = new lab.flow.Loop({
  template: SequenceInner,
  templateParameters: [
    {
      notneeded: 0,
    },
  ],
  sample: {
    mode: "draw-replace",
    n: "6",
  },
  indexParameter: "counter_inner",
});

const SequenceOuter = new lab.flow.Sequence({
  title: "SequenceOuter",
  content: [
    ESTAgeninfo_htmlForm,
    LoopComponent,

    
    intermediateScreen,
    // > SAI
    //SAIpreKnowledge_htmlForm,
    SAITextClimate_htmlForm,
    SAITextTechnology_htmlForm,
    // > SR
    SRTextTechnology_htmlForm,
    // > NPP
    NPPTextTechnology_htmlForm,
    ESTAgeninfo_htmlForm,
    LoopComponent,
  ],
});

const OuterLoopComponent = new lab.flow.Loop({
  template: SequenceOuter,
  templateParameters: [
    {
      notneeded: 0,
    },
  ],
  sample: {
    mode: "draw-replace",
    n: "3",
  },
  indexParameter: "counter_outer",
});

/* 
################### ending phase ###################
*/
// feedback screen
const FeedbackScreen_htmlScreen = new lab.html.Form({
  title: "FeedbackScreen",
  content: textObj.feedbackQues,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

// ending screen
/*
 ` +
    "${TechnologyScenario}" +
    `
*/
const EndingScreen_htmlScreen = new lab.html.Screen({
  title: "EndingScreen",
  tardy: true,
  content: `
  <header>
  <h2> Thank you very much for your participation ! </h2>
  </header>

  <main>
  <div>
  <div>
  The technologies described in this study are at an early stage of development and it is not clear if such technologies will ever be deployed or used. 
  We only chose these examples to ask for your attitudes towards such emerging technologies with specific characteristics.
  </div>
  <br>
  <div>
  <i>The experiment will end in few seconds and you will be automatically redirected back to Prolific.</i> 
  <br>
  <br>
  <br>
  If you have any questions, please contact Julius Fenn (<a href="mailto:julius.fenn@psychologie.uni-freiburg.de">julius.fenn@psychologie.uni-freiburg.de</a>).
  </div>
  </main>
  `,
  timeout: 10000,
  messageHandlers: {
    run: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      //alert(numElementsCounter);
    },
    epilogue: function anonymous() {
      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("my result data sent to JATOS final time");
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));

        // then redirect
        if (
          study.options.datastore.extract("sender").includes("FeedbackScreen")
        ) {
          jatos.endStudyAndRedirect(
            "https://app.prolific.co/submissions/complete?cc=C1KCG103",
            true,
            "everything worked fine"
          );
        } else {
          alert(
            "It seems that you did not go through the entire study because you did not see the previous feedback screen."
          );
          jatos.abortStudy("study aborted - copied submission link");
        }
      }
    },
  },
});

// randomize questions:
/*
let QuestionsPost = {
  ques: ["quesCertaintySAI_htmlForm", "quesMoralIntensitySAI_htmlForm"],
  scale: ["1", "2"],
};
var index_QuestionsPost = shuffle(QuestionsPost);
console.log("index_QuestionsPost:", index_QuestionsPost);

    [
      quesCertaintySAI_htmlForm,
      quesMoralIntensitySAI_htmlForm,
    ][index_QuestionsPost[0]]
*/

// Define the sequence of components that define the study
const study = new lab.flow.Sequence({
  metadata: {
    title: "EFA study ESTA scale",
    description: "EFA study ESTA scale",
    repository: "",
    contributors: "Julius Fenn",
  },
  plugins: [
    new lab.plugins.Metadata(),
    //new lab.plugins.Fullscreen(),
    // new lab.plugins.Debug(), // comment out finally
    //new lab.plugins.Download()
  ],
  content: [ 
    Greetings_htmlForm, //
    InformConsent_htmlForm, //
    InformConsentNO_htmlForm, //
    ExclusionCriteria_htmlForm, //
    AttentionCheck_htmlForm,
    SetupStudy_htmlForm,
    OuterLoopComponent, //
    FeedbackScreen_htmlScreen, //
    EndingScreen_htmlScreen, //
  ],
});

// Start the study (uncomment to run)
if (typeof jatos.jQuery === "function") {
  jatos.onLoad(() => study.run());
} else {
  study.run();
}
