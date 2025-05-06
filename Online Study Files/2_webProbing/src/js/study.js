/* Technology under investigation */
const TechnologyScenario = "Stratospheric Aerosol Injection";
const AffectiveImageryTechnology = "Climate Engineering";
/* number of components / elements to set slider */
const numElements = 31;
var numElementsCounter = 0;
/* general global variables */
var URLparams;
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
        URLparams = jatos.urlQueryParameters;
        console.log("URLparams:", URLparams);

        // check if a prolific ID is provided via URL parameter
        if (typeof URLparams.PROLIFIC_PID === "undefined") {
          alert(
            "Sorry, there may be a technical error! It was not possible to obtain all the necessary data from prolific. Please write to the study director that an error has occurred."
          );
          jatos.abortStudy("study aborted - no prolific ID");
        } else {
          study.options.datastore.set("PROLIFIC_PID", URLparams.PROLIFIC_PID);
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
        console.log("result data sent to JATOS first time: ", resultJson);
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

const SetupStudy_htmlForm = new lab.html.Form({
  title: "SetupStudy",
  content: textObj.setupStudy,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

/* 
Affective Imagery: 
*/
var boolSkipAffectImg = true;

const AffectiveImageryInst_htmlForm = new lab.html.Form({
  title: "AffectiveImageryInstruction",
  content: textObj.AffectiveImageryInst,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const AffectiveImagery_htmlForm = new lab.html.Form({
  title: "AffectiveImagery",
  content: textObj.AffectiveImagery,
  messageHandlers: {
    run: () => {
      var timesClicked = 1;
      const placeholderLabel = ["second", "third", "fourth", "fifth"];

      $(function () {
        $("#skipResponse").hide();
        $("#finalResponse").hide();

        // restrict keydown event to affectiveImageryForm
        $("#affectiveImageryForm").keydown(function (e) {
          if (e.keyCode == 13) {
            // Enter key
            if (timesClicked <= 4) {
              $("#submitAssoButton").click();
              $(document).unbind("keypress");
              return false;
            }
            if (timesClicked == 5) {
              $("#finalResponse").click();
              return false;
            }
          }
        });

        //$(document).on('#finalResponse mouseout',".click", () => {
        $("#submitAssoButton").on("click", () => {
          // increase counter

          var currentElement = "#R" + timesClicked;
          var nextElement = "#R" + (timesClicked + 1);

          // only if letters entered continue
          if (
            document
              .querySelector(currentElement)
              .value.replace(/[^a-zA-Z]+/g, "").length > 0
          ) {
            // set skip to false:
            boolSkipAffectImg = false;

            $("#unknownResponse").hide();
            $("#skipResponse").show();

            // change placeholder
            document.querySelector(nextElement).placeholder =
              "Enter your " +
              placeholderLabel[timesClicked - 1] +
              " association";
            // set disabled to true or false
            document.querySelector(currentElement).disabled = true;
            document.querySelector(nextElement).disabled = false;

            // adjust prograss bar of affective imagery
            document.querySelector(".progress-bar-AffectiveImg").style.width =
              (timesClicked / 5) * 100 + "%";

            timesClicked++;

            if (timesClicked == 5) {
              $("#submitAssoButton").hide();
              $("#finalResponse").show();
            }
          } else {
            document.querySelector(currentElement).value = "";
            toastr.warning(
              "Click on next response or Enter if you have entered a word (use letters).",
              "Please enter at least one word or unknow if you do not know the word.",
              {
                closeButton: true,
                timeOut: 3000,
                positionClass: "toast-top-center",
                preventDuplicates: true,
              }
            );
          }
        });
      });
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const AffectiveImageryAffect_htmlForm = new lab.html.Page({
  title: "AffectiveImageryAffect",
  tardy: true,
  skip: "${boolSkipAffectImg}",
  items: [
    {
      required: true,
      type: "likert",
      items: [
        {
          label: "${study.state.R1}",
          coding: "R1",
        },
        {
          label: "${study.state.R2}",
          coding: "R2",
        },
        {
          label: "${study.state.R3}",
          coding: "R3",
        },
        {
          label: "${study.state.R4}",
          coding: "R4",
        },
        {
          label: "${study.state.R5}",
          coding: "R5",
        },
      ],
      width: "7",
      anchors: [
        "very negative",
        "negative",
        "somewhat negative",
        "neutral",
        "somewhat positive",
        "positive",
        "very positive",
      ],
      label: `Please indicate to what extent you perceive your mentioned thoughts or images about <strong>Climate Engineering</strong> as positive or negative:`,
      help: "Read each of your thoughts or images and then mark the answer option that most applies.",
      shuffle: true,
      name: "affImgAffect",
    },
  ],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
      <col style=\"width: 65%\">
      <col style=\"width: 5%\">
      <col style=\"width: 5%\">
      <col style=\"width: 5%\">
      <col style=\"width: 5%\">
      <col style=\"width: 5%\">
      <col style=\"width: 5%\">
      <col style=\"width: 5%\">
      `;

      // remove empty elements
      if ($(".page-item-table > tbody > tr > td")[32].innerText.length == 0) {
        $(".page-item-table > tbody > tr")[4].remove();
      }
      if ($(".page-item-table > tbody > tr > td")[24].innerText.length == 0) {
        $(".page-item-table > tbody > tr")[3].remove();
      }
      if ($(".page-item-table > tbody > tr > td")[16].innerText.length == 0) {
        $(".page-item-table > tbody > tr")[2].remove();
      }
      if ($(".page-item-table > tbody > tr > td")[8].innerText.length == 0) {
        $(".page-item-table > tbody > tr")[1].remove();
      }
      if ($(".page-item-table > tbody > tr > td")[0].innerText.length == 0) {
        $(".page-item-table > tbody > tr")[0].remove();
      }

      // collect paradata
      paracountclicks = 0;
      document.querySelectorAll("input").forEach((item) => {
        item.addEventListener("click", (event) => {
          paracountclicks++;
          console.log("input clicked", paracountclicks);
        });
      });
    },
    end: function anonymous() {
      // collect paradata
      let numberitems = document.querySelectorAll("tbody tr").length;
      paracountclicks -= numberitems;
      study.options.datastore.set("para_countclicks", paracountclicks);
    },
  },
  commit: () => {
    // progress bar
    numElementsCounter++;
    document.querySelector(".progress-bar").style.width =
      (numElementsCounter / numElements) * 100 + "%";
  },
});

/* 
question pre: pre knowledge of SRM  
*/
const preKnowledgeSRM_htmlForm = new lab.html.Form({
  title: "preKnowledgeSRM",
  content: textObj.preKnowledge,
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
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

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

/* 
scenario texts 
*/
const ScenarioTextClimate_htmlForm = new lab.html.Form({
  title: "ScenarioTextClimate",
  content: textObj.scenarioText_climateChange,
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
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const ScenarioTextTechnology_htmlForm = new lab.html.Form({
  title: "ScenarioTextTechnology",
  content: textObj.scenarioText_Technology,
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
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

/* 
Web Probing - Loop 
*/
var lastValue = undefined;

const QuestionESTA = new lab.html.Form({
  title: "QuestionESTA",
  content: textObj.QuestionESTAText, // FirstQuesComponentText,
  //timeout: 1000,
  messageHandlers: {
    run: () => {
      // console.log("Component run");
      // save index values of ESTA:
      study.options.datastore.set("index_ESTA", index_ESTA);
    },
    commit: () => {
      lastValue = $("#tablerandom input[type='radio']:checked").val();
      console.log("Component commited - last value:", lastValue);

      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      // save data at 3th and 7th round
      if (study.state.counter % 3 == 0 && study.state.counter != 0) {
        if (typeof jatos.jQuery === "function") {
          // If JATOS is available, send data there
          var resultJson = study.options.datastore.exportJson();
          console.log("result data sent to JATOS time: ", resultJson);
          jatos
            .submitResultData(resultJson)
            .then(() => console.log("success"))
            .catch(() => console.log("error"));
        }
      }
    },
  },
});

const FirstQuesComponent = new lab.html.Form({
  title: "FirstQuesComponent",
  tardy: true,
  content: textObj.FirstQuesComponentText,
  //timeout: 1000,
  messageHandlers: {
    run: () => {
      $("#setLastValue")[0].textContent = lastValue;
      //$("#setLastValue2")[0].textContent = lastValue;
      $("#setLeft")[0].textContent = ESTA[index_ESTA[study.state.counter]].left;
      $("#setRight")[0].textContent =
        ESTA[index_ESTA[study.state.counter]].right;

      // set technology:
      console.log(
        "ESTA[index_ESTA[study.state.counter]].scale",
        ESTA[index_ESTA[study.state.counter]].scale
      );
      study.options.datastore.set(
        "p_item",
        ESTA[index_ESTA[study.state.counter]].scale
      );
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
    "after:end": () => {
      console.log("dur", study.options.datastore.get("duration"));
      evalprobeanswer(); // EvalAnswers!
      if (_p_ask) {
        study.options.datastore.set("p_code", _p_code);
        study.options.datastore.set("p_ask_content", _p_ask_content);
      }
    },
  },
});

const FirstQuesComponentAgain = new lab.html.Form({
  title: "FirstQuesComponentAgain",
  tardy: true,
  skip: "${ !_p_ask }", // "${ this.parameters.counter % 2 == 0 }",
  content: textObj.FirstQuesComponentTextAgain,
  //timeout: 1000,
  messageHandlers: {
    run: () => {
      $("#setHeader")[0].textContent = _p_ask_content;
      $("#setLastValue")[0].textContent = lastValue;
      $("#setLeft")[0].textContent = ESTA[index_ESTA[study.state.counter]].left;
      $("#setRight")[0].textContent =
        ESTA[index_ESTA[study.state.counter]].right;
    },
    end: () => {
      console.log("Component ended");
    },
  },
});

const SecondQuesComponent = new lab.html.Form({
  title: "SecondQuesComponent",
  tardy: true,
  content: textObj.SecondQuesComponentText,
  //timeout: 1000,
  messageHandlers: {
    run: () => {
      $("#setProbe")[0].innerHTML = ESTA[index_ESTA[study.state.counter]].probe;
      $("#setLastValue")[0].textContent = lastValue;
      $("#setLeft")[0].textContent = ESTA[index_ESTA[study.state.counter]].left;
      $("#setRight")[0].textContent =
        ESTA[index_ESTA[study.state.counter]].right;
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
    "after:end": () => {
      console.log("dur", study.options.datastore.get("duration"));
      evalprobeanswer(); // EvalAnswers!
      if (_p_ask) {
        study.options.datastore.set("p_code", _p_code);
        study.options.datastore.set("p_ask_content", _p_ask_content);
      }
    },
  },
});

const SecondQuesComponentAgain = new lab.html.Form({
  title: "SecondQuesComponentAgain",
  tardy: true,
  skip: "${ !_p_ask }", // "${ this.parameters.counter % 2 == 0 }",
  content: textObj.SecondQuesComponentTextAgain,
  //timeout: 1000,
  messageHandlers: {
    run: () => {
      $("#setHeader")[0].textContent = _p_ask_content;
      $("#setLastValue")[0].textContent = lastValue;
      $("#setLeft")[0].textContent = ESTA[index_ESTA[study.state.counter]].left;
      $("#setRight")[0].textContent =
        ESTA[index_ESTA[study.state.counter]].right;
      $("#setProbe")[0].innerHTML = ESTA[index_ESTA[study.state.counter]].probe;
    },
    end: () => {
      console.log("Component ended");
    },
  },
});

const SequenceComponent = new lab.flow.Sequence({
  title: "Sequence",
  content: [
    QuestionESTA,
    FirstQuesComponent,
    FirstQuesComponentAgain,
    SecondQuesComponent,
    SecondQuesComponentAgain,
  ],
});

const LoopComponent = new lab.flow.Loop({
  template: SequenceComponent,
  templateParameters: [
    {
      notneeded: 0,
    },
  ],
  sample: {
    mode: "draw-replace",
    n: "7",
  },
  indexParameter: "counter",
});


/* 
feedback screen 
*/
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



/* 
ending screen 

HomeTec is a purely fictitious company and there is no such technology as the HomeMate. We only chose this example to ask for your attitudes towards such a fictitious technology with specific properties. 
*/
const EndingScreen_htmlScreen = new lab.html.Screen({
  title: "EndingScreen",
  content:
    `
  <header>
  <h2> Thank you very much for your participation ! </h2>
  </header>

  <main>
  <div>
  <div>
  ` +
    "${TechnologyScenario}" +
    ` is a technology at an early stage of development and it is not clear if such a technology will ever be deployed. We only chose this example to ask for your attitudes towards such a emerging technology with specific properties. 
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
        console.log("my result data sent to JATOS final time"); // resultJson
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));

        // then redirect
        if(study.options.datastore.extract("sender").includes("FeedbackScreen")){
          jatos.endStudyAndRedirect(
            "https://app.prolific.co/submissions/complete?cc=CSWUVDXK",
            true,
            "everything worked fine"
          );
        }else{
          alert(
            "It seems that you did not go through the entire study because you did not see the previous feedback screen."
          );
          jatos.abortStudy("study aborted - copied submission link");
        }
      }
    },
  },
});

/* 
question post: 
- certainty judgement
- moral intensity
*/
const quesCertaintySAI_htmlForm = new lab.html.Page({
  title: "quesCertaintySAI",
  items: [
    {
      required: true,
      type: "likert",
      items: items_quesUncertaintySAI,
      width: "7",
      anchors: [
        "Strongly Disagree",
        "Disagree",
        "Somewhat Disagree",
        "Neutral",
        "Somewhat Agree",
        "Agree",
        "Strongly Agree",
      ],
      label:
        "Evaluate how confident you are in your opinion about stratospheric aerosol injection. ",
      help: "Read each of these statements and then mark the answer option that most applies.",
      shuffle: false,
      name: "certaintySAI",
    },
  ],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
     <col style=\"width: 65%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     `;
      // collect paradata
      paracountclicks = 0;
      document.querySelectorAll("input").forEach((item) => {
        item.addEventListener("click", (event) => {
          paracountclicks++;
          console.log("input clicked", paracountclicks);
        });
      });
    },
    end: function anonymous() {
      // collect paradata
      let numberitems = document.querySelectorAll("tbody tr").length;
      paracountclicks -= numberitems;
      study.options.datastore.set("para_countclicks", paracountclicks);
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const quesMoralIntensitySAI_htmlForm = new lab.html.Page({
  title: "quesMoralIntensitySAI",
  items: [
    {
      required: true,
      type: "likert",
      items: items_quesMoralIntensitySAI,
      width: "7",
      anchors: [
        "Strongly Disagree",
        "Disagree",
        "Somewhat Disagree",
        "Neutral",
        "Somewhat Agree",
        "Agree",
        "Strongly Agree",
      ],
      label:
        "Imagine that in a few years' time the world will be faced with the decision to deploy stratospheric aerosol injection (SAI). ",
      help: "Think about how you would feel in such a situation. Read each of these statements and then mark the answer option that most applies.",
      shuffle: false,
      name: "MoralIntensitySAI",
    },
  ],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
     <col style=\"width: 65%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     `;
      // collect paradata
      paracountclicks = 0;
      document.querySelectorAll("input").forEach((item) => {
        item.addEventListener("click", (event) => {
          paracountclicks++;
          console.log("input clicked", paracountclicks);
        });
      });
    },
    end: function anonymous() {
      // collect paradata
      let numberitems = document.querySelectorAll("tbody tr").length;
      paracountclicks -= numberitems;
      study.options.datastore.set("para_countclicks", paracountclicks);
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

// randomize questions:
let QuestionsPost = {
  ques: ["quesCertaintySAI_htmlForm", "quesMoralIntensitySAI_htmlForm"],
  scale: ["1", "2"],
};
var index_QuestionsPost = shuffle(QuestionsPost);
console.log("index_QuestionsPost:", index_QuestionsPost);

// Define the sequence of components that define the study
const study = new lab.flow.Sequence({
  metadata: {
    title: "web probing SAI narrative",
    description: "web probing SAI narrative",
    repository: "",
    contributors: "Julius Fenn",
  },
  plugins: [
    new lab.plugins.Metadata(),
    //new lab.plugins.Fullscreen(),
    //new lab.plugins.Debug(), // comment out finally
    //new lab.plugins.Download()
  ],
  content: [ 
    LoopComponent,

    Greetings_htmlForm,
    InformConsent_htmlForm,
    InformConsentNO_htmlForm,
    ExclusionCriteria_htmlForm,
    SetupStudy_htmlForm,
    AffectiveImageryInst_htmlForm,
    AffectiveImagery_htmlForm,
    AffectiveImageryAffect_htmlForm,
    preKnowledgeSRM_htmlForm,
    ScenarioTextClimate_htmlForm,
    ScenarioTextTechnology_htmlForm,
    LoopComponent,
    FeedbackScreen_htmlScreen,
    EndingScreen_htmlScreen,

    /*
    [
      quesCertaintySAI_htmlForm,
      quesMoralIntensitySAI_htmlForm,
    ][index_QuestionsPost[0]],
    [
      quesCertaintySAI_htmlForm,
      quesMoralIntensitySAI_htmlForm,
    ][index_QuestionsPost[1]],
    */
  ],
});

// Start the study (uncomment to run)
if (typeof jatos.jQuery === "function") {
  jatos.onLoad(() => study.run());
} else {
  study.run();
}
