//Display.js displays user input, as well as commands

function display(DisplayItem){
        document.getElementById("console").innerHTML +="</br> \>>"+DisplayItem;      // displays user input 
}

function badCommand(){
        document.getElementById("console").innerHTML +="</br> \>>Urecognized Command";      // displays user input 
}

function clearDisplay(){
         document.getElementById("console").innerHTML="";
}