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
let departmentList = [];
let master;


class Employee {
    constructor(id,name,gender, dateOfBirth, startYear){
        this.id = id
        this.name = name
        this.gender = gender
        this.dateOfBirth = dateOfBirth
        this.startYear = startYear
        this.lastYear = null
        this.department = "Not Available"
        this.salary = 0;
    }
}

class Department {
    constructor(id,name){
        this.id = id
        this.name = name
        this.employeeIDs = []
        this.genders = {
            m: 0,
            f: 0
        }
        this.salaryTotal = 0
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
        employeesList.push(new Employee(emp[0],emp[2] + " " + emp[3],emp[4],emp[1],emp[5].split("-")[0]));
    }
}

function departmentCreation(){
    for(let dep of departments){
        departmentList.push(new Department(dep[0],dep[1]))
    }
}

function departmentAssociation(empID){
    if(empID > 10040){
        return "Not Available"
    }
    else{
        for(let empDep of employeeDepartments){
            if(empDep[0] == empID){
                for(let dep of departmentList){
                    if (dep.id == empDep[1]){
                        return dep.name
                    }
                }
            }
        }
    }
}

function yearAssociation(empID){
    if(empID > 10040){
        return null
    }
    else{
        for(let empDep of employeeDepartments){
            if(empDep[0] == empID){
                return empDep[3].split("-")[0]
            }
        }
    }
}

function salaryAssociation(empID){
    if(empID > 10035){
        return 0
    }
    else{
        for(let sal of salaries){
            if(sal[0] == empID){
                return sal[1]
            }
        }
    }
}

function deparmentEmpIDs(depName){
    let departmentIds = []
    for(let i = 0;i < 40; i++){
        if(employeesList[i].department == depName){
            departmentIds.push(employeesList[i].id)
        }
    }
    return departmentIds
}

function depGenders(depName){
    let m = 0
    let f = 0
    for(let i = 0;i < 40; i++){
        if(employeesList[i].department == depName){
            switch (employeesList[i].gender){
                case "M":
                    m+=1
                    break;
                case "F":
                    f+=1
                    break;
            }
        }  
    }

    return [m,f]
}

function depSalary(depName){
    let totalSal = 0
    for(let i = 0;i < 35; i++){
        if(employeesList[i].department == depName){
            totalSal += employeesList[i].salary
        }
    }
    return totalSal
}


function companySetup(){
    departmentCreation()
    employeeCreation()

    for (let emp of employeesList){
        emp.lastYear = yearAssociation(emp.id)
        emp.department = departmentAssociation(emp.id)
        emp.salary = parseInt(salaryAssociation(emp.id))
    }

    for (let dep of departmentList){
        dep.employeeIDs = deparmentEmpIDs(dep.name)

        let genders = depGenders(dep.name)
        dep.genders.m = genders[0]
        dep.genders.f = genders[1]

        dep.salaryTotal = depSalary(dep.name)
    }
    
}



function main(){
    master = true;
    
    splitProcessing(departments,departmentsTxt);
    splitProcessing(employeeDepartments,employeeDepartmentsTxt);
    splitProcessing(employees,employeesTxt);
    splitProcessing(salaries,salariesTxt);

    companySetup()

    for(let i  = 0; i < 50; i++){
        console.log (employeesList[i])
    }
    console.log(departmentList)
}

main();