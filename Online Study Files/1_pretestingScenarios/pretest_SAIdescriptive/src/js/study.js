const numElements = 13;
var numElementsCounter = 0;

var URLparams;

var paracountclicks = 0;

var boolSkipAffectImg = true;

var items_quesAffectiveImagery;

/* introduction phase: */
const Greetings_htmlForm = new lab.html.Form({
  title: "Greetings",
  content: textObj.greetings,
  messageHandlers: {
    run: () => {
      // kick out participants who not using a computer screen
      if (typeof jatos.jQuery === "function") {
        if (study.state.meta.screen_height < 700 && study.state.meta.screen_width < 1000) {
          alert("It seems that your screen size you are using is smaller than 1000x700 pixels (height x width):\n" +
            "> your screen width: " + study.state.meta.screen_width + " your screen height: " + study.state.meta.screen_height +
            "\nStudy is aborted!")
          jatos.abortStudy("study aborted - screen to small");
        }
      }

    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = numElementsCounter / numElements * 100 + "%";

      // get URL params
      if (typeof jatos.jQuery === "function") {
        URLparams = jatos.urlQueryParameters;
        console.log("URLparams:", URLparams)
        console.log("type of URLparams:", typeof URLparams);

        if (typeof URLparams.PROLIFIC_PID === "undefined") {
          alert('Sorry, there may be a technical error! It was not possible to obtain all the necessary data from prolific. Please write to the study director that an error has occurred.')
          jatos.abortStudy("study aborted - no prolific ID");
        }else{
          study.options.datastore.set('PROLIFIC_PID', URLparams.PROLIFIC_PID);
        }
      }

    }
  }
})


const InformConsent_htmlForm = new lab.html.Form({
  title: "InformedConsent",
  content: textObj.informCon,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = numElementsCounter / numElements * 100 + "%";

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("result data sent to JATOS first time: ", resultJson);
        jatos.submitResultData(resultJson)
          .then(() => console.log('success'))
          .catch(() => console.log('error'));
      }
    }
  },
})

const InformConsentNO_htmlForm = new lab.html.Form({
  title: "InformedConsentNO",
  content: textObj.informConNo,
  tardy: true,
  skip: "${ study.state.dummy_informedconsent == 1}"
})

const ExclusionCriteria_htmlForm = new lab.html.Form({
  title: "ExclusionCriteria",
  content: textObj.exclusionCriteria,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = numElementsCounter / numElements * 100 + "%";
    }
  },
})


const SetupStudy_htmlForm = new lab.html.Form({
  title: "SetupStudy",
  content: textObj.setupStudy,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = numElementsCounter / numElements * 100 + "%";
    }
  },
})

const AffectiveImageryInst_htmlForm = new lab.html.Form({
  title: "AffectiveImageryInstruction",
  content: textObj.AffectiveImageryInst,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = numElementsCounter / numElements * 100 + "%";
    }
  },
})



/* Affective Imagery: */
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
          if (e.keyCode == 13) { // Enter key
            if (timesClicked <= 4) {
              $('#submitAssoButton').click()
              $(document).unbind("keypress");
              return false;
            }
            if (timesClicked == 5) {
              $('#finalResponse').click()
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
          if (document.querySelector(currentElement).value.replace(/[^a-zA-Z]+/g, '').length > 0) {
            // set skip to false: 
            boolSkipAffectImg = false;

            $("#unknownResponse").hide();
            $("#skipResponse").show();

            // change placeholder
            document.querySelector(nextElement).placeholder = "Enter your " + placeholderLabel[(
              timesClicked - 1)] + " association";
            // set disabled to true or false
            document.querySelector(currentElement).disabled = true;
            document.querySelector(nextElement).disabled = false;

            // adjust prograss bar of affective imagery
            document.querySelector(".progress-bar-AffectiveImg").style.width = timesClicked / 5 * 100 + "%";

            timesClicked++;

            if (timesClicked == 5) {
              $("#submitAssoButton").hide();
              $("#finalResponse").show();
            }
          } else {
            document.querySelector(currentElement).value = "";
            toastr.warning("Click on next response or Enter if you have entered a word.", "Please enter at least one word.", {
              closeButton: true,
              timeOut: 2000,
              positionClass: "toast-top-center",
              preventDuplicates: true
            })
          }
        })
      })
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = numElementsCounter / numElements * 100 + "%";
    }
  },
})



