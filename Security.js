function ACL(owner)
{
//    display.displayItem("<br> // Debug - creating an ACL ..."); //debug
    if (owner == null)
        this.owner = "root";                     // default owner is root (super user)
    else
        this.owner = owner;
    this.ownerPermissions = "rwx";         // read, write, execute
    this.groupName = [];                     // push groups to this variable
    this.groupPermissions = [];              // for each group, will have a three character string for rwx
    
//    display.displayItem("<br> // Debug - Owner is : " + this.owner); //debug
//    display.displayItem("<br> // Debug - Owner permissions are : " + this.ownerPermissions); //debug
//    
//    display.displayItem("<br> // Debug - owner:" + this.owner + ":" + this.ownerPermissions); //debug
        
    this.toString = function()
    {
        var ownerInfoString = "owner:" + this.owner + ":" + this.ownerPermissions;

        var groupInfoString = "group:";
        if (this.groupName.length == 0)
            groupInfoString += "<null>";
        else
        {
            groupInfoString += this.groupName[0] + ":" + this.groupPermissions[0];
            for (var i = 1; i <= this.groupName.length; i ++)
            {
                groupInfoString += "\n" + "group:" + this.groupName[i] + ":" + this.groupPermissions[i];
            }
        }
        var completeString = ownerInfoString + "<br>" + groupInfoString;
        return completeString;
    };
    
        
//    display.displayItem("<br> // Debug - the ACL is:<br>" + this.toString()); //debug

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
