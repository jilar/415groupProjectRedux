function ACL()
{
    owner = "su";                       // default owner is super user
    ownerPermissions = ["r", "w", "x"]; // read, write, execute
    groupName = [null];                 // push groups to this variable
    groupPermissions = [null];          // look up group's permissions here
}

/**
 * 
 * @param {type} name
 * @param {type} password
 * @returns {User}
 */
function User(name, password)
{
    this.name = name;
    this.password = password;
    
    if (name == "root")
    {
        this.path = "C:\\"; // "root" directory
        this.type = "super user";        
    }
    
    else
    {
        this.path = "C:\\Users\\" + name;
        this.type = "regular user";
    }

}


function Group(name)
{
    this.name = name;
    this.members = []; // array of User objects
    display.displayItem("<br>Created a new group named " + this.name); //debug
    
    this.toString = function()
    {
        return this.name + " = [" + this.members.toString() + "]";
    };
}