const AffectiveImageryAffect_htmlForm = new lab.html.Page({
  title: "AffectiveImageryAffect",
  tardy: true,
  skip: "${boolSkipAffectImg}",
  items: [{
    required: true,
    type: "likert",
    items: [{
        label: "${study.state.R1}",
        coding: "R1"
      },
      {
        label: "${study.state.R2}",
        coding: "R2"
      },
      {
        label: "${study.state.R3}",
        coding: "R3"
      },
      {
        label: "${study.state.R4}",
        coding: "R4"
      },
      {
        label: "${study.state.R5}",
        coding: "R5"
      }
    ],
    width: "7",
    anchors: [
      "very negative",
      "negative",
      "somewhat negative",
      "neutral",
      "somewhat positive",
      "positive",
      "very positive"
    ],
    label: `Please indicate to what extent you perceive your mentioned thoughts or images about <strong>Climate Engineering</strong> as positive or negative:`,
    help: "Read each of your thoughts or images and then mark the answer option that most applies.",
    shuffle: true,
    name: "affImgAffect"
  }],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"]
      document.querySelectorAll("main")[1].classList = ["w-xl"]
      document.querySelectorAll('.page-item-table colgroup')[0].innerHTML = `
      <col style=\"width: 65%\">
      <col style=\"width: 5%\">
      <col style=\"width: 5%\">
      <col style=\"width: 5%\">
      <col style=\"width: 5%\">
      <col style=\"width: 5%\">
      <col style=\"width: 5%\">
      <col style=\"width: 5%\">
      `

      // remove empty elements
      if ($('.page-item-table > tbody > tr > td')[32].innerText.length == 0) {
        $('.page-item-table > tbody > tr')[4].remove();
      }
      if ($('.page-item-table > tbody > tr > td')[24].innerText.length == 0) {
        $('.page-item-table > tbody > tr')[3].remove();
      }
      if ($('.page-item-table > tbody > tr > td')[16].innerText.length == 0) {
        $('.page-item-table > tbody > tr')[2].remove();
      }
      if ($('.page-item-table > tbody > tr > td')[8].innerText.length == 0) {
        $('.page-item-table > tbody > tr')[1].remove();
      }
      if ($('.page-item-table > tbody > tr > td')[0].innerText.length == 0) {
        $('.page-item-table > tbody > tr')[0].remove();
      }


      // collect paradata 
      paracountclicks = 0;
      document.querySelectorAll('input').forEach(item => {
        item.addEventListener('click', event => {
          paracountclicks++;
          console.log('input clicked', paracountclicks)
        })
      })
    },
    end: function anonymous() {
      // collect paradata 
      let numberitems = document.querySelectorAll('tbody tr').length;
      paracountclicks -= numberitems;
      study.options.datastore.set('para_countclicks', paracountclicks);
    }
  },
  commit: () => {
    // progress bar
    numElementsCounter++;
    document.querySelector(".progress-bar").style.width = numElementsCounter / numElements * 100 + "%";
  }
})



/* question pre: pre knowledge of SRM  */
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
      })
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = numElementsCounter / numElements * 100 + "%";


      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        jatos.submitResultData(resultJson)
          .then(() => console.log('success'))
          .catch(() => console.log('error'));
      }
    }
  },
})



/* scenario texts */
const ScenarioTextClimate_htmlForm = new lab.html.Form({
  title: "ScenarioTextClimate",
  content: textObj.scenarioText_climateChange,
  messageHandlers: {
    run: function anonymous() {
      document.querySelector('button').style.visibility = 'hidden';
      setTimeout(
        () => document.querySelector('button').style.visibility = 'visible',
        15000 // 15000 (15 seconds)
      )
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = numElementsCounter / numElements * 100 + "%";
    }
  },
})



const ScenarioTextTechnology_htmlForm = new lab.html.Form({
  title: "ScenarioTextTechnology",
  content: textObj.scenarioText_Technology,
  messageHandlers: {
    run: function anonymous() {
      document.querySelector('button').style.visibility = 'hidden';
      setTimeout(
        () => document.querySelector('button').style.visibility = 'visible',
        30000 // 30000 (30 seconds)
      )
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = numElementsCounter / numElements * 100 + "%";
    }
  },
})


/* question post: */
/* question pre: pre knowledge of SRM  */
const understandingText_htmlForm = new lab.html.Form({
  title: "understandingText",
  content: textObj.understandingText,
  messageHandlers: {
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = numElementsCounter / numElements * 100 + "%";


      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        jatos.submitResultData(resultJson)
          .then(() => console.log('success'))
          .catch(() => console.log('error'));
      }
    }
  },
})




const quesClearBiasSRM_htmlForm = new lab.html.Form({
  title: "quesClearBiasSRM",
  content: textObj.postClearBias,
  messageHandlers: {
    run: function anonymous() {
      $("#hideClearSAItext").hide();
      $("#hideBiasSAItext").hide();


      $("#clearSAI").on("input", () => {

        var tmpValue = $("#clearSAI option:selected")[0].value;

        if (tmpValue <= 2) {
          $("#hideClearSAItext").show();
        } else {
          $("#hideClearSAItext").hide();
        }
      })


      $("#biasSAI").on("input", () => {

        var tmpValue2 = $("#biasSAI option:selected")[0].value;

        if (tmpValue2 != 2) {
          $("#hideBiasSAItext").show();
        } else {
          $("#hideBiasSAItext").hide();
        }
      })
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = numElementsCounter / numElements * 100 + "%";

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        jatos.submitResultData(resultJson)
          .then(() => console.log('success'))
          .catch(() => console.log('error'));
      }
    }
  },
})


