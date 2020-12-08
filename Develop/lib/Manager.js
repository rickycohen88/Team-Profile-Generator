// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("Employee.js");

class Manager extends Employee{
    constructor(name,id,email,offNum){
        super(name,id,email)
        this.officeNumber = offNum;
        this.role = this.constructor.name;
    }
    getRole(){
        return this.role;
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
}
module.exports = Manager;