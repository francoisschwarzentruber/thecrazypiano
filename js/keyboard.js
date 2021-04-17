var keys = new Array();


function Key(x1, y1, width, height, color, midiNote, name)
{
   this.x1 = x1;
   this.y1 = y1;
   this.width = width;
   this.height = height;
   this.color = color;
   this.topcolor = color;
   this.midiNote = midiNote;
   this.selected = false;
   this.name = name;


}


Key.prototype = {
     draw : function(context)
	  {
	      context.beginPath();


	      var my_gradient=context.createLinearGradient(0,0,0,170);
	      my_gradient.addColorStop(0,this.topcolor);
	     // my_gradient.addColorStop(0.05,'white');
	      if(this.topcolor != "white")
	      {
		  my_gradient.addColorStop(0.05,'white');
	          my_gradient.addColorStop(0.5,this.color);
	      }
	      my_gradient.addColorStop(1,this.color);
	      context.fillStyle=my_gradient;

	      if(this.selected)
	      {
		  var w = 3;
		  var x1r = 1+Math.random() * w - w/2;
		  var x2r = -1+Math.random() * w - w/2;
		  var x3r = -1+Math.random() * w - w/2;
		  var x4r = 1+Math.random() * w - w/2;
		  var y1r = -1+Math.random() * w - w/2;
		  var y2r = -1+Math.random() * w - w/2;
		  var y3r = 1+Math.random() * w - w/2;
		  var y4r = 1+Math.random() * w - w/2;

		  context.lineWidth = 4;
		  context.moveTo(this.x1 + x1r, this.y1  + y1r);
		  context.lineTo(this.x1 + this.width + x2r, this.y1 + y2r);
		  context.lineTo(this.x1 + this.width + x3r, this.y1 + this.height   + y3r);
		  context.lineTo(this.x1 + x4r, this.y1 + this.height   + y4r);
		  context.lineTo(this.x1  + x1r, this.y1  + y1r);

	      }
	      else
	      {
		  context.lineWidth = 1;
	          context.rect(this.x1, this.y1, this.width, this.height);
	      }


	      context.fill();
	      context.stroke();
	      context.fillStyle="#000000";
	      var x = this.x1+0.5;
	      var y = this.y1 + this.height-20;
	      context.fillText(this.name, x, y);
	  },

    contains : function(x, y)
   {
      return (this.x1 <= x) && (x <= this.x1 + this.width) && (this.y1 <= y) && (y <= this.y1 + this.height);
   }


};



/*
var WHITEKEY_HEIGHT = 96;
var WHITEKEY_WIDTH = 24;

var BLACKKEY_HEIGHT = 58;
var BLACKKEY_WIDTH = 16;

var QUARTERTONEKEY_HEIGHT = 32;
var QUARTERTONEKEY_WIDTH = 10;

*/


var WHITEKEY_HEIGHT = 96;
var WHITEKEY_WIDTH = 32;

var BLACKKEY_HEIGHT = 58;
var BLACKKEY_WIDTH = 24;

var QUARTERTONEKEY_HEIGHT = 32;
var QUARTERTONEKEY_WIDTH = 12;















var base = 60; //do
var xdebut;
var shiftNote = 12*0;

function constructionKeyBoardXDebutSet(x, newShiftNote)
{
    xdebut = x;
    shiftNote = newShiftNote;
}

function createWhiteKey(ipos, numnote, name)
{
    return new Key(xdebut + ipos*WHITEKEY_WIDTH, 0, WHITEKEY_WIDTH, WHITEKEY_HEIGHT,  "white", shiftNote + base + numnote, name);
}


function createQuarterToneKey(ipos, numnote, name)
{
    return new Key(xdebut + (ipos+1)*WHITEKEY_WIDTH - BLACKKEY_WIDTH / 2 - QUARTERTONEKEY_WIDTH / 2, 0, QUARTERTONEKEY_WIDTH, QUARTERTONEKEY_HEIGHT,  "gray", shiftNote + base + numnote, name);
}




function createBlackKey(ipos, numnote, name)
{
    return new Key(xdebut + (ipos+1)*WHITEKEY_WIDTH - BLACKKEY_WIDTH / 2 , 0, BLACKKEY_WIDTH, BLACKKEY_HEIGHT,  "rgb(128, 128, 128)", shiftNote + base + numnote, name);
}




var setKeyBoardComputerKeys = undefined; // function that set the connection between the keyboard and the keyboard of the computer




