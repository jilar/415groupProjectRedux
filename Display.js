//Display.js displays user input, as well as commands. It Acts as our display Driver
//In our javascript O/S the display device contains the functions which affect our console window,
//any command or action which affects the window must use a function from Display.js
var pathname = "C:> ";
var currentpath;
var display={
    
    displayKeyboard: function(DisplayItem){        
        if (cDirectory === "C"){
            display.displayItem("</br>" + pathname + " " + "\\" + cDirectory + "\\");
            document.getElementById("console").innerHTML += " > " + DisplayItem;
        } else if (cDirectory === "Directory0" || cDirectory === "Directory1") {
            currentpath = "</br> "+ pathname + "\\C\\" +  cDirectory + "\\" + " > " + DisplayItem;
            document.getElementById("console").innerHTML += currentpath;
        } 
        
    },
    displayItem: function(Item){
        document.getElementById("console").innerHTML +=Item+" ";                    // displays user input 
    },
    badCommand: function(baditem){
        //if(typeofbaditem != "undefined")                                         //my own testing ignore this line for now guys haha-Jeffrey
        document.getElementById("console").innerHTML +="</br>Unrecognized Command";      //bad command 
    },
    clearDisplay: function(){                                                         //clears the console 
         document.getElementById("console").innerHTML="";
    }
}