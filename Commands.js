//Commands
var command;                  //global variable acts to            
var commandList=["clear"];    //list of commands
var commandIndex;


function checkCommand(){
    if(commandList.indexOf(command)==-1){
        badCommand(command);                       //user input not in command array (Invalid Command)...display command was not recofnized
    }else{
        commandIndex=commandList.indexOf(command);
        doCommand();
    }    
}

function doCommand(){
    switch(commandIndex){
        case 0:
            clearDisplay();
    }
}