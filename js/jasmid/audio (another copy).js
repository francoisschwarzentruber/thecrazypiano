var sampleRate = 44100; /* hard-coded in Flash player */

function AudioPlayer(generator, opts) {
	if (!opts) opts = {};
	var latency = opts.latency || 1;
	var checkInterval = latency * 100 /* in ms */
	
	var audioElement = new Audio();
	var webkitAudio = window.AudioContext || window.webkitAudioContext;
	var requestStop = false;
	

        alert("aze");
		// Uses Webkit Web Audio API if available
		var context = new webkitAudio();
		sampleRate = context.sampleRate;
		
		var channelCount = 2;
		var bufferSize = 4096*4; // Higher for less gitches, lower for less latency
		
		var node = context.createScriptProcessor(bufferSize, 0, channelCount);
		
		node.onaudioprocess = function(e) { process(e) };

		function process(e) {
			if (generator.finished) {
				node.disconnect();
				return;
			}
			
			var dataLeft = e.outputBuffer.getChannelData(0);
			var dataRight = e.outputBuffer.getChannelData(1);

			var generate = generator.generate(bufferSize);

			for (var i = 0; i < bufferSize; ++i) {
				dataLeft[i] = generate[i*2];
				dataRight[i] = generate[i*2+1];
			}
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

