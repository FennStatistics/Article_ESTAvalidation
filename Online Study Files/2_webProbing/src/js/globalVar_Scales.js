/*
Use the modern version of the Fisher–Yates shuffle algorithm:
https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
*/
function shuffle(queslist) {
  let array_emp = [];
  for (var i = 0; i < queslist.ques.length; i++) {
    array_emp.push(i);
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

function shuffleESTA(queslist) {
  let array_emp = [];
  for (var i = 0; i < queslist.length; i++) {
    array_emp.push(i);
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
    });
  }
  return quesitems;
}

/* ESTA scale */
const ESTA = [
  {
    scale: "contractualist01",
    left: "is unjust",
    right: "is just",
    probe: "When in your opinion is the described technology <b>just</b>?",
  },
  {
    scale: "contractualist02",
    left: "is unfair",
    right: "is fair",
    probe: "When in your opinion is the described technology <b>fair</b>?",
  },
  {
    scale: "contractualist03",
    left: "does not respect an unwritten contract",
    right: "respects an unwritten contract",
    probe:
      "What do you consider to be an <b>unwritten contract</b> in a technological context?",
  },
  {
    scale: "contractualist04",
    left: "does not respect an unspoken promise",
    right: "respects an unspoken promise",
    probe:
      "What do you consider to be an <b>unwritten promise</b> in a technological context?",
  },
  {
    scale: "contractualist06",
    left: "violates my ideas of fairness",
    right: "does not violate my ideas of fairness",
    probe:
      "What do you consider to be a <b>idea of fairness</b> in a technological context?",
  },
  {
    scale: "hedonism01",
    left: "is personally unsatisfactory",
    right: "is personally satisfactory",
    probe:
      "When in your opinion is the described technology <b>personally satisfactory</b>?",
  },
  {
    scale: "hedonism02",
    left: "would be selfish for me to use",
    right: "would not be selfish for me to use",
    probe:
      "Under which circumstances in your opinion is the described technology <b>selfish for you to use</b>?",
  },
  {
    scale: "hedonism03",
    left: "requires me to make sacrifices in order to use it",
    right: "does not require me to make sacrifices in order to use it",
    probe:
      "When in your opinion requires the described technology to <b>make sacrifices in order to use it</b>?",
  },
  {
    scale: "hedonism07",
    left: "harms my health",
    right: "promotes my health",
    probe: "How can the described technology <b>promotes your health</b>?",
  },
  {
    scale: "hedonism08",
    left: "harms my freedom",
    right: "promotes my freedom",
    probe: "How can the described technology <b>promotes your freedom</b>?",
  },
  {
    scale: "utilitarian01",
    left: "provides the least utility for society",
    right: "provides the greatest utility for society",
    probe:
      "Which type of <b>utilities</b> were you thinking of when you answered the question?",
  },
  {
    scale: "deontology01",
    left: "does not imply a moral obligation to act in a certain way",
    right: "implies a moral obligation to act in a certain way",
    probe: "What do you consider to be a <b>moral obligation</b>?",
  },
  {
    scale: "deontology02",
    left: "harms the autonomy of users",
    right: "promotes the autonomy of users",
    probe:
      "What does <b>autonomy of users</b> mean for you in a technological context?",
  },
  {
    scale: "deontology03",
    left: "obliges a certain immoral behavior",
    right: "obliges a certain moral behavior",
    probe:
      "What do you consider to be a <b>moral behavior</b> in a technological context?",
  },
  {
    scale: "deontology04",
    left: "is not morally right",
    right: "is morally right",
    probe:
      "When in your opinion is the described technology <b>morally right</b>?",
  },
  {
    scale: "deontology05",
    left: "goes against an important moral rule by which I live",
    right: "does not go against an important moral rule by which I live",
    probe:
      "What do you consider to be a <b>important moral rule</b> in a technological context?",
  },
  {
    scale: "deontology07",
    left: "prevents treatment with respect in interactions",
    right: "ensures treatment with respect in interactions",
    probe:
      "What does <b>respect in interactions</b> mean for you in a technological context?",
  },
  {
    scale: "deontology08",
    left: "prevents treatment with dignity in interactions",
    right: "ensures treatment with dignity in interactions",
    probe:
      "What does <b>dignity in interactions</b> mean for you in a technological context?",
  },
  {
    scale: "deontology09",
    left: "attacks the intrinsic value of nature",
    right: "protects the intrinsic value of nature",
    probe:
      "What do you consider to be a <b>intrinsic value of nature</b> in a technological context?",
  },
  {
    scale: "virtue01",
    left: "is developed by someone who has wrong motivations",
    right: "is developed by someone who has good motivations",
    probe:
      "For the development of the technology  <b>which people or groups of people</b> did you have in mind?",
  },
  {
    scale: "virtue09",
    left: "is developed by someone who is acting on ill intentions",
    right: "is developed by someone who is acting on good intentions",
    probe:
      "For the development of the technology  which <b>which people or groups of people</b> did you have in mind?",
  },
];
var index_ESTA = shuffleESTA(ESTA);
console.log("ESTA index: ", index_ESTA);

