let noteAnimationNotes = new Array();
let noteAnimationImageNames = ["sun.png", "heart.png", "croissant.png", "tomato.svg"];


function noteAnimationStart(midiNote) {
  let key = getKeyFromMidiNote(midiNote);
  let element = $("<img>");
  element.addClass("noteAnimation");
  element.attr("src", "img/" + noteAnimationImageNames[Math.floor(Math.random() * noteAnimationImageNames.length)]);
  element.attr("width", 32);
  element.appendTo("body");

  noteAnimationNotes[midiNote] = element;
  //$("#noteAnimation" + midiNote).position({left: key.x1, top: $("#keyboard").position().top, position: 'absolute'});
  let x = $("#keyboard").position().left + key.x1;
  let y =  $("#keyboard").position().top - 32;
  let dx = Math.random() * 20-10;
  let dy = 15+30*Math.random();
  element.css({left: x, top: y, position: 'absolute'});
  element.animate({left: x+dx, top: y-dy, position: 'absolute'});
}





function noteAnimationStop(midiNote) {
  noteAnimationNotes[midiNote].stop(true,false);
  noteAnimationNotes[midiNote].fadeOut(() => noteAnimationNotes[midiNote].remove());
  //
  noteAnimationNotes[midiNote] = undefined;
}
