var openFiles = [];

var threadIODevice = {
    
    addFile: function(file){
        if(Directory0.filename.indexOf(file)==-1){
            display.displayItem("<br>>file is not in directory");
        }else{
            openFiles.push(file);
            display.displayItem("<br>>" + file + " add to thread device")
        }
    },

    removeFile: function(file){
        if(openFiles.indexOf(file)==-1){
            display.displayItem("<br>>file is not in thread device")
        }else{
            var index = openFiles.indexOf(file);
            openFiles.splice(index, 1);
            display.displayItem("<br>>" + file + " is removed from thread device")
        }
    },

    listFile: function(){
        if(openFiles.length ==0){
            display.displayItem("<br>>no file in thread device, use add <filename> command to add file");
        }else{
            display.displayItem("<br>");
            for(var file of openFiles){
                display.displayItem(file+"<tab>");
            }
        }
    },

    cat: function(){
        if(openFiles.length ==0){
            display.displayItem("<br>no file in thread device, use add <filename> command to add file");
        }else{
            for(var file of openFiles){
                catFile(file);
            }
        }
    }
}


function catFile(file){
    var Index=Directory0.filename.indexOf(file);
    display.displayItem("<br>Opening "+file);
    display.displayItem("<br>"+ Directory0.content[Index]);
    display.displayItem("<br>");
}