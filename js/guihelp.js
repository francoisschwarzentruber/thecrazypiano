 
 
$(document).ready(function () {
    // définition de la boîte de dialogue
    // la méthode jQuery dialog() permet de transformer un div en boîte de dialogue et de définir ses boutons
    $( "#helpdialog" ).dialog({
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
    
    
    $('#helpbutton').click(function()
    {
         $( "#helpdialog" ).dialog( "open" );
        
    });
    
    
    
});

