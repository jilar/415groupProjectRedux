//call functions from our newOS to open files guys!

/**
 * Processes for Assignment 4.
 * 
 *   Index | ProcessName        | a4 Process No. | Author
 *   ------+--------------------+----------------+---------
 *     0   | 
 *     1   | characterTracker   |   2a           | Leanna
 *     2   | angryMsgConverter1 |   3a           | Jeffrey 
 *     3   | angryMsgConverter2 |   3b           | Jeffrey
 *     4   | angryMsgConverter3 |   3c           | Jeffrey
 *     5   | 
 *     6   | needsToSleep       |   5a           | Paul
 *     7   | numberSummation    |   5b           | Paul
 *     8   | 
 *     9   | 
 *    10   | 
 *    11   | 
 *    12   | 
 *    
 *      
 * @type Array
 */

var a4Processes=[
    {   running:false,
        graphicCreator:function(){                                             //Example, changable for whoever does t
        var file= newOS.FS.Open();                                             //Open function points to the correct index of file contents
        var fContents=newOs.FS.Read(file)                                      //Read function retrieves the file contents for use
        //do actual process stuff 
        displayreults[6];
        }
    },
    {
        running:false,
        characterTracker:function(){
            var file = newOS.FS.Open("characters.txt");                         // Opens characters.txt 
            var fContents = newOS.FS.Read(file);                                // Stores the contents of characters.txt in fContents
            var worker = new Worker('Threads.js');                              // Creates a Web Worker which is located in Threads.js
            worker.postMessage(fContents);                                      // Sends fContents to the Web Worker in Threads.js
            worker.onmessage = function (event) {                               // Performs another task when Web Worker sends data back
                newOS.FS.Create("characterTracker.txt");                        // Creates a file called characterTracker.txt
                newOS.FS.Write("characterTracker.txt", event.data);             // writes the data into characterTracker.txt
                displayResults[7] = "File characterTracker.txt created. Open file using cat command to read message."; // Message to be displayed when kill command is used
            }; 
        }
    },    
    {
        running:false,
        angryMsgConverter1:function(){                
            var file= newOS.FS.Open("niceMessage.txt");                                //Open function points to the correct index of file contents
            var fContents=newOS.FS.Read(file);                                         //Read function retrieves the file contents for use
            var changedText=fContents.replace(/\./g,"!");
            var changedText=changedText.replace(/love/g,"HATE");  
            pipes.pipeP3a_P3b=changedText;                                            //pipe from angryMsgConverter1 to angryMsgConverter2 now contains contents
            displayResults[8]="Pipe from angryMsgConverter1 to angryMsgConverter2 has been cleared.";         //Message to be displayed when kill command is used
        }
    },
    {
        running:false,                    
        angryMsgConverter2:function(){                                              
            var pipeData= pipes.pipeP3a_P3b;
            var upperCaseContent=pipeData.toUpperCase();
            pipes.pipeP3a_P3b="";
            pipes.pipe3b_3c=upperCaseContent;        
            displayResults[9]="Pipe from angryMsgConverter2 to angryMsgConverter3 has been cleared."
        }
    },
    {
        running:false,
        angryMsgConverter3:function(){                                     
            meanMessage=pipes.pipe3b_3c;
            newOS.FS.Create("meanMessage.txt"); 
            newOS.FS.Write("meanMessage.txt",meanMessage);
            pipes.pipe3b_3c="";
            displayResults[10]="File meanMessage.txt created. Open file using cat command to read message."
        }
    },
    {
        running:false,
        process4:function(){                                           
        }
    },
    
    /**
     * Index 6
     * Process 5a
     * Create a process that needs to sleep while waiting for a signal from 
     * another process that is processing a file.
     * 
     * @author Paul
     */
    {
        running:false,
        sleeping:false,
        needsToSleep:function(code)
        {
            // code 0 means to START the process (this code should be used when the process is NOT already sleeping)
            if (code === 0){
                if (pipes.pipeP5b_P5a != ""){
                    var receivedSum = pipes.pipeP5b_P5a;
                    // reset the pipe
                    pipes.pipeP5b_P5a = "";
                    // display the success, for make win the program! Glorious!
                    displayResults[12]="Data in pipe from numberSummation to needsToSleep has been received; \nneedsToSleep is no longer sleeping (that's why you're seeing this messge--it is coming from needsToSleep). \nThe pipe has been cleared.";
                    return 1; // exit code 1 means process had done its job successfully.
            }else{
//                    display.displayItem("<br> // Debug - No data in pipe; will now sleep ..."); //debug
                    a4Processes[6].sleeping = true;
                    return 0; // exit code 0 indicates that the process should sleep
                } // end else
            } // end if code === 0
            
            else if (code === 1)
            {
//                display.displayItem("<br> // Debug - code = 1."); //debug
                if (!a4Processes[6].sleeping)
                {
                    display.displayItem("needsToSleep isn't sleeping, so what are you doing trying to wake it up?");
                    return;
                }
                a4Processes[6].sleeping = false;
                a4Processes[6].running = true;
                // if have data in pipe from other process, can go ahead and finish this process
                if (pipes.pipeP5b_P5a != "")
                {
                    var receivedSum = pipes.pipeP5b_P5a;
                    // reset the pipe
                    pipes.pipeP5b_P5a = "";
                    // display the success, for make win the program! Glorious!
                    displayResults[12]="Data in pipe from numberSummation to needsToSleep has been received; \nneedsToSleep is no longer sleeping (that's why you're seeing this messge--it is coming from needsToSleep). \nThe pipe has been cleared.";
                    return; // exit code 1 means process had done its job successfully.
                }     
                else
                {
                    a4Processes[6].sleeping = true;
                    return; // exit code 0 means process has not done its job successfully
                }
            } // end else if code === 1
            else
            {
                return;
            }                
        } // end function needsToSleep
    }, // end process 5a
    
    /**
     * Index 7
     * Process 5b - Process 5's dependancy, another "process".
     * 
     * To keep this simple, all this process does is add the integers of a CSV 
     * file. The CSV file literally contains one line: "1,2,3,4,5,6,7,8,9". Once
     * the integers have been added, a singal is sent to Process 5. This is done
     * by setting a flag, visible to Process 5, to true. The flag in this case
     * is the global variable p5Signal.
     * 
     * @author Paul
     * @returns {undefined}
     */
    {
        running:false,
        numberSummation:function(){
            var fileIndex= newOS.FS.Open("numbers.csv");            
            var fContents=newOS.FS.Read(fileIndex);
            // fContents should now contain the string "1,2,3,4,5,6,7,8,9"
            var temp = new Array();
            temp = fContents.split(",");
            for (a in temp){
                temp[a] = parseInt(temp[a], 10);
            }
            var sum = 0;
            for(var i = 0; i < temp.length; i++)
                sum += temp[i];

            // send signal to the needsToSleep "process"
            pipes.pipeP5b_P5a = sum;
            displayResults[13] = "Sum of numbers from file numbers.csv: "+sum                  ; // Message to be displayed when kill command is used
            return 1; // means this process has finished processing            
        } 
    }, // end process 5b
    
    
    /**
     * Process 6
     */
    
    /**
     * Process 7
     */
    
];


