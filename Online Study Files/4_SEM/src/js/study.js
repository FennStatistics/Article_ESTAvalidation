function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf("?") !== -1 ? "&" : "?";

  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}

const Required_Testing = true;

/* number of components / elements to set slider */
const numElements = 42;
var numElementsCounter = 0;
/* general global variables */
var URLparams_global;

var paracountclicks = 0;

var TechnologyScenario = "Stratospheric Aerosol Injection"; // placeholder for technology name

/* 
################### introduction phase ###################
*/
const Greetings_htmlForm = new lab.html.Form({
  title: "Greetings",
  content: textObj.greetings,
  messageHandlers: {
    run: function anonymous() {
      if (typeof jatos.jQuery === "function") {
        if (
          study.state.meta.screen_height < 700 &&
          study.state.meta.screen_width < 1200
        ) {
          alert(
            "It seems that your screen size you are using is smaller than 1200x700 pixels (height x width):\n" +
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

        // check if a prolific ID is provided via URL parameter PROLIFIC study
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

const InformCon_htmlForm = new lab.html.Form({
  title: "InformedConsent",
  content: textObj.informCon,
  messageHandlers: {
    commit: function anonymous() {
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
  messageHandlers: {
    run: function anonymous() {
      // progress bar
      document.querySelector(".progress-bar").style.width = 100 + "%";
    },
  },
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
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("result data sent to JATOS second time");
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));
      }
    },
  },
});

/* 
################### scenario texts phase  ###################
*/
// >>> SAI
const SAIpreKnowledge_htmlForm = new lab.html.Form({
  title: "SAIpreKnowledge",
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

const SAITextClimate_htmlForm = new lab.html.Form({
  title: "SAITextClimate",
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
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const SAITextTechnology_htmlForm = new lab.html.Form({
  title: "SAITextTechnology",
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
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

/* 
################### generic ESTA question ###################
*/
const GenericEthicQuestion_htmlForm = new lab.html.Form({
  title: "GenericEthicQuestion",
  content: textObj.GenericEthicQuestion,
  messageHandlers: {
    run: function anonymous() {
      document.querySelector("button").style.visibility = "hidden";
      setTimeout(
        () => (document.querySelector("button").style.visibility = "visible"),
        60000 // 60000 (60 seconds)
      );
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
################### scale phase ###################
*/

/* PANAS */
const LikertPANAS1_htmlForm = new lab.html.Page({
  title: "PANAS 1",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_quespanas.slice(0, 10),
      width: "5",
      anchors: [
        "very slightly or not at all",
        "a little",
        "moderately",
        "quite a bit",
        "very much",
      ],
      label:
        "In the following you see a scale that consists of different feelings and emotions. Please rate how you are feeling when thinking about the ${TechnologyScenario} technology.",
      help: "Please answer every statement, even if you are not completely sure of your response.",
      shuffle: false,
      name: "panas",
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
      <col style=\"width: 10%\">
      <col style=\"width: 18%\">
      <col style=\"width: 18%\">
      <col style=\"width: 18%\">
      <col style=\"width: 18%\">
      <col style=\"width: 18%\">
      `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
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

const LikertPANAS2_htmlForm = new lab.html.Page({
  title: "PANAS 2",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_quespanas.slice(10, 20),
      width: "5",
      anchors: [
        "very slightly or not at all",
        "a little",
        "moderately",
        "quite a bit",
        "very much",
      ],
      label:
        "In the following you see a scale that consists of different feelings and emotions. Please rate how you are feeling when thinking about the ${TechnologyScenario} technology.",
      help: "Please answer every statement, even if you are not completely sure of your response.",
      shuffle: false,
      name: "panas",
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
      <col style=\"width: 10%\">
      <col style=\"width: 18%\">
      <col style=\"width: 18%\">
      <col style=\"width: 18%\">
      <col style=\"width: 18%\">
      <col style=\"width: 18%\">
      `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
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

const PANAS_sequence = new lab.flow.Sequence({
  title: "PANAS Sequence",
  content: [LikertPANAS1_htmlForm, LikertPANAS2_htmlForm],
});

/* HEXACO */
const LikertHEXACO1_htmlForm = new lab.html.Page({
  title: "HEXACO 1",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_HEXACO.slice(0, 10),
      width: "5",
      anchors: [
        "strongly disagree",
        "disagree",
        "neutral (neither agree nor disagree)",
        "agree",
        "strongly agree",
      ],
      label:
        "In the following you will find a series of statements about <b>you</b>. Please read each statement and decide how much you agree or disagree with that statement.",
      help: "Please answer every statement, even if you are not completely sure of your response.",
      shuffle: false,
      name: "HEXACO",
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
      <col style=\"width: 40%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
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

const LikertHEXACO2_htmlForm = new lab.html.Page({
  title: "HEXACO 2",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_HEXACO.slice(10, 20),
      width: "5",
      anchors: [
        "strongly disagree",
        "disagree",
        "neutral (neither agree nor disagree)",
        "agree",
        "strongly agree",
      ],
      label:
        "In the following you will find further series of statements about you. Please read each statement and decide how much you agree or disagree with that statement.",
      help: "Please answer every statement, even if you are not completely sure of your response.",
      shuffle: false,
      name: "HEXACO",
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
      <col style=\"width: 40%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
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

const LikertHEXACO3_htmlForm = new lab.html.Page({
  title: "HEXACO 3",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_HEXACO.slice(20, 30),
      width: "5",
      anchors: [
        "strongly disagree",
        "disagree",
        "neutral (neither agree nor disagree)",
        "agree",
        "strongly agree",
      ],
      label:
        "In the following you will find further series of statements about you. Please read each statement and decide how much you agree or disagree with that statement.",
      help: "Please answer every statement, even if you are not completely sure of your response.",
      shuffle: false,
      name: "HEXACO",
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
      <col style=\"width: 40%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
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

const LikertHEXACO4_htmlForm = new lab.html.Page({
  title: "HEXACO 4",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_HEXACO.slice(30, 40),
      width: "5",
      anchors: [
        "strongly disagree",
        "disagree",
        "neutral (neither agree nor disagree)",
        "agree",
        "strongly agree",
      ],
      label:
        "In the following you will find further series of statements about you. Please read each statement and decide how much you agree or disagree with that statement.",
      help: "Please answer every statement, even if you are not completely sure of your response.",
      shuffle: false,
      name: "HEXACO",
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
      <col style=\"width: 40%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
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

const LikertHEXACO5_htmlForm = new lab.html.Page({
  title: "HEXACO 5",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_HEXACO.slice(40, 50),
      width: "5",
      anchors: [
        "strongly disagree",
        "disagree",
        "neutral (neither agree nor disagree)",
        "agree",
        "strongly agree",
      ],
      label:
        "In the following you will find further series of statements about you. Please read each statement and decide how much you agree or disagree with that statement.",
      help: "Please answer every statement, even if you are not completely sure of your response.",
      shuffle: false,
      name: "HEXACO",
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
      <col style=\"width: 40%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
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

const LikertHEXACO6_htmlForm = new lab.html.Page({
  title: "HEXACO 6",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_HEXACO.slice(50, 60),
      width: "5",
      anchors: [
        "strongly disagree",
        "disagree",
        "neutral (neither agree nor disagree)",
        "agree",
        "strongly agree",
      ],
      label:
        "In the following you will find the final series of statements about you. Please read each statement and decide how much you agree or disagree with that statement.",
      help: "Please answer every statement, even if you are not completely sure of your response.",
      shuffle: false,
      name: "HEXACO",
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
      <col style=\"width: 40%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      <col style=\"width: 12%\">
      `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
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

const HEXACO_sequence = new lab.flow.Sequence({
  title: "HEXACO Sequence",
  content: [
    LikertHEXACO1_htmlForm,
    LikertHEXACO2_htmlForm,
    LikertHEXACO3_htmlForm,
    LikertHEXACO4_htmlForm,
    LikertHEXACO5_htmlForm,
    LikertHEXACO6_htmlForm,
  ],
});

/* Acceptability */
const LikertAcceptability1_htmlForm = new lab.html.Page({
  title: "Acceptability 1",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_acceptability.slice(0, 8),
      width: "6",
      anchors: [
        "Strongly Oppose",
        "Oppose",
        "Somewhat Oppose",
        "Somewhat Support",
        "Support",
        "Strongly Support",
      ],
      label:
        "In the following you see a scale that consists of different statements regarding the possible support of the Stratospheric Aerosol Injection (SAI) technology. Please indicate if you would support or oppose the SAI technology regarding the different statements.",
      help: "Please answer every statement, even if you are not completely sure of your response.",
      shuffle: false,
      name: "acceptability",
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
`;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
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

const LikertAcceptability2_htmlForm = new lab.html.Page({
  title: "Acceptability 2",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_acceptability.slice(8, 16),
      width: "6",
      anchors: [
        "Strongly Oppose",
        "Oppose",
        "Somewhat Oppose",
        "Somewhat Support",
        "Support",
        "Strongly Support",
      ],
      label:
        "In the following you see a scale that consists of different statements regarding the possible support of the Stratospheric Aerosol Injection (SAI) technology. Please indicate if you would support or oppose the SAI technology regarding the different statements.",
      help: "Please answer every statement, even if you are not completely sure of your response.",
      shuffle: false,
      name: "acceptability",
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
`;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
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


const LikertAcceptabilityScenarios_htmlForm = new lab.html.Page({
  title: "AcceptabilityScenarios",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_acceptabilitySecenarioslist,
      width: "6",
      anchors: [
        "Strongly Oppose",
        "Oppose",
        "Somewhat Oppose",
        "Somewhat Support",
        "Support",
        "Strongly Support",
      ],
      label:
        "In the following you can see a scale that shows possible types of research and deployment of the Stratospheric Aerosol Injection (SAI) technology <b>under different circumstances</b>. Please indicate whether you would support or oppose the technology under which circumstances.",
      help: "Please answer every statement, even if you are not completely sure of your response.",
      shuffle: false,
      name: "AcceptabilityScenarios",
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
`;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
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

const Acceptability_sequence = new lab.flow.Sequence({
  title: "Acceptability Sequence",
  content: [LikertAcceptability1_htmlForm, LikertAcceptability2_htmlForm, LikertAcceptabilityScenarios_htmlForm],
});

/* Acceptability */
const LikertRiskBenefit_htmlForm = new lab.html.Page({
  title: "RiskBenefit",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_riskBenefit,
      width: "6",
      anchors: [
        "Strongly Disagree",
        "Disagree",
        "Somewhat Disagree",
        "Somewhat Agree",
        "Agree",
        "Strongly Agree",
      ],
      label:
        "In the following you see a scale that consists of different statements regarding the possible risks and benefits of the Stratospheric Aerosol Injection technology. Please indicate the extent to which you would agree with the following statements.",
      help: "Please answer every statement, even if you are not completely sure of your response.",
      shuffle: false,
      name: "RiskBenefit",
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
     `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
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

/* Trust */
const LikertTrust_htmlForm = new lab.html.Page({
  title: "Trust",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_trust,
      width: "11",
      anchors: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      label:
        "In the following you see a scale that consists of different institutions or groups of people. Please mark on a score of 0-10 how much <b>you personally trust</b> each of them.",
      help: "Please answer every statement, even if you are not completely sure of your response. 0 means you do not trust an institution at all, and 10 means you have complete trust.",
      shuffle: false,
      name: "trust",
    },
  ],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // add top labels
      $(".page-item-table").before(
        $(`
<span style="margin-left: 34%; display: inline-block; width: 80px; font-size: 14px;">
No trust at all (0)
</span>
<span style="float: right; display: inline-block; width: 60px; font-size: 14px;">
Complete trust (10)
</span>
      `)
      );
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
      <col style=\"width: 34%\">
      <col style=\"width: 6%\">
      <col style=\"width: 6%\">
      <col style=\"width: 6%\">
      <col style=\"width: 6%\">
      <col style=\"width: 6%\">
      <col style=\"width: 6%\">
      <col style=\"width: 6%\">
      <col style=\"width: 6%\">
      <col style=\"width: 6%\">
      <col style=\"width: 6%\">
      <col style=\"width: 6%\">
      `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");

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

/* ESTA */
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


      // progress bar
      if(!skipESTAgeninfo){
        numElementsCounter++;
        document.querySelector(".progress-bar").style.width =
          (numElementsCounter / numElements) * 100 + "%";
      }

            // show this element only once
            skipESTAgeninfo = true;

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
      document.querySelectorAll("div")[0].classList = ["text-center"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
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
        itemName = activeESTA[index_activeESTA[i - 1]].scale;

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

      // sticky labels to front
      $("thead").first().css("z-index", "20");
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
        EthicTheories[index_EthicTheories[GlobalCounter]].itemID
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

const SequenceInner = new lab.flow.Sequence({
  title: "SequenceInner",
  content: [
    // general info
    ESTAgeninfo_htmlForm,
    // ESTA
    ESTAtheorydefinition,
    ESTAscale,
  ],
});

const ESTALoopComponent = new lab.flow.Loop({
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

/* moral harzard */
const MoralHarzardSAI_htmlForm = new lab.html.Page({
  title: "MoralHarzardSAI",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_quesMoralHarzard,
      width: "6",
      anchors: [
        "Strongly Disagree",
        "Disagree",
        "Somewhat Disagree",
        "Somewhat Agree",
        "Agree",
        "Strongly Agree",
      ],
      label:
        "In the following you see a scale that consists of two statements regarding the possible effect of the Stratospheric Aerosol Injection (SAI) technology on actions to limit global warming. Please indicate the extent to which <b>you</b> would agree with the following statements.",
      help: "Please answer every statement, even if you are not completely sure of your response.",
      shuffle: false,
      name: "MoralHarzardSAI",
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
     `;
           // sticky labels to front
           $("thead").first().css("z-index", "20");
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

/* Tampering with nature */
const TamperingWithNature_htmlForm = new lab.html.Page({
  title: "TamperingWithNature",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_quesTamperingWithNature,
      width: "6",
      anchors: [
        "Strongly Disagree",
        "Disagree",
        "Somewhat Disagree",
        "Somewhat Agree",
        "Agree",
        "Strongly Agree",
      ],
      label:
        "In the following you see a scale that consists of four statements regarding the relation of the Stratospheric Aerosol Injection (SAI) technology with nature. Please indicate the extent to which <b>you</b> would agree with the following statements.",
      help: "Please answer every statement, even if you are not completely sure of your response.",
      shuffle: false,
      name: "TamperingWithNature",
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
     `;
           // sticky labels to front
           $("thead").first().css("z-index", "20");
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

/* Climate Change Concern */
const ClimateChangeConcern_htmlForm = new lab.html.Page({
  title: "ClimateChangeConcern",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_quesClimateChangeConcern,
      width: "6",
      anchors: [
        "Strongly Disagree",
        "Disagree",
        "Somewhat Disagree",
        "Somewhat Agree",
        "Agree",
        "Strongly Agree",
      ],
      label:
        "In the following you see a scale that consists of seven statements regarding your climate change concern. Please indicate the extent to which <b>you</b> would agree with the following statements.",
      help: "Please answer every statement, even if you are not completely sure of your response.",
      shuffle: false,
      name: "ClimateChangeConcern",
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
     `;
           // sticky labels to front
           $("thead").first().css("z-index", "20");
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

// >>>> ALL SCALES
const SCALES_sequence = new lab.flow.Sequence({
  title: "SCALES Sequence",
  shuffle: true,
  content: [
    Acceptability_sequence,
    LikertRiskBenefit_htmlForm,
    PANAS_sequence,
    LikertTrust_htmlForm,
    ESTALoopComponent,
    HEXACO_sequence,
    // new
    ClimateChangeConcern_htmlForm,
    TamperingWithNature_htmlForm,
    MoralHarzardSAI_htmlForm,
  ],
});

/* certainty opinon on SAI */
const quesCertaintySAI_htmlForm = new lab.html.Page({
  title: "quesCertaintySAI",
  items: [
    {
      required: Required_Testing,
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
      help: "Please answer every statement, even if you are not completely sure of your response.",
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

/* 
################### ending phase ###################
*/
/* questions: socio demographic  */
const QuesSocioDemo_htmlForm = new lab.html.Form({
  title: "QuesSocioDemo",
  content: textObj.socioDemo,
  messageHandlers: {
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

  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">
  <div>
  The technology described in this study is at an early stage of development and it is not clear if such a technology will ever be deployed or used. 
  We only chose this example to ask for your attitudes towards such an emerging technology with specific characteristics.
  </div>
  <br>
  <div>
  <i>The experiment will end in few seconds and you will be automatically redirected back to Prolific.</i> 
  <br>
  <br>
  <br>
  If you have any questions, please contact the study director Julius Fenn (<a href="mailto:julius.fenn@psychologie.uni-freiburg.de">julius.fenn@psychologie.uni-freiburg.de</a>).
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

      // alert(numElementsCounter);
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
            "https://app.prolific.co/submissions/complete?cc=C1I8SXIJ", // !!!
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

// Define the sequence of components that define the study
const study = new lab.flow.Sequence({
  metadata: {
    title: "SAI Main Study",
    description: "SAI Main Study",
    repository: "",
    contributors: "Julius Fenn",
  },
  plugins: [
    new lab.plugins.Metadata(),
    //new lab.plugins.Fullscreen(),
    // new lab.plugins.Debug(), // comment out finally
    // new lab.plugins.Download()
  ],
  content: [
        SAIpreKnowledge_htmlForm,
        
    ESTAgeninfo_htmlForm,
    GenericEthicQuestion_htmlForm, // blocked for one minute



    SAIpreKnowledge_htmlForm,
    AffectiveImageryInst_htmlForm,
    AffectiveImagery_htmlForm,
    AffectiveImageryAffect_htmlForm,
    
    SAITextClimate_htmlForm,
    SAITextTechnology_htmlForm,


    AffectiveImageryInst_htmlForm,
    AffectiveImagery_htmlForm,
    AffectiveImageryAffect_htmlForm,
    
    InformCon_htmlForm,
    /*
    Greetings_htmlForm,
    InformCon_htmlForm,

    
    GenericEthicQuestion_htmlForm,
    ESTALoopComponent, 
    MoralHarzardSAI_htmlForm,
    
    TamperingWithNature_htmlForm,

    MoralHarzardSAI_htmlForm,





    LikertTrust_htmlForm,
    PANAS_sequence,


    quesCertaintySAI_htmlForm,
    
    AffectiveImageryInst_htmlForm,
    AffectiveImagery_htmlForm,
    AffectiveImageryAffect_htmlForm,
*/
    
    // >>> introduction phase
    Greetings_htmlForm,
    InformCon_htmlForm,
    InformConsentNO_htmlForm,
    ExclusionCriteria_htmlForm,
    //AttentionCheck_htmlForm,
    SetupStudy_htmlForm,

    // >>>  Affective Imagery
    AffectiveImageryInst_htmlForm,
    AffectiveImagery_htmlForm,
    AffectiveImageryAffect_htmlForm,

    // >>>  scenario texts phase
    SAIpreKnowledge_htmlForm,
    SAITextClimate_htmlForm,
    SAITextTechnology_htmlForm,

    // >>>  generic ESTA question
    GenericEthicQuestion_htmlForm, // blocked for one minute
    // >>>  scale phase
    SCALES_sequence,

    // >>> ending phase
    quesCertaintySAI_htmlForm,
    QuesSocioDemo_htmlForm,

    FeedbackScreen_htmlScreen,
    EndingScreen_htmlScreen,
  ],
});

// Start the study (uncomment to run)
if (typeof jatos.jQuery === "function") {
  jatos.onLoad(() => study.run());
} else {
  study.run();
}
