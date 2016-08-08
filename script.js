var currentPoz = 0;
var textArray = "ceva";
var flag = true;
var timeSleep = 3;
var timpPauza = 0;
// var flagPlay = false; 

// butoane
var buttonPlay = "#btn_play";
var buttonStop = "#btn_stop";
var buttonPause = "#btn_pause";

// input
var inputTextbox = "#i_text";
var inputFrecventa = "#i_wpm";

// output
var outputText = "#o_display";
var culoareOutput1 = "black"
var culoareOutput2 = "red";

console.log($(inputTextbox).text());

function wordsPerMinute(frecventa){
	return (60 / frecventa) * 1000 ;
}

function splitText(inputText){
	textArray = inputText.split(" ");
}

function pauseRead(){
  flag = false;
  delayTrue();
}

function changeStateToTrue(){
  flag = true;
}

function delayTrue(){
  setTimeout(function(){
    changeStateToTrue()
  }, 1000);
}

function stopRead(){
  // flagPlay = false;
  flag = false;
  currentPoz = 0;
  clearText();
  delayTrue();
  setTimeout(function(){
    clearText();
  }, 900)
}

function clearText(){
  $(inputTextbox).val("");
  $(outputText).html("&nbsp;");
}

function afiseazaCuvant(cuvant){
	console.log(cuvant);
$(outputText).css("color", culoareOutput1).text(cuvant);
}

function startRead (){
  if (flag == false || currentPoz >= textArray.length){
    return;
 }

 setTimeout(function(){
  afiseazaCuvant(textArray[currentPoz])
  currentPoz++;
  startRead();
 }, wordsPerMinute($(inputFrecventa).val()) );
}

function timer(index){
  if(index == 0 || currentPoz > 0){
    return;
  }
    setTimeout(function(){
    console.log(index);
    $(outputText).css("color", culoareOutput2).text(index);
    timer(index - 1);
  }, 1000);
}

function setColor(culoare){
  $(outputText).css("color", culoare).text(" ");
}

function selectTimp(){
  if(currentPoz > 0){
    timpPauza = 0
  }else{
    timpPauza = 1000 * timeSleep + 1000;
  }
}

$(document).ready(function(){
      $(buttonPlay).click(function()
           {
            // flagPlay = true;
            selectTimp();
            timer(timeSleep);
            setTimeout(function(){
            startRead(splitText($(inputTextbox).val()));
            }, timpPauza)
           }
      );

      $(buttonStop).click( function()
           {
             stopRead();
           }
      );

      $(buttonPause).click( function()
           {
             pauseRead();
           }
      );
});
