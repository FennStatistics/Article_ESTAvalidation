const textObj = {
  greetings: `
  <header>
  <h2>Thank you for participating in a study by the Cognition, Action, and Sustainability Unit of the University of
      Freiburg!</h2>
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
          purpose, in the following study, your behavior will be measured (e. g. choices, reaction times).
      </section>
      <br>
      <section>
          The duration of the study is approximately 10 minutes. At the bottom, you will see a progress bar,
          progressively turning greener, symbolising your progress in the study. Please use a <strong>computer or
              laptop with a keyboard</strong> for the study. Sit upright at a table and ensure that you can
          participate in the study without being disturbed.
      </section>
      <br>
      <section>
          The aim of the study is to measure your attitude towards an emerging technology, through
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
                                  and that <strong>I not agree</strong> to the above conditions of participation.
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
  setupStudy: `
  <header>
    <h2>Overview of the study:</h2>
  </header>
  
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">
<section>
The study is divided into the following parts: 
</section>
<br>
<br>
<table>
  <tr>
   <td>1) Answer an initial question.</td>
  </tr>
  <tr>
    <td>2) Read a text introducing an emerging technology.</td>
  </tr>
  <tr>
    <td>3) Referring to the text, answer further questions.</td>
  </tr>
</table>
<br>
<section>
The individual sections are explained and justified below. Thank you again for participating in the study. We encourage you to answer all the following questions honestly.
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
<div style="align-items: display: flex;">
<strong style="font-size: 22px;">Climate Engineering</strong>
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
  scenarioText_climateChange: `
  <header>
    <h2 >
    Please read the following text carefully. The technology explained on the next page refers to it:
    </h2>
  </header>
  
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">

  <section>
  According to the latest report by the Intergovernmental Panel on Climate Change (IPCC), the global average surface temperature has risen at a rate of 1°C (1.8°F) compared to 1900. It is extremely likely that this effect is caused by increased emissions of greenhouse gases such as carbon dioxide (CO2). Greenhouse gas emissions are released for example through the burning of coal, oil and gas. One degree may not seem like much, but it already has an impact, which can worsen in the future as the temperature continues to rise: 
  </section>
  <ul>
  <li>
  Increasingly extreme weather events, like heavy rainfall and storms. 
  </li>
  <li>
  The oceans are warming due to human influence, which is leading to the melting of the polar ice caps.
  </li>
  <li>
   Increased acidity of the ocean, because the water takes up too much of the released CO2, which is leading to the destruction of corals reefs worldwide.
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
  scenarioText_Technology: `
  <header>
    <h2 >
    Please read the following text carefully. The questions later in the study refer to it:
    </h2>
  </header>
  
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">

  <section>
  One possibility to counteract global warming is to reflect incoming heat from the sun brought by sunlight back into space to prevent further warming of land and oceans. This is called Solar Radiation Management. One specific technique would be "Stratospheric Aerosol Injection" using sulfur particles that are being released in higher regions of the atmosphere, which reflect sunlight partially back out into space before it warms the earth. Sulfur is a chemical element found in almost all life forms. It, for example, gives eggs their distinctive smell. When a volcano erupts, sulfur particles are also released into the atmosphere, where they produce a cooling effect, which was demonstrated by past volcanic eruptions. This could be mimicked by directly releasing sulfur particles into the air, for example by airplane, about 15 kilometers (50.000 feet) from the Earth's surface. There the particles would disperse and reflect partially the incoming sunlight. The benefits of "Stratospheric Aerosol Injection" (SAI) would be:   
  </section>
  <ul>
  <li>
  feasible and potentially very effective technique 

    </li>
  <li>
  compared to other technologies the costs of SAI are low  
    </li>
  <li>
  SAI could be deployed rather soon and would start to reduce temperatures within one year   </li>
  </ul>
  <section>
  However, this technique also comes with certain risks and uncertainties: 
    </section>
    <ul>
  <li>
	once started SAI needs to be deployed for decades or centuries – otherwise temperature could rise even more dramatically within just a few years
   </li>
  <li>
 SAI does nothing to counter the inherent cause of climate change – the concentration of carbon dioxide (CO2) in the atmosphere - and therefore it does not reduce the acidity of the ocean 
   </li>
  <li>
 	political and social conflicts over its use, as one country could deploy SAI, but affect the whole Earth
  </li>
  </ul>
  <section>
  As the potential side effects have not yet been fully resolved, this technique would only be an emergency solution in the case that the temperature actually rises close to the 2°C (3.6°F) target, which nearly all countries in the world have agreed upon. In order to achieve the target, the deployment of "Stratospheric Aerosol Injection" would have to start within the next few years. It does not change the fact, that we have to change our lifestyles and transform the economy in a way that limits global warming to 2°C (3.6°F) or lower until 2100.     
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
  preKnowledge: `
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
  postClearBias: `
  <header>
    <h2>
    Please answer the following questions:
    </h2>
  </header>


  <p>Please refer to the text about "Stratospheric Aerosol Injection" when answering the questions. </p>

  
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify" style="display: block">
        
    <form id="demography">
      <table>

        <!-- Clear SAI -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
          Do you feel that the information you just read was clear?
          </td>
          <td>
            <select id="clearSAI" name="clearSAI" required class="w-100">
              <option value="" selected>
              -- Please select --
              </option>
              <option value="4">It was completely clear.</option>
              <option value="3">It was somewhat clear.</option>
              <option value="2">It was somewhat unclear.</option>
              <option value="1">It was completely unclear.</option>
            </select>
          </td>
        </tr>


        <!-- Clear SAI text   -->
        <tr id="hideClearSAItext" style="height: 100px">
          <td class="font-weight-bold text-left">
          Why do you think the information about Stratospheric Aerosol Injection was unclear?
          <br>
          <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
          Please write a short answer.
          </p>
          </td>
          <td>
          <textarea id="clearSAItext" name="clearSAItext" class="w-100" rows="3"></textarea>
          </td>
        </tr>


        <!-- Bias SAI -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
          Do you feel that the information you just read had a bias?
          </td>
          <td>
            <select id="biasSAI" name="biasSAI" required class="w-100">
              <option value="" selected>
              -- Please select --
              </option>
              <option value="3">It was supportive of Stratospheric Aerosol Injection.</option>
              <option value="2">It was neutral, and did not support or oppose Stratospheric Aerosol Injection.</option>
              <option value="1">It was opposed to Stratospheric Aerosol Injection.</option>
            </select>
          </td>
        </tr>
      
        <!-- Bias SAI text   -->
        <tr id="hideBiasSAItext" style="height: 100px">
          <td class="font-weight-bold text-left">
          Why do you think the information about the Stratospheric Aerosol Injection was not neutral?
          <br>
          <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
          Please write a short answer.
          </p>
          </td>
          <td>
          <textarea id="biasSAItext" name="biasSAItext" class="w-100" rows="3"></textarea>
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
  
  understandingText: `
  <header>
    <h2>
    Please answer the following questions:
    </h2>
  </header>


  <p>  When answering the questions, please refer to the text on "Stratospheric Aerosol Injection" that you have just read.</p>

  
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify" style="display: block">
        
    <form id="demography">
      <table>

        <!-- Clear SAI text   -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
         Please explain the "Stratospheric Aerosol Injection" technology described in the text.
          <br>
          <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
          Please write a short answer.
          </p>
          </td>
          <td>
          <textarea id="undSAIgeneral" name="undSAIgeneral" class="w-100" rows="3" required></textarea>
          </td>
        </tr>

      
        <!-- Bias SAI text   -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
          What is to be accomplished with this technology?
          <br>
          <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
          Please write a short answer.
          </p>
          </td>
          <td>
          <textarea id="undSAIgoal" name="undSAIgoal" class="w-100" rows="3" required></textarea>
          </td>
        </tr>


        <!-- Bias SAI text   -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
          How does this technology accomplish its goal?
          <br>
          <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
          Please write a short answer.
          </p>
          </td>
          <td>
          <textarea id="undSAIhow" name="undSAIhow" class="w-100" rows="3" required></textarea>
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
  








  feedbackQues: `
  <header>
    <h2>
    Bitte beantworten Sie die folgende letzte Frage, wenn Sie möchten: 
    </h2>
  </header>
  
  <main class="content-horizontal-center content-vertical-center" >
  <div class="w-l">
    <form id="page-form" style="display: block;" autocomplete="off">
<!-- multiline text text --> 
<div class="page-item page-item-textarea" id="page-item-feedback_critic">
  <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
  Haben Sie Feedback oder Kritik zu der Onlinestudie?
  </p>
  <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
  Jegliche Kritik oder Verbesserungsvorschläge werden uns sehr helfen, zukünftige Studien zu verbessern. 
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
}