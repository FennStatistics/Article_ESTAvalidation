/*
Use the modern version of the Fisher–Yates shuffle algorithm:
https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
*/
function shuffle(queslist) {
  let array_emp = []
  for (var i = 0; i < queslist.ques.length; i++) {
    array_emp.push(i)
  }

  let j, x;
  for (i = array_emp.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array_emp[i];
    array_emp[i] = array_emp[j];
    array_emp[j] = x;
  }
  return array_emp;
}

function createitems(queslist, quesindex) {
  let quesitems = [];
  for (i = 0; i < queslist.ques.length; i++) {
    let tmp_ques = queslist.ques[quesindex[i]];
    let tmp_label = queslist.scale[quesindex[i]];

    quesitems.push({
      label: tmp_ques,
      coding: tmp_label,
    })

  }
  return quesitems;
}







/* uncertainty SAI */
let quesUncertaintySAI = {
  ques: ["I have a clear opinion about the HomeMate.",
    "I know how to think about the possible use of the HomeMate.",
    "Overall, I am very sure about my opinion of the HomeMate."
  ],
  scale: ["1", "2", "3"]
}

var index_quesUncertaintySAI = shuffle(quesUncertaintySAI);
console.log("quesUncertaintySAI index: ", index_quesUncertaintySAI);
console.log("quesUncertaintySAI: ", quesUncertaintySAI);

var items_quesUncertaintySAI = createitems(quesUncertaintySAI, index_quesUncertaintySAI);
console.log(items_quesUncertaintySAI);

const usedTechnology = "SUPER MEGA TRUMP"

/* moral intensity SAI */
let quesMoralIntensitySAI = {
  ques: ["The negative consequences (if any) using the HomeMate will be very serious.",
    "The overall harm (if any) using the HomeMate will be very small.",
    "There is a very small likelihood that using the HomeMate will actually cause any harm.",
    "Using the HomeMate is likely to cause harm.",
    "Using the HomeMate will not cause any harm in the immediate future.",
    "The negative effects (if any) using the HomeMate will be felt very quickly.",
    "People are not likely to agree about whether using the HomeMate is right or wrong.",
    "Most people would agree if it is appropriate to use the HomeMate.",
    "The harmful consequences (if any) using the HomeMate will be concentrated on a small number of people.",
    "Any negative effects using the HomeMate will be spread across a large number of individuals."
  ],
  scale: ["MC1r", "MC2", "PE1", "PE2r", "TI1", "TI2r", "SC1", "SC2r", "CE1r", "CE2"]
}
/*
    "The harmful effects (if any) of the decision to deploy SAI will affect people that are close to the decision maker.",
    "The decision maker is unlikely to be close to anyone who might be negatively affected by the decision to deploy SAI.",

    "PX1r", "PX2",
*/


var index_quesMoralIntensitySAI = shuffle(quesMoralIntensitySAI);
console.log("quesMoralIntensitySAI index: ", index_quesMoralIntensitySAI);
console.log("quesMoralIntensitySAI: ", quesMoralIntensitySAI);

var items_quesMoralIntensitySAI = createitems(quesMoralIntensitySAI, index_quesMoralIntensitySAI);
console.log(items_quesMoralIntensitySAI);



















/* PANAS SCALE */
let quespanaslist = {
  ques: ["interessiert", "bekümmert", "freudig erregt", "verärgert", "stark", "schuldig", "erschrocken", "feindselig", "begeistert", "stolz", "gereizt", "wach", "beschämt", "angeregt", "nervös", "entschlossen", "aufmerksam", "durcheinander", "aktiv", "ängstlich"],
  scale: ["01p", "01n", "02p", "02n", "03p", "03n", "04n", "05n", "04p", "05p", "06n", "06p", "07n", "07p", "08n", "08p", "09p", "09n", "10p", "10n"]
}
/*
let quespanaslist = {
  ques: ["interested", "distressed", "excited", "upset", "strong", "guilty", "scared", "hostile", "enthusiastic", "proud", "irritable", "alert", "ashamed", "inspired", "nervous", "determined", "attentive", "jittery", "active", "afraid"],
  scale: ["01p", "01n", "02p", "02n", "03p", "03n", "04n", "05n", "04p", "05p", "06n", "06p", "07n", "07p", "08n", "08p", "09p", "09n", "10p", "10n"]
}


var index_quespanas = shuffle(quespanaslist);
//console.log("quespanasindex: ", index_quespanas);
//console.log("quespanaslist: ", quespanaslist);

var items_quespanas = createitems(quespanaslist, index_quespanas);
//console.log(items_quespanas.slice(0, 4));
*/
