//A new o/s for assignment 4 onwards
//Add needed O/S commands as we go.
var newOS={
    FS:{
        // Keeping track of storage for Assignment 5 (Paul). Let's let all 
        // space/size variables be in "kilobytes."
        
        additionalSpace: 100000, // "Your device will only have 100 megabytes of 
                                 // space beyond what the OS needs when it starts."
                                 
        spaceMultiplier: 1,      // might need to multiply some or all of the 
                                 // roughSizeOfObject() calls with this value in 
                                 // case the values given by roughSizeOfObject are 
                                 // too small and we want to "speed up" the process 
                                 // of filling up the 100 MB capacity or whatever

        // the rest will get initialized by start-OS.js
        totalSize: 0,
        spaceUsed: 0,
//        spaceUsedTest: 1,
        spaceFree: 0,
        
        /**
         * courtesy of tomwrong, http://stackoverflow.com/questions/1248302/javascript-object-size
         * @param {type} object
         * @returns {Number}
         */
        roughSizeOfObject: function(object)
        {

            var objectList = [];
            var stack = [ object ];
            var bytes = 0;

            while ( stack.length ) {
                var value = stack.pop();

                if ( typeof value === 'boolean' ) {
                    bytes += 4;
                }
                else if ( typeof value === 'string' ) {
                    bytes += value.length * 2;
                }
                else if ( typeof value === 'number' ) {
                    bytes += 8;
                }
                else if
                (
                    typeof value === 'object'
                    && objectList.indexOf( value ) === -1
                )
                {
                    objectList.push( value );

                    for( var i in value ) {
                        stack.push( value[ i ] );
                    }
                }
            }
            return bytes;
        },
        
        
        initializeSpace: function ()
        {
//            display.displayItem("<br> // Debug - spaceUsedTest = " + newOS.FS.spaceUsedTest); //debug
//            display.displayItem("<br> // Debug - spaceUsedTest = " + this.spaceUsedTest); //debug
            
            this.spaceUsed = this.spaceMultiplier*(this.roughSizeOfObject(Directory) + this.roughSizeOfObject(Directory0) + this.roughSizeOfObject(ProcessNames));
            this.totalSize = this.spaceUsed + this.additionalSpace;
            this.spaceFree = this.totalSize - this.spaceUsed;
            
            display.displayItem("<br> // Debug - totalSpace = " + this.totalSize); //debug
            display.displayItem("<br> // Debug - spaceUsed = " + this.spaceUsed); //debug
            display.displayItem("<br> // Debug - spaceFree = " + this.spaceFree); //debug
        },
        
        
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

