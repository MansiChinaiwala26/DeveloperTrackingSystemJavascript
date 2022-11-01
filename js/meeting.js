"use strict";
$(document).ready(function(){
    // date function format
    var isDate = function(text) {
        if( ! /^[01]?\d\/[0-3]\d\/\d{4}$/.test(text) ) return false;
        
        var index1 = text.indexOf( "/" );
        var index2 = text.indexOf( "/", index1 + 1 );
        var month = parseInt( text.substring( 0, index1 ) );
        var day = parseInt( text.substring( index1 + 1, index2 ) );
        
        if( month < 1 || month > 12 ) { return false; }
        //if( day > 31 ) { return false; }
        else {
            switch( month ) {
                    // doesn't handle leap year
                case 2:
                    if ( day > 28 ) { return false; } 
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    if ( day > 30 ) { return false; }
                    break;
                default:
                    if ( day > 31 ) { return false; }
                    break;
            }
        }
        return true; 
    };
    // data added in table view
    $("#tablename").on("click","button.btn",function() {
      var row = $(this).closest('tr');
      var columns = row.find('td');
       sessionStorage.taskData='';
         let data = {};
         let values =''
        $.each(columns, function(i, item) {
            values = values + 'td' + (i + 1) + ':' + item.innerHTML + '<br/>';
        });
             let obj = values.split('<br/>');
             data.developerName = obj[0].split(':')[1];
             data.taskName = obj[1].split(':')[1];
             data.estimate = obj[2].split(':')[1];
             data.progress = obj[3].split(':')[1];
             sessionStorage.taskData=data;
         
         $('#developerName').val(data.developerName);
         $('#taskName').val(data.taskName);
         $('#estimate').val(data.estimate);
        $('#progress').val(data.progress);
         $('#editModal').modal('show');
                 console.log(values.split('<br/>'));  
    });
    
    $( "#save" ).click(function() {
        console.log('hi here')
        $("span").text("");   // clear any previous error messages
        var isValid = true;   // initialize isValid flag
        
        var email = $("#email").val();
        var phone = $("#phone").val();
        var agenda = $("#agenda").val();
       
        
        if ( email === "" || 
                !email.match(/^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/) ) 
        {
            isValid = false;
            $( "#email" ).next().text("Please enter a valid email.");
        }
        if ( phone === "" || !phone.match(/^\d{3}-\d{3}-\d{4}$/) ) {
            isValid = false;
            $( "#phone" ).next().text(
                "Please enter a phone number in NNN-NNN-NNNN format.");
        }
        if ( agenda === "" ) {
            isValid = false;
            $( "#agenda" ).next().text("Please enter agenda.");
        }
        
        
        if ( isValid ) { 
            // code that saves profile info goes here
            sessionStorage.email = email;
            sessionStorage.phone = phone;
            sessionStorage.agenda = agenda;
            var text='';
            text= "<tr><td>"+email+"</td><td>"+phone+"</td>"+ "<td>"+agenda+"</td>"+"</tr>";
            $("#meeting tbody").append(text);
            
        }
        $("#email").val('');
        $("#phone").val('');
        $("#agenda").val('');
        
        $("#email").focus(); 
    });
    
    // set focus on initial load
    $("#email").focus();
});