










/* ............................................ */






function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
      return uri + separator + key + "=" + value;
    }
  }
  
  
  
  
  var URLdataFirst;
  var studyData; // second URL parameter
  
  /* paradata variables: */
  
  var urlParams;
  
  
  
  
  
  
  
  
  
  
  
  /* link to CAM software */
  const TODO_linkCAM = new lab.html.Screen({
    title: "linkCAM",
    content: `
    <header>
    </header>
    <main class="content-horizontal-center content-vertical-center">
    <div class="w-l text-justify">
    Sie werden in wenigen Sekunden zu der <i>Cognitive-Affective Map</i> Software weitergeleitet. Hier bitten wir Sie basierend auf den eben gelesenen Text Ihre persönlichen Einstellung zu dem Studiengang der Psychologie der Universität Freiburg auszuführen.
    </div>
    </main>
    `,
    timeout: 7000,
    messageHandlers: {
      epilogue: function anonymous() {
        if (typeof jatos.jQuery === "function") {
          // If JATOS is available, send data there
          var resultJson = study.options.datastore.exportJson();
          console.log("my result data sent to JATOS final time: ", resultJson);
          jatos.submitResultData(resultJson)
            .then(() => console.log('success'))
            .catch(() => console.log('error'));
          // then redirect
          var newUrl = updateQueryStringParameter("https://studien.psychologie.uni-freiburg.de/publix/325/start?batchId=404&generalMultiple",
            "IDparticipant", "part2_" + urlParams.srid);
          newUrl = updateQueryStringParameter(newUrl, "SONA_ID", URLdataFirst.SONA_ID);
          jatos.endStudyAndRedirect(newUrl, true, "everything worked fine");
        }
      }
    },
  })
  
  
  /* ........................ WELCOME BACK */
  const welcomeBack = new lab.html.Screen({
    title: "linkCAM",
    content: `
    <header>
    <h2>Willkommen zurück</h2>
    </header>
    <main class="content-horizontal-center content-vertical-center">
    <div class="w-l text-justify">
    Die Onlinestudie geht weiter in wenigen Sekunden. In dem letzten Teil der Onlinestudie bitten wir Sie weitere Fragen zu beantworten.
    </div>
    </main>
    `,
    timeout: 7000,
    messageHandlers: {
      end: function anonymous() {
  
        console.log("typeof jatos.jQuery: ", typeof jatos.jQuery);
        if (typeof jatos.jQuery === "function") {
          console.log("I WAS TRIGGERED!!!: ", jatos.urlQueryParameters);
  
          studyData = jatos.urlQueryParameters;
  
          if (typeof studyData.IDparticipant === "undefined") {
            alert('No ID was submitted. Study is aborted! Please write an e-mail to the study director that an error has occurred.');
            jatos.abortStudy();
          }
          console.log("URL params", studyData);
  
          study.options.datastore.set('IDparticipant', studyData.IDparticipant);
          // SONA ID
          study.options.datastore.set('SONA_ID', studyData.SONA_ID);
  
          var resultJson = study.options.datastore.exportJson();
          console.log("my result data sent to JATOS (URL ID): ", resultJson);
          jatos.submitResultData(resultJson)
            .then(() => console.log('success'))
            .catch(() => console.log('error'));
  
        }
      }
    },
  })
  
  
  
  
  
  
  
  /* questions: likert scale  */
  /*
  const LikertPANAS1_htmlForm = new lab.html.Page({
    title: "QuesPANAS1",
    items: [{
      required: true,
      type: "likert",
      items: items_quespanas.slice(0,10),
      width: "5",
      anchors: [
        "sehr gering oder gar nicht",
        "ein wenig",
        "mäßig",
        "ziemlich viel",
        "sehr viel"
      ],
      label: "Im Folgenden sehen Sie eine Liste mit Emotionen. Bitte bewerten Sie für die einzelnen Emotionen, wie Sie sich allgemein im Bezug auf den Studiengang der Psychologie fühlen.",
      help: "Lesen Sie jedes Adjektiv und kreuzen Sie dann die für Sie am zutreffenste Emotion an.",
      shuffle: true,
      name: "panas"
    }],
    submitButtonText: "Fortfahren →",
    submitButtonPosition: "right",
    width: "l",
    messageHandlers: {
      run: function anonymous() {
        document.querySelectorAll('.page-item-table colgroup')[0].innerHTML = `
        <col style=\"width: 20%\">
        <col style=\"width: 16%\">
        <col style=\"width: 16%\">
        <col style=\"width: 16%\">
        <col style=\"width: 16%\">
        <col style=\"width: 16%\">
        `
        paracountclicks = 0;
        // collect paradata 
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
  })
  
  const LikertPANAS2_htmlForm = new lab.html.Page({
    title: "QuesPANAS2",
    items: [{
      required: true,
      type: "likert",
      items: items_quespanas.slice(10,20),
      width: "5",
      anchors: [
        "sehr gering oder gar nicht",
        "ein wenig",
        "mäßig",
        "ziemlich viel",
        "sehr viel"
      ],
      label: "Im Folgenden sehen Sie eine Liste mit Emotionen. Bitte bewerten Sie für die einzelnen Emotionen, wie Sie sich allgemein im Bezug auf den Studiengang der Psychologie fühlen.",
      help: "Lesen Sie jedes Adjektiv und kreuzen Sie dann die für Sie am zutreffenste Emotion an.",
      shuffle: true,
      name: "panas"
    }],
    submitButtonText: "Fortfahren →",
    submitButtonPosition: "right",
    width: "l",
    messageHandlers: {
      run: function anonymous() {
        document.querySelectorAll('.page-item-table colgroup')[0].innerHTML = `
        <col style=\"width: 20%\">
        <col style=\"width: 16%\">
        <col style=\"width: 16%\">
        <col style=\"width: 16%\">
        <col style=\"width: 16%\">
        <col style=\"width: 16%\">
        `
        paracountclicks = 0;
        // collect paradata 
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
  })
  
  */
  
  
  
  /* Messinstrument für die Wahrnehmung von Studienanforderungen */
  const LikertStudienanf_htmlForm = new lab.html.Page({
    title: "QuesStudienanforderungen",
    items: [{
      required: true,
      type: "likert",
      items: items_quesstudienanf.slice(0, 11),
      width: "5",
      anchors: [
        "sehr schwer",
        "eher schwer",
        "teils-teils",
        "eher leicht",
        "sehr leicht"
      ],
      label: "Schätzen Sie ein, wie leicht bzw. schwer es Ihnen im vergangenen Studienjahr gefallen ist, mit den folgenden Anforderungen im Studium umzugehen.",
      help: "Lesen Sie jede Aussage und kreuzen Sie dann die für Sie zutreffendste Antwortoption an.",
      shuffle: false,
      name: "studienanf"
    }],
    submitButtonText: "Fortfahren →",
    submitButtonPosition: "right",
    width: "l",
    messageHandlers: {
      run: function anonymous() {
        document.querySelectorAll('.page-item-table colgroup')[0].innerHTML = `
        <col style=\"width: 40%\">
        <col style=\"width: 12%\">
        <col style=\"width: 12%\">
        <col style=\"width: 12%\">
        <col style=\"width: 12%\">
        <col style=\"width: 12%\">
        `
        paracountclicks = 0;
        // collect paradata 
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
  })
  
  
  const LikertStudienanf2_htmlForm = new lab.html.Page({
    title: "QuesStudienanforderungen",
    items: [{
      required: true,
      type: "likert",
      items: items_quesstudienanf.slice(11, 21),
      width: "5",
      anchors: [
        "sehr schwer",
        "eher schwer",
        "teils-teils",
        "eher leicht",
        "sehr leicht"
      ],
      label: "Schätzen Sie ein, wie leicht bzw. schwer es Ihnen im vergangenen Studienjahr gefallen ist, mit den folgenden Anforderungen im Studium umzugehen.",
      help: "Lesen Sie jede Aussage und kreuzen Sie dann die für Sie zutreffendste Antwortoption an.",
      shuffle: false,
      name: "studienanf"
    }],
    submitButtonText: "Fortfahren →",
    submitButtonPosition: "right",
    width: "l",
    messageHandlers: {
      run: function anonymous() {
        document.querySelectorAll('.page-item-table colgroup')[0].innerHTML = `
        <col style=\"width: 40%\">
        <col style=\"width: 12%\">
        <col style=\"width: 12%\">
        <col style=\"width: 12%\">
        <col style=\"width: 12%\">
        <col style=\"width: 12%\">
        `
        paracountclicks = 0;
        // collect paradata 
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
  })
  
  
  
  /* questions: feedback  */
  const QuesFeedback_htmlForm = new lab.html.Form({
    title: "QuesFeedback",
    content: textObj.feedbackQues
  })
  
  
  
  
  /* link to CAM software */
  const TODO = new lab.html.Screen({
    title: "linkCAM",
    content: `
    Some stuff to implement...
    <br>
    <br>
    Thank you for testing :-)!
    <br>
    <iframe src="https://giphy.com/embed/Pnh0Lou03fv92J4puZ" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/HBOMax-Pnh0Lou03fv92J4puZ">via GIPHY</a></p>
    `,
    timeout: 4000,
    messageHandlers: {
      epilogue: function anonymous() {
        if (typeof jatos.jQuery === "function") {
          // If JATOS is available, send data there
          var resultJson = study.options.datastore.exportJson();
          console.log("my result data sent to JATOS final time: ", resultJson);
          jatos.submitResultData(resultJson)
            .then(() => console.log('success'))
            .catch(() => console.log('error'));
  
          // end study
          jatos.endStudy(resultJson, true, "everything worked fine");
  
          // then redirect
          //jatos.endStudyAndRedirect("spiegel.de", true, "everything worked fine");
        }
      }
    },
  })