//Commands
var command;                  //global variable acts to            
var commandList=["clear","dir","delete", "copy", "ps", "start", "kill", "cat" ,"man"];    //list of commands
var target;                  //target file/process for commands which ask for a second arguement


function checkCommand(){
    if(commandList.indexOf(command)==-1){
//        document.getElementById("console").innerHTML +="</br> Debug "+command;                  //debugger statement
        display.badCommand(command);                       //user input not in command array (Invalid Command)...display command was not recofnized
    }else{
        commandIndex=commandList.indexOf(command);                                       
        doCommand();
    }    
}

function doCommand(){
//    document.getElementById("console").innerHTML +="Debug "+command;               //debugger statement
    switch(commandIndex){
        case 0:                                                                      //clear command
            display.clearDisplay();
            break;
        case 1:                                                                      //dir command
             document.getElementById("console").innerHTML +="</br>";
            for(i=0; i<Directory.length; i++){
              display.displayItem(Directory[i]);
            }
            break;
        case 2:                                                                      //delete command
            break;
        case 3:                                                                      //copy command           
            break;
        case 4:                                                                      //ps command
            break;
        case 5:                                                                      //start command
            break;
        case 6:                                                                      //kill command                                                                    
            break;
        case 7:                                                                      //cat command
            break;
        case 8:                                                                      //man command
            var manual="</br>clear  - Erases the console window \n\
                        </br>dir    - Lists current files in directory\n\
                        </br>delete - Deletes specidifed file. Enter command as follows: delete <filename>\n\
                        </br>copy   - Create a copy of specified file. It will be located in same directory. Enter command as follows: copy \<\ filename\>\ \n\
                        </br>ps     - Lists current running processes. \n\
                        </br>start  - Start a specified process. All processes started must be terminated manually. Enter command as follows: start \<processname\> \n\
                        </br>kill   - Terminate a running process and display its resulting computation. Enter command as follows: delete <processname> \n\
                        </br>cat    - Displays contents of specified file. Enter command as follows: cat <filename> \n\
                        </br>man    - The command manual. You're using right now silly.";
            display.displayItem(manual);                                
            break;    
    }
}