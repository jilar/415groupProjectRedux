//Keyboard.js works as our keyboard device
//reads anything from the input text box and diplays it onto console window with enter. 

function keyboard() {
   var input = document.getElementById("input").value;
   if (event.keyCode == 13) {                              //13 represents when the ENTER button is pressed
        display.displayKeyboard(input);
        var splitter= input.split(" ");                    // for two string commands
        document.getElementById("input").value='';                               //clears input box for next input 
        command=input;                               //user input is now in global variable command (see Command.js) 
        target="";
        name="";
        if(splitter.length==2){
            command=splitter[0];
            target=splitter[1];   
        }else if(splitter.length==3){
            command=splitter[0];
            target=splitter[1];
            name=splitter[2];
        } 
//        document.getElementById("console").innerHTML +="<br>Debug "+command;        //debug statements
//        document.getElementById("console").innerHTML +="<br>Debug "+target;
        checkCommand();
    }
}

