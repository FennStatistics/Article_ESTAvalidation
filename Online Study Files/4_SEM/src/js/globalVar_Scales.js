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



/* certainty opinon SAI */
let quesUncertaintySAI = {
  ques: ["I have a clear opinion about stratospheric aerosol injection.",
    "I know how to think about the possible use of stratospheric aerosol injection.",
    "Overall, I am very sure about my opinion of stratospheric aerosol injection."
  ],
  scale: ["1", "2", "3"]
}

var index_quesUncertaintySAI = shuffle(quesUncertaintySAI);
console.log("quesUncertaintySAI index: ", index_quesUncertaintySAI);
console.log("quesUncertaintySAI: ", quesUncertaintySAI);

var items_quesUncertaintySAI = createitems(quesUncertaintySAI, index_quesUncertaintySAI);
console.log(items_quesUncertaintySAI);


/* Tampering with nature */
let quesTamperingWithNature = {
  ques: ["SAI is contrary to nature.",
    "SAI technologies disturb the order of nature.",
    "Trying to influence the climate system by SAI reflects human arrogance.",
    "Human’s goal to change the climate system by SAI is immoral."
  ],
  scale: ["1", "2", "3", "4"]
}

var index_quesTamperingWithNature = shuffle(quesTamperingWithNature);
console.log("quesTamperingWithNature index: ", index_quesTamperingWithNature);
console.log("quesTamperingWithNature: ", quesTamperingWithNature);

var items_quesTamperingWithNature = createitems(quesTamperingWithNature, index_quesTamperingWithNature);
console.log(items_quesTamperingWithNature);


/* moral harzard SAI */
let quesMoralHarzard = {
  ques: ["Implementing SAI would remove the motivation to use energy more efficiently.",
    "Implementing SAI would decrease the motivation to reduce CO2 emissions."
  ],
  scale: ["1", "2"]
}

var index_quesMoralHarzard = shuffle(quesMoralHarzard);
console.log("quesUncertaintySAI index: ", index_quesMoralHarzard);
console.log("quesUncertaintySAI: ", quesMoralHarzard);

var items_quesMoralHarzard = createitems(quesMoralHarzard, index_quesMoralHarzard);
console.log(items_quesMoralHarzard);



/* Climate Change Concern */
let quesClimateChangeConcern = {
  ques: ["I worry about the climate’s state.",
    "Climate change has severe consequences for humans and nature.",
    "Climate protection is important for our future.",
    "We must protect the climate’s delicate equilibrium.",
    "There is no need to be too anxious about climate change, as it will change anyway, like during an ice age.",
    "I worry about what will happen due to climate change.",
    "I worry about the cause of climate change."
  ],
  scale: ["1", "2", "3", "4", "5r", "6", "7"]
}

var index_quesClimateChangeConcern = shuffle(quesClimateChangeConcern);
console.log("quesClimateChangeConcern index: ", index_quesClimateChangeConcern);
console.log("quesClimateChangeConcern: ", quesClimateChangeConcern);

var items_quesClimateChangeConcern = createitems(quesClimateChangeConcern, index_quesClimateChangeConcern);
console.log(items_quesClimateChangeConcern);










