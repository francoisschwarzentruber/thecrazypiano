var sampleRate = 44100; /* hard-coded in Flash player */

function AudioPlayer(generator, opts) {
	if (!opts) opts = {};
	var latency = opts.latency || 1;
	var checkInterval = latency * 50 /* in ms */
	
	var audioElement = new Audio();
	var webkitAudio = window.AudioContext || window.webkitAudioContext;
	var requestStop = false;
	


		// Uses Webkit Web Audio API if available
		var context = new webkitAudio();
		sampleRate = context.sampleRate;
		
		var channelCount = 1;
		var bufferSize = 512; // Higher for less gitches, lower for less latency
		
		var node = context.createScriptProcessor(bufferSize, 0, channelCount);
		
		node.onaudioprocess = function(e) { process(e) };

		function process(e) {
			if (generator.finished) {
				
			}
			
			

			var generate = generator.generate(bufferSize);

			
		}
		
		// start
		node.connect(context.destination);
		
		return {
			'stop': function() {
				// pause
				node.disconnect();
				requestStop = true;
			},
			'type': 'Webkit Audio'
		}

	
	}