function getKeyBoardNormal()
{
    var K = new Array();
    for(var numoctave = 1; numoctave < 10; numoctave++)
	{

	      constructionKeyBoardXDebutSet((7 * WHITEKEY_WIDTH) * (numoctave-1), 12*numoctave-12*4);

	      K.push(createWhiteKey(0, 0, "C"));
	      K.push(createWhiteKey(1, 2, "D"));
	      K.push(createWhiteKey(2, 4, "E"));
	      K.push(createWhiteKey(3, 5, "F"));
	      K.push(createWhiteKey(4, 7, "G"));
	      K.push(createWhiteKey(5, 9, "A"));
	      K.push(createWhiteKey(6, 11, "B"));

	      K.push(createBlackKey(0, 1, ""));
	      K.push(createBlackKey(1, 3, ""));
	      K.push(createBlackKey(3, 6, ""));
	      K.push(createBlackKey(4, 8, ""));
	      K.push(createBlackKey(5, 10, ""));
	}

	return K;
}



function createKeyBoardNormal()
{
	keys = getKeyBoardNormal();


	setKeyBoardComputerKeys = setKeyBoardComputerKeysNormal;
	setKeyBoardComputerKeysNormal();
	keyboardDraw();

}










function createKeyBoardQuarterTone()
{
	keys = new Array();
	for(var numoctave = 1; numoctave < 9; numoctave++)
	{

	      constructionKeyBoardXDebutSet((7 * WHITEKEY_WIDTH) * (numoctave-1), 24*numoctave-24*4);

	      keys.push(createWhiteKey(0, 0, "C"));
	      keys.push(createWhiteKey(1, 2*2, "D"));
	      keys.push(createWhiteKey(2, 4*2, "E"));
	      keys.push(createWhiteKey(3, 5*2, "F"));
	      keys.push(createWhiteKey(4, 7*2, "G"));
	      keys.push(createWhiteKey(5, 9*2, "A"));
	      keys.push(createWhiteKey(6, 11*2, "B"));

	      keys.push(createBlackKey(0, 1*2, ""));
	      keys.push(createBlackKey(1, 3*2, ""));
	      keys.push(createBlackKey(3, 6*2, ""));
	      keys.push(createBlackKey(4, 8*2, ""));
	      keys.push(createBlackKey(5, 10*2, ""));

          keys.push(createQuarterToneKey(0, 0*2+1, ""));
	      keys.push(createQuarterToneKey(0.5, 1*2+1, ""));
	      keys.push(createQuarterToneKey(1, 2*2+1, ""));
	      keys.push(createQuarterToneKey(1.5, 3*2+1, ""));
	      keys.push(createQuarterToneKey(2.25, 4*2+1, ""));
          keys.push(createQuarterToneKey(3, 5*2+1, ""));
          keys.push(createQuarterToneKey(3.5, 6*2+1, ""));
          keys.push(createQuarterToneKey(4, 7*2+1, ""));
          keys.push(createQuarterToneKey(4.5, 8*2+1, ""));
          keys.push(createQuarterToneKey(5, 9*2+1, ""));
          keys.push(createQuarterToneKey(5.5, 10*2+1, ""));
          keys.push(createQuarterToneKey(6.25, 11*2+1, ""));


	}

	setKeyBoardComputerKeys = setKeyBoardComputerKeysNormal;
	setKeyBoardComputerKeysNormal();
	keyboardDraw();

}















function createKeyBoardBohlenPierce()
{
	keys = new Array();
	for(var numoctave = 1; numoctave < 9; numoctave++)
	{

	      constructionKeyBoardXDebutSet((9 * WHITEKEY_WIDTH) * (numoctave-1), 13*numoctave-13*4);

	      keys.push(createWhiteKey(0, 0, "C"));
	      keys.push(createWhiteKey(1, 2, "D"));
	      keys.push(createWhiteKey(2, 3, "E"));
	      keys.push(createWhiteKey(3, 4, "F"));
	      keys.push(createWhiteKey(4, 6, "G"));
	      keys.push(createWhiteKey(5, 7, "H"));
	      keys.push(createWhiteKey(6, 9, "J"));
	      keys.push(createWhiteKey(7, 10, "A"));
	      keys.push(createWhiteKey(8, 12, "B"));

	      keys.push(createBlackKey(0, 1, "C#"));
	      keys.push(createBlackKey(3, 5, "F#"));
	      keys.push(createBlackKey(5, 8, "H#"));
	      keys.push(createBlackKey(7, 11, "A#"));
	}

	setKeyBoardComputerKeys = setKeyBoardComputerKeysBohlenPierce;
	setKeyBoardComputerKeysBohlenPierce();

        keyboardDraw();
}





function keyboardDraw()
{
      var canvas = document.getElementById('keyboard');
      var context = canvas.getContext("2d");

      context.clearRect(0, 0, canvas.width, canvas.height);


      for(var key of keys)
	       key.draw(context);

      keyboardDrawLettersFromKeyBoard(context);
}




