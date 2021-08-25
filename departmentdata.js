const fs = require('fs');

const departmentsTxt = fs.readFileSync('Data/Departments.txt', 'utf8');
const employeeDepartmentsTxt =  fs.readFileSync('Data/EmployeeDepartment.txt', 'utf8');
const employeesTxt =  fs.readFileSync('Data/Employees.txt', 'utf8');
const salariesTxt =  fs.readFileSync('Data/Salaries.txt', 'utf8');


let departments = [];
let employeeDepartments = [];
let employees = [];
let salaries = [];
let employeesList = [];
let master

class Employee {
    constructor(empID,fName,lName,gender){
        this.empID = empID;
        this.fName = fName;
        this.lName = lName;
        this.department = [];
        this.depNum = [];
        this.gender = gender;
        this.salary = [];
        this.lastday = [0,0,0];
    }
}

function splitProcessing(endArray,startText){
    let tempSplit;
    if(master){
        tempSplit = startText.split("\r\n");
    }
    else{
        tempSplit = startText.split("\n");
    }
    
    for(let i of tempSplit){
        endArray.push(i.split(","));
    }
}

function employeeCreation(){
    for(let emp of employees){
        employeesList.push(new Employee(emp[0],emp[2],emp[3],emp[4]));
    }
}
function departmentAssociation(){
    let numEmps = employeeDepartments[employeeDepartments.length-1][0] - 10000;
    for(let empDep of employeeDepartments){
        for(var j = 0; j < numEmps; j++){ 
            if(employeesList[j].empID == empDep[0]){
                for(let dep of departments){
                    if(empDep[1] == dep[0]){
                        employeesList[j].depNum.push(dep[0]);
                        employeesList[j].department.push(dep[1]);
                    }
                }
                let tempSplit = empDep[3].split("-");
                employeesList[j].lastday = tempSplit;
            }
            
        }
        
    }
}
function salaryAssociation(){
    let numEmps = salaries[salaries.length-1][0] - 10000;
    for(let sal of salaries){
        for(var j = 0; j < numEmps; j++){
            if(employeesList[j].empID == sal[0]){
                employeesList[j].salary.push(sal[1]);
            }
        }
    }


} 

function challenge1(){
    //1
    console.log("\nList of first 40 Employees");
    for(var i = 0; i < 40; i++){
        console.log("Name: " + employeesList[i].fName + " " + employeesList[i].lName);
    }
}

function challenge2(){
    //2
    console.log("\nList of Employees and the Department in which they work if they have a salary of over $60000")
    for(var i = 0; i < 40; i++){
        let tempSal = employeesList[i].salary[employeesList[i].salary.length - 1];
        let tempDepNum = employeesList[i].depNum[employeesList[i].depNum.length - 1];
        let tempDep = employeesList[i].department[employeesList[i].department.length - 1];

        if(parseInt(tempSal) > 60000){
            console.log("Name: " + employeesList[i].fName + " " + employeesList[i].lName+ ", Department: " + tempDepNum + "-" + tempDep + ", Salary: $" + tempSal);
        }
    }
}

function challenge3(){
    //3
    console.log("\nList of Former Employees and their Last Day of Work");
    for(var i = 0; i < 40; i++){
        if(employeesList[i].lastday[0] !== "9999"){
            let lday = employeesList[i].lastday;
            console.log("Name: " + employeesList[i].fName + " " + employeesList[i].lName+ ", Last Day: " + lday[1] + "/" + lday[2] + "/" + lday[0]);
        }
    }

}

function challenge4(){
    //4
    console.log("\nList of Employees who have Switched Departments");
    for(var i = 0; i < 40; i++){
        if(employeesList[i].department.length > 1){
            console.log("Name: " + employeesList[i].fName + " " + employeesList[i].lName);
        }

    }
}

function challenge5(){
    //5
    console.log("\nList of Employees who have Recieved Raises")
    for(var i = 0; i < 40; i++){
        if(employeesList[i].salary.length > 1){
            console.log("Name: " + employeesList[i].fName + " " + employeesList[i].lName);
        }
    }
}



function main(){
    master = true;
    splitProcessing(departments,departmentsTxt);
    splitProcessing(employeeDepartments,employeeDepartmentsTxt);
    splitProcessing(employees,employeesTxt);
    splitProcessing(salaries,salariesTxt);

    employeeCreation();
    departmentAssociation();
    salaryAssociation();


    //Comment out other Challenges to test specific ones
    challenge1();
    challenge2();
    challenge3();
    challenge4();
    challenge5();
}




main()