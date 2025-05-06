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

/* technologies */
var backup_AllTechnologyScenario = [
  { name: "Stratospheric Aerosol Injection", abb: "SAI" },
  { name: "Social Robot", abb: "SR" },
  { name: "Nano-Pat-Parka", abb: "NPP" },
];
var index_AllTechnologyScenario = shuffleESTA(backup_AllTechnologyScenario);

var AllTechnologyScenario = [
  backup_AllTechnologyScenario[index_AllTechnologyScenario[0]],
  backup_AllTechnologyScenario[index_AllTechnologyScenario[1]],
  backup_AllTechnologyScenario[index_AllTechnologyScenario[2]],
];

console.log("backup_AllTechnologyScenario: ", backup_AllTechnologyScenario);
console.log("AllTechnologyScenario: ", AllTechnologyScenario);

/* ESTA scale */
const ESTA = [
  {
    scale: "relativist01",
    left: "is unacceptable to my culture",
    right: "is acceptable to my culture",
  },
  {
    scale: "relativist02",
    left: "is unacceptable to my family",
    right: "is acceptable to my family",
  },
  {
    scale: "relativist03",
    left: "is unacceptable to my traditions",
    right: "is acceptable to my traditions",
  },
  {
    scale: "relativist04",
    left: "is unacceptable for myself",
    right: "is acceptable for myself",
  },
  {
    scale: "relativist05",
    left: "is unacceptable to people I most admire",
    right: "is acceptable to people I most admire",
  },
  { scale: "contractualist01", left: "is unjust", right: "is just" },
  { scale: "contractualist02", left: "is unfair", right: "is fair" },
  {
    scale: "contractualist03",
    left: "works against implicit moral conventions",
    right: "supports implicit moral conventions",
  },
  {
    scale: "contractualist04",
    left: "violates important social norms",
    right: "does not violate important social norms",
  },
  {
    scale: "contractualist05",
    left: "does not result in an equal distribution of good and bad",
    right: "results in an equal distribution of good and bad",
  },
  {
    scale: "contractualist06",
    left: "violates my ideas of fairness",
    right: "does not violate my ideas of fairness",
  },
  {
    scale: "hedonism01",
    left: "is personally unsatisfactory",
    right: "is personally satisfactory",
  },
  {
    scale: "hedonism02",
    left: "would be selfish for me to use",
    right: "would not be selfish for me to use",
  },
  {
    scale: "hedonism03",
    left: "requires me to make sacrifices in order to use it",
    right: "does not require me to make sacrifices in order to use it",
  },
  {
    scale: "hedonism04",
    left: "is not in the best interests of my person",
    right: "is in the best interests of my person",
  },
  {
    scale: "hedonism05",
    left: "minimizes my pleasure",
    right: "maximizes my pleasure",
  },
  {
    scale: "hedonism06",
    left: "is a hindrance to a good personal life",
    right: "promotes a good personal life",
  },
  { scale: "hedonism07", left: "harms my health", right: "promotes my health" },
  {
    scale: "hedonism08",
    left: "harms my freedom",
    right: "promotes my freedom",
  },
  { scale: "hedonism09", left: "harms my safety", right: "promotes my safety" },
  {
    scale: "utilitarian01",
    left: "provides the least amount of utility for society",
    right: "provides the greatest amount of utility for society",
  },
  {
    scale: "utilitarian02",
    left: "minimizes benefits for society",
    right: "maximizes benefits for society",
  },
  {
    scale: "utilitarian03",
    left: "maximizes harm for society",
    right: "minimizes harm for society",
  },
  {
    scale: "utilitarian04",
    left: "tends overall to be bad for society",
    right: "tends overall to be good for society",
  },
  {
    scale: "utilitarian05",
    left: "leads to the least good for the greatest number",
    right: "leads to the greatest good for the greatest number",
  },
  {
    scale: "utilitarian06",
    left: "leads to the greatest ill for the greatest number",
    right: "leads to the least ill for the greatest number",
  },
  {
    scale: "utilitarian07",
    left: "results in a negative cost benefit ratio for society",
    right: "results in a positive cost benefit ratio for society",
  },
  {
    scale: "utilitarian08",
    left: "is inefficient for society",
    right: "is efficient for society",
  },
  {
    scale: "utilitarian09",
    left: "leads to future harm for society",
    right: "leads to future benefit for society",
  },
  {
    scale: "deontology01",
    left: "does not imply a moral obligation to act in a certain way",
    right: "implies a moral obligation to act in a certain way",
  },
  {
    scale: "deontology02",
    left: "harms the autonomy of users",
    right: "promotes the autonomy of users",
  },
  {
    scale: "deontology03",
    left: "obliges a certain immoral behavior",
    right: "obliges a certain moral behavior",
  },
  {
    scale: "deontology04",
    left: "is morally wrong",
    right: "is morally right",
  },
  {
    scale: "deontology05",
    left: "goes against an important moral rule by which I live",
    right: "does not go against an important moral rule by which I live",
  },
  {
    scale: "deontology06",
    left: "attacks the intrinsic value of nature",
    right: "protects the intrinsic value of nature",
  },
  {
    scale: "deontology07",
    left: "attacks the value of the ecological environment",
    right: "protects the value of the ecological environment",
  },
  {
    scale: "deontology08",
    left: "attacks the value of the cultural environment",
    right: "protects the value of the cultural environment",
  },
  {
    scale: "virtue01",
    left: "is developed by someone who has wrong motivations",
    right: "is developed by someone who has good motivations",
  },
  {
    scale: "virtue02",
    left: "is developed by someone who has wrong desires",
    right: "is developed by someone who has good desires",
  },
  {
    scale: "virtue03",
    left: "is developed by someone who has a bad character",
    right: "is developed by someone who has a good character",
  },
  {
    scale: "virtue04",
    left: "is developed by someone who is not prudent",
    right: "is developed by someone who is prudent",
  },
  {
    scale: "virtue05",
    left: "is developed by someone who is not reasonable",
    right: "is developed by someone who is reasonable",
  },
  {
    scale: "virtue06",
    left: "is developed by someone who is not striving for professional excellence",
    right:
      "is developed by someone who is striving for professional excellence",
  },
  {
    scale: "virtue07",
    left: "is developed by someone who is indifferent towards nature",
    right: "is developed by someone who is respectful towards nature",
  },
  {
    scale: "virtue08",
    left: "is developed by someone who is insensitive to interactions with society",
    right:
      "is developed by someone who is sensitive to interactions with society",
  },
  {
    scale: "virtue09",
    left: "is developed by someone who is acting on ill intentions",
    right: "is developed by someone who is acting on good intentions",
  },
];

