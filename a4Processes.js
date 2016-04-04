//Processes for assignment 4
//call functions from our newOS to open files guys!
var pipeI01;
var pipeIO2;

var a4Processes={
    graphicCreator:function(){                      //Example, changable for whoever does t
        var file= newOS.FS.Open(graphics.vrml);                                //Open function points to the correct index of file contents
        var fContents=newOs.FS.Read(file)                                      //Read function retrieves the file contents for use
        //do actual process stuff 
        return;
    },
    characterTracker:function(){
        return;
    }
}

