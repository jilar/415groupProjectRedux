//Anything here will happen when html starts up.

var container;
window.onload = function(){
  start = function() {
    container = window.document.getElementById('container');
    //container.innerHTML = "Starting OS...";
    Processes.generateListOfProcesses();

    var everyProcessStopped = false;

    while (!everyProcessStopped) {
      everyProcessStopped = Processes.listOfProcesses.every(function(element){         
        if (element.state == "Stop") {
          return true;
        } else {
          return false;
        }
      });

      OS.Scheduler.runNextProcess();
      
      everyProcessStopped = Processes.listOfProcesses.every(function(element){
        if (element.state == "Stop") {
          return true;
        } else {
          return false;
        }
      });
    }
  },
          
  createBank = function(){                                                     //function that creates bank file on startup.
      var szFileName = "bankBook.csv";
            var aryBankBook = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
            var nBankBookSize = 25;

              for (i = 0; i < nBankBookSize; i++){
                //Create a bank book with net positive values 
                var szTransactionType = getTransactionType();
                var nTransactionAmount = getTransactionAmount(szTransactionType);
                  aryBankBook[i][0] = szTransactionType;
                  aryBankBook[i][1] = nTransactionAmount;
              }
              var szFileContents;
              for(k = 0; k < nBankBookSize; k++){
                szFileContents = szFileContents + aryBankBook[k][0] + ":";
                szFileContents = szFileContents + aryBankBook[k][1] + ",\n";
              }
              C[O].content[0]=szFileContents;
  }
  function getTransactionType(){                                                  //createBank helper function
            var nTransactionType = Math.floor(Math.random() * 4.0);
            var szTransactionName;

            if (nTransactionType == 0)
              szTransactionName = "Deposit";
            else if (nTransactionType == 1)
              szTransactionName = "Withdrawal";
            else if (nTransactionType == 2)
              szTransactionName = "Check";
            else if (nTransactionType == 3)
              szTransactionName = "Debit";

              //console.log(szTransactionName);

            return szTransactionName;
        }

    function getTransactionAmount(szTransactionType){                               //createBank helper function
              var nTransactionAmount;
              var nFormattedResult;
              if (szTransactionType == "Deposit")
                nTransactionAmount = 500.0 * Math.random();
              else if (szTransactionType == "Withdrawal")
                nTransactionAmount = -100.0 * Math.random();
              else if (szTransactionType == "Check")
                nTransactionAmount = -250.0 * Math.random();
              else
                nTransactionAmount = -160.0 * Math.random();

                nFormattedResult = Number(nTransactionAmount).toFixed(2);
                //console.log(nFormattedResult);
               
              return nFormattedResult;
    }
  createBank();  
  start();
}
