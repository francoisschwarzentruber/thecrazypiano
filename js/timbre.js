class Timbre {
  constructor() {
    this.soundbuffers = new Array();
  }

  addWaveBuffer(frequency, name) {
        let timbre = this;
        var getSound = new XMLHttpRequest();
        console.log("starting creating XMLHttpRequest for file "+ name);
        getSound.open("GET", url + name, true);
        getSound.responseType = "arraybuffer";
        getSound.onload = function() {
  	  context.decodeAudioData(getSound.response, function(buffer){
  		console.log("starting receiving buffer of file "+ name);
  	       timbre.soundbuffers[frequency] = buffer;
  		  console.log("file for "+ name + " loaded");
  	      });
  	  }
       getSound.send();
  }




getBestBufferAndBestFrequency(frequency) {
//     var frequencies = [110, 220, 440, 880];
 //    var buffername = ["A1", "A2", "A3", "A4"];

     var b = Number.MAX_VALUE;
     var freqBest;
     for(var freq in this.soundbuffers)
     {

	  if(b > Math.abs(freq - frequency))
	  {
	      freqBest = freq;
	      b = Math.abs(freq - frequency);
	  }
     }
     //console.log(freqBest);
     return {buffer: this.soundbuffers[freqBest], frequency: freqBest};
}


getAudio(context, frequency) {
  var o = this.getBestBufferAndBestFrequency(frequency);

  var audio = context.createBufferSource();
  audio.buffer = o.buffer;
  audio.playbackRate.value = frequency / o.frequency;

  return audio;
}



}
