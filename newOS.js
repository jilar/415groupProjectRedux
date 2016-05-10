//A new o/s for assignment 4 onwards
//Add needed O/S commands as we go.
var newOS = {
    FS: {
        // Keeping track of storage for Assignment 5 (Paul). Let's let all 
        // space/size variables be in "kilobytes" ... les zeroes that way! For
        // example, even though roughSizeOfObject returns an approximation in
        // bytes, let's pretend that those bytes are actually kilobytes.

        additionalSpace: 100000, // Additional space, in kilobytes ... recall:
        // "Your device will only have 100 megabytes of 
        // space beyond what the OS needs when it starts."

        /**
         * Might want to use this inside of the function roughSizeOfObject to
         * multiply the value that gets returned in order to "scale" it if it
         * is producing shit that is too "small." So might come in handy if we
         * want to "speed up" the process of filling up the 100 MB capacity or 
         * whatever
         * 
         * @type Number
         */
        spaceMultiplier: 1,
        // the rest will get initialized in the initializeSpcae() function,
        // called from start-OS.js
        totalSize: 0,
        spaceUsed: 0,
        spaceFree: 0,
        /**
         * courtesy of tomwrong, http://stackoverflow.com/questions/1248302/javascript-object-size
         * @param {type} object
         * @returns {Number} the approximate size of the given object, in bytes
         */
        roughSizeOfObject: function (object)
        {

            var objectList = [];
            var stack = [object];
            var bytes = 0;

            while (stack.length)
            {
                var value = stack.pop();

                if (typeof value === 'boolean')
                {
                    bytes += 4;
                } else if (typeof value === 'string')
                {
                    bytes += value.length * 2;
                } else if (typeof value === 'number')
                {
                    bytes += 8;
                } else if
                        (
                                typeof value === 'object'
                                && objectList.indexOf(value) === -1
                                )
                {
                    objectList.push(value);

                    for (var i in value)
                    {
                        stack.push(value[ i ]);
                    }
                }
            }
            return this.spaceMultiplier * bytes;
        },
        initializeSpace: function ()
        {
//            display.displayItem("<br> // Debug - spaceUsedTest = " + newOS.FS.spaceUsedTest); //debug
//            display.displayItem("<br> // Debug - spaceUsedTest = " + this.spaceUsedTest); //debug

            this.spaceUsed = this.roughSizeOfObject(C);
            this.totalSize = this.spaceUsed + this.additionalSpace;
            this.spaceFree = this.totalSize - this.spaceUsed;

//            display.displayItem("<br> // Debug - totalSpace = " + this.totalSize); //debug
//            display.displayItem("<br> // Debug - spaceUsed = " + this.spaceUsed); //debug
//            display.displayItem("<br> // Debug - spaceFree = " + this.spaceFree); //debug
        },
        updateSpace: function ()
        {
            this.spaceUsed = this.roughSizeOfObject(C);
            this.spaceFree = this.totalSize - this.spaceUsed;
        },
        Open: function (filename)
        {                                               //gets index of file in directory
            if (cDirectory == "Directory0")
            {
                index = C[0].filename.indexOf(filename);
            } else if (cDirectory == "Directory1")
            {
                index = C[1].filename.indexOf(filename);
            } else if (cDirectory == "C")
            {
                index = C[C.length - 1].filename.indexOf(filename);
            }
            return index;
        },
        Read: function (index)
        {                                                  //using file index, get the file contents and return it
            if (cDirectory == "Directory0")
            {
                fileContent = C[0].content[index];
            } else if (cDirectory == "Directory1")
            {
                fileContent = C[1].content[index];
            } else if (cDirectory == "C")
            {
                fileContent = C[C.length - 1].content[index];
            }
            return fileContent;
        },
        Create: function (NewFileName)
        {                                           //adds an empty file to directory
            if (cDirectory == "Directory0")
            {
                C[0].filename.push(NewFileName);
            } else if (cDirectory == "Directory1")
            {
                C[1].filename.push(NewFileName);
            } else if (cDirectory == "C")
            {
                C[C.length - 1].filename.push(NewFileName);
            }
        },
        Write: function (filename, content)
        {                                     //write/rewrire contents of a file
            if (cDirectory == "Directory0")
            {
                index = C[0].filename.indexOf(filename);
                if (index == -1)
                {
                    return;
                }
                C[0].content.push(content);
            } 
            else if (cDirectory == "Directory1")
            {
                index = C[1].filename.indexOf(filename);
                if (index == -1)
                {
                    return;
                }
                C[1].content.push(content);
            } 
            else if (cDirectory == "C")
            {
                index = C[C.length - 1].filename.indexOf(filename);
                if (index == -1)
                {
                    return;
                }
                C[C.length - 1].content.push(content);
            }
        }
    },
    
    users: [],
    userPWs: [],
    groups: [],
    currentUser: null,
    currentUserPW: null,
    userMode: null,
    previousUser: null,
    previousUserPW: null,
    previousUserMode: null,
    userID: []
};

// a method to get an index of object by its property
// based on the code by Chris Pickett (http://stackoverflow.com/questions/7176908/how-to-get-index-of-object-by-its-property-in-javascript)
function findWithAttr(array, attr, value)
{
    var isFound = false;
    for (var i = 0; i < array.length; i += 1)
        if (array[i][attr] === value)
            return i;
    if (isFound == false)
        return -1;
}