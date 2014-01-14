window.onload = init;
 
/* Assign the vote function to the vote button */
function init() {
    var voteButton = document.getElementById("voteButton");
    voteButton.onclick = vote;
    drawMenu();
}


/* Validate the input and display a message */
function vote() {
    var voteResult = document.getElementById("voteForm");
    var msg = "";
    
    for (var i=0; i < voteResult.length; i++)
    {
        /* Only check radio buttons if they are checked */
        if (voteResult[i].type == "radio")
        {
          if (voteResult[i].checked)
          {
            if (voteResult[i].value == "chelsea")
            {
              msg = "you are correct.";
            }
            else
            {
               /* Get the text of the label not the id */
               var selector = 'label[for=' + voteResult[i].id + ']';
               var label = document.querySelector(selector);
               console.log("Label: " + label.innerHTML);
               msg = "you chose " + label.innerHTML + " but the correct answer will be Chelsea.";
            }
          }
        }
    }
    
    /* Verify an email address has been entered */
    emailAddress = document.getElementById('email_address').value;
    if (emailAddress == null || emailAddress == "")
    {
        alert("Please enter a valid email address.");    
    }
    else
    {
        /* Display final message */
        alert(emailAddress + ", " + msg);
    }
}