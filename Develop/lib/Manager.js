// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee{
    constructor(name,id,email,offNum){
        super(name,id,email)
        this.officeNumber = offNum;
        this.role = this.constructor.name;
    }
}
Manager.prototype.getOfficeNumber = function (){
    return this.officeNumber;
}
module.exports = Manager;