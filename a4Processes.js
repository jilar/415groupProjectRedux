//call functions from our newOS to open files guys!

/**
 * Processes for Assignment 4.
 * 
 *   Index | ProcessName        | a4 Process No. | Author
 *   ------+--------------------+----------------+---------
 *     0   | characterTracker   |   2            | Leanna
 *     1   | angryMsgConverter1 |   3a           | Jeffrey 
 *     2   | angryMsgConverter2 |   3b           | Jeffrey
 *     3   | angryMsgConverter3 |   3c           | Jeffrey
 *     4   | diningPhilosophers |   4            | Xing               
 *     5   | needsToSleep       |   5a           | Paul
 *     6   | numberSummation    |   5b           | Paul
 *     7   | Physics            |   8a           | Yansen Liu
 *     8   | addPhysicsTime     |   8b           | Yansen Liu  
 *     9   | commandGroupFile   |   9a           | Zi  
 *    
 *      
 * @type Array
 */

var a4Processes=[
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
                displayResults[6] = "File characterTracker.txt created. Open file using cat command to read message."; // Message to be displayed when kill command is used
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
            displayResults[7]="Pipe from angryMsgConverter1 to angryMsgConverter2 has been cleared.";         //Message to be displayed when kill command is used
        }
    },
    {
        running:false,                    
        angryMsgConverter2:function(){                                              
            var pipeData= pipes.pipeP3a_P3b;
            var upperCaseContent=pipeData.toUpperCase();
            pipes.pipeP3a_P3b="";
            pipes.pipe3b_3c=upperCaseContent;        
            displayResults[8]="Pipe from angryMsgConverter2 to angryMsgConverter3 has been cleared."
        }
    },
    {
        running:false,
        angryMsgConverter3:function(){                                     
            meanMessage=pipes.pipe3b_3c;
            newOS.FS.Create("meanMessage.txt"); 
            newOS.FS.Write("meanMessage.txt",meanMessage);
            pipes.pipe3b_3c="";
            displayResults[9]="File meanMessage.txt created. Open file using cat command to read message."
        }
    },
    {
        running: false,
        diningPhilosophers: function () {
////            Philosopher(); 
////            Philo();
//            var Thread = {
////      var  left,right,id,ponderFactor;
//
//                take: function () {
//                     taken = false;
//                    while (taken) {
//                        wait();
//                    }
//                    taken = true;
//                },
//                drop: function () {
//                    taken = false;
//                    notifyAll();
//                },
//                pause: function () {
//                    //var ponderFactor;
//                    if (ponderFactor == 0) {
//                        return;
//                    }
//                    var rand = Math.random(40);
//                    TimeUnit.MILLISECONDS.sleep(rand.nextInt(ponderFactor * 250));
//                },
//                run: function () {
//                    //var left, right, id;
//   
//                    try {
//                   //var p="Philosopher"+id;
//                  // while(true)
//                        while (!Thread.interrupted()) {
//                            //System.out.println(this + " " + "thinking");
//                            display.displayItem("<br>thinking");                                 
//                            pause();
//                            // Philosopher becomes hungry
//                            //System.out.println(this + " " + "grabbing right");
//                            display.displayItem("<br>grab right");
//                            right.take();
//                            //System.out.println(this + " " + "grabbing left");
//                            display.displayItem("<br>grab left");
//                            left.take();
//                            //System.out.println(this + " " + "eating");
//                            display.displayItem("<br>eating");
//                            pause();
//                            right.drop();
//                            left.drop();
//                        }
//                    }
//                    catch (InterruptedException) {
////                        //System.out.println(this + " " + "exiting via interrupt");
//                        display.displayItem("<br>exit");
//                    }
//                   //return "Philosopher" + id;
//                },
//                deadLock: function () {
//                    var ponder = 5;
//                    if (args.length > 0) {
//                        ponder = Integer.parseInt(args[0]);
//                    }
//                    var size = 5;
//                    if (args.length > 1) {
//                        size = Integer.parseInt(args[1]);
//                    }
//
//                    var exec = Executors.newCachedThreadPool();
//                    var Chopstick = [size];
//                    for (i = 0; i < size; i++) {
//                        Chopstick[i] = new Chopstick();
//                    }
//                    for (i = 0; i < size; i++) {
//                        exec.execute(new Thread(
//                                Chopstick[i], Chopstick[(i + 1) % size], i, ponder));
//                    }
//                    if (args.length == 3 && args[2].equals("timeout")) {
//                        TimeUnit.SECONDS.sleep(5);
//                    } else {
//                        //System.out.println("Press 'Enter' to quit");
//                        display.displayItem("<br>deadLock");
//                        //System.in.read();
//                    }
//                    exec.shutdownNow();
//                },
//            }
//              Thread.run();
            var Thread = {
                State: function () {
                    thinking = 0;
                    eating = 1;
                    hungry = 2;
                    //waiting = 3;
                },
                test: function (i) {
                    var state = [5];
                    if (state[i] == 2 && state[(i + 1) % 5] != 1 && state[(i + 4) % 5] != 1)
                    {
                        state[i] = 1;
                        console.log("Philosopher " + i + " is eating");
                    }
                },
                pickup: function (i) {
                    var state = [5];
                    state[i] = 2;
                    console.log("Philosopher " + i + " is hungry");
                    display.displayItem("<br>Philosopher " + i + " is hungry");
                    Thread.test(i);
//                    if (state[i] == 2 && state[(i + 1) % 5] != 1 && state[(i + 4) % 5] != 1)
//                    {
//                        state[i] = 1;
//                        console.log("Philosopher " + i + " is eating");
//                        display.displayItem("<br>Philosopher " + i + " is eating");
//                    }
                    if (state[i] == 2) {
                        console.log("Philosopher " + i + " is waiting");
                        display.displayItem("<br>Philosopher " + i + " is waiting");
                    }
                },
                putdown: function (i) {
                    var state = [5];
                    if (state[i] == 1) {
                        state[i] = 0;
                        console.log("Philosopher " + i + " is thingking");
                        display.displayItem("<br>Philosopher " + i + " is thingking");
                        Thread.test((i + 1) % 5);
                        Thread.test((i + 5) % 5);
//                        if (state[(i + 1) % 5] == 2 && state[(((i + 1) % 5) + 1) % 5] != 1 && state[(((i + 1) % 5) + 4) % 5] != 1)
//                    {
//                        state[((i + 1) % 5)] = 1;
//                        console.log("Philosopher " + ((i + 1) % 5) + " is eating");
//                    } 
//                           if (state[(i + 5) % 5] == 2 && state[(((i + 5) % 5) + 1) % 5] != 1 && state[(((i + 5) % 5) + 4) % 5] != 1)
//                    {
//                        state[((i + 5) % 5)] = 1;
//                        console.log("Philosopher " + ((i + 5) % 5) + " is eating");
//                    }      
                    }
                },
                run: function ( ) {
                    for (var i = 0; i < 5; i++) {
                        Thread.pickup(i);
                    }
                    for (var i = 0; i < 5; i++) {
                        Thread.putdown(i);
                    }
                    Thread.deadLock();
                },
                deadLock: function () {
                    var state = [5];
                    state[i] = 2;
                    if (state[i] == 2) {
                        display.displayItem("<br>Deadlock");
                        console.log("deadlock");
                    }
                },
            }
            Thread.run();
            displayResults[10]="Process reached deadlocked state, process terminated."
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
                    displayResults[11]="Data in pipe from numberSummation to needsToSleep has been received; \nneedsToSleep is no longer sleeping (that's why you're seeing this messge--it is coming from needsToSleep). \nThe pipe has been cleared.";
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
                    displayResults[11]="Data in pipe from numberSummation to needsToSleep has been received; \nneedsToSleep is no longer sleeping (that's why you're seeing this messge--it is coming from needsToSleep). \nThe pipe has been cleared.";
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
            displayResults[12] = "Sum of numbers from file numbers.csv: "+sum                  ; // Message to be displayed when kill command is used
            return 1; // means this process has finished processing            
        } 
    }, // end process 5b
    {    
        running:false,
        Physics:function(){
            var file=newOS.FS.Open("FallingSpeed.txt");
            var fcontent=newOS.FS.Read(file);
            var data=fcontent.split(" ");
            var g = data[0];
            display.displayItem("<br> starting process addPhysicsTime")
            display.displayItem("<br> addPhysicsTime finished and can be terminated.")
            var time = a4Processes[8].addPhysicsTime();
            var h = (g*(time*time))/2;
            newOS.FS.Create("Result.txt");
            newOS.FS.Write("Result.txt",h);
            displayResults[13]="The item will fall "+h+" meters in "+time+" s. Result stores in Result.txt"
        }
    },
    {
        running:false,
        addPhysicsTime:function(){
            var i = Math.random();
            displayResults[14]="Process Succesfully terminated."
            return i;
        }
    },
    {   
        running:false,
        commandGroupFile: function(){
            display.displayItem("<br> This Process acts like An IO Device where every file instance that is opened creates a new thread to process a command that is passed .");
            display.displayItem("<br> Process is running. To end this process, use kill command");
            display.displayItem("<br> Some CLI command will not run properly until this process is killed.")
            display.displayItem("<br>device command: add \<\ffilename\>\ , remove \<\ffilename\>\ , cat, list");
            threadIODevice.listFile();
            displayResults[15]= "Process is terminated."
        }
    }   
    
    
];


