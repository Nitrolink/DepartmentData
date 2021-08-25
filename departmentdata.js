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
function departmentCountFix(){
    for(let dep of departments){
        dep[2] = 0
    }
}


function challenge1x1(){
    //1
    console.log("\nList of first 40 Employees");
    for(var i = 0; i < 40; i++){
        console.log("Name: " + employeesList[i].fName + " " + employeesList[i].lName);
    }
}
function challenge1x2(){
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
function challenge1x3(){
    //3
    console.log("\nList of Former Employees and their Last Day of Work");
    for(var i = 0; i < 40; i++){
        if(employeesList[i].lastday[0] !== "9999"){
            let lday = employeesList[i].lastday;
            console.log("Name: " + employeesList[i].fName + " " + employeesList[i].lName+ ", Last Day: " + lday[1] + "/" + lday[2] + "/" + lday[0]);
        }
    }

}
function challenge1x4(){
    //4
    console.log("\nList of Employees who have Switched Departments");
    for(var i = 0; i < 40; i++){
        if(employeesList[i].department.length > 1){
            console.log("Name: " + employeesList[i].fName + " " + employeesList[i].lName);
        }

    }
}
function challenge1x5(){
    //5
    console.log("\nList of Employees who have Recieved Raises")
    for(var i = 0; i < 40; i++){
        if(employeesList[i].salary.length > 1){
            console.log("Name: " + employeesList[i].fName + " " + employeesList[i].lName);
        }
    }
}

function challenge2x1(){
    //1
    let males = 0;
    let females = 0;
    console.log("\nNumber of Females and Males in the Company")
    for(let emp of employeesList){
        if(emp.gender == "M"){
            males++;
        }
        else if(emp.gender == "F"){
            females++
        }
    }
    console.log("Females: " + females + ", Males: " + males)
}
function challenge2x2(){
    console.log("\nNumber of Employees in each Department")
    for(let dep of departments){
        for(var i = 0; i < 40; i++){
            if(employeesList[i].depNum[employeesList[i].depNum.length - 1] == dep[0]){
                dep[2] += 1
            }
        }
        console.log(dep[1] + ": " + dep[2])
    }
}
function challenge2x3(){
    console.log("\nGender Ratio in each Department")
    for(let dep of departments){
        let males = 0;
        let females = 0;
        for(var i = 0; i < 40; i++){
            if(employeesList[i].depNum[employeesList[i].depNum.length - 1] == dep[0]){
                if(employeesList[i].gender == "M"){
                    males++;
                }
                else if(employeesList[i].gender == "F"){
                    females++
                }
            }
        }
        console.log(dep[1] + ": Males : " + males + ", Females: " + females)
    }
}
function challenge2x4(){
    console.log("\nTotal Salary of each Department")
    for(let dep of departments){
        let depSalary = 0;
        for(var i = 0; i < 40; i++){
            if(employeesList[i].depNum[employeesList[i].depNum.length - 1] == dep[0]){
                if(employeesList[i].salary.length > 0){
                    depSalary += parseInt(employeesList[i].salary[employeesList[i].salary.length - 1])
                }
            }
        }
        console.log(dep[1] + ": Salary $" + depSalary)
    }
}
function challenge2x5(){
    console.log("\nTotal Salary of each Department split by Gender")
    for(let dep of departments){
        let maleSalary = 0;
        let femaleSalary = 0;
        for(var i = 0; i < 40; i++){
            if(employeesList[i].depNum[employeesList[i].depNum.length - 1] == dep[0]){
                if(employeesList[i].salary.length > 0){
                    if(employeesList[i].gender == "M"){
                        maleSalary += parseInt(employeesList[i].salary[employeesList[i].salary.length - 1])
                    }
                    else if(employeesList[i].gender == "F"){
                        femaleSalary += parseInt(employeesList[i].salary[employeesList[i].salary.length - 1])
                    }
                   
                }
            }
        }
        console.log(dep[1] + ": Male: $" + maleSalary + ", Female: $" + femaleSalary);
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
    departmentCountFix();

    //Comment out other Challenges to test specific ones

    //Challenge Set 1
    //challenge1x1();
    //challenge1x2();
    //challenge1x3();
    //challenge1x4();
    //challenge1x5();


    //Challenge Set 2
    challenge2x1();
    challenge2x2();
    challenge2x3();
    challenge2x4();
    challenge2x5();
}




main()