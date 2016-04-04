//A new o/s for assignment 4 onwards
//Add needed O/S commands as we go.
var newOS={
    FS:{
        Open: function(filename){
            index=Directory0.filename.indexOf(filename);
            return index;
        },     
        Read: function(index){
            fileContent=Directory0.content[index];
            return fileContent;
        },
        Create:function(NewFileName){
            Directory0.filename.push(NewFileName);
            return;
        },
        Write: function(filename, content){
            index=Directory0.filename.indexOf(filename);
            if(index==-1){                                                   //filename not found...awkward this should never run true
                retu
            }
            Directory0.content.push(NewFileName);
            return;
        }
    }
};

