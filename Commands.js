//Commands
var command;                  //global variable acts to            
var commandList=["clear","dir","delete", "copy", "ps", "start", "kill", "cat" ,"man"];    //list of commands
var target;                  //target file/process for commands which ask for a second arguement
var commandIndex;
var targetIndex;


function checkCommand(){
    if(commandList.indexOf(command)==-1){
 //       document.getElementById("console").innerHTML +="</br> Debug "+command;                  //debugger statement
        display.badCommand();                       //user input not in command array (Invalid Command)...display command was not recofnized
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
            if(Directory.indexOf(target)==-1){
                display.badCommand(); 
            }else{
                targetIndex=Directory.indexOf(target);
//                document.getElementById("console").innerHTML +="<br>Debug "+targetIndex;        //debugger
                Directory.splice(targetIndex, 1);
                display.displayItem("<br>"+target+" deleted from file Directory");
            }
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
            var manual="</br>clear&emsp;&ensp;&thinsp;-&emsp;Erases the console window,"+     
                        "</br>dir&emsp;&ensp;&emsp;-&emsp;Lists current files in directory."+    
                        "</br>delete&emsp;&thinsp;-&emsp;Deletes specified file. Enter command as follows: delete \<\ffilename\>"+
                        "</br>copy&ensp;&ensp;&thinsp;&thinsp;&thinsp;-&emsp;Create a copy of specified file. It will be located in same directory. Enter command as follows: copy \<\ffilename\>"+
                        "</br>ps&emsp;&emsp;&thinsp;&thinsp;&thinsp;-&emsp;Lists current running processes."+
                        "</br>start&emsp;&thinsp;&thinsp;&thinsp;&thinsp;-&emsp;Start a specified process. All processes started must be terminated manually. Enter command as follows: start \<\fprocessname\>"+
                        "</br>kill&emsp;&emsp;&thinsp;-&emsp;Terminate a running process and display its resulting computation. Enter command as follows: kill \<\fprocessname>"+
                        "</br>cat&emsp;&emsp;&thinsp;&thinsp;-&emsp;Displays contents of specified file. Enter command as follows: cat \<\ffilename\>"+
                        "</br>man&emsp;&ensp;&thinsp;&thinsp;-&emsp;The command manual, you're using it right now silly.";
            display.displayItem(manual);                          
            break;    
    }
}