var index_ESTA = shuffleESTA(ESTA);
console.log("ESTA index: ", index_ESTA);

/* Definition Ethic Theories */
const EthicTheories = [
  {
    ethicTheory: "Deontology",
    itemID: "deontology",
    def_top: "to see whether it violates central principles or duties",
    def_beforemain:
      "is concerned with the possible violation of central principles or duties:",
    def_main:
      'A technology is morally acceptable if it respects basic principles and duties. These basic principles are held up by you as a free and rational person. Your principles are oriented by the guiding statement: "You should act the way you want others to act". When interacting with the technology, upholding your principles is of central importance, not the potential outcomes and consequences of your actions.',
    def_picture: "Deontology.JPG",
    def_picture_old: "Folie1.JPG",
  },
  {
    ethicTheory: "Utilitarianism",
    itemID: "utilitarian",
    def_top: "regarding its consequences on society",
    def_beforemain: "is concerned with the consequences for society:",
    def_main:
      "A technology is morally acceptable if it leads to the best outcomes and consequences for society. By interacting with the technology, society aims to maximize overall benefit by increasing utility, decreasing harm or leading to a better world.",
    def_picture: "Utilitarianism.JPG",
    def_picture_old: "Folie2.JPG",
  },
  {
    ethicTheory: "Hedonism",
    itemID: "hedonism",
    def_top: "regarding its consequences for you personally",
    def_beforemain: "is concerned with the consequences for you personally:",
    def_main:
      "A technology is morally acceptable if it increases pleasure and wellbeing or promotes a good life for you. By interacting with the technology in an instrumental way, you can increase your pleasure, wellbeing or your personal goals.",
    def_picture: "Hedonism.JPG",
    def_picture_old: "Folie3.JPG",
  },
  {
    ethicTheory: "Virtue ethics",
    itemID: "virtue",
    def_top:
      "regarding the moral standards of the person who has developed this technology",
    def_beforemain:
      "is concerned with the moral standards of the technology’s developer:",
    def_main:
      "A technology is morally acceptable if it has been developed by someone who has the character and ability to recognize what is morally required. The developer is an upright person with high moral standards, who has developed the technology on the basis of her/his values.",
    def_picture: "Virtue_ethics.JPG",
    def_picture_old: "Folie4.JPG",
  },
  {
    ethicTheory: "Contractualism",
    itemID: "contractualist",
    def_top:
      "in terms of whether it goes against implicit conventions upon which our society generally relies",
    def_beforemain:
      "asks whether implicit conventions upon which our society generally relies are disregarded or violated:",
    def_main:
      "A technology is morally acceptable if it does not disregard or work against implicit moral conventions that are considered essential to the functioning of a society. To not break moral conventions is in the best interest of all members of a society. For example, in a state where there is “war of all against all”, life would be too insecure and harmful.",
    def_picture: "Contractualism.JPG",
    def_picture_old: "Folie5.JPG",
  },
  {
    ethicTheory: "Relativism",
    itemID: "relativist",
    def_top:
      "regarding the possibility that the ethical evaluation differs between groups of people",
    def_beforemain:
      "is concerned with the possibility that ethical evaluation differs between groups of people:",
    def_main:
      "The acceptability of a technology depends on the social, cultural and political contexts in which it is applied. These different contexts influence the standards and procedures by which the use or implementation of a technology is justified.",
    def_picture: "Relativism.JPG",
    def_picture_old: "Folie6.JPG",
  },
];

var index_EthicTheories = shuffleESTA(EthicTheories);
console.log("EthicTheories index: ", index_EthicTheories);

/* uncertainty SAI */
let quesUncertaintySAI = {
  ques: [
    "I have a clear opinion about stratospheric aerosol injection.",
    "I know how to think about the possible use of stratospheric aerosol injection.",
    "Overall, I am very sure about my opinion of stratospheric aerosol injection.",
  ],
  scale: ["1", "2", "3"],
};
1;
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
