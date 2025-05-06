/*
JS mainly copied from Lars Kaczmirek
https://git.gesis.org/surveymethods/evalanswer/-/blob/master/script_jsfiddle/javascript.txt
https://jsfiddle.net/kaczmirek/c8ntbczz/
*/
/* SETTINGS SECTION */
/* check for single-word answers. If you do not want to probe single-word answers use:
   var Includecode10 = false;
*/
const Includecode10 = true;
/* check for answer length which will pass (default: 51)
 */
const AnswerLength = 51;

/* set followupisspecific = true to use question text which addresses the problem at hand instead of a generic follow-up question. */
const Followupisspecific = true;

/* set minimum duration to answer probe */
const MinDuration = 2000;

/* regular expressions */
var p_reg = new Array();
p_reg[0] = new Array(30101, /^i know (little|nothing)/i, 1);
p_reg[1] = new Array(
  30102,
  /^((be)?cause)? *i? *[a-z]* *do *n.?t *[a-z]* *k* *now*/i,
  1
);
p_reg[2] = new Array(30103, /^(l|i)*[nd]k.?$/i, 1);
p_reg[3] = new Array(
  30301,
  /(not|never) *[a-z]* *i? (have)? *thought *about/i,
  1
);
p_reg[4] = new Array(30401, /^[a-z]* *not clear/i, 1);
p_reg[5] = new Array(
  30501,
  /^i? *((have? ?n.?.? *(got)?)|(do *n.?t have)|no) *a?n? [a-z]* *(idea|opinions? *(on *th.?.? *(matter)?)?|interest|experience|facts).?$/i,
  1
);
p_reg[6] = new Array(
  30502,
  /^i? *((have? ?n.?.? *(got)?)|(do *n.?t have)|no) strong feelings/i,
  1
);
p_reg[7] = new Array(
  30601,
  /^i? *[a-z]* *do *n.?t *[a-z]* *i? *(under *stand|get)/i,
  1
);
p_reg[8] = new Array(30702, /not *(to)? *familiar *with/i, 1);
p_reg[9] = new Array(
  30901,
  /^((no)? *(i|just)? *cann?.?t.?$|(i|just|i? *really|because *i?)? *cann?.?t *(comment|think|say|explain|choose|make my mind up))/i,
  1
);
p_reg[10] = new Array(30902, /(hard|difficult) *to *[a-z]*.?$/i, 1);
p_reg[11] = new Array(30904, /^not an easy choice.?$/i, 1);
p_reg[12] = new Array(
  31401,
  /^(as)? *(i *.?m)? *((do *n.?t|not) *[a-z]* *.ure|^ns)/i,
  1
);
p_reg[13] = new Array(31402, /unsure/i, 1);
p_reg[14] = new Array(31601, /^no idea/i, 1);
p_reg[15] = new Array(31701, /^i.?m not into/i, 1);
if (Includecode10) {
  p_reg[16] = new Array(
    40101,
    /^(not?|no.e*|nothing) *(in particular|at all|really)*.?$/i,
    0
  );
} else {
  p_reg[16] = new Array(40102, /^nothing *to *add*.?$/i, 0);
}
p_reg[17] = new Array(40102, /^nothing *to *add*.?$/i, 0);
p_reg[18] = new Array(40201, /^(not|it.?s)? *(just)? *ok.?$/i, 0);
p_reg[19] = new Array(40301, /^same *[a-z]* *(as)? *[a-z]*.?$/i, 0);
p_reg[20] = new Array(40302, /(see|have) *[a-z ]* *(answer|question).?$/i, 0);
p_reg[21] = new Array(40303, /^(as)? *(before|already) *[a-z]*.?$/i, 0);
p_reg[22] = new Array(40305, /^i? *just *(said|wrote)/i, 0);
p_reg[23] = new Array(40401, /(dumb|stupid|ridiculous) question/i, 0);
p_reg[24] = new Array(40402, /^it speaks for it *self.?$/i, 0);
p_reg[25] = new Array(40502, /^no [a-z]* *reason/i, 0);
p_reg[26] = new Array(
  40601,
  /^i? *((have? ?n.?.? *(got)?)|(do *n.?t have)|no) *a?n? [a-z]* *answer/i,
  0
);
p_reg[27] = new Array(
  40602,
  /^((no comment(s)?)|i? *(d?[on]*.?t? *[a-z]* *(have)? *a? *comments?))/i,
  0
);
p_reg[28] = new Array(40603, /^n.?(a|c).?$/i, 0);
p_reg[29] = new Array(40701, /^i? *[a-z]* *do *n.?t *want *(to).?$/i, 0);
p_reg[30] = new Array(40702, /^not prepared to [a-z]*.?$/i, 0);
p_reg[31] = new Array(
  40802,
  /^[a-z`']* *not *(to)? (say(ing)?|disclose).?$/i,
  0
);
p_reg[32] = new Array(
  50301,
  /^(because)? *[a-z]* *[a-z]* *(my|personal) *[a-z]* *(opi.ion|experience)/i,
  2
);
p_reg[33] = new Array(50302, /matter of opinion.?$/i, 2);
p_reg[34] = new Array(50303, /(feels [a-z]*|way i feel).?$/i, 2);
p_reg[35] = new Array(50401, /^50.50.?$/i, 2);
p_reg[36] = new Array(
  50403,
  /^(neither|not|bit) *[a-z]* *(and)? *(n?o[rt]|bit) *[a-z]*.?$/i,
  2
);
p_reg[37] = new Array(50404, /^it depends.?$/i, 2);
p_reg[38] = new Array(50405, /^i? *(have)? *mixed feelings/i, 2);
p_reg[39] = new Array(50502, /of course.?$/i, 2);
p_reg[40] = new Array(50503, /^(because|cos) *[a-z]* *[a-z]*.?$/i, 2);
p_reg[41] = new Array(50601, /just do.?$/i, 2);
p_reg[42] = new Array(50602, /just like it.?$/i, 2);
p_reg[43] = new Array(50604, /how it should be.?$/i, 2);
p_reg[44] = new Array(50605, /((the way it is)|(jus. (is|did))).?$/i, 2);
p_reg[45] = new Array(50606, /^just what it is.?$/i, 2);
p_reg[46] = new Array(50607, /^(it *.?s|that.?s)? the way.?$/i, 2);
p_reg[47] = new Array(50608, /how i feel.?$/i, 2);
p_reg[48] = new Array(50609, /^i? *just am.?$/i, 2);
p_reg[49] = new Array(50701, /why *not.?/i, 2);
p_reg[50] = new Array(50702, /^i? *(don.?t)? *think *so.?$/i, 2);
p_reg[51] = new Array(
  50801,
  /^(because)? *i? *(do *n.?t)? *agreed? *(with)? *[a-z]* *(statement)?.?$/i,
  2
);
p_reg[52] = new Array(50802, /^(not)? *very *[a-z]*.?$/i, 2);
p_reg[53] = new Array(50804, /^(it.?.?s)? *[a-z]* *important.?$/i, 2);
p_reg[54] = new Array(50805, /i *.?m *[i|o]n *the *middle/i, 2);
p_reg[55] = new Array(50806, /^i? *do *n.?t care/i, 2);
p_reg[56] = new Array(
  50807,
  /^((i.?.?m)? *indifferent|no *diff?e?rence.?$)/i,
  2
);
p_reg[57] = new Array(
  50809,
  /^(i..m|not)? *(about|quite|fairly) *[a-z]*.?$/i,
  2
);
p_reg[58] = new Array(50901, /^(because)? *(it.?.?s)? *true.?$/i, 2);
p_reg[59] = new Array(51001, /^(i.?.?m)? *bored *[a-z]*.?$/i, 2);
p_reg[60] = new Array(51011, /^seems *[a-z]*.?$/i, 2);
p_reg[61] = new Array(20101, /^..?$/i, 0);
p_reg[62] = new Array(20102, /^[^aeiouyl ][^aeiouy ][^aeiouy]+$/i, 0);
if (Includecode10)
  p_reg[63] = new Array(
    100101,
    /^[a-z]?[a-z]?[a-z]?[a-z]?[aeiouy][a-z]+.?$/i,
    2
  );

/* motivational statements */
var p_addquestion = new Array();
p_addquestion[0] =
  "We would like to understand what you had in mind when you answered the original question. Please try to answer this follow-up question:";
p_addquestion[1] =
  "Please consider the question again. Your answer is very important for this research project.";
p_addquestion[2] =
  "Please answer in a bit more detail. This is important so that we can understand your answer better.";
p_addquestion[3] =
  "You seem to be in a hurry! Please take another moment to answer the question in as much detail as possible.";
p_addquestion[4] =
  "We need your answer to this question. Please take a moment to answer the question in as much detail as possible.";
p_addquestion[5] =
  "Please consider the question again. Your answer is very important for this research project.";

/* evaluating function using global variables */
// global variables (do not change them)
var _p_do = undefined;
var _p_ask = false; // default
var _p_code = undefined;
var _p_ask_content = undefined;

// study.options.datastore.set("p_code", -3); // save in datastor pcode

function evalprobeanswer() {
  var user_content = $("textarea").val();

  // respondent answers too fast (probably copy & paste)
  if (study.options.datastore.get("duration") < MinDuration) {
    _p_do = false;
    _p_code = 8888;
    _p_ask = true; // follow up question
    _p_ask_content = p_addquestion[3];
  }else{
    _p_do = true;
  }

  // long answers are per definition never nonresponse
  if (_p_do) {
    if (user_content.length < AnswerLength) {
      _p_do = true;
      _p_code = undefined;
      _p_ask = true; // follow up question
    } else {
      _p_do = false;
      _p_code = -3;
      _p_ask = false; // no follow up question
    }
  }

  // answer is empty
  if (user_content.length == 0) {
    _p_do = false;
    _p_code = 9990;
    _p_ask = true; // follow up question
    _p_ask_content = p_addquestion[4];
  }

  // matching regex
  if (_p_do) {
    for (var i = 0; i < p_reg.length; ++i) {
      if (user_content.search(p_reg[i][1]) != -1) {
        _p_code = p_reg[i][0];
        _p_ask_content = p_addquestion[p_reg[i][2]];
        _p_do = false;
        break;
      }
    }
  }

  study.options.datastore.get("duration");

  // fallback: Use the general follow-up text
  if (!_p_do & !Followupisspecific) {
    _p_ask_content = p_addquestion[5];
    _p_ask = true; // follow up question
  }

  // ELSE -> -2
  /*
  ?
      if (_p_do) {
        if (mslastkey > 0) {
            _p_code = -2;
            _p_ask = false; // no follow up question

        } else {
            _p_code = -20;
            _p_ask = false; // no follow up question
        }
      }
      */

      /*
  console.log("user_content", user_content);
  console.log("_p_do", _p_do);
  console.log("_p_code", _p_code);
  console.log("_p_ask", _p_ask);
  console.log("_p_ask_content", _p_ask_content);
  */
  return null;
}
