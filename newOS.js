//A new o/s for assignment 4 onwards
//Add needed O/S commands as we go.
var newOS={
    FS:{
        Open: function(filename){                                               //gets index of file in directory
            index=Directory0.filename.indexOf(filename);
            return index;
        },     
        Read: function(index){                                                  //using file index, get the file contents and return it
            fileContent=Directory0.content[index];
            return fileContent;
        },
        Create:function(NewFileName){                                           //adds an empty file to directory
            Directory0.filename.push(NewFileName);
        },
        Write: function(filename, content){                                     //write/rewrire contents of a file
            index=Directory0.filename.indexOf(filename);
            if(index==-1){                                                                                                      
                return;
            }
            Directory0.content.push(content);
        }
    }
};

