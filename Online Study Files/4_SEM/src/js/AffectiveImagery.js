/* 
Affective Imagery: 
*/
const AffectiveImageryTechnology = "Climate Engineering";
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
      label: `Please indicate to what extent you perceive your mentioned thoughts or images about <strong>${AffectiveImageryTechnology}</strong> as positive or negative:`,
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
