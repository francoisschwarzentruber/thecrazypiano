function getFrequencyFunctionFromScale()
{
  if($('#pythagoreanTuning').is(':checked'))
     return getFrequencyPythagore;
  else if($('#meantoneTemperament').is(':checked'))
     return getFrequencyMesotonic;
  else if($('#justIntonation').is(':checked'))
     return getFrequencyZarlino;
  else if($('#equalTemperament').is(':checked'))
     return getFrequencyTempered;
  else if($('#quarterToneScale').is(':checked'))
      return getFrequencyQuarterTones;
  else if($('#bohlenPierceScale').is(':checked'))
      return getFrequencyBohlenPierceTempered;
}


function getFrequencyCustomized(midiNote, velocity)
{
      if($('#pianoreversed').is(':checked'))
          midiNote = -(midiNote-60)+60;

      let freq = getFrequencyFunctionFromScale()(midiNote, velocity);

      if($('#unstablepitch').is(':checked'))
        freq = freq * (1+Math.random()/20);

      if($('#hammerhigher').is(':checked'))
        freq = freq * (1 + velocity/512);

      return freq;

}



function getVelocityCustomized(midiNote,velocity)
{
  if($('#velocityreversed').is(':checked'))
    velocity = 128-velocity;

  return velocity;
}






function getTimbreCustomized(midiNote, velocity) {
  /*if(midiNote < 50)
    return timbreClarinet;
  else*/
    if($('#piano').is(':checked'))
      return timbrePiano;
    else if($('#clarinet').is(':checked'))
      return timbreClarinet;
}
