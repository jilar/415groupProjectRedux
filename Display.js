////diplay outputs the things
//import
//var os =
//{
//	PID : 
//	{
//		assignPID : "assignPID",
//	},
//	
//	TASKS : 
//	{
//		createfile : "create",
//		deletefile : "delete",
//		openfile : "open", 
//		closefile : "close", 
//		readfile : "read", 
//		writefile : "write", 
//		filelen : "len", 
//		filepos : "pos", 
//		seekpos : "seek", 
//		isEOF : "isEOF", 
//	},
//};



var p1 = null;

var dFile = null;
var dKeyboard = null;
var dConsole = null;

var fpKeyboard = null;
var fpConsole = null;

var osTaskID = 9999;

var qProcesses = {};

// =====================================================================

var divConsole = document.getElementById ("console");
function onKeyDown (event)
{
        console.log (event.keyCode);
	TABKEY = 9;
	if (event.keyCode == TABKEY)
	{
		onKeyPress (event);
		return false;
	}
}

function onKeyPress (event)
{
	console.log (event.keyCode + " [ " + String.fromCharCode (event.keyCode) + " ]");
	
	if (dKeyboard)
	{
		var task = 
		{ 
			task : os.TASKS.writefile, 
			pid : osTaskID,
			fp : fpKeyboard,
			data : event.keyCode,
		};
		
		dDevice.postMessage (task);
	}
	return false;
}
divConsole.onkeypress = onKeyPress;
divConsole.onkeydown = onKeyDown;
divConsole.keydown = onKeyDown;


function printf (str)
{
	for (t=0; t<str.length; t++)
	{
		c = str.substr (t, 1);
		
		switch (c)
		{ 
			case '\n' :
			case '\r' : c = "<BR>"; break;
			
			case '\t' : c = "        "; break;
			
			case '\b' : 
			{
				c = "";
				divConsole.innerHTML = divConsole.innerHTML.substr(-1, 1);
			} break;
		}
		
		divConsole.innerHTML += c;
	}
}


// =====================================================================

function onMessage_Process (event)
{
	var task = event.data;
	
	console.log ("msg from process = " + JSON.stringify (task));	
	
	dDevice.postMessage (task);
}


// =====================================================================

function onMessage_Device (event)
{
	var task = event.data;
	
	console.log ("msg from device = " + JSON.stringify (task));	
	
	switch (task.pid)
	{ 
		case "9999" : 
		{
			switch (task.cmd)
			{
				case os.TASKS.openFile : 
				{
					if (task.name == "/dev/tty")
						fpKeyboard = tasks.fp; 
					
					if (task.name == "/dev/console")
						fpConsole = tasks.fp; 
				} break;

				case os.TASKS.readfile: break; // do nothing

				case os.TASKS.writefile : // update the console
				{ printf (task.data); }
				break;
			}
		} break;
		
		default : qProcesses [task.pid].postMessage (task); break;
	}
}