/* uncertainty SAI */
let quesUncertaintySAI = {
  ques: [
    "I have a clear opinion about stratospheric aerosol injection.",
    "I know how to think about the possible use of stratospheric aerosol injection.",
    "Overall, I am very sure about my opinion of stratospheric aerosol injection.",
  ],
  scale: ["1", "2", "3"],
};

var index_quesUncertaintySAI = shuffle(quesUncertaintySAI);
console.log("quesUncertaintySAI index: ", index_quesUncertaintySAI);
console.log("quesUncertaintySAI: ", quesUncertaintySAI);

var items_quesUncertaintySAI = createitems(
  quesUncertaintySAI,
  index_quesUncertaintySAI
);
console.log(items_quesUncertaintySAI);

/* moral intensity SAI */
let quesMoralIntensitySAI = {
  ques: [
    "The negative consequences (if any) of the decision to deploy SAI will be very serious.",
    "The overall harm (if any) as a result of the decision to deploy SAI will be very small.",
    "There is a very small likelihood that the decision to deploy SAI will actually cause any harm.",
    "The decision to deploy SAI is likely to cause harm.",
    "The decision to deploy SAI will not cause any harm in the immediate future.",
    "The negative effects (if any) of the decision to deploy SAI will be felt very quickly.",
    "People are not likely to agree about whether the decision to deploy SAI was right or wrong.",
    "Most people would agree if it is the appropriate decision to deploy SAI.",
    "The harmful consequences (if any) of the decision to deploy SAI will be concentrated on a small number of people.",
    "Any negative effects of the decision to deploy SAI will be spread across a large number of individuals.",
  ],
  scale: [
    "MC1r",
    "MC2",
    "PE1",
    "PE2r",
    "TI1",
    "TI2r",
    "SC1",
    "SC2r",
    "CE1r",
    "CE2",
  ],
};
/*
    "The harmful effects (if any) of the decision to deploy SAI will affect people that are close to the decision maker.",
    "The decision maker is unlikely to be close to anyone who might be negatively affected by the decision to deploy SAI.",

    "PX1r", "PX2",
*/

var index_quesMoralIntensitySAI = shuffle(quesMoralIntensitySAI);
console.log("quesMoralIntensitySAI index: ", index_quesMoralIntensitySAI);
console.log("quesMoralIntensitySAI: ", quesMoralIntensitySAI);

var items_quesMoralIntensitySAI = createitems(
  quesMoralIntensitySAI,
  index_quesMoralIntensitySAI
);
console.log(items_quesMoralIntensitySAI);

/* PANAS SCALE */
let quespanaslist = {
  ques: [
    "interessiert",
    "bekümmert",
    "freudig erregt",
    "verärgert",
    "stark",
    "schuldig",
    "erschrocken",
    "feindselig",
    "begeistert",
    "stolz",
    "gereizt",
    "wach",
    "beschämt",
    "angeregt",
    "nervös",
    "entschlossen",
    "aufmerksam",
    "durcheinander",
    "aktiv",
    "ängstlich",
  ],
  scale: [
    "01p",
    "01n",
    "02p",
    "02n",
    "03p",
    "03n",
    "04n",
    "05n",
    "04p",
    "05p",
    "06n",
    "06p",
    "07n",
    "07p",
    "08n",
    "08p",
    "09p",
    "09n",
    "10p",
    "10n",
  ],
};
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
