var charCount = {};                                 // Used to store characters
var data = "";                                      // Used to store data that was sent to Web Worker
var result = [];                                    // Used to store final result in an array
onmessage = function(e) {                           // Performs a task when data is sent from a4Processes.js
    data = e.data;                                  // Assigns data to the data sent to Web Worker
var chars = data.split("");
for (var i = 0; i < chars.length; i++) {            // Counts the occurrences of each character 
    if (charCount[chars[i]] === undefined)
        charCount[chars[i]] = 0;
    charCount[chars[i]]++;
}
for (var i in charCount) {
    result += i + " : " + charCount[i] + " ";       // Stores the final values in result

}
postMessage(result);                                // Sends result back to a4Processes.js
};
