$( document ).ready(function()
    {
            $('#sound').change(function()
            {
               changeSound($(this).val());
            });

    }
    );


 var switchToSound = new Object();

 switchToSound["piano"] = () => {getTimbre = (midiNote, velocity) => timbrePiano;};
 switchToSound["clarinet"] = () => {getTimbre = (midiNote, velocity) => timbreClarinet;};




 function changeSound(instrumentName)
 {
     switchToSound[instrumentName]();
 }
