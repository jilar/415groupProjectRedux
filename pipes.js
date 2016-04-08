//global vairable object containing all pipes between processes

var pipes={                                                                  
    pipeP3a_P3b:"",                                                          //pipe for procesess 3a to 3b
    pipeP3b_P3c:"",
    pipeP5b_P5a:"" // pipe from process 5 part b to process 5 part a (where "part a" is the process that "need to sleep while waiting for a signal" and "part b" is the "other process that is processing a file")
};