function getKeyFromMidiNote(midiNote)
{
    for(var key of keys)
    {
	  if(key.midiNote == midiNote)
	      return key;

    }

    return null;
}





function setKeyBoardColor(midiNote, color)
{
    var key = getKeyFromMidiNote(midiNote);
    key.color = color;

}




function keyboardColorsReset()
{
  for(var key of keys)
    {
	  key.color = key.topcolor;

    }

    keyboardDraw();

}












function setKeyBoardColorAllOctave(midiNote, color)
{
    for(var i = -10; i < 10; i++)
    {
      var key = getKeyFromMidiNote(midiNote+i*12);
      if(key != undefined)
	  key.color = color;

    }

}

function keyboardDownFromMidiNote(midiNote)
{
  var key = getKeyFromMidiNote(midiNote);
  if(key == undefined) return;
    noteAnimationStart(midiNote);

    key.selected = true;

    noteOn(key.midiNote, 128);
    keyboardDraw();

}



function keyboardUpFromMidiNote(midiNote)
{
    var key = getKeyFromMidiNote(midiNote);
if(key == undefined) return;
    noteAnimationStop(midiNote);

    if(key == undefined)
      return;


    key.selected = false;
    noteOff(key.midiNote, 128);
    keyboardDraw();

}

var keySelectedFromMouse = null;


function keyboardOnMouseDown(key,velocityRatio)
{
    if(keySelectedFromMouse != null)
    {
      	keySelectedFromMouse.selected = false;
        noteAnimationStop(keySelectedFromMouse.midiNote);
      	noteOff(keySelectedFromMouse.midiNote, 128);
    }
    key.selected = true;
    noteAnimationStart(key.midiNote);
    noteOn(key.midiNote, Math.round(velocityRatio*128));
    keySelectedFromMouse = key;
    keyboardDraw();


}





function keyboardOnMouseUp(key)
{
    if(keySelectedFromMouse != null)
    {
          	keySelectedFromMouse.selected = false;
            noteAnimationStop(keySelectedFromMouse.midiNote);
          	noteOff(keySelectedFromMouse.midiNote, 128);
          	keyboardDraw();
    }
    keySelectedFromMouse = null;
}

function keyboardOnMouseMoveButtonDown(key)
{
    if(keySelectedFromMouse == key)
      return;
    if(keySelectedFromMouse != null)
    {
	keySelectedFromMouse.selected = false;
  noteAnimationStop(keySelectedFromMouse.midiNote);
	noteOff(keySelectedFromMouse.midiNote, 128);
    }

    key.selected = true;
    noteAnimationStart(key.midiNote);
    noteOn(key.midiNote, 128);
    keySelectedFromMouse = key;
    keyboardDraw();
}




function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }


var mouseButtonDown = false;































 var keyBoardComputerKeys = {};
 var keyBoardComputerKeysOctaveNum = -1;


    function setKeyBoardComputerKeysNormal()
    {
        keyBoardComputerKeys = {};
	keyBoardComputerKeys["S"] = 60+12*keyBoardComputerKeysOctaveNum+0;
	  keyBoardComputerKeys["E"] = 60+12*keyBoardComputerKeysOctaveNum+1;
	keyBoardComputerKeys["D"] = 60+12*keyBoardComputerKeysOctaveNum+2;
	  keyBoardComputerKeys["R"] = 60+12*keyBoardComputerKeysOctaveNum+3;
	keyBoardComputerKeys["F"] = 60+12*keyBoardComputerKeysOctaveNum+4;
	keyBoardComputerKeys["G"] = 60+12*keyBoardComputerKeysOctaveNum+5;
	  keyBoardComputerKeys["Y"] = 60+12*keyBoardComputerKeysOctaveNum+6;
	keyBoardComputerKeys["H"] = 60+12*keyBoardComputerKeysOctaveNum+7;
	  keyBoardComputerKeys["U"] = 60+12*keyBoardComputerKeysOctaveNum+8;
	keyBoardComputerKeys["J"] = 60+12*keyBoardComputerKeysOctaveNum+9;
	  keyBoardComputerKeys["I"] = 60+12*keyBoardComputerKeysOctaveNum+10;
	keyBoardComputerKeys["K"] = 60+12*keyBoardComputerKeysOctaveNum+11;
	keyBoardComputerKeys["L"] = 60+12*keyBoardComputerKeysOctaveNum+12;
    }



    function setKeyBoardComputerKeysBohlenPierce()
    {
        keyBoardComputerKeys = {};
      keyBoardComputerKeys["S"] = 60+13*keyBoardComputerKeysOctaveNum+0;
	  keyBoardComputerKeys["E"] = 60+13*keyBoardComputerKeysOctaveNum+1;
	keyBoardComputerKeys["D"] = 60+13*keyBoardComputerKeysOctaveNum+2;
	  keyBoardComputerKeys["F"] = 60+13*keyBoardComputerKeysOctaveNum+3;
	keyBoardComputerKeys["G"] = 60+13*keyBoardComputerKeysOctaveNum+4;
	keyBoardComputerKeys["Y"] = 60+13*keyBoardComputerKeysOctaveNum+5;
	  keyBoardComputerKeys["H"] = 60+13*keyBoardComputerKeysOctaveNum+6;
	keyBoardComputerKeys["J"] = 60+13*keyBoardComputerKeysOctaveNum+7;
	  keyBoardComputerKeys["I"] = 60+13*keyBoardComputerKeysOctaveNum+8;
	keyBoardComputerKeys["K"] = 60+13*keyBoardComputerKeysOctaveNum+9;
	  keyBoardComputerKeys["L"] = 60+13*keyBoardComputerKeysOctaveNum+10;
	keyBoardComputerKeys["P"] = 60+13*keyBoardComputerKeysOctaveNum+11;
	keyBoardComputerKeys["M"] = 60+13*keyBoardComputerKeysOctaveNum+12;
	keyBoardComputerKeys["T"] = 60+13*keyBoardComputerKeysOctaveNum+13;
    }


    function getMidiNoteFromChar(char)
    {
      return keyBoardComputerKeys[char];
    }




