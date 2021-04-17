var oscillator = {};
var context = new (window.AudioContext || window.webkitAudioContext)();
//let url = "http://people.irisa.fr/Francois.Schwarzentruber/gammes/";
let url = "";

var source,
     gainNode;


let timbrePiano = getTimbrePiano();
let timbreClarinet = getTimbreClarinet();

let getTimbre = (midiNote, velocity) => timbrePiano;



/**load piano sounds*/
function getTimbrePiano()
{
      let timbre = new Timbre();
      timbre.addWaveBuffer(110, "Piano.mf.A1.ogg");
      timbre.addWaveBuffer(220, "Piano.mf.A2.ogg");
      timbre.addWaveBuffer(440, "Piano.mf.A3.ogg");
      timbre.addWaveBuffer(880, "Piano.mf.A4.ogg");
      return timbre;
}



function getTimbreClarinet()
{
      let timbre = new Timbre();
      timbre.addWaveBuffer(440, "BbClarinet.ff.A3.ogg");
      timbre.addWaveBuffer(880, "BbClarinet.ff.A4.ogg");
      timbre.addWaveBuffer(880*2, "BbClarinet.ff.A5.ogg");
      timbre.addWaveBuffer(880*4, "BbClarinet.ff.A6.ogg");
      return timbre;

}










//http://stackoverflow.com/questions/10239757/setting-playbackrate-on-audio-element-connected-to-web-audio-api
function noteOn(midiNote, velocity){
    stopOscillator(midiNote);

    var frequency = getFrequency(midiNote, velocity);
    velocity = getVelocity(midiNote, velocity);
    let timbre = getTimbre(midiNote, velocity);
    var audio = timbre.getAudio(context, frequency);



    var gainNode = context.createGain();
    gainNode.gain.value = velocity/64;
    audio.connect(gainNode);
    gainNode.connect(context.destination);



    audio.start(0);
    oscillator[midiNote] = audio;
}



function noteOff(midiNote, velocity){
    stopOscillator(midiNote);
}



function stopOscillator(midiNote) {
    if(oscillator[midiNote] != undefined)
      oscillator[midiNote].stop(context.currentTime);
}
