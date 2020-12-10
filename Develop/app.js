const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let teamMembersFlex = [];
//function to call to ask questions
const promptUser = () =>{return inquirer
    .prompt([
        //questions to be asked go here
        {
            type:"input",
            name:"Name",
            message:"Please enter the team members name"
        },
        {
            type:"input",
            name:"Email",
            message:"Please enter the team members email",
        },
        {
            type: "rawlist",
            name: "Role",
            message: "Please selct this team members role",
            choices:[
                {name:'Manager'},
                {name:'Engineer'},
                {name:'Intern'},
            ]
        },
        {
            type:"confirm",
            name:"idQues",
            message:"Dose this employee already have an id number you would like to enter?"
        },
            {
                type:"number",
                name:"idEnt",
                message:"Please enter the number",
                when:function (responce){
                    if(responce.idQues==true){
                        return true;
                    }
                }
            },
        {
            type:"input",
            name:"officeNumber",
            message:"please enter your team members office number.",
            when:function(responce){
                return responce.Role.indexOf('Manager')>-1
            }
        },
        {
            type:"input",
            name:"Github",
            message:"Please enter team members Github username",
            when:function(responce){
                return responce.Role.indexOf('Engineer')>-1
            }
        },
        {
            type:"input",
            name:"School",
            message:"Please enter the team mebers school",
            when:function(responce){
                return responce.Role.indexOf('Intern')>-1
            }
        },
        {
            type:"confirm",
            name:"addAnother",
            message:"would you like to add another team member"
        }

    ])
}
function makeDirectory(dir){
   if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    }
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

function  memberEntree(){
    promptUser()
    .then((responce)=>{
            console.log("team member prompt successful");
            let x;
            if (responce.idQues == false){
                x = teamMembersFlex.length + 1;
                if(x==undefined){
                    x=0;
                }
                responce.id = x;
            }
            else{
                responce.id = responce.idEnt;
            }
            switch(true){
                case (responce.Role.indexOf('Manager')>-1):
                teamMembersFlex.push( new Manager(responce.Name,responce.id,responce.Email,responce.officeNumber));
                console.log("manager pushed to arr");
                break;

                case(responce.Role.indexOf('Engineer')>-1):
                teamMembersFlex.push(new Engineer(responce.Name,responce.id,responce.Email,responce.Github));
                break;
                case (responce.Role.indexOf('Intern')>-1):
                teamMembersFlex.push(new Intern(responce.Name,responce.id,responce.Email,responce.School));
                break;
                default:
                    console.log("no roles matched");
            }
            console.log(teamMembersFlex);
            if(responce.addAnother){
                memberEntree();
            }
            else{
                let brianaIsCallingMe = render(teamMembersFlex);
                makeDirectory(OUTPUT_DIR);
                fs.writeFile(outputPath,brianaIsCallingMe, (err) =>{
                    if(err){
                        throw err;
                    }
                })
            }
        })
    
    .catch(err => {console.log("There was an ErRoR..with promptUser",err);});
}

memberEntree();
// start working with teamMemberFlex array to gen htmlfile