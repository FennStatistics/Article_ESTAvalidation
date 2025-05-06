const textObj = {
  ESTAgeninfo:`
  <header>
    <h2>
Please answer the questions that follow from the perspective of each theory
    </h2>
  </header>

  <main class="content-horizontal-center content-vertical-center">
  
  <form id="page-form">
  <div class="w-l text-justify">
  Our lives are full of <i>binding norms of action</i>, such as that we as humans should not kill other people, cause them pain or suffering, 
  or not rescue people who are in danger. When such norms are violated, we often have a “gut feeling,” for example, we feel revulsion when we see pictures of people suffering.
<br>
<br>
  Similarly, we often instinctively feel that a particular technology is “fair,” “just,” or “morally right.” The central question now is: According to which criteria do we make such judgments? In philosophy, there are so-called ethical theories that attempt to provide a clear idea of how we should morally evaluate a technology. Using different ethical theories to make ethical judgments about a technology illuminates our thinking and presents different perspectives on technologies.
  <br>
  <br> 
  In the following we briefly introduce the ethical theories and ask you to read them as carefully as possible. 
  Then we would like you to <b>answer the questions that follow from the perspective of each theory</b>. 
      </form>
  </div>
</main>


<footer class="content-vertical-center content-horizontal-right">
<div class="w-l text-justify">
Do not press "Continue" until you have read the text carefully. The "Continue" button is locked for 10 seconds.
</div>
&nbsp; <button id="continue" type="submit" form="page-form">
Continue &rarr;
</button>
</footer>
  `,
  ESTAtheorydefinition:`
  <header>
    <h2>
    In the following we want to ask you to evaluate the "` +
    "${TechnologyScenario} " +
    `" technology regarding the <span id="ethicTheory_def_top"></span>
     </h2>
  </header>

  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">

  <span id="ethicTheory_name" style="font-style: italic;"></span>  <span id="ethicTheory_beforemain"></span>
  <img id="ethicTheory_image" src="" alt="Please contact the study administration that something went wrong" style="width:100%;" class="centerIMG">
  <br>
  <div  style="border: 2px dashed black; padding: 20px;">
<div id="ethicTheory_definition"></div>      
<form id="feedback">
  </div>
  </form>
  </div>
</main>
  
  <footer class="content-vertical-center content-horizontal-right">
  <div class="w-l text-justify">
  </div>
  <button id="continue" type="submit" form="feedback">
  Continue &rarr;
</button>

</footer>
  `,
  ESTAscale:`
  <main class="content-horizontal-center content-vertical-center">
  
  <div class="w-l">
    <form id="page-form">
      <!-- START question block --> 
      <div>
        <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
        Please refer to the explanation of "<span id="ethicTheory_name1"></span>" you have just read and indicate on the following scale how you would 
        ethically evaluate the technology. The technology ` +
    "${TechnologyScenario}" +
    `...
        </p>
        
        <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
          Read the items and then mark the appropriate answers.
        </p>
            
        <table class="page-item-table" id="tablerandom">
          <colgroup>
            <col style="width: 29%">
            <col style="width: 6%">
            <col style="width: 6%">
            <col style="width: 6%">
            <col style="width: 6%">
            <col style="width: 6%">
            <col style="width: 6%">
            <col style="width: 6%">
            <col style="width: 29%">
          </colgroup>

         <thead class="sticky-top">
            <tr><th class="sticky-top "></th>
              <th class="sticky-top text-center">
                1
              </th>
              <th class="sticky-top text-center">
                2
              </th>
              <th class="sticky-top text-center">
                3
              </th>
              <th class="sticky-top text-center">
                4
              </th>
              <th class="sticky-top text-center">
                5
              </th>
                    <th class="sticky-top text-center">
                6
              </th>
                    <th class="sticky-top text-center">
                7
              </th><th class="sticky-top"></th>
            </tr>
          </thead>

        <tbody>
<!-- bipolar-scale: 1 question --> 
        <tr>
          <td class="small" style="padding-left: 0">XXX</td>
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="small" style="padding-left: 0">XXX</td>
        </tr>
        <!-- bipolar-scale: 2 question --> 
        <tr>
          <td class="small" style="padding-left: 0">XXX</td>
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="small" style="padding-left: 0">XXX</td>
        </tr>
        <!-- bipolar-scale: 3 question --> 
        <tr>
          <td class="small" style="padding-left: 0">XXX</td>
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="small" style="padding-left: 0">XXX</td>
        </tr>
        <!-- bipolar-scale: 4 question --> 
        <tr>
          <td class="small" style="padding-left: 0">XXX</td>
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="small" style="padding-left: 0">XXX</td>
        </tr>
        <!-- bipolar-scale: 5 question --> 
        <tr>
          <td class="small" style="padding-left: 0">XXX</td>
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="small" style="padding-left: 0">XXX</td>
        </tr>
        <!-- bipolar-scale: 6 question --> 
        <tr>
          <td class="small" style="padding-left: 0">XXX</td>
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="small" style="padding-left: 0">XXX</td>
        </tr>
        <!-- bipolar-scale: 7 question --> 
        <tr>
          <td class="small" style="padding-left: 0">XXX</td>
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="small" style="padding-left: 0">XXX</td>
        </tr>
        <!-- bipolar-scale: 8 question --> 
        <tr>
          <td class="small" style="padding-left: 0">XXX</td>
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="small" style="padding-left: 0">XXX</td>
        </tr>
        <!-- bipolar-scale: 9 question --> 
        <tr>
          <td class="small" style="padding-left: 0">XXX</td>
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="small" style="padding-left: 0">XXX</td>
        </tr>
        <!-- bipolar-scale: 10 question --> 
        <tr>
          <td class="small" style="padding-left: 0">XXX</td>
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="small" style="padding-left: 0">XXX</td>
        </tr>
        <!-- bipolar-scale: 11 question --> 
        <tr>
          <td class="small" style="padding-left: 0">XXX</td>
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="text-center">
          </td>
          <td class="small" style="padding-left: 0">XXX</td>
        </tr>
          </tbody>
          </table>
        </div>
  <!-- END question type --> 
      </form>
    </div> 
  </main>
  
  
  
  <footer class="content-horizontal-right content-vertical-center">
    <button type="submit" form="page-form">
      Continue →
    </button>
  </footer>
  `,
  ESTAposteval:`
  <header>
    <h2>
    You just have ethically evaluated the ` +
    "${TechnologyScenario}" +
    ` technology ethically regarding the ethic theory of "<span id="ethicTheory_name1"></span>" 
    </h2>
  </header>

  <main class="content-horizontal-center content-vertical-center">
  
  <form id="feedback">
  <div class="w-l text-justify" style="border: 2px solid black; padding: 10px;">
  Please explain why on average you have answered the previous question by "<span id="setLastValue">X</span>" (which is <span id="verbalizeLastValue">X</span>) 
  regarding the the ethic theory of "<span id="ethicTheory_name2"></span>" 
  <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0; color: #737373;">
  Values are ranging from 1 to 7.
    </p>
    <br>
    Do you think this ethical theory is an important aspect for the evaluation of the ` +
    "${TechnologyScenario}" +
    ` technology?
    <br>
    <textarea id="importanceETtext" name="importanceETtext" class="w-100" rows="8" required></textarea>
      </form>
  </div>
</main>

  
  <footer class="content-vertical-center content-horizontal-right">
  <div class="w-l text-justify">
  </div>
  <button id="continue" type="submit" form="feedback">
  Continue &rarr;
</button>

</footer>
  `,
  FirstQuesComponentTextAgain:`
  <header>
  </header>

  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify" style="border: 2px solid black; padding: 10px;">
    <form id="feedback">
    <span id="setHeader">X</span>
    <br>
    <br>
    <b>Please explain again why you selected "<span id="setLastValue">X</span>"</b>.
    <br>
    <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0; color: #737373;">
  The question was: The technology ` +
  "${TechnologyScenario} " +
  `"...<span id="setLeft">X</span>" (value 1) to "...<span id="setRight">X</span>"(value 7)
    </p>
    <textarea id="category_probe_again" name="category_probe_again" class="w-100" rows="8" required></textarea>
      </form>
  </div>
</main>

  
  <footer class="content-vertical-center content-horizontal-right">
  <div class="w-l text-justify">
  </div>
  <button id="continue" type="submit" form="feedback">
  Continue &rarr;
</button>

</footer>
  `,
  SecondQuesComponentTextAgain:`
  <header>
  </header>

  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify" style="border: 2px dashed black; padding: 10px;">
    <form id="feedback">
    <span id="setHeader">X</span>
    <br>
    <br>
    Please explain again the following question: <span id="setProbe">X</span>
    <br>
    <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0; color: #737373;">
    In doing so, refer to the question: The technology ` +
  "${TechnologyScenario} " +
  `"...<span id="setLeft">X</span>" (value 1) to "...<span id="setRight">X</span>"(value 7), you selected "<span id="setLastValue">X</span>" 
    </p>
    <textarea id="comp_probe_again" name="comp_probe_again" class="w-100" rows="8" required></textarea>
      </form>
  </div>
</main>

  <footer class="content-vertical-center content-horizontal-right">
  <div class="w-l text-justify">
  </div>
  <button id="continue" type="submit" form="feedback">
  Continue &rarr;
</button>

</footer>
  `,
  // introduction phase
  greetings: `
  <header>
  <div class="row">
  <div class="column2">
  <h2>Thank you for participating in a study by the Cognition, Action, and Sustainability Unit of the University of
  Freiburg!</h2>
</div>
  <div class="column">
  <img src="static/UniFreiburg_logo.png" alt="UniFreiburg_logo" style="width:70%; max-height: 150px; max-width: 150px;">
  </div>
</div> 
</header>



<main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">
      <i> Important note in advance: You can always enlarge or reduce the text and images of the study so that you can
          read them better: </i>
      <ul>
          <li>
              Windows: Hold down the <kbd>Ctrl</kbd> key and move your mouse wheel or press the <kbd>+</kbd> or
              <kbd>-</kbd> key on your keyboard
          </li>
          <li>Mac: Press and hold the <kbd>command</kbd> key and move your mouse wheel or press the <kbd>+</kbd> or
              <kbd>-</kbd> key on your keyboard
      </ul>
      <br>
      <br>
      <section>
          With our research, we aim to get a better understanding of human behavior and mental processes. For this
          purpose, in the following study, your behavior will be measured (e.g., choices, reaction times).
      </section>
      <br>
      <section>
          The duration of the study is <b>approximately 35 minutes</b>. At the bottom, you will see a progress bar,
          progressively turning greener, symbolising your progress in the study. Please use a <strong>computer or
              laptop with a keyboard</strong> for the study. Sit upright at a table and ensure that you can
          participate in the study without being disturbed.
      </section>
      <br>
      <section>
          The aim of the study is to measure your attitude towards emerging technologies, through
          questionnaires. On the next pages you will find more information about the exact procedure of the study.
          First of all, we would like to ask you to agree to the informed consent on the following page.
      </section>
  </div>
</main>

<form id="page-form">
</form>

<footer class="content-vertical-center content-horizontal-right">
  To continue the study, please press &nbsp;
  <button id="continue" type="submit" form="page-form">
      Continue &rarr;
  </button>
</footer>
  `,
  informCon: `
  <header>
  <h2>Informed consent</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">
      <section>
          In the following you will receive information regarding your participation in the study. Please read it
          carefully:
      </section>
      <br>
      <section>
          Your participation in the study is voluntary. You can withdraw your consent to participate in this study at
          any time and without giving reasons. You can revoke your consent to the storage of the data until the end of
          the data collection without incurring any disadvantages.
      </section>
      <br>
      <section>
          Since no personal data is collected, once the data collection has been completed, it is in principle no
          longer possible to relate the data in the data set to your person - the data set is anonymous. It is not
          possible for us to delete your data selectively. Nevertheless, we ask you to process the study as
          concentrated and attentive as possible.
      </section>
      <br>
      <section>
          The results and data of this study will be used in the context of future publications. This is done in
          anonymised form, i.e., without the data being able to be assigned to a specific person. If you have any
          questions now or after the experiment, please contact Julius Fenn
          (<a href="mailto:julius.fenn@psychologie.uni-freiburg.de">julius.fenn@psychologie.uni-freiburg.de</a>) or
          Prof. Andrea Kiesel
          (<a href="mailto:kiesel@psychologie.uni-freiburg.de">kiesel@psychologie.uni-freiburg.de</a>).
      </section>
      <br>
      <br>
      <br>
      <form id="page-form" style="display: block;" autocomplete="off">
          <!-- BEGIN multiple choice -->
          <div class="page-item page-item-radio" id="page-item-ques_dummycam">
              <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
                  Please select one of the following options:
              </p>
              <p class="small text-muted hide-if-empty" style="margin: 0.25rem 0">
                  Refusal to the informed consent leads to the termination of the study.
              </p>

              <table class="table-plain page-item-table">
                  <colgroup>
                      <col style="width: 7.5%">
                      <col style="width: 92.5%">
                  </colgroup>
                  <tbody>
                      <!--ans1-->
                      <tr>
                          <td>
                              <input type="radio" name="dummy_informedconsent" value="1" id="dummy_informedconsent"
                                  required>
                          </td>
                          <td>
                              <label for="dummy_informedconsent" class="text-left">
                                  I hereby confirm that I have understood the participant information described above
                                  and that <strong>I agree</strong> to the above conditions of participation.
                              </label>
                          </td>
                      </tr>
                      <!--ans2-->
                      <tr>
                          <td>
                              <input type="radio" name="dummy_informedconsent" value="0" id="dummy_informedconsent"
                                  required>
                          </td>
                          <td>
                              <label for="dummy_informedconsent" class="text-left">
                                  I hereby confirm that I have understood the participant information described above
                                  and that <strong>I do not agree</strong> to the above conditions of participation.
                              </label>
                          </td>
                      </tr>

                  </tbody>
              </table>
          </div>
          <!-- END multiple choice -->
      </form>
  </div>
</main>

<form id="page-form">
</form>

<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
      Continue &rarr;
  </button>
</footer>
  `,
  informConNo: `
  <header></header>
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">
  <section>
      You have not agreed to the informed consent. Unfortunately, this means that the study is over for you. You can
      now close the screen. Press the <kbd>Esc</kbd> key to exit fullscreen mode. 
  </section>
</div>
</main>
  `,
  exclusionCriteria: `
  <header>
    <h2>Thank you for agreeing to the conditions of participation. </h2>
</header>

<main class="content-horizontal-center content-vertical-center">
    <div class="w-l text-justify">
        <section>
            Before we begin, we would like to draw your attention to the following rules during the online study:
        </section>
        <br>
        <ul>
            <li>Please answer the study in a focused manner.</li>
            <li>Do not leave the browser screen of the study unless you are explicitly asked to do so. </li>
            <li>Please read all instructions carefully and comply with them.</li>
        </ul>
    </div>
</main>
<form id="page-form">
</form>

<footer class="content-vertical-center content-horizontal-right">
    <button id="continue" type="submit" form="page-form">
        Continue &rarr;
    </button>
</footer>
  `,
  attentionCheck: `
  <header>
    <h2>Before starting the study we would like to get to know you:</h2>
  </header>
  
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">
<section>
Most modern theories of decision-making recognize the fact that decisions do not take place in a vacuum. Individual preferences and knowledge, along with situational variables, 
can greatly impact the decision process. To facilitate our research on attitudes towards emerging technologies, we are interested in knowing certain factors about you, 
the decision-maker. Specifically, we are interested in whether you take the time to read the instructions; if not, then some of the specific characteristics of 
the described emerging technologies can be overlooked. So, to demonstrate that you have read the instructions, please ignore the sports items below and instead 
select the box marked "other" and type "I read the instructions" in the text box, then click continue. Thank you very much.
</section>
<br>
<br>
<section >
<b>Which of these activities do you engage in regularly?</b>
<br>
Please check all that apply.
<br>
<fieldset id="checkArray"  style="text-align: left; padding: 5px;">
  <div>
    <input type="checkbox" id="attCheck_Skiing" name="attCheck_Skiing">
    <label for="attCheck_Skiing">Skiing</label>
  </div>
  <div>
    <input type="checkbox" id="attCheck_Swimming" name="attCheck_Swimming">
    <label for="attCheck_Swimming">Swimming</label>
  </div>
  <div>
  <input type="checkbox" id="attCheck_Soccer" name="attCheck_Soccer">
  <label for="attCheck_Soccer">Soccer</label>
</div>
<div>
<input type="checkbox" id="attCheck_Tennis" name="attCheck_Tennis">
<label for="attCheck_Tennis">Tennis</label>
</div>
<div>
<input type="checkbox" id="attCheck_Snowboarding" name="attCheck_Snowboarding">
<label for="attCheck_Snowboarding">Snowboarding</label>
</div>
<div>
<input type="checkbox" id="attCheck_Basketball" name="attCheck_Basketball">
<label for="attCheck_Basketball">Basketball</label>
</div>
<div>
<input type="checkbox" id="attCheck_Jogging" name="attCheck_Jogging">
<label for="attCheck_Jogging">Jogging</label>
</div>
<div>
<input type="checkbox" id="attCheck_Cycling" name="attCheck_Cycling">
<label for="attCheck_Cycling">Cycling</label>
</div>
<div>
<input type="checkbox" id="attCheck_Pingpong" name="attCheck_Pingpong">
<label for="attCheck_Pingpong">Ping-pong</label>
</div>
<div>
<input type="checkbox" id="attCheck_Other" name="attCheck_Other">
<label for="attCheck_Other">Other</label>
<input type="text" id="attCheck_OtherText" name="attCheck_OtherText"></input>
</fieldset>
</div>
</section>
<br>
  </div>
</main>


  <form id="page-form"> 
  </form>
  
  <footer class="content-vertical-center content-horizontal-right">
    <button id="continue" form="page-form" onclick="return continueornot();">
    Continue &rarr;
    </button>
  </footer>
  `,
  setupStudy: `
  <header>
    <h2>Overview of the study:</h2>
  </header>
  
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">
<section>
The study is divided into two parts: 
</section>
<br>
<br>
<table>
  <tr>
    <td>1) Read three texts each introducing an emerging technology.</td>
  </tr>
  <tr>
    <td>2) Referring to the texts, answer further questions.</td>
  </tr>
</table>
<br>
<section>
The individual sections are explained and justified below. Thank you again for participating in the study. We encourage you to answer all of the following questions honestly.
</section>
  </div>
</main>
  <form id="page-form"> 
  </form>
  
  <footer class="content-vertical-center content-horizontal-right">
    <button id="continue" type="submit" form="page-form">
    Continue &rarr;
    </button>
  </footer>
  `,
    // Affective Imagery
  AffectiveImageryInst: `
  <header>
  <h2>Instructions "Word Association Game" </h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">
      <strong>How it works...</strong>
      <section>
          On the top of the screen a word is shown. Enter the first word that comes to your mind when reading this
          word. Only if you really don't know this word, press <button
              style="padding:2px; margin-left:0px; margin-right: 0px;" disabled="disabled">Unknown word</button>.
      </section>
      <br>
      <section>
          Press <button style="padding:2px; margin-left:0px; margin-right: 0px;" disabled="disabled">Next
              response</button> to add up to five words or press <button
              style="padding:2px; margin-left:0px; margin-right: 0px;" disabled="disabled">No more
              entries</button> if you can't think of any more.
      </section>
      <br>
      <br>
      <strong>  Some hints</strong>
      <section>
          Only give associations to the word on top of the screen (not to your previous responses!).
          <br>
          Use the <kbd>Enter</kbd> key or press the <button style="padding:2px; margin-left:0px; margin-right: 0px;" disabled="disabled">Next
              response</button> button to add associations.
      </section>
  </div>
</main>
<form id="page-form">
</form>

<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
      Continue &rarr;
  </button>
</footer>
  `,
  AffectiveImagery: `
  <main class="content-horizontal-center content-vertical-center">
  <div>
      What are the first thoughts or images that come to your mind when you think of: 
      <br>
      <br>
<div style="align-items: display: flex;"> <strong style="font-size: 22px;">` +
"${AffectiveImageryTechnology}" +
`
</strong>
</div>
<br>
    <form id="affectiveImageryForm">
      <div class="affectiveImagery">
          <div class="form-group">
              <input id="R1" name="R1" class="form-control" placeholder="Enter your first association" type="text"
                  autocorrect="off" autocapitalize="none" autofocus="" autocomplete="off" tabindex="1">
          </div>
          <div class="form-group">
              <input id="R2" name="R2" class="form-control" placeholder="" type="text" autocorrect="off"
                  autocapitalize="none" autofocus="" autocomplete="off" tabindex="2" disabled="">
          </div>
          <div class="form-group">
              <input id="R3" name="R3" class="form-control" placeholder="" type="text" autocorrect="off"
                  autocapitalize="none" autofocus="" autocomplete="off" tabindex="3" disabled="">
          </div>
          <div class="form-group">
              <input id="R4" name="R4" class="form-control" placeholder="" type="text" autocorrect="off"
                  autocapitalize="none" autofocus="" autocomplete="off" tabindex="4" disabled="">
          </div>
          <div class="form-group">
              <input id="R5" name="R5" class="form-control" placeholder="" type="text" autocorrect="off"
                  autocapitalize="none" autofocus="" autocomplete="off" tabindex="5" disabled="">
          </div>

          <small class="text-muted" id="progressLabel">Progress</small>
        
          <div class="progress" style="background: white;">
            <div class="progress-bar-AffectiveImg" style="background: #229954;"> 
          </div>
        </div>


        <div style="align-items: display: flex;">
        <!-- Prevent implicit submission of the form -->
        <button type="submit" disabled style="display: none" aria-hidden="true"></button>
      
              <button type="button" class="btn btn-default" tabindex="-1" id="submitAssoButton"><span
                      class="glyphicon glyphicon-plus"></span>&nbsp;Next response</button>
              <button type="submit" class="btn btn-default" tabindex="-1" id="finalResponse"><span
                      class="glyphicon glyphicon-ok" form="affectiveImageryForm"></span>&nbsp;End the input</button>
              <button type="submit" class="btn btn-default" tabindex="-1" id="skipResponse"><span
                      class="glyphicon glyphicon-minus" form="affectiveImageryForm"></span>&nbsp;No more entries</button>
              <button type="submit" class="btn btn-default" tabindex="-1" id="unknownResponse"><span
                      class="glyphicon glyphicon-remove" form="affectiveImageryForm"></span>&nbsp;Unknown word</button>
          </div>
      </div>
  </form>
  </div>
  
</main>
  `,
  // question pre: pre knowledge of SRM  
  SAIpreKnowledge: `
  <header>
    <h2>
    Please answer the following question:
    </h2>
  </header>
  
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify" style="display: block">
    
    <p>Before you read a text introducing an emerging technology we would like you to answer one more question: </p>
    
    <form id="demography">
      <table>

        
        <!-- Knowledge SRM -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
          Have you ever heard about Solar Radiation Management before or have you never heard about it before?
          </td>
          <td>
            <select id="knowSRM" name="knowSRM" required class="w-100">
              <option value="" selected>
              -- Please select --
              </option>
              <option value="knowSRMno">No, I have never heard about it</option>
              <option value="knowSRMlittle">Yes, I have heard a little about it.</option>
              <option value="knowSRMlot">Yes, I have heard a lot about it.</option>
            </select>
          </td>
        </tr>
      

        <!-- Definition SRM   -->
        <tr id="hideKnowSRMdefinition" style="height: 100px">
          <td class="font-weight-bold text-left">
          What do you think Solar Radiation Management is?
          <br>
          <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
          Please write a short answer.
          </p>
          </td>
          <td>
          <textarea id="knowSRMdefinition" name="knowSRMdefinition" class="w-100" rows="3"></textarea>
          </td>
        </tr>

 
        <!-- Column balance -->
        <colgroup>
          <col style="width: 50%">
          <col style="width: 50%">
        </colgroup>
      </table>
      </form>
  </div>
</main>

  
  <footer class="content-vertical-center content-horizontal-right">
  <div class="w-l text-justify">
  </div>
  <button id="continue" type="submit" form="demography">
  Continue &rarr;
</button>

</footer>
  `,
    // Scenario Texts
    //> SAI
    SAITextClimate: `
  <header>
    <h2 >
    Please read the following text carefully. The technology explained on the next page refers to it:
    </h2>
  </header>
  
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">

  <section>
  According to the latest report by the Intergovernmental Panel on Climate Change (IPCC), the global average surface temperature has risen at a rate of 1°C (1.8°F) compared to 1900. It is extremely likely that this effect is caused by increased emissions of greenhouse gases such as carbon dioxide (CO2). Greenhouse gas emissions are released for example by burning coal, oil and gas. One degree may not seem like much, but it already has an impact, which can worsen in the future as the temperature continues to rise: 
  </section>
  <ul>
  <li>
  Increasingly extreme weather events, like heavy rainfall and storms. 
  </li>
  <li>
  Warming of the oceans due to human influence, which is leading to the melting of the polar ice caps. 
  </li>
  <li>
  Increased acidity of the ocean, because the water absorbs too much of the CO2 being released, which is leading to the destruction of coral reefs worldwide. 
  </li>
  </ul>
  <section>
  If greenhouse gas emissions continue as they are right now, by 2100 the global temperature could rise up to 3.3 – 5.7°C (5.94 – 10.26°F) compared to before 1900. 
  </section>
  </div>
</main>

  <form id="page-form"> 
  </form>
  
  <footer class="content-vertical-center content-horizontal-right">
  <div class="w-l text-justify">
  Do not press "Continue" until you have read the text carefully. The "Continue" button is locked for 15 seconds.
  </div>
  &nbsp; <button id="continue" type="submit" form="page-form">
  Continue &rarr;
</button>
</footer>
  `,
  SAITextTechnology: `
  <header>
    <h2 >
    Please read the following text carefully. The questions later in the study refer to it:
    </h2>
  </header>
  
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">

  <section>
  Imagine you find yourself in the year 2030. Despite worrying reports, greenhouse gases have not been sufficiently reduced and governments around the world are beginning to use new technologies to halt global warming. 
  </section>
  <br>
  <section>
  The scenario describes a typical day in the life of Charlie, a citizen confronted with the new technological developments being used to stop further global warming. Charlie is concerned about the technology, but also sees hope that climate change could be stopped.
  </section>
  <section>
  On a Saturday in the year 2030, Charlie looks up into the sky and sees planes releasing sulfur particles into higher regions of the atmosphere at around 50.000 feet (15 kilometers). Charlie remembers that these sulfur particles reflect sunlight partially back out into space before they warm the earth. He knows that this technique is called "Stratospheric Aerosol Injection", and that it aims to reflect incoming heat from the sun back into outer space to prevent further warming of land and oceans. The cooling effect of this technique was demonstrated by past volcanic eruptions, because, when a volcano erupts, sulfur is also released into the atmosphere. To the best of Charlie's knowledge sulfur is a chemical element found in almost all life forms, and is what gives eggs their distinctive smell for example. Charlie looks at the planes in the sky and thinks about the advantages of "Stratospheric Aerosol Injection" (SAI): 
  </section>
  <ul>
  <li>
    SAI is feasible and potentially very effective. 
  </li>
  <li>
    the costs of SAI are low compared with other technologies. 
  </li>
  <li>
    when SAI is deployed, it should lower temperatures within a year.
  </li>
  </ul>
  <section>
  However, Charlie is very concerned that this technique also comes with certain risks and uncertainties: 
    </section>
    <ul>
  <li>
    SAI needs to be deployed for decades or centuries – otherwise temperature could rise even more dramatically within just a few years.
  </li>
  <li>
    SAI does nothing to counter the inherent cause of climate change – the concentration of carbon dioxide (CO2) in the atmosphere - and therefore it 
    does not reduce the acidity of the ocean. 
  </li>
  <li>
    There are already political and social conflicts over its use, as single countries deploying SAI but affecting the whole Earth.
  </li>
  </ul>
  <section>
  Charlie feels frightened, because potential side effects have not yet been fully resolved and it is unclear what will happen in the future. This technique is being used as an emergency solution, because the temperature has risen beyond the 2°C (3.6°F) target, which nearly all countries in the world had agreed upon. Charlie reflects that, despite SAI, we have to change our lifestyles and transform the economy in a way that limits global warming even further. 
  </section>
  </div>
</main>

  <form id="page-form"> 
  </form>
  
  <footer class="content-vertical-center content-horizontal-right">
  <div class="w-l text-justify">
  Do not press "Continue" until you have read the text carefully. The "Continue" button is locked for 30 seconds.
  </div>
  &nbsp; <button id="continue" type="submit" form="page-form">
  Continue &rarr;
</button>
</footer>
  `,
   //> SR
  SRTextTechnology: `
  <header>
    <h2 >
    Please read the following text carefully. The questions later in the study refer to it:
    </h2>
  </header>
  
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">

  <section>
  Imagine you find yourself in the year 2030. Technological advances in social robotics and Artificial Intelligence (AI) have made it possible for the company HomeTec to develop a new social robot known under its brand name HomeMate:
  </section>
  
  <br>

  <section>
  June and Gary Miller were a professionally ambitious couple in their mid-forties. They lived with their three children in a house in an attractive neighborhood on the outskirts of a large city. To make everyday life easier, the Millers decided to order HomeMate.
  </section>

  <section>
  Gary was impressed by HomeMate's initial ability to operate autonomously in the Millers' home. HomeMate understood everyday social situations and responded according to social norms, such as greeting visitors. The latest approaches to robot learning and a sophisticated sensory system enabled HomeMate to learn and adapt its behavior. As a result, HomeMate was soon able to call family members by name and interact with each family member in an appropriate manner. Based on body features such as facial expression or tone of voice, HomeMate was able to recognize the Millers' states of mind and, for example, comforted the children when they cried. Sometimes June and Gary felt guilty because they tended to send HomeMate ahead when the kids were in a bad mood or needed emotional support.
  </section>

  <section>
  HomeMate's human-like design and increasing ability to interact with the Millers led the children to name the robot "Rob". When Rob was playing with the children, it appeared as if they were having real conversations. Only upon closer inspection could one notice that Rob’s responses and behavior were quite stereotypical after all. But nevertheless, the children saw the robot more and more as a companion. June noticed with concern that her kids’ general behavior was slowly changing. One of her sons even told her that his friends were exhausting and that he would prefer to play with Rob.
  </section>

  <section>
  When the kids were home alone, the parents used Rob's surveillance feature to make sure they weren't doing anything wrong. June had already secretly overheard conversations between her daughter and her first boyfriend. She hadn't been able to resist, but she was actually ashamed of herself. And what if HomeTec, like her, didn't respect privacy and data protection and was surveilling her and her family?
  </section>

  <section>
  One day, the Millers’ son Alex reported that one of his classmates also wanted a HomeMate. His parents, however, had told him they did not earn enough money to be able to afford such an expensive robot.
  </section>
  </div>
</main>

  <form id="page-form"> 
  </form>
  
  <footer class="content-vertical-center content-horizontal-right">
  <div class="w-l text-justify">
  Do not press "Continue" until you have read the text carefully. The "Continue" button is locked for 30 seconds.
  </div>
  &nbsp; <button id="continue" type="submit" form="page-form">
  Continue &rarr;
</button>
</footer>
  `,
   //> NPP
   NPPTextTechnology: `
   <header>
     <h2 >
     Please read the following text carefully. The questions later in the study refer to it:
     </h2>
   </header>
   
   <main class="content-horizontal-center content-vertical-center">
   <div class="w-l text-justify">
 
   <section>
   Imagine you find yourself in the year 2030. Technological advances in material development and nanotechnology have made it possible for the company NanoTec to develop a new jacket known as the Nano-Pat-Parka.    </section>
   
   <br>
 
   <section>
   The text describes the properties and functionalities of the Nano-Pat-Parka: 
   </section>
 
   <br>

   <section>
The bio-inspired Nano-Pat-Parka consists of an inner jacket made of ecological down and a reliable and versatile outer jacket that offers protection from the weather. The outer jacket contains cadmium, a toxic substance. Therefore, the Nano-Pat-Parka is not compostable.
   </section>
 
   <section>
   The Nano-Pat Parka is adaptive and autonomous. It can adapt to different external and internal conditions with the help of complex sensory systems. This can result in loud, clacking noises and unexpectedly result in a bulky appearance. Due to the smart technology and nanoparticles it contains, the Nano-Pat-Parka is able to learn. Its adaption to external conditions cannot be switched on and off. It is as yet unknown what will become possible with continuous use of the jacket.
    </section>
 
   <section>
   If there is friction, e.g., when wearing a backpack, the woven molecular N100pX laminate becomes stiff, this can lead to unpleasant smells. In case of contact with stones or objects, the micro-electromechanical inserts in the forearm and back area can dynamically act as protectors.
    </section>
 
   <section>
   Having a self-illuminating and reflective surface, the outdoor jacket is highly visible and can use solar power to be completely energy-autonomous. The Nano-Pat parka is relatively maintenance-intensive. For example, the built-in technology may start to buzz, which needs to be fixed.
    </section>

    <section>
    By recording and transmitting data (such as the external temperature or body temperature) and GPS data, the company NanoTec aims to improve the Nano-Pat parka continuously. The data sent in this way also allows the Nano-Pat-Parka to call an ambulance completely autonomously in case of an emergency. To this end, the Nano-Pat-Parka is just a prototype but is continuously being tested for its functionality.
     </section>

     
    <section>
    The main question is whether the properties of the Nano-Pat-Parka are an appropriate response to the changing climatic conditions around the world and the associated need to provide increased protection for people living in challenging environments. This leads to further questions about whether the benefits outweigh the costs for society and what the ethical and societal implications of the Nano-Pat-Parka are.
    </section>
   </div>
 </main>
 
   <form id="page-form"> 
   </form>
   
   <footer class="content-vertical-center content-horizontal-right">
   <div class="w-l text-justify">
   Do not press "Continue" until you have read the text carefully. The "Continue" button is locked for 30 seconds.
   </div>
   &nbsp; <button id="continue" type="submit" form="page-form">
   Continue &rarr;
 </button>
 </footer>
   `,

  feedbackQues: `
  <header>
    <h2>
    Please answer the following last question if you wish:
    </h2>
  </header>
  
  <main class="content-horizontal-center content-vertical-center" >
  <div class="w-l">
    <form id="page-form" style="display: block;" autocomplete="off">
<!-- multiline text text --> 
<div class="page-item page-item-textarea" id="page-item-feedback_critic">
  <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
  Do you have any feedback or criticism about the online study? 
  </p>
  <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
  Any criticism or suggestions for improvement will be of great help in improving future studies. 
  </p>
  <textarea name="feedback_critic" class="w-100" rows="4"></textarea>
</div>
<!-- END multiline text --> 
     
    </form>
  </div> 
</main>
  
  <footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
  Continue &rarr;
</button>
</footer>
  `,
};
