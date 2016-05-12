//Commands
var command;                                                                                    //global variable acts to            
var commandList=["clear","dir","delete", "copy", "ps", "start", "kill", "cat" ,
    "ren","man","cd","df", "useradd", "su", "groupadd", "usermod", null, "userdel", "usermode", "pw"];    //list of commands
var target;                                                                                     //target file/process for commands which ask for a second arguement
var name;                                                                                        //for file name change
var userPW;
var loggedUser;
var isUserMode = false, isLoggedIn = false, isCorrectPW = false, isSUMode = false, usedSUcmd = false; // used for checking user/super mode and logins in order to use CLI
var commandIndex;
var targetIndex;
var displayResults=[]                 
var pRunning=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
var cDirectory="C";

function checkCommand(){
    if(a4Processes[9].running == true){
        commandIndex=commandList.indexOf(command);
        var flag = threadIODeviceCommand();
        if(flag == true){ 
            return;
        }
    }
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
            if (isLoggedIn == true || isSUMode == true) {
                display.clearDisplay();
            }else {
                display.displayItem("<br> You must login for specified user to access CLI");
                display.displayItem("<br> Use su command, then pw command to login for specified user");
            }    
            break;
        case 1:                                                                  //dir command
        if (isLoggedIn == true || isSUMode == true) {    
            display.displayItem("<br>Folders/Files inside "+cDirectory+":");
            display.displayItem("<br>");
            var switcher=Directories.indexOf(cDirectory);
            switch(switcher){
                case 0:   
                for(i=0; i<C[0].filename.length; i++){
                    display.displayItem(C[0].filename[i]);
                }
                break;
                case 1: 
                for(i=0; i<C[1].filename.length; i++){
                display.displayItem(C[1].filename[i]);
                }
                break;
                case 2:
                    for(i=0; i<C[2].filename.length; i++){
                        display.displayItem(C[2].filename[i]);
                    }
                break;    
                //Groups
                case 3: 
                    for(i=0; i<C[3].filename.length; i++){
                        display.displayItem(C[3].filename[i]);
                    }
                break;
                //groups
                case 4: 
                    for(i=0; i<C[4].filename.length; i++){
                        display.displayItem(C[4].filename[i]);
                    }
                //users    
                case 5: 
                    for(i=0; i<C[5].filename.length; i++){
                        display.displayItem(C[5].filename[i]);
                    }
                break;
                
                default :
                    newSwitcher=uDirectories.indexOf(cDirectory);
                    if(newSwitcher!=-1){
                        for(i=0; i<use[newSwitcher].filename.length; i++){
                        display.displayItem(use[newSwitcher].filename[i]);
                        }
                    }       
            }
        }else{
                display.displayItem("<br> You must login for specified user to access CLI");
                display.displayItem("<br> Use su command, then pw command to login for specified user");
        }    
            break;
        case 2:                                                         //delete command
        if (isLoggedIn == true || isSUMode == true) {    
            if (cDirectory=="Directory0"){
                var targetIndex=C[0].filename.indexOf(target);
                if(targetIndex==-1){
                    display.badCommand(); 
                }else{
                    C[0].filename.splice(targetIndex, 1);
                    C[0].content.splice(targetIndex, 1);
                    display.displayItem("<br>"+target+" deleted from Directory0");
                    C[2].content[0]=C[2].content[0].replace(target, '');
                }    
            }else if (cDirectory=="Directory1"){
                var targetIndex=C[1].filename.indexOf(target);
                if(targetIndex==-1){
                    display.badCommand(); 
                }else{
                    C[1].filename.splice(targetIndex, 1);
                    C[1].content.splice(targetIndex, 1);
                    display.displayItem("<br>"+target+" deleted from Directory1");
                    C[2].content[1]=C[2].content[1].replace(target, '');
                }
            }else if (uDirectories.indexOf(cDirectory)!=-1){                                                        //if its a user
                var userIndex=uDirectories.indexOf(cDirectory);
                var targetIndex = use[userIndex].filename.indexOf(target);
                if (targetIndex == -1) {
                    display.badCommand();
                }
                else {
                    use[userIndex].filename.splice(targetIndex, 1);
                    use[userIndex].content.splice(targetIndex, 1);
                   display.displayItem("<br>"+target+" deleted from "+cDirectory);
                }    
            }else{                                                                     //Important directories
                var targetIndex=C[2].filename.indexOf(target);
//                if(targetIndex==-1){
//                    display.badCommand(); 
//                }else{
                    display.displayItem("<br>You can not delete Directories, Groups, or Users!"); 
//                }        
            }
        }else {
                display.displayItem("<br> You must login for specified user to access CLI");
                display.displayItem("<br> Use su command, then pw command to login for specified user");
        }    
            break;
        case 3:                                                                      //copy command
         if (isLoggedIn == true || isSUMode == true) {     
            if (cDirectory=="Directory0"){
                if(C[0].filename.indexOf(target)==-1){
                    display.badCommand();
                }else if(name==""){
                    display.badCommand(); 
                }else{
                    targetIndex=C[0].filename.indexOf(target);
                    C[0].filename.push(name);
                    C[0].content.push(C[0].content[targetIndex]);
                    display.displayItem("<br> File "+ name+" added to "+cDirectory);
                    C[2].content[0]=C[2].content[0]+" "+name;
                }
            }else if (cDirectory=="Directory1"){
                if(C[1].filename.indexOf(target)==-1){
                    display.badCommand();
                }else if(name==""){
                    display.badCommand(); 
                }else{
                    targetIndex=C[1].filename.indexOf(target);
                    C[1].filename.push(name);
                    C[1].content.push(C[1].content[targetIndex]);
                    display.displayItem("<br> File "+ name+" added to "+cDirectory);
                    C[1].content[0]=C[1].content[0]+" "+name;
                    }
            }else if (uDirectories.indexOf(cDirectory)!=-1){                                                        //if its a user
                var userIndex=uDirectories.indexOf(cDirectory);
                var targetIndex = use[userIndex].filename.indexOf(target);
                if (targetIndex == -1) {
                    display.badCommand();
                }else if(name==""){
                    display.badCommand(); 
                }else {
                    use[userIndex].filename.push(name);
                    use[userIndex].content.push(use[userIndex].content[targetIndex]);
                    display.displayItem("<br> File "+ name+" added to "+cDirectory);
                }    
            }else{
                    display.displayItem("<br>You can not copy directories, users, or groups!");         
            }
        }else {
                display.displayItem("<br> You must login for specified user to access CLI");
                display.displayItem("<br> Use su command, then pw command to login for specified user");
        }    
            break;
        case 4:                                                                      //ps command
        if (isLoggedIn == true || isSUMode == true) {
            var counter=0;
            display.displayItem("<br> Currently running processes:");
            for(i=0; i<pRunning.length; i++){
              if(pRunning[i]==true){                           //need to add running variable to each process.
                  display.displayItem("<br>"+ProcessNames[i]);
                  counter=counter+1;
              }  
            }if(counter==0){                                                        
                display.displayItem("<br>Currently no processes are running");
            }   
        }else{
                display.displayItem("<br> You must login for specified user to access CLI");
                display.displayItem("<br> Use su command, then pw command to login for specified user");
        }    
            break;
        case 5:                                                                          //start command
        if (isLoggedIn == true || isSUMode == true) {     
            targetIndex=ProcessNames.indexOf(target);
            if(targetIndex==-1){
                display.badCommand();      
           }else {
               if(targetIndex<6){
                    if(Processes.listOfProcesses[targetIndex].running==true){
                        display.displayItem("<br>"+target+" is already running");          
                        targetIndex=10000;
                    }
               }else{
                    a4index=targetIndex-6;
                    if(a4Processes[a4index].running==true){
                        display.displayItem("<br>"+target+" is already running");
                        targetIndex=10000;
                    }
               }
                switch(targetIndex){
                    case 0:
                         if(cDirectory=="Directory0"){
                            Processes.listOfProcesses[targetIndex].running=true;
                            pRunning[targetIndex]=true;
                            display.displayItem("<br> Process has fininished but is still running. Please use kill command to terminate process."); 
                        }else{
                            display.displayItem("<br>You must be in Directory0 to start this process!");
                        }
                         break;
                    case 1:
                        if(cDirectory=="Directory0"){
                            Processes.listOfProcesses[targetIndex].running=true;
                            pRunning[targetIndex]=true;
                            display.displayItem("<br> Process has fininished but is still running. Please use kill command to terminate process.");
                        }else{
                            display.displayItem("<br>You must be in Directory0 to start this process!");
                        }
                        break;
                    case 2:
                        if(cDirectory=="Directory0"){
                            Processes.listOfProcesses[targetIndex].running=true;
                            pRunning[targetIndex]=true;
                            display.displayItem("<br> Process has fininished but is still running. Please use kill command to terminate process.");
                        }else{
                            display.displayItem("<br>You must be in Directory0 to start this process!");
                        }
                        break;
                    case 3:
                        if(cDirectory=="Directory0"){
                            Processes.listOfProcesses[targetIndex].running=true;
                            pRunning[targetIndex]=true;
                            display.displayItem("<br> Process has fininished but is still running. Please use kill command to terminate process.");
                        }else{
                            display.displayItem("<br>You must be in Directory0 to start this process!");
                        }
                        break;
                    case 4:
                        if(cDirectory=="Directory0"){
                            Processes.listOfProcesses[targetIndex].running=true;
                            pRunning[targetIndex]=true;
                            display.displayItem("<br> Process has fininished but is still running. Please use kill command to terminate process.");
                        }else{
                            display.displayItem("<br>You must be in Directory0 to start this process!");
                        }
                        break;
                    case 5:
                        if(cDirectory=="Directory0"){
                            Processes.listOfProcesses[targetIndex].running=true;
                            pRunning[targetIndex]=true;
                            display.displayItem("<br> Process has fininished but is still running. Please use kill command to terminate process.");
                        }else{
                            display.displayItem("<br>You must be in Directory0 to start this process!");
                        }
                        break;
                    case 6: //chracterReader
                        if(cDirectory=="Directory1"){
                            a4Processes[a4index].running=true;
                            pRunning[targetIndex]=true;
                            a4Processes[a4index].characterTracker();
                            display.displayItem("<br>Process has finished successfully. You may kill this process to show result.");
                        }else{
                            display.displayItem("<br>You must be in Directory1 to start this process!");
                        }    
                        break;    
                    case 7://angryMsgConverter1
                        if(cDirectory=="Directory1"){
                        a4Processes[a4index].running=true;
                            pRunning[targetIndex]=true;
                            a4Processes[a4index].angryMsgConverter1();
                            display.displayItem("<br>Relevent data is now being piped to next process."+ "<br>Please start angryMsgConverter2, do not kill this process before then.");
                        }else{
                            display.displayItem("<br>You must be in Directory1 to start this process!");
                        }    
                        break;
                    case 8: //angryMsgConverter2
                        if(cDirectory=="Directory1"){
                            if(a4Processes[1].running==false){
                                display.displayItem("<br>angryMsgConverter1 must be running to recieve needed data."+"<br>Please run angryMsgConverter1 first.");
                            }else{
                                a4Processes[a4index].running=true;
                                pRunning[targetIndex]=true;
                                a4Processes[a4index].angryMsgConverter2();
                                display.displayItem("<br>Relevent data is now being piped to next process."+ "<br>Please start angryMsgConverter3, do not kill this process before then.");
                            }
                        }else{
                            display.displayItem("<br>You must be in Directory1 to start this process!");
                        }    
                        break;
                    case 9: //angryMsgConverter3
                        if(cDirectory=="Directory1"){
                            if(a4Processes[2].running==false){
                                display.displayItem("<br>angryMsgConverter2 must be running to recieve needed data."+"<br>Please run angryMsgConverter2 first.");
                            }else{ 
                                a4Processes[a4index].running=true;
                                pRunning[targetIndex]=true;
                                a4Processes[a4index].angryMsgConverter3();
                                display.displayItem("<br> Process has finished succesfully. You may now kill this process to show result.");
                            }
                        }else{
                            display.displayItem("<br>You must be in Directory1 to start this process!");
                        }      
                        break;
                    case 10:
                        
                            a4Processes[a4index].running=true;    
                            pRunning[targetIndex]=true;
                            a4Processes[a4index].diningPhilosophers();
                            display.displayItem("<br> This process is still running however, please kill this process to stop.");
                        
                        break;
                    case 11: // needsToSleep 
                        if(cDirectory=="Directory1"){
                            a4Processes[a4index].running = true;
                            pRunning[targetIndex] = true;
                            var state = a4Processes[a4index].needsToSleep(0);
                            if (state === 0)
                            {
                                a4Processes[a4index].sleeping = true;
                                display.displayItem("<br>needsToSleep process started. needsToSleep process will sleep until numberSummation is run.");                        
                            }
                            else if (state === 1)
                            {
                                a4Processes[a4index].sleeping = false;
                            }
                        }else{
                            display.displayItem("<br>You must be in Directory1 to start this process!");
                        }  
                        break;
                    case 12: // numberSummation
                        if(cDirectory=="Directory1"){
                            a4Processes[a4index].running = true;
                            pRunning[targetIndex] = true;
                            var status = a4Processes[a4index].numberSummation();
                            display.displayItem("<br>numberSummation process started. needsToSleep process should now wake up.");
                            if (status === 1)
                            {
                                a4Processes[a4index-1].needsToSleep(1);
                            }
                        }else{
                            display.displayItem("<br>You must be in Directory1 to start this process!");
                        }  
                        break;
                      case 13:
                          if(cDirectory=="Directory1"){
                            a4Processes[a4index].running = true;
                            pRunning[targetIndex] = true;
                            a4Processes[a4index+1].running=true;
                            pRunning[targetIndex+1]=true;
                            a4Processes[a4index ].Physics();
                            display.displayItem("<br>Process finished calculating the height of dropping item. You may terminate this Process.");
                        }else{
                            display.displayItem("<br>You must be in Directory1 to start this process!");
                        }  
                        break;
                    case 14:
                        display.displayItem("<br>addPhysicsTime is automatically spawned by Physics and is not meant to be started by the user. Please start Physics.")
                        break;
                    case 15:    
                       a4Processes[a4index].running = true;
                        pRunning[targetIndex] = true;
                        a4Processes[a4index].commandGroupFile();
                    case 16:
                       if(cDirectory=="Directory1"){ 
                            a4Processes[a4index].running = true;
                             pRunning[targetIndex] = true;
                            a4Processes[a4index].copyfile();
                            display.displayItem("file copy finished")
                        }else{
                            display.displayItem("<br>You must be in Directory1 to start this process!");
                        }      
                       break;    
                    default:    
                       break;
                 }    
         }
        } else {
                display.displayItem("<br> You must login for specified user to access CLI");
                display.displayItem("<br> Use su command, then pw command to login for specified user");
        } 
        break;
        case 6:                                                                      //kill command   
        if (isLoggedIn == true || isSUMode == true) {
            targetIndex=ProcessNames.indexOf(target);
            if(targetIndex==-1){
                display.badCommand(); 
            }else if(targetIndex<6){
                if(Processes.listOfProcesses[targetIndex].running==false){
                    display.displayItem("<br>"+target+" is not running");
                }else{
                    Processes.listOfProcesses[targetIndex].running=false;
                    pRunning[targetIndex]=false;
                    display.displayItem("<br>"+target+" has terminated. Now displaying results.");
                    display.displayItem("<br>"+displayResults[targetIndex]);
                }
            }else{
                a4index=targetIndex-6;
                if(a4Processes[a4index].running==false){
                    display.displayItem("<br>"+target+" is not running");
                }else{
                    a4Processes[a4index].running=false;
                    pRunning[targetIndex]=false;
                    display.displayItem("<br>"+target+" has terminated. Now displaying results.");
                    display.displayItem("<br>"+displayResults[targetIndex]);
                }
            }
        } else {
                display.displayItem("<br> You must login for specified user to access CLI");
                display.displayItem("<br> Use su command, then pw command to login for specified user");
        }    
        break;
        case 7:                                                                      //cat command
        if (isLoggedIn == true || isSUMode == true) {    
            if (cDirectory == "Directory0") {
                var targetIndex = C[0].filename.indexOf(target);
                if (targetIndex == -1) {
                    display.badCommand();
                }
                else {
                    targetIndex = C[0].filename.indexOf(target);
                    display.displayItem("<br>Contents of " + target);
                    display.displayItem("<br>" + C[0].content[targetIndex]);
                }
            }
            else if (cDirectory == "Directory1") {
                var targetIndex = C[1].filename.indexOf(target);
                if (targetIndex == -1) {
                    display.badCommand();
                }
                else {
                    targetIndex = C[1].filename.indexOf(target);
                    display.displayItem("<br>Contents of " + target);
                    display.displayItem("<br>" + C[1].content[targetIndex]);

                }
            }
            else  if (cDirectory=="C"){
                var targetIndex = C[2].filename.indexOf(target);
                if (targetIndex == -1) {
                    display.badCommand();
                }
                else {
                    display.displayItem("<br>Contents of " + target);
                    display.displayItem("<br>" + C[2].content[targetIndex]);
                }
            }else if (cDirectory == "Groups") {
                var targetIndex = C[3].filename.indexOf(target);
                if (targetIndex == -1) {
                    display.badCommand();
                }
                else {
                    targetIndex = C[3].filename.indexOf(target);
                    display.displayItem("<br>Contents of " + target);
                    display.displayItem("<br>" + C[3].content[targetIndex]);
                }    
            }else if (cDirectory == "users") {
                var targetIndex = C[5].filename.indexOf(target);
                if (targetIndex == -1) {
                    display.badCommand();
                }
                else {
                    display.displayItem("<br>Contents of " + target);
                    display.displayItem("<br>" + C[5].content[targetIndex]);
                }    
            } else if (cDirectory == "groups") {
                var targetIndex = C[4].filename.indexOf(target);
                if (targetIndex == -1) {
                    display.badCommand();
                }
                else {
                    display.displayItem("<br>Contents of " + target);
                    display.displayItem("<br>" + C[4].content[targetIndex]);
                }    
            } else if (uDirectories.indexOf(cDirectory)!=-1){                                                        //if its a user 
                var userIndex=uDirectories.indexOf(cDirectory);
                var targetIndex = use[userIndex].filename.indexOf(target);
                if (targetIndex == -1) {
                    display.badCommand();
                }
                else {
                    display.displayItem("<br>Contents of " + target);
                    display.displayItem("<br>" + use[userIndex].content[targetIndex]);
                }    
            }else {
                display.badCommand();
            }
        }else {
                display.displayItem("<br> You must login for specified user to access CLI");
                display.displayItem("<br> Use su command, then pw command to login for specified user");
        }    
            break;
        case 8:                                                                      //ren command
        if (isLoggedIn == true || isSUMode == true) {     
            if (cDirectory == "Directory0") {
                if (C[0].filename.indexOf(target) == -1) {
                    display.badCommand();
                } else if (name == "") {
                    display.badCommand();
                } else {
                    targetIndex = C[0].filename.indexOf(target);
                    C[0].filename[targetIndex] = name;
                    display.displayItem("<br>" + target + " renamed to " + name);
                    C[2].content[0]=C[2].content[0].replace(target, name);
                }
            }
            else if (cDirectory == "Directory1") {
                if (C[1].filename.indexOf(target) == -1) {
                    display.badCommand();
                } else if (name == "") {
                    display.badCommand();
                } else {
                    targetIndex = C[1].filename.indexOf(target);
                    C[1].filename[targetIndex] = name;
                    display.displayItem("<br>" + target + " renamed to " + name);
                    C[2].content[1]=C[2].content[1].replace(target, name);
                }
            }else if (uDirectories.indexOf(cDirectory)!=-1){                                                        //if its a user
                var userIndex=uDirectories.indexOf(cDirectory);
                var targetIndex = use[userIndex].filename.indexOf(target);
                if (targetIndex == -1) {
                    display.badCommand();
                }else if(name==""){
                    display.badCommand(); 
                }else {
                    use[userIndex].filename[targetIndex]=name;
                    display.displayItem("<br>" + target + " renamed to " + name);
                }    
            }
            else {
                    display.displayItem("<br>You can not rename directories users or groups!");
            }
        } else {
                display.displayItem("<br> You must login for specified user to access CLI");
                display.displayItem("<br> Use su command, then pw command to login for specified user");
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
                        "</br>man&emsp;&ensp;&thinsp;&thinsp;-&emsp;The command manual, you're using it right now silly."+
                        "</br>cd&emsp;&emsp;&thinsp;&thinsp;&thinsp;-&emsp;Change Directory. Enter command as follows: cd \<\fdirectoryname\>\n\
                                 . To go to C enter command as follows: cd .."+
                        "</br>df&emsp;&emsp;&thinsp;&thinsp;&thinsp;-&emsp;Lists memory information."+    
                        "</br>useradd&thinsp;&thinsp;-&emsp;Adds a new user to O/S, and creates a sub-directory for them in Groups. Enter command as follows:useradd \<\fusername\> \<\fpassword\> "+  
                        "</br>su&emsp;&emsp;&thinsp;&thinsp;&thinsp;-&emsp;Switch users. Enter command as follows: su \<\fusername\>, must use pw command after to enter password. Entering su exit will revert to"+
                        "</br>&emsp;&emsp;&emsp;&emsp;&emsp;previous user, entering su with no arguements will change to super user."+   
                        "</br>ps&emsp;&emsp;&thinsp;&thinsp;&thinsp;-&emsp;After using su command with valid username type: pw \<\fpassword\> to enter password for user." +  
                        "</br>groupadd&thinsp;-&thinsp;&thinsp;Adds a new group to the O/S. Enter command as follows: groupadd \<\fgroupname\>" + 
                        "</br>usermod-&thinsp;&thinsp;Adds or removes a user from a group. To add users enter: usermod -a -G \<\fgroupname\> \<\fusername\>."+
                        "</br>&emsp;&emsp;&emsp;&emsp;&thinsp;To remove users enter usermod -r -G \<\fgroupname\> \<\fusername\> " +
                        "</br>usermode-&thinsp;Displays which user mode the OS is in."+
                        "</br>userdel&thinsp;&thinsp;-&emsp;Removes a user from the OS. Enter command as follows: userdel \<\fusername\>";
  
            display.displayItem(manual);                          
            break;
        
        //cd command    
        case 10:
        if (isLoggedIn == true || isSUMode == true) {    
            if(target==".." && cDirectory!="C"){
                cDirectory="C";
                display.displayItem("<br>New directory: "+cDirectory);
                   
            }else if(target==".." && cDirectory=="C"){
               display.displayItem("<br>You are already in: "+cDirectory); 
            }
            else if(Directories.indexOf(target)==-1){
                display.badCommand(); 
            }
            else if(cDirectory==target){
                display.displayItem("<br>You are already in: "+cDirectory);  
            }
            else if(target=="C"){
                  display.badCommand();    
            }
            else {
                    cDirectory=target;
                    display.displayItem("<br>New directory: "+cDirectory); 
            }
        } else {
                display.displayItem("<br> You must login for specified user to access CLI");
                display.displayItem("<br> Use su command, then pw command to login for specified user");
        }    
            break;    
            
        // df command (Assign 5, Paul)
        // Displays information on total disk space, used disk space, available disk space.
        // The df command does not calculate any values, it simply retrieves them.
        case 11:
         if (isLoggedIn == true || isSUMode == true) {    
            display.displayItem("<br>Total disk space: " + newOS.FS.totalSize + " kilobytes.");
            display.displayItem("<br>Used disk space: " + newOS.FS.spaceUsed + " kilobytes.");
            display.displayItem("<br>Available disk space: " + newOS.FS.spaceFree + " kilobytes.");            
            break;
        } else {
                display.displayItem("<br> You must login for specified user to access CLI");
                display.displayItem("<br> Use su command, then pw command to login for specified user");
        }    
        // useradd command (Assign 6, Paul)
        case 12:
//            display.displayItem("<br>// Debug - Entered case 12 for useradd command."); //debug
            var newUser = new User(target, name);
            userPW = newUser.password;
            newOS.users.push(newUser);
            newOS.userPWs.push(userPW);
            var user = [newUser, userPW];    
            newOS.userID.push(user);           // pushes an array containing the username and its password into userID[]
            
            var myACL = new ACL(target);
            
            //creating a user directory for user (Assign 6,Jeffrey)
            var newFolder={filename:["BlankText.txt"], content:["This is a file owned by the user to play with."], acl:[]};
            use.push(newFolder);
            use[use.length-1].acl.push(myACL);
            C[3].content[1]=C[3].content[1]+" "+target;                          
            C[5].filename.push(target);                                         
            C[5].content.push("BlankText.txt");
            Directories.push(target);
            uDirectories.push(target);
            break;
            
        // su command (Assign 6, Paul)
        // Switch user - Changes the current user (and subsequently user mode).
        // When used without arguments, changes the current session to superuser 
        // (root) mode. When used with an argument, does one of two things:
        //     1) If the argument is a valid username, then changes the current 
        //        user to the specified user;
        //     2) If the argument is "exit", and the current mode is superuser
        //        mode, then exits the superuser mode and reverts to the previous
        //        user and his/her mode.
        // Examples of the three ways to use this command:
        //     su          // will switch to superuser (root) mode
        //     su username // will switch to specified username
        //     su exit     // if currently in superuser mode, will revert to 
        //                 // previous user/mode
        case 13:
//            display.displayItem("<br>// Debug - Entered case 13."); //debug
            if (target == "")
            {
//                display.displayItem("<br>// Debug - Entered no argument."); //debug
                // save old info
                newOS.previousUser = newOS.currentUser;
                newOS.previousUserMode = newOS.userMode;

                // switch user
                newOS.currentUser = newOS.users[0]; // index 0 reserved for root
                newOS.userMode = newOS.currentUser.type;
                isUserMode = false;
                isSUMode = true;
                display.displayItem("<br>Switched to root (super user)."); //debug                
            }

            else if (target == "exit" && newOS.currentUser.name == "root")
            {
//                display.displayItem("<br>// Debug - Entered exit and currentUser == root."); //debug
                // revert to previous user and previous user mode
                newOS.currentUser = newOS.previousUser; // index 0 reserved for root
                newOS.userMode = newOS.previousUserMode;
                isUserMode = false;
                isSUMode = false;
                display.displayItem("<br>Reverted to previous user."); //debug                                
            }

            else if (target == "exit" && newOS.currentUser.name != "root")
            {
                display.displayItem("<br>You are not in super user mode.");
            }

            else
            {
//                display.displayItem("<br>// Debug - Entered lookup of user."); //debug

                indexOfUser = findWithAttr(newOS.users, "name", target);


                // if invalid user
                if (indexOfUser == -1)
                    display.displayItem("<br>Error: no such user.");

                else
                {
                    // when user types su <username>, prompts user to type in pw <password>
                    if (isLoggedIn == false) {
                        // save old info (probably not necessary, but just in case)
                        newOS.previousUser = newOS.currentUser;
                        newOS.previousUserPW = newOS.currentUserPW;
                        newOS.previousUserMode = newOS.userMode;
                        newOS.currentUser = newOS.users[indexOfUser];
                        usedSUcmd = true;
                        display.displayItem("<br>Enter password for user: " + target);
                    }
                    // when user wants to login using a different username, the previously logged in user is logged out
                    if (isLoggedIn == true) {
                        newOS.previousUser = newOS.currentUser;
                        newOS.previousUserPW = newOS.currentUserPW;
                        newOS.previousUserMode = newOS.userMode;
                        newOS.currentUser = newOS.users[indexOfUser];
                        display.displayItem("<br>User logged out.");
                        usedSUcmd = true;
                        isLoggedIn = false;
                        isUserMode = true;
                        display.displayItem("<br>Enter password for user: " + target);
                    }
                }
            }

            display.displayItem("<br>CurrentUser=" + newOS.currentUser.name + ", UserMode=" + newOS.userMode); //debug
            break;
            
        // groupadd command (Assign 6, Paul)
        // Creates a new group and adds it to newOS.groups[]
        // The syntax for this command is as follows:
        //     groupadd groupname
        case 14:
            var newGroup = new Group(target);
            newOS.groups.push(newGroup);  
            C[3].content[0]=C[3].content[0]+" "+target;
            C[4].filename.push(target);  
            C[4].content.push("");  
            break;
        
        // usermod command (Assign 6, Paul)
        // Adds/removes existing user to/from existing group 
        // Two ways to use this command: 
        //     usermod -a -G <groupname> username // appends user to group
        //     usermod -r -G <groupname> username // removes user form group
        case 15:
            var targetArray = target.split(" ");
            
            // validate correct number of arguments
            if (targetArray.length != 4)
            {
                display.displayItem("<br>Error: Incorrect use of usermod (incorrect number of args).");
                break;
            }
            
            var groupname = targetArray[2]
            var username = targetArray[3]
            
            // validate that the group exists
            var indexOfGroup = findWithAttr(newOS.groups, "name", groupname)
            if (indexOfGroup == -1)
            {
                display.displayItem("<br>Error: That group doesn't exist.");
                break;
            }
            
            // validate that the user exists
            var indexOfUser = findWithAttr(newOS.users, "name", username)
            if (indexOfUser == -1)
            {
                display.displayItem("<br>Error: That user doesn't exist.");
                break;
            }
            
            // if here, then both the user and the group exist, and we can now
            // add/remove the user to/from the group
            
            // add the user to the group
            if (targetArray[0] == "-a")
            {
                display.displayItem("<br>Adding user to group."); //debug
                newOS.groups[indexOfGroup].members.push(username);
                var targetIndex=C[4].filename.indexOf(groupname);
                C[4].content[targetIndex]=C[4].content[targetIndex]+" "+username;
            }
            
            // remove the user from the group
            else if (targetArray[0] == "-r")
            {
                display.displayItem("<br>Removing user from group."); //debug                
                newOS.groups[indexOfGroup].members.pop(username);   
                var targetIndex=C[4].filename.indexOf(groupname);
                C[4].content[targetIndex]=C[4].content[targetIndex].replace(username, '');
            }
            
            // bad argument
            else
                display.displayItem("<br>Error: Invalid option(s). Example use of this command: usermod -a -G <groupname> username"); //debug
            
            // output what the group looks like now
            display.displayItem("Here is what the group looks like now: " + 
                    newOS.groups[indexOfGroup].toString());  
            
            break;
        
        //----------------------------------------------------------------------
        // insert Yansens' case 16 command here!
        //----------------------------------------------------------------------
        
        
        // userdel command (Assign 6, Paul)
        // Removes a user. Use: userdel <username>
        // A user cannot be removed if he is the current user.
        case 17:
//            display.displayItem("<br>// Debug - Entered case 17 for userdel command."); //debug
//            
            // validate that the user exists
            var indexOfUser = findWithAttr(newOS.users, "name", target);
            if (indexOfUser == -1)
            {
                display.displayItem("<br>Error: That user doesn't exist.");
                break;
            }
            
            // make sure that the current user is not the one that is to be removed
            else if (newOS.currentUser.name == target)
            {
                display.displayItem("<br>Error: Cannot remove yourself! Please execute this command as super user.");
                break;
            }                
            
            else
            {
                newOS.users.splice(indexOfUser, 1);
                display.displayItem("<br>Success: The user " + target + " has been removed.");
            }
            break;
            
        // usermode command (Assign 6, Paul)
        // Displays which user mode the OS is in: not logged in, regular user, 
        // super user.
        case 18:
            display.displayItem("<br>User mode: " + newOS.userMode);
            break;                   

        
        // pw command (Assign 6, Leanna)
        case 19:

            // asks for user's password to login
            // To use this command: pw <password> //confirms user's password and changes the current user to the specified user
            if (usedSUcmd == false) {
                display.displayItem("<br>Must use su command to login, then use pw command for specified user.");
            } else if (isLoggedIn == false) {
                for (var i = 0; i < newOS.userID.length; i++) {
                    if ((newOS.currentUser == newOS.userID[i][0]) && (isUserMode == false) && (target == newOS.userID[i][1])) {
                        display.displayItem("<br>Switched to a different user."); //debug
                        display.displayItem("<br>User logged in as " + newOS.currentUser.name);
                        newOS.userMode = newOS.currentUser.type;
                        loggedUser = newOS.currentUser;
                        isLoggedIn = true;
                        isUserMode = true;
                        isCorrectPW = true;
                    } else if ((newOS.currentUser == newOS.userID[i][0]) && (isUserMode == true) && (target == newOS.userID[i][1])) {
                        display.displayItem("<br>Switched to a different user."); //debug
                        display.displayItem("<br>User logged in as " + newOS.currentUser.name);
                        newOS.userMode = newOS.currentUser.type;
                        loggedUser = newOS.currentUser;
                        isLoggedIn = true;
                        isUserMode = true;
                        isCorrectPW = true;
                    } else if ((isCorrectPW == false) && (isUserMode == true) && (isLoggedIn == true)) {
                        display.displayItem("<br>Incorrect password for user: " + newOS.currentUser.name);
                        display.displayItem("<br>Use su command to login again")
                        newOS.currentUser = newOS.previousUser;
                        //newOS.userMode = newOS.previousUserMode; 
                        isUserMode = false;
                    } else if (isCorrectPW == false) {
                        display.displayItem("<br>Incorrect password for user: " + newOS.currentUser.name);
                        display.displayItem("<br>Use su command to login again")
                        newOS.currentUser = newOS.previousUser;
                        //newOS.userMode = newOS.previousUserMode; 
                        isUserMode = false;
                        usedSUcmd = false;
                    }
                }
            } else if ((usedSUcmd == false) || (target == "" && usedSUcmd == true)) {
                display.displayItem("<br>Must use su command to login, then use pw command for specified user.");
                isUserMode = false;
            } else if (target == "" && usedSUcmd == true) {
                display.displayItem("<br>Empty input");
                isUserMode = false;
            } else {
                display.displayItem("<br>Must use su command to login, then use pw command for specified user.");
                isUserMode = false;
            }
            display.displayItem("<br>currentUser=" + newOS.currentUser.name + ", userMode=" + newOS.userMode); //debug
            break;
    }
    
    newOS.FS.updateSpace(); // moved this here (from line 470) -Paul  
}

function threadIODeviceCommand(){
    switch(command){
        case "cat":
            threadIODevice.cat();
            return true;
            break;
        case "list":
            threadIODevice.listFile();
            return true;
            break;
        case "add":
            threadIODevice.addFile(target);
            return true;
            break;
        case "remove":
            threadIODevice.removeFile(target);
            return true;
            break;
        default:
            return false;
            break;       
    }
    return false;
}