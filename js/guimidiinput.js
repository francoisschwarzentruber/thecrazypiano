 
 
 
 
$(document).ready(function () {
    // définition de la boîte de dialogue
    // la méthode jQuery dialog() permet de transformer un div en boîte de dialogue et de définir ses boutons
    $( "#midiinputdialog" ).dialog({
        autoOpen: false,
        width: 600,
        buttons: [
            {
                text: "OK",
                click: function() {
                    $( this ).dialog( "close" );
                }
            }
        ]
    });
    
    
    $('#midiinputbutton').click(function()
    {
         $( "#midiinputdialog" ).dialog( "open" );
        
    });
    
    
    
});
