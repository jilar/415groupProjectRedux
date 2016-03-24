function keyboard() {
   var input = document.getElementById("input").value;
   if (event.keyCode == 13) {                              //13 represents when the ENTER button is pressed
        display(input);
//        document.getElementById("console").innerHTML +="</br> >>"+input.value;      // displays user input 
        document.getElementById("input").value='';                               //clears input box for next input 
        command=input;                               //user input is now in global variable command (see Command.js) 
        checkCommand();
    }
}

