
var log = console.log.bind(console), keyData = document.getElementById('key_data'), 
		deviceInfoInputs = document.getElementById('inputs'), deviceInfoOutputs = document.getElementById('outputs'), midi;
var AudioContext = AudioContext || webkitAudioContext; // for ios/safari
var context = new AudioContext();
var activeNotes = [];
var btnBox = document.getElementById('content'), btn = document.getElementsByClassName('button');
var data, cmd, channel, type, note, velocity;

// request MIDI access
if(navigator.requestMIDIAccess){
	navigator.requestMIDIAccess({sysex: false}).then(onMIDISuccess, onMIDIFailure);
}
else {
	log("No MIDI support in your browser.");
}




// midi functions
function onMIDISuccess(midiAccess){
	midi = midiAccess;
	var inputs = midi.inputs.values();
	// loop through all inputs
	for(var input = inputs.next(); input && !input.done; input = inputs.next()){
		// listen for midi messages
		input.value.onmidimessage = onMIDIMessage;

		listInputs(input);
	}
	// listen for connect/disconnect message
	midi.onstatechange = onStateChange;

	showMIDIPorts(midi);
}

function onMIDIMessage(event){
	data = event.data,
	cmd = data[0] >> 4,
	channel = data[0] & 0xf,
	type = data[0] & 0xf0, // channel agnostic message type. Thanks, Phil Burk.
	note = data[1],
	velocity = data[2];
	// with pressure and tilt off
	// note off: 128, cmd: 8 
	// note on: 144, cmd: 9
	// pressure / tilt on
	// pressure: 176, cmd 11: 
	// bend: 224, cmd: 14
	// log('MIDI data', data);
	switch(type){
		case 144: // noteOn message 
			noteOn(note, velocity);
			break;
		case 128: // noteOff message 
			noteOff(note, velocity);
			break;
	}
	
	log('data', data, 'cmd', cmd, 'channel', channel);

}

function onStateChange(event){
	showMIDIPorts(midi);
	var port = event.port, state = port.state, name = port.name, type = port.type;
	if(type == "input")
		log("name", name, "port", port, "state", state);

}

function listInputs(inputs){
	var input = inputs.value;
		log("Input port : [ type:'" + input.type + "' id: '" + input.id + 
				"' manufacturer: '" + input.manufacturer + "' name: '" + input.name + 
				"' version: '" + input.version + "']");
}



function onMIDIFailure(e){
	log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}

// MIDI utility functions
function showMIDIPorts(midiAccess){
	var inputs = midiAccess.inputs,
			outputs = midiAccess.outputs, 
			html;
	html = '<h4>MIDI Inputs:</h4><div class="info">';
	inputs.forEach(function(port){
		html += '<p>' + port.name + '<p>';
		html += '<p class="small">connection: ' + port.connection + '</p>';
		html += '<p class="small">state: ' + port.state + '</p>';
		html += '<p class="small">manufacturer: ' + port.manufacturer + '</p>';
		if(port.version){
			html += '<p class="small">version: ' + port.version + '</p>';
		}
	});
	$("#inputs").html( html + '</div>');

	/*html = '<h4>MIDI Outputs:</h4><div class="info">';
	outputs.forEach(function(port){
		html += '<p>' + port.name + '<br>';
		html += '<p class="small">manufacturer: ' + port.manufacturer + '</p>';
		if(port.version){
			html += '<p class="small">version: ' + port.version + '</p>';
		}
	});
	$("#outputs").html( html + '</div>');*/
}


function frequencyFromNoteNumber( note ) {
	return 440 * Math.pow(2,(note-69)/12);
}


