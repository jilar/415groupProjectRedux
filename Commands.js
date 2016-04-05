//Commands
var command;                                                                                    //global variable acts to            
var commandList=["clear","dir","delete", "copy", "ps", "start", "kill", "cat" ,"ren","man"];    //list of commands
var target;                                                                                     //target file/process for commands which ask for a second arguement
var name;                                                                                        //for file name change
var commandIndex;
var targetIndex;
var displayResults=[]                 
var pRunning=[false,false,false,false,false,false];


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
    switch(commandIndex){
        case 0:                                                                      //clear command
            display.clearDisplay();
            break;
        case 1:                                                                      //dir command
            display.displayItem("<br>");
            for(i=0; i<Directory0.filename.length; i++){
                display.displayItem(Directory0.filename[i]);
            }
            break;
        case 2:                                                                      //delete command
            if(Directory0.filename.indexOf(target)==-1){
                display.badCommand(); 
            }else{
                targetIndex=Directory0.filename.indexOf(target);
                Directory0.filename.splice(targetIndex, 1);
                Directory0.content.splice(targetIndex, 1);
                display.displayItem("<br>"+target+" deleted from file Directory");
            }
            break;
        case 3:                                                                      //copy command
             if(Directory0.filename.indexOf(target)==-1){
                display.badCommand();
            }else if(name==""){
                display.badCommand(); 
            }
            else{
                targetIndex=Directory0.filename.indexOf(target);
                Directory0.filename.push(name);
                Directory0.content.push(Directory0.content[targetIndex]);
                display.displayItem("<br> File "+ name+" added to directory" );
            }
            break;
        case 4:                                                                      //ps command
            var counter=0;
            for(i=0; i<pRunning.length; i++){
              if(pRunning[i]==true){                           //need to add running variable to each process.
                  display.displayItem("<br>"+ProcessNames[i]);
                  counter=counter+1;
              }  
            }if(counter==0){                                                        
                display.displayItem("<br>Currently no processes are running");
            }    
            break;
        case 5:                                                                          //start command
            targetIndex=ProcessNames.indexOf(target);
            if(targetIndex==-1){
                display.badCommand(); 
            }else if(Processes.listOfProcesses[targetIndex].running==true){
                display.displayItem("<br>"+target+" is already running");
            }else {
                switch(targetIndex){
                    case 0:
                         Processes.listOfProcesses[targetIndex].running=true;
                         pRunning[targetIndex]=true;
                         break;
                    case 1:
                        Processes.listOfProcesses[targetIndex].running=true;
                        pRunning[targetIndex]=true;
                         break;
                    case 2:
                        Processes.listOfProcesses[targetIndex].running=true;
                        pRunning[targetIndex]=true;
                         break;
                    case 3:
                        Processes.listOfProcesses[targetIndex].running=true;
                        pRunning[targetIndex]=true;
                         break;
                    case 4:
                        Processes.listOfProcesses[targetIndex].running=true;
                        pRunning[targetIndex]=true;
                         break;
                    case 5:
                        Processes.listOfProcesses[targetIndex].running=true;
                        pRunning[targetIndex]=true;
                         break;
                    case 6:
                    //call a4 process
                    //set a4 process running flag to true.
                    //Example on seeting running flag for graphicsProcess ->a4Processes[0].running=true          [0] because it is the first process in our a4Processes array
                    break;
                 }
            display.displayItem("<br> Process has fininished but is still running. Please use kill command to terminate process.")     
            }
            break;
        case 6:                                                                      //kill command   
            targetIndex=ProcessNames.indexOf(target);
            if(targetIndex==-1){
                display.badCommand(); 
            }else if(Processes.listOfProcesses[targetIndex].running==false){
                display.displayItem("<br>"+target+" is not running");
            }else{
                Processes.listOfProcesses[targetIndex].running=false;
                pRunning[targetIndex]=false;
                display.displayItem("<br>"+target+" has terminated. Now displaying results.");
                display.displayItem("<br>"+displayResults[targetIndex]);
            }
            break;
        case 7:                                                                      //cat command
            if(Directory0.filename.indexOf(target)==-1){
                display.badCommand(); 
            }else{
                targetIndex=Directory0.filename.indexOf(target);
                display.displayItem("<br>Opening "+target);
                display.displayItem("<br>"+ Directory0.content[targetIndex]);
            }
            break;
        case 8:                                                                      //ren command
            if(Directory0.filename.indexOf(target)==-1){
                display.badCommand();
            }else if(name==""){
                display.badCommand(); 
            }
            else{
                targetIndex=Directory0.filename.indexOf(target);
                Directory0.filename[targetIndex]=name;
                display.displayItem("<br>"+target+" renamed to "+name);
            }
            break;    
        case 9:                                                                      //man command
            var manual="</br>clear&emsp;&ensp;&thinsp;-&emsp;Erases the console window."+     
                        "</br>dir&emsp;&ensp;&emsp;-&emsp;Lists current files in directory."+    
                        "</br>delete&emsp;&thinsp;-&emsp;Deletes specified file. Enter command as follows: delete \<\ffilename\>"+
                        "</br>copy&ensp;&ensp;&thinsp;&thinsp;&thinsp;-&emsp;Create a copy of specified file. It will be located in same directory. Enter command as follows: copy \<\ffilename\> \<\fnewfilename\>"+
                        "</br>ps&emsp;&emsp;&thinsp;&thinsp;&thinsp;-&emsp;Lists current running processes."+
                        "</br>start&emsp;&thinsp;&thinsp;&thinsp;&thinsp;-&emsp;Start a specified process. All processes started must be terminated manually. Enter command as follows: start \<\fprocessname\>"+
                        "</br>kill&emsp;&emsp;&thinsp;-&emsp;Terminate a running process and display its resulting computation. Enter command as follows: kill \<\fprocessname>"+
                        "</br>cat&emsp;&emsp;&thinsp;&thinsp;-&emsp;Displays contents of specified file. Enter command as follows: cat \<\ffilename\>"+
                        "</br>ren&emsp;&emsp;&thinsp;&thinsp;-&emsp;Renames specified file. Enter command as follows: ren \<\foldfilename\> \<\fnewfilename\>"+
                        "</br>man&emsp;&ensp;&thinsp;&thinsp;-&emsp;The command manual, you're using it right now silly.";
            display.displayItem(manual);                          
            break;    
    }
}