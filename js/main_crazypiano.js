
$().ready(function(){
   switchToPythagore();
   getFrequency = getFrequencyCustomized;
   getVelocity = getVelocityCustomized;
   getTimbre = getTimbreCustomized;

   $("#pythagoreanTuning").on("click", switchToPythagore);
   $("#meantoneTemperament").on("click", switchToMesotonic);
   $("#justIntonation").on("click", switchToZarlino);
   $("#equalTemperament").on("click", switchToTempered);
   $("#quarterToneScale").on("click", switchToQuarterTones);
   $("#bohlenPierceScale").on("click", switchToBohlenPierce);
  });
