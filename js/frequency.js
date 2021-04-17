
let getFrequency = getFrequencyPythagore; //getFrequencyCustomized
let getVelocity = (midiNote, velocity) => velocity;

function getFrequencyTempered(midiNote, velocity) {
      var numero = (midiNote - (60));
      return  440  * Math.pow(2, 3 / 12) * Math.pow(2, numero / 12) ;
}



function getFrequencyQuarterTones(midiNote, velocity) {
      var numero = (midiNote - (60));
      return  440  * Math.pow(2, 3 / 12) * Math.pow(2, numero / 24) ;
}


function getFrequencyBohlenPierceTempered(midiNote, velocity)
{
      var numero = (midiNote - (60));
      return  440  * Math.pow(2, 3 / 12) * Math.pow(3, numero / 13);
}



function getFrequencyBohlenPierceJust(midiNote, velocity)
{
     var numero = (midiNote - (60));

     var contributionOctave = Math.pow(3, Math.floor(numero / 9));
     var contributionNote = 1;

     var numnote = numero % 9;

     if(numnote < 0)
          numnote = 9 + numnote;

     var just = [1/1,	25/21, 9/7, 7/5, 5/3, 9/5, 15/7, 7/3, 25/9];
     var  contributionNote = just[numnote];

     return 440 * Math.pow(2, 3 / 12) * contributionOctave * contributionNote;

}

function getFrequencyZarlino(midiNote, velocity)
{
     var numero = (midiNote - (60));

     var contributionOctave = Math.pow(2, Math.floor(numero / 12));
     var contributionNote = 1;

     var numnote = numero % 12;

     if(numnote < 0)
          numnote = 12 + numnote;

     var zarlino = [1/1,	16/15,	9/8,	6/5,	5/4	,4/3,	45/32 ,	3/2	,8/5	,5/3,	9/5,	15/8];
     var  contributionNote = zarlino[numnote];

     return 440 * Math.pow(2, 3 / 12) * contributionOctave * contributionNote;

}



function getFrequencyPythagore(midiNote, velocity)
{
     var numero = (midiNote - (60));

     var contributionOctave = Math.pow(2, Math.floor(numero / 12));
     var contributionNote = 1;

     var numnote = numero % 12;

     if(numnote < 0)
          numnote = 12 + numnote;

     var pythagore = [1/1,	2187/2048,	9/8,	32/27,	81/64	,4/3,	729/512 ,	3/2	,6561/4096	,27/16,	16/9,	243/128];
     var  contributionNote = pythagore[numnote];

     return 440 * Math.pow(2, 3 / 12) * contributionOctave * contributionNote;

}






function getFrequencyMesotonic(midiNote, velocity)
{
  var numero = (midiNote - (60));

  var contributionOctave = Math.pow(2, Math.floor(numero / 12));
  var contributionNote = 1;

  var numnote = numero % 12;

  if(numnote < 0)
       numnote = 12 + numnote;

  var pythagore = [1/1,	2187/2048,	9/8,	32/27,	81/64	,4/3,	729/512 ,	3/2	,6561/4096	,27/16,	16/9,	243/128];
  var mesotonicFactor =  Math.pow(1/(531441 / 524288), 1/4);
  var mesotonicHowMuch = [0, 7, 2, -3, 4, -1, 6, 1, 8, 3, -2, 5];
  var  contributionNote = pythagore[numnote] * Math.pow(mesotonicFactor, mesotonicHowMuch[numnote]);

  return 440 * Math.pow(2, 3 / 12) * contributionOctave * contributionNote;

}