function keyboardDrawLettersFromKeyBoard(context)
    {
      for(var char in keyBoardComputerKeys)
      {

	 var midiNote = getMidiNoteFromChar(char);
	 var key = getKeyFromMidiNote(midiNote);

	 var x = key.x1+3;
	 var y = key.y1 + key.height-2;

	 context.strokeText(char, x, y);



      }
    }




















//**install the keyboard*/
$( document ).ready(function() {
    keyboardDraw();

    var canvas = document.getElementById('keyboard');

    canvas.onmousedown = function(e){
          mouseButtonDown = true;
	  var pos = getMousePos(canvas, e);
	  var x = pos.x;
	  var y = pos.y;
	  for(var ikey = keys.length - 1; ikey >= 0; ikey--)
	  {
	    var key = keys[ikey];
	    if(key.contains(x, y))
	    {
		keyboardOnMouseDown(key,(y-key.y1)/key.height);
		return;
	    }

	  }

      }

    canvas.onmousemove = function(e){
	  if(!mouseButtonDown)
	      return;
	  var pos = getMousePos(canvas, e);
	  var x = pos.x;
	  var y = pos.y;

	  for(var ikey = keys.length - 1; ikey >= 0; ikey--)
	  {
	    var key = keys[ikey];
	    if(key.contains(x, y))
	    {
		keyboardOnMouseMoveButtonDown(key);
		return;
	    }

	  }
      }

    canvas.onmouseup = function(e){
          mouseButtonDown = false;
	  var pos = getMousePos(canvas, e);
	  var x = pos.x;
	  var y = pos.y;

	  for(var ikey = keys.length - 1; ikey >= 0; ikey--)
	  {
	    var key = keys[ikey];
	    if(key.contains(x, y))
	    {
		keyboardOnMouseUp(key);
		return;
	    }

	  }
      }


    function getChar(event) {
  return String.fromCharCode(event.keyCode || event.charCode)
}



    function getNumNoteFromChar(char)
    {
      if(keyBoardComputerKeys[char] == undefined)
      {
	  log(char);
	  return;

      }

      return keyBoardComputerKeys[char];
    }







    var keyBoardComputer = {};



    window.onkeydown = function(event)
    {
      if(event.keyCode == '37') //left
      {
	   keyBoardComputerKeysOctaveNum--;
	   if(keyBoardComputerKeysOctaveNum < -3)
	     keyBoardComputerKeysOctaveNum = -3;
	   setKeyBoardComputerKeys();
	   keyboardDraw();
      }
      else if(event.keyCode == '39') //right
      {
	keyBoardComputerKeysOctaveNum++;
	if(keyBoardComputerKeysOctaveNum > 3)
	     keyBoardComputerKeysOctaveNum = 3;
	setKeyBoardComputerKeys();
	keyboardDraw();
      }
      else
      {

	  var char = getChar(event || window.event)


	  if(keyBoardComputer[char] != undefined)
	    return;

	  keyBoardComputer[char] = true;



	  var midiNote = getMidiNoteFromChar(char);

	  keyboardDownFromMidiNote(midiNote);
      }
    }


    window.onkeyup = function(event)
    {
      var char = getChar(event || window.event)
      var midiNote = getMidiNoteFromChar(char);
      keyBoardComputer[char] = undefined;
      keyboardUpFromMidiNote(midiNote);
    }




});
