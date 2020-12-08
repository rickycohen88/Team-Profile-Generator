// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("Employee.js");

class Engineer extends Employee{
    constructor(name,id,email,github){
        super(name,id,email)
        this.role = this.constructor.name;
        this.github=github;
    }
    getRole(){
        return this.role;
    }
    getGithub(){
        return this.gitHub;
    }
}
module.exports = Engineer;