/* PANAS SCALE */
let quespanaslist = {
  ques: [
    "interested",
    "distressed",
    "excited",
    "upset",
    "strong",
    "guilty",
    "scared",
    "hostile",
    "enthusiastic",
    "proud",
    "irritable",
    "alert",
    "ashamed",
    "inspired",
    "nervous",
    "determined",
    "attentive",
    "jittery",
    "active",
    "afraid",
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

var index_quespanaslist = shuffle(quespanaslist);
console.log("quespanaslist: ", quespanaslist);
console.log("quespanaslist index: ", index_quespanaslist);

var items_quespanas = createitems(quespanaslist, index_quespanaslist);
console.log(items_quespanas.slice(0, 4));

/* Trust SCALE */
let trustlist = {
  ques: [
    "House of Commons",
    "the legal system",
    "the police",
    "politicians",
    "political parties",
    "the European Parliament",
    "the United Nations",
    // from Mercer et al., 2011
    "media and reporters",
    "private companies developing Stratospheric Aerosol Injection projects",
    "university researchers studying Stratospheric Aerosol Injection",
    "industries that might benefit from Stratospheric Aerosol Injection",
  ],
  scale: ["01", "02", "03", "04", "05", "06", "07", "08m", "09m", "10m", "11m"],
};

var index_trustlist = shuffle(trustlist);
console.log("trustlist: ", trustlist);
console.log("trustlist index: ", index_trustlist);

var items_trust = createitems(trustlist, index_trustlist);
console.log(items_trust);

/* Acceptability SCALE */
let acceptabilitylist = {
  ques: [
    "I am a supporter of SAI.", // general
    "I am an opponent of SAI.",
    "I support the deployment of SAI.",
    "I am against the deployment of SAI.",
    "SAI is an acceptable solution in combating climate change.",

    "I would support a petition in favor of the deployment of SAI.", // BI
    "I would try to convince others of the advantages of SAI.",
    "I would support a petition against the deployment of SAI.",
    "I would try to convince others of the disadvantages of SAI.",
    "In a national referendum I would vote for deployment.",
    "In a national referendum I would vote against deployment.",
    "I would vote for a political party that has the deployment of SAI in its programme.",
    "I would not vote for a political party that has the deployment of SAI in its programme.",
    "I would accept restrictions in my everyday life caused by SAI.",

    "I support the research of SAI.", // own items
    "I am against the research of SAI.",
  ],
  scale: [
    "01gen",
    "02gen",
    "03genr",
    "04genr",
    "05gen",
    "01bi",
    "02bi",
    "03bir",
    "04bir",
    "05bi",
    "06bir",
    "07bi",
    "08bir",
    "09bi",
    "06genOwn",
    "07genOwnr",
  ],
};

var index_acceptabilitylist = shuffle(acceptabilitylist);
console.log("acceptabilitylist: ", acceptabilitylist);
console.log("acceptabilitylist index: ", index_acceptabilitylist);

var items_acceptability = createitems(
  acceptabilitylist,
  index_acceptabilitylist
);
console.log(items_acceptability);

/* Acceptability SCALE scenarios */
let acceptabilitySecenarioslist = {
  ques: [
    "Scientists should research SAI using theoretical models, simulations and lab experiments.",
    "Scientists should test SAI using field trials.",
    "SAI should be used when massive and irreversible changes in the climate system are approaching which cannot be averted otherwise.",
    "SAI should never be used, no matter the situation.",
    "If SAI was possible today, we should use it immediately."
  ],
  scale: [
    "01",
    "02",
    "03",
    "04",
    "05"
  ],
};

var index_acceptabilitySecenarioslist = shuffle(acceptabilitySecenarioslist);
console.log("acceptabilitySecenarioslist: ", acceptabilitySecenarioslist);
console.log("acceptabilitySecenarioslist index: ", index_acceptabilitySecenarioslist);

var items_acceptabilitySecenarioslist = createitems(
  acceptabilitySecenarioslist,
  index_acceptabilitySecenarioslist
);
console.log(items_acceptabilitySecenarioslist);



/* Risk Benefit SCALE */
let riskBenefitlist = {
  ques: [
    "...is controllable.",
    "...is effective in terms of reducing the Earth’s temperature.",
    "...is a cost-efficient measure for reducing the Earth’s temperature.",
    "...is an eco-friendly measure for reducing the Earth’s temperature.",
    "...is sustainable in the long term.",

    "...blemishes the surrounding area.",
    "...leads to unintended side effects.",
    "...has unknown risks.",
    "...leads to an unequal distribution of risks.",
    "...is a threat to humans and nature.",
  ],
  scale: ["01b", "02b", "03b", "04b", "05b", "01r", "02r", "03r", "04r", "05r"],
};

var index_riskBenefitlist = shuffle(riskBenefitlist);
console.log("riskBenefitlist: ", riskBenefitlist);
console.log("riskBenefitlist index: ", index_riskBenefitlist);

var items_riskBenefit = createitems(riskBenefitlist, index_riskBenefitlist);
console.log(items_riskBenefit);

/* HEXACO SCALE */
let HEXACOlist = {
  ques: [
    "I would be quite bored by a visit to an art gallery.",
    "I plan ahead and organize things, to avoid scrambling at the last minute.",
    "I rarely hold a grudge, even against people who have badly wronged me.",
    "I feel reasonably satisfied with myself overall.",
    "I would feel afraid if I had to travel in bad weather conditions.",
    "I wouldn't use flattery to get a raise or promotion at work, even if I thought it would succeed.",
    "I'm interested in learning about the history and politics of other countries.",
    "I often push myself very hard when trying to achieve a goal.",
    "People sometimes tell me that I am too critical of others.",
    "I rarely express my opinions in group meetings.",
    "I sometimes can't help worrying about little things.",
    "If I knew that I could never get caught, I would be willing to steal a million dollars.",
    "I would enjoy creating a work of art, such as a novel, a song, or a painting.",
    "When working on something, I don't pay much attention to small details.",
    "People sometimes tell me that I'm too stubborn.",
    "I prefer jobs that involve active social interaction to those that involve working alone.",
    "When I suffer from a painful experience, I need someone to make me feel comfortable.",
    "Having a lot of money is not especially important to me.",
    "I think that paying attention to radical ideas is a waste of time.",
    "I make decisions based on the feeling of the moment rather than on careful thought.",
    "People think of me as someone who has a quick temper.",
    "On most days, I feel cheerful and optimistic.",
    "I feel like crying when I see other people crying.",
    "I think that I am entitled to more respect than the average person is.",
    "If I had the opportunity, I would like to attend a classical music concert.",
    "When working, I sometimes have difficulties due to being disorganized.",
    "My attitude toward people who have treated me badly is “forgive and forget”.",
    "I feel that I am an unpopular person.",
    "When it comes to physical danger, I am very fearful.",
    "If I want something from someone, I will laugh at that person's worst jokes.",
    "I’ve never really enjoyed looking through an encyclopedia.",
    "I do only the minimum amount of work needed to get by. ",
    "I tend to be lenient in judging other people.",
    "In social situations, I’m usually the one who makes the first move.",
    "I worry a lot less than most people do.",
    "I would never accept a bribe, even if it were very large.",
    "People have often told me that I have a good imagination.",
    "I always try to be accurate in my work, even at the expense of time.",
    "I am usually quite flexible in my opinions when people disagree with me.",
    "The first thing that I always do in a new place is to make friends.",
    "I can handle difficult situations without needing emotional support from anyone else.",
    "I would get a lot of pleasure from owning expensive luxury goods.",
    "I like people who have unconventional views.",
    "I make a lot of mistakes because I don’t think before I act.",
    "Most people tend to get angry more quickly than I do.",
    "Most people are more upbeat and dynamic than I generally am.",
    "I feel strong emotions when someone close to me is going away for a long time.",
    "I want people to know that I am an important person of high status.",
    "I don’t think of myself as the artistic or creative type.",
    "People often call me a perfectionist.",
    "Even when people make a lot of mistakes, I rarely say anything negative.",
    "I sometimes feel that I am a worthless person.",
    "Even in an emergency I wouldn’t feel like panicking.",
    "I wouldn’t pretend to like someone just to get that person to do favors for me.",
    "I find it boring to discuss philosophy.",
    "I prefer to do whatever comes to mind, rather than stick to a plan.",
    "When people tell me that I’m wrong, my first reaction is to argue with them.",
    "When I’m in a group of people, I’m often the one who speaks on behalf of the group.",
    "I remain unemotional even in situations where most people get very sentimental.",
    "I’d be tempted to use counterfeit money, if I were sure I could get away with it.",
  ],
  scale: [
    "OtE_AA_01r",
    "C_O_01",
    "A_Forg_01",
    "Ext_SSE_01",
    "Emo_F_01",
    "HH_S_01",
    "OtE_I_01",
    "C_D_01",
    "A_Gent_01r",
    "Ext_SB_01r",
    "Emo_A_01",
    "HH_F_01r",
    "OtE_C_01",
    "C_Perf_01r",
    "A_Flex_01r",
    "Ext_S_01",
    "Emo_D_01",
    "HH_GA_01",
    "OtE_U_01r",
    "C_Pru_01r",
    "A_P_01r",
    "Ext_L_01",
    "Emo_S_01",
    "HH_M_01r",
    "OtE_AA_02",
    "C_O_02r",
    "A_Forg_02",
    "Ext_SSE_02r",
    "Emo_F_02",
    "HH_S_02r",
    "OtE_I_02r",
    "C_D_02r",
    "A_Gent_02",
    "Ext_SB_02",
    "Emo_A_02r",
    "HH_F_02",
    "OtE_C_02",
    "C_Perf_02",
    "A_Flex_02",
    "Ext_S_02",
    "Emo_D_02r",
    "HH_GA_02r",
    "OtE_U_02",
    "C_Pru_02r",
    "A_P_02",
    "Ext_L_02r",
    "Emo_S_02",
    "HH_M_02r",
    "OtE_C_03r",
    "C_Perf_03",
    "A_Gent_03",
    "Ext_SSE_03r",
    "Emo_F_03r",
    "HH_S_03",
    "OtE_U_03r",
    "C_Pru_03r",
    "A_Flex_03r",
    "Ext_SB_03",
    "Emo_S_03r",
    "HH_F_03r",
  ],
};

var index_HEXACOlist = shuffle(HEXACOlist);
console.log("HEXACOlist: ", HEXACOlist);
console.log("HEXACOlist index: ", index_HEXACOlist);

var items_HEXACO = createitems(HEXACOlist, index_HEXACOlist);
console.log(items_HEXACO.slice(0, 4));


















/* ESTA SCALE */
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