const quesCertaintySAI_htmlForm = new lab.html.Page({
  title: "quesCertaintySAI",
  items: [{
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
      "Strongly Agree"
    ],
    label: "Evaluate how confident you are in your opinion about stratospheric aerosol injection. ",
    help: "Read each of these statements and then mark the answer option that most applies.",
    shuffle: false,
    name: "certaintySAI"
  }],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"]
      document.querySelectorAll("main")[1].classList = ["w-xl"]
      document.querySelectorAll('.page-item-table colgroup')[0].innerHTML = `
     <col style=\"width: 65%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     `
      // collect paradata 
      paracountclicks = 0;
      document.querySelectorAll('input').forEach(item => {
        item.addEventListener('click', event => {
          paracountclicks++;
          console.log('input clicked', paracountclicks)
        })
      })
    },
    end: function anonymous() {
      // collect paradata 
      let numberitems = document.querySelectorAll('tbody tr').length;
      paracountclicks -= numberitems;
      study.options.datastore.set('para_countclicks', paracountclicks);
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = numElementsCounter / numElements * 100 + "%";
    }
  },
})


const quesMoralIntensitySAI_htmlForm = new lab.html.Page({
  title: "quesMoralIntensitySAI",
  items: [{
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
      "Strongly Agree"
    ],
    label: "Imagine that in a few years' time the world will be faced with the decision to deploy stratospheric aerosol injection (SAI). ",
    help: "Think about how you would feel in such a situation. Read each of these statements and then mark the answer option that most applies.",
    shuffle: false,
    name: "MoralIntensitySAI"
  }],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"]
      document.querySelectorAll("main")[1].classList = ["w-xl"]
      document.querySelectorAll('.page-item-table colgroup')[0].innerHTML = `
     <col style=\"width: 65%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     `
      // collect paradata 
      paracountclicks = 0;
      document.querySelectorAll('input').forEach(item => {
        item.addEventListener('click', event => {
          paracountclicks++;
          console.log('input clicked', paracountclicks)
        })
      })
    },
    end: function anonymous() {
      // collect paradata 
      let numberitems = document.querySelectorAll('tbody tr').length;
      paracountclicks -= numberitems;
      study.options.datastore.set('para_countclicks', paracountclicks);
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = numElementsCounter / numElements * 100 + "%";
    }
  },
})



/* ending screen */
const EndingScreen_htmlScreen = new lab.html.Screen({
  title: "EndingScreen",
  content: `
  <header>
  <h2> Thank you very much for your participation ! </h2>
  </header>

  <main>
  <div>
  <i>The experiment will end in few seconds and you will be automatically redirected back to Prolific.</i> 
  <br>
  <br>
  <br>
  If you have any questions, please contact Julius Fenn (<a href="mailto:julius.fenn@psychologie.uni-freiburg.de">julius.fenn@psychologie.uni-freiburg.de</a>).
  </div>
  </main>
  `,
  timeout: 6000,
  messageHandlers: {
    run: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = numElementsCounter / numElements * 100 + "%";
    },
    epilogue: function anonymous() {
      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("my result data sent to JATOS final time: ", resultJson);
        jatos.submitResultData(resultJson)
          .then(() => console.log('success'))
          .catch(() => console.log('error'));

        // then redirect
        jatos.endStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=22CC7AEC", true, "everything worked fine");
      }
    }
  },
})





// randomize questions:
let QuestionsPost = {
  ques: ["quesCertaintySAI_htmlForm", "quesClearBiasSRM_htmlForm", "quesMoralIntensitySAI_htmlForm"],
  scale: ["1", "2", "3"]
}
var index_QuestionsPost = shuffle(QuestionsPost);
console.log("index_QuestionsPost:", index_QuestionsPost)



// Define the sequence of components that define the study
const study = new lab.flow.Sequence({
  metadata: {
    title: "pretest SAI study",
    description: "pretest SAI study programmed on scratch",
    repository: "",
    contributors: "Julius Fenn"
  },
  plugins: [
    new lab.plugins.Metadata(),
    //new lab.plugins.Fullscreen(),
    //new lab.plugins.Debug(), // comment out finally
    //new lab.plugins.Download()
  ],
  content: [  
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
    understandingText_htmlForm,
    [quesCertaintySAI_htmlForm, quesClearBiasSRM_htmlForm, quesMoralIntensitySAI_htmlForm][index_QuestionsPost[0]],
    [quesCertaintySAI_htmlForm, quesClearBiasSRM_htmlForm, quesMoralIntensitySAI_htmlForm][index_QuestionsPost[1]],
    [quesCertaintySAI_htmlForm, quesClearBiasSRM_htmlForm, quesMoralIntensitySAI_htmlForm][index_QuestionsPost[2]],
    EndingScreen_htmlScreen,
  ],
})




// Start the study (uncomment to run)
if (typeof jatos.jQuery === "function") {
  jatos.onLoad(() => study.run());
} else {
  study.run();
}