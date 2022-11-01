"use strict";
$(document).ready(function () {

    var userId = Math.floor(Math.random() * (10 - 1 + 1)) + 1
    
    console.log("Account page");

    $.ajax({
        url: "https://jsonplaceholder.typicode.com/users/" + userId,
        type: 'GET',
        cache: false,
        success: function(result) {
            if (result) {
                setValues(result);
            }
        },
        error: function(res) {
            alert(res);
        }
    });
//  it set the value in form
    var setValues = (result) => {
        $("#companyname").val(result.company.name);
        $("#usernmae").val(result.username);
        $("#emailid").val(result.email);
        $("#firstname").val(result.name.split(' ')[0]);
        $("#lastname").val(result.name.split(' ')[1]);
        $("#homeaddress").val(result.address.suite + " " + result.address.street);
        $("#aboutMe").val(result.company.catchPhrase);
        $("#zip").val(result.address.zipcode);
        $("#quote").text(result.company.catchPhrase);
        $("#fullname").text(result.name);
        $("#username").text(result.username);
        $("#city").val(result.address.city);
        $("#country").val("USA");
        $('#avatarimage').attr("src", "https://randomuser.me/api/portraits/women/" + userId + ".jpg")
    }
});

