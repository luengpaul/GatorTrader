console.log("The login.js file is now connected.")

$(document).ready(function() {
    console.log("Document is ready")
    var showLoginError = localStorage.getItem("showLoginError")

    console.log("Current state of whether to show login modal or not" + showLoginError)


    if(showLoginError){
        console.log("The conditional is being reached.")
            $("#loginModal").modal();
    }
});


$(function(){
    $('#login-form').on('submit', function(e){
        e.preventDefault()
        var data= $(this).serialize()
        $.post('/auth', data, function(result){
            console.log("Was the validation succesful: " + result.valid)
            if(result.valid==false){
                console.log("The function reached here")
                
                var showLoginError=true
                localStorage.setItem("showLoginError", showLoginError);
                
                location.reload(true)                
            }

        else if(result.valid){
            location.reload(true)
        }
        })
    })
})


