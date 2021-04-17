var pythagoreKeys;







function createPythagoreKeyBoard()
{
    pythagoreKeys = getKeyBoardNormal();

    for(var i = 0; i <= 11; i++)
    {
        getPythagoreKeyBoardKeyFromMidiNote(27+7*i).color = rainbow[i];
    }
}


createPythagoreKeyBoard();

function fonctionCorrectionAngle(x)
{
 return Math.sqrt(x);

}



function pythagoreKeyDraw(key, context, text)
{
    var centerX = 180;
    var centerY = 180;


    var yFactor = 1/3;

    var initialRadius = 150;


    var spiralFactor = 1 / 20;
    var spiralRadius = initialRadius - key.x1 * spiralFactor;
    var spiralRadius2 = initialRadius - (key.x1 + key.width) * spiralFactor;

    var r = -spiralRadius + key.y1 * yFactor;
    var r2 = -spiralRadius2 + (key.y1 + key.height) * yFactor;

    var xToAngleFactor = 1/370;

    var angle1 = key.x1 * xToAngleFactor * fonctionCorrectionAngle(initialRadius) / fonctionCorrectionAngle(spiralRadius);
    var angle2 = (key.x1 + key.width) * xToAngleFactor * fonctionCorrectionAngle(initialRadius) / fonctionCorrectionAngle(spiralRadius2);

    context.beginPath();

    if(text)
    {
        var rtext = r-22;
        context.fillStyle = key.color;
        context.strokeStyle = "black";


        context.strokeText(text, centerX + rtext * Math.cos(angle1), centerY + rtext * Math.sin(angle1));
        context.fillText(text, centerX + rtext * Math.cos(angle1), centerY + rtext * Math.sin(angle1));
    }
    else
    {
        context.moveTo(centerX + r * Math.cos(angle1), centerY + r * Math.sin(angle1));
        context.lineTo(centerX + (r2) * Math.cos(angle1), centerY + (r2) * Math.sin(angle1));
        context.lineTo(centerX + (r2) * Math.cos(angle2), centerY + (r2) * Math.sin(angle2));
        context.lineTo(centerX + r * Math.cos(angle2), centerY + r * Math.sin(angle2));
        context.lineTo(centerX + r * Math.cos(angle1), centerY + r * Math.sin(angle1));

        var my_gradient=context.createLinearGradient(0,0,0,170);
            my_gradient.addColorStop(0,key.topcolor);
            // my_gradient.addColorStop(0.05,'white');
            if(this.topcolor != "white")
            {
                    my_gradient.addColorStop(0.05,'white');
                my_gradient.addColorStop(0.5,key.color);
            }
            my_gradient.addColorStop(1,key.color);
            context.fillStyle=my_gradient;

        context.fill();
        context.stroke();
    }
}




function getPythagoreKeyBoardKeyFromMidiNote(midiNote)
{
    for(var key of pythagoreKeys)
    {
	  if(key.midiNote == midiNote)
	      return key;

    }

    return null;
}

function pythagoreKeyBoardDraw(canvas)
{

      var context = canvas.getContext("2d");

      context.clearRect(0, 0, canvas.width, canvas.height);

      for(var key of pythagoreKeys)
      {
	       pythagoreKeyDraw(key, context);


      }


     notes = ["mib", "sib", "fa", "do", "sol", "ré", "la", "mi", "si", "fa#", "do#", "sol#", "ré#"];
   for(var i = 0; i <= 12; i++)
    {
         pythagoreKeyDraw(getPythagoreKeyBoardKeyFromMidiNote(27+7*i), context, notes[i]);
    }


}
