


$( document ).ready(function()
    {
            $('#scale').change(function()
            {
               changeScale($(this).val());
            });

    }
    );


 var switchToScale = new Object();

 switchToScale["pythagore"] = switchToPythagore;
 switchToScale["natural"] = switchToZarlino;
 switchToScale["mesotonic"] = switchToMesotonic;
 switchToScale["well-tempered"] = switchToTempered;
 switchToScale["quartertones"] = switchToQuarterTones;
 switchToScale["bohlen-pierce"] = switchToBohlenPierce;




 function changeScale(scaleName)
 {
     switchToScale[scaleName]();
 }










function ecouterquintenormaleDown()
{
     keyboardDownFromMidiNote(48);
     keyboardDownFromMidiNote(55);


}



function ecouterquintenormaleUp()
{

     keyboardUpFromMidiNote(48);
     keyboardUpFromMidiNote(55);


}


var tritaveNoteBasMidi = 47;
var tritaveNoteHautMidi = tritaveNoteBasMidi+13;

function ecouterTritaveDown()
{
     keyboardDownFromMidiNote(tritaveNoteBasMidi);
     keyboardDownFromMidiNote(tritaveNoteHautMidi);


}



function ecouterTritaveUp()
{

     keyboardUpFromMidiNote(tritaveNoteBasMidi);
     keyboardUpFromMidiNote(tritaveNoteHautMidi);


}





function ecouterquinteloupDown()
{
  keyboardDownFromMidiNote(44);
  keyboardDownFromMidiNote(51);
}


function ecouterquinteloupUp()
{
     keyboardUpFromMidiNote(44);
     keyboardUpFromMidiNote(51);


}

function ecouterquinteloupReLaDown()
{
     keyboardDownFromMidiNote(48+2);
     keyboardDownFromMidiNote(55+2);


}



function ecouterquinteloupReLaUp()
{

     keyboardUpFromMidiNote(48+2);
     keyboardUpFromMidiNote(55+2);


}










var speed = 1000;
var t;
var pythagoreAnimationMidiNote;
var rainbow = ['rgb(128, 128, 255)',
            //   'rgb(128, 145, 222)',
               'rgb(64, 128, 180)',
               'rgb(64, 192, 64)',
               'rgb(0, 192, 0)',
               'rgb(64, 255, 0)',
               'rgb(128, 255, 0)',
               'rgb(192, 255, 0)',
               'rgb(255, 255, 0)',
               'rgb(255, 192, 0)',
	       'rgb(255, 128, 0)',
	       'rgb(255, 64, 0)',
	       'rgb(255, 0, 0)'
	        ];

function pythagoreQuinteShow()
{
    var miaou = pythagoreAnimationMidiNote;

    var tmiaou = t;
    setTimeout(function()
                           {keyboardUpFromMidiNote(miaou-7);
                           console.log("arg" + miaou);
			   setKeyBoardColorAllOctave(miaou, rainbow[tmiaou-1]);
			   setKeyBoardColorAllOctave(miaou+7, rainbow[tmiaou]);
                           keyboardDownFromMidiNote(miaou);
			   keyboardDownFromMidiNote(miaou+7); } , t*speed );

    pythagoreAnimationMidiNote += 7;
    t++;
}



function pythagoreQuinteFinish()
{
  var miaou = pythagoreAnimationMidiNote;

    var tmiaou = t;
    setTimeout(function() {keyboardUpFromMidiNote(miaou-7); keyboardUpFromMidiNote(miaou);  } , t*speed );
}



function pythagoreAnimation()
{
      t = 0;
      keyboardColorsReset();
      pythagoreAnimationMidiNote = 27;
      setKeyBoardColorAllOctave(pythagoreAnimationMidiNote, rainbow[t]);
      keyboardDownFromMidiNote(pythagoreAnimationMidiNote);
      //setTimeout(function() {keyboardUpFromMidiNote(pythagoreAnimationMidiNote);} , 0 );

      t++;
      for(var i = 0; i < 11; i++)
	pythagoreQuinteShow();

      pythagoreQuinteFinish();

}







function pythagoreKeyBoardColors()
{
      var midiNote = 27;
      for(var i = 0; i < 12; i++)
      {
	setKeyBoardColorAllOctave(midiNote, rainbow[i]);
	midiNote+=7;
      }

      keyboardDraw();

}



function temperedKeyBoardColors()
{
      for(var i = 0; i < 12; i++)
      {
	setKeyBoardColorAllOctave(i+24, rainbow[i]);
      }

      keyboardDraw();

}









function switchToQuarterTones()
{
    createKeyBoardQuarterTone();
    keyboardColorsReset();
    showPanel("quartertones");
}


function switchToTempered()
{
    createKeyBoardNormal();
    temperedKeyBoardColors();
    showPanel("well-tempered");
}


function switchToPythagore()
{
    createKeyBoardNormal();
    pythagoreKeyBoardColors();
    showPanel("pythagore");

}

function switchToMesotonic()
{
    createKeyBoardNormal();
    pythagoreKeyBoardColors();
    showPanel("mesotonic");

}

function switchToZarlino()
{
    createKeyBoardNormal();
    keyboardColorsReset();
    showPanel("natural");
}

function switchToBohlenPierce()
{
    createKeyBoardBohlenPierce();
    showPanel("bohlen-pierce");
}
















function showPanel(id)
{
    $('#container *').hide();
    $('#panel' + id).show();
    $('#panel' + id + " *").show();
}
