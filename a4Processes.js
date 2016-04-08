//Processes for assignment 4
//call functions from our newOS to open files guys!

var a4Processes=[
    {   running:false,
        graphicCreator:function(){                                             //Example, changable for whoever does t
        var file= newOS.FS.Open();                                //Open function points to the correct index of file contents
        var fContents=newOs.FS.Read(file)                                      //Read function retrieves the file contents for use
        //do actual process stuff 
        displayreults[6];
        }
    },
    {
        running:false,
        characterTracker:function(){
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
    }
];

