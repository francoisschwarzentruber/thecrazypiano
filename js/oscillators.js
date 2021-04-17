var oscillators = {};
var context = new (window.AudioContext || window.webkitAudioContext)();



function noteOn(midiNote, velocity){
    stopOscillators(midiNote);
    var frequency = getFrequency(midiNote, velocity);
    velocity = getVelocity(midiNote, velocity);
    velocity = velocity / 2000;

    var oscs = new Array();

    for(var i = 1; i <= 30; i++)
    {
      //if(i % 2 == 1)
      {
	var osc = context.createOscillator();
	osc.frequency.value = frequency*i;

	if(i <= 5)
	    osc.type = 'triangle';
	else if(i <= 8)
	   osc.type = 'triangle';
	else
	   osc.type = 'triangle';

	/*
    sine
    square
    sawtooth
    triangle
    custom
*/
	var vca = context.createGain();
	//vca.gain.value = velocity/((i+1)*(i+1)*(i+1));
	//vca.gain.value = velocity/((i+1)*(i+1));*/
	vca.gain.value = velocity;///Math.sqrt(i+1);///((i+1)*(i+1)*(i+1));
	vca.connect(context.destination);


	osc.connect(vca);
	osc.start(context.currentTime);
	oscs.push(osc);
      }
    }



    oscillators[midiNote] = oscs;//, osc2];

}

function noteOff(midiNote, velocity){
  stopOscillators(midiNote);
}





function stopOscillators(midiNote)
{
    if(oscillators[midiNote] != undefined)
      oscillators[midiNote].forEach(function (oscillator) {
        oscillator.stop(context.currentTime);
    });
}
