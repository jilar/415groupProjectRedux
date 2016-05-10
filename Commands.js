//Commands
var command;                                                                                    //global variable acts to            
var commandList=["clear","dir","delete", "copy", "ps", "start", "kill", "cat" ,
    "ren","man","cd","df", "useradd", "su", "groupadd", "usermod"];    //list of commands
var target;                                                                                     //target file/process for commands which ask for a second arguement
var name;                                                                                        //for file name change
var commandIndex;
var targetIndex;
var displayResults=[]                 
var pRunning=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
var cDirectory="C";
var upperDirectory="C";

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
            display.clearDisplay();
            break;
        case 1:                                                                  //dir command
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
            break;
        case 2:                                                         //delete command
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
            }else{                                                                     //Important directories
                var targetIndex=C[2].filename.indexOf(target);
//                if(targetIndex==-1){
//                    display.badCommand(); 
//                }else{
                    display.displayItem("<br>You can not delete Directories, Groups, or Users!"); 
//                }        
            }
            break;
        case 3:                                                                      //copy command
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
            }else{
                if(C[2].filename.indexOf(target)==-1){
                    display.badCommand();
                }else if(name==""){
                    display.badCommand(); 
                }else{
                    display.displayItem("<br>You can not copy directories!");
                }    
            }    
            break;
        case 4:                                                                      //ps command
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
            break;
        case 5:                                                                          //start command
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
        break;
        case 6:                                                                      //kill command   
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
            break;
        case 7:                                                                      //cat command
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
            }else if (uDirectories.indexOf(cDirectory)!=-1){                                                        //if its a user
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
            break;
        case 8:                                                                      //ren command
              //ren command
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
            }
            else {
                if (C[2].filename.indexOf(target) == -1) {
                    display.badCommand();
                } else if (name == "") {
                    display.badCommand();
                } else {
                    display.displayItem("<br>You can not rename directories!");
                }
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
                        "</br>df&emsp;&emsp;&thinsp;&thinsp;&thinsp;-&emsp;Lists memory information."                                                                                                                     
  
            display.displayItem(manual);                          
            break;
        
        //cd command    
        case 10:
            if(target==".." && cDirectory!="C"){
                cDirectory=upperDirectory;
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
            
            break;    
            
        // df command (Assign 5, Paul)
        // Displays information on total disk space, used disk space, available disk space.
        // The df command does not calculate any values, it simply retrieves them.
        case 11:
            display.displayItem("<br>Total disk space: " + newOS.FS.totalSize + " kilobytes.");
            display.displayItem("<br>Used disk space: " + newOS.FS.spaceUsed + " kilobytes.");
            display.displayItem("<br>Available disk space: " + newOS.FS.spaceFree + " kilobytes.");            
            break;
            
        // useradd command (Assign 6, Paul)
        case 12:
//            display.displayItem("<br>// Debug - Entered case 12 for useradd command."); //debug
            var newUser = new User(target, name);
            newOS.users.push(newUser);
            //creating a user directory for user (Assign 6,Jeffrey)
            var newFolder={filename:["BlankText.txt"], content:["This is a file owned by the user to play with."]};
            use.push(newFolder);
            C[3].content[1]=C[3].content[1]+" "+target;                         //cat Groups 
            C[5].filename.push(target);                                         //
            C[5].content.push("BlankText.txt");
//            C[5].filename.push(target)
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
                display.displayItem("<br>// Debug - Switched to root (super user)."); //debug                
            }
            
            else if (target == "exit" && newOS.currentUser.name == "root")
            {
//                display.displayItem("<br>// Debug - Entered exit and currentUser == root."); //debug
                // revert to previous user and previous user mode
                newOS.currentUser = newOS.previousUser; // index 0 reserved for root
                newOS.userMode = newOS.previousUserMode;
                display.displayItem("<br>// Debug - Reverted to previous user."); //debug                                
            }
            
            else if (target == "exit" && newOS.currentUser.name != "root")            
            {
                display.displayItem("<br>// You are not in super user mode.");
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
                    // save old info (probably not necessary, but just in case)
                    newOS.previousUser = newOS.currentUser;
                    newOS.previousUserMode = newOS.userMode;

                    // switch user
                    newOS.currentUser = newOS.users[indexOfUser];
                    newOS.userMode = newOS.currentUser.type;
                    display.displayItem("<br>// Debug - Switched to a different user."); //debug                
                }                
            }
            
            display.displayItem("<br>// Debug - currentUser=" + newOS.currentUser.name + ", userMode=" + newOS.userMode); //debug
            
            break;
            
        // groupadd command (Assign 6, Paul)
        // Creates a new group and adds it to newOS.groups[]
        // The syntax for this command is as follows:
        //     groupadd groupname
        case 14:
            var newGroup = new Group(target);
            newOS.groups.push(newGroup);  
            
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
                display.displayItem("<br>Debug - adding user to group."); //debug
                newOS.groups[indexOfGroup].members.push(username);
            }
            
            // remove the user from the group
            else if (targetArray[0] == "-r")
            {
                display.displayItem("<br>Debug - removing user from group."); //debug                
                newOS.groups[indexOfGroup].members.pop(username);                
            }
            
            // bad argument
            else
                display.displayItem("<br>Error: Invalid option(s). Example use of this command: usermod -a -G <groupname> username"); //debug
            
            // output what the group looks like now
            display.displayItem("<br>Debug - Here is what the group looks like now: " + 
                    newOS.groups[indexOfGroup].toString()); //debug  
            
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