import { employees } from "@/assets/data";

export const fetchEmployees = async (query = "") => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  var updatedemployees;

  if(localStorage.employeeDB)
  {
    updatedemployees = JSON.parse(localStorage.getItem('employeeDB'));
  }
  else
  {
    localStorage.setItem('employeeDB', JSON.stringify(employees));
    updatedemployees = JSON.parse(localStorage.getItem('employeeDB'));
  }

  const filteredEmployees = updatedemployees.filter((employee) =>
    employee.name.toLowerCase().includes(query.toLowerCase())
  );
  return [...filteredEmployees];
};

export const addEmployee = async (employee) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  var updatedemployees;

  if(localStorage.employeeDB)
  {
    updatedemployees = JSON.parse(localStorage.getItem('employeeDB'));
  }
  else
  {
    localStorage.setItem('employeeDB', JSON.stringify(employees));
    updatedemployees = JSON.parse(localStorage.getItem('employeeDB'));
  }
  updatedemployees.push(employee);
  localStorage.setItem('employeeDB', JSON.stringify(updatedemployees));
};

export const updateEmployee = async (employee, id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  var updatedemployees = JSON.parse(localStorage.getItem('employeeDB'));
  var index = updatedemployees.findIndex((x) => x.id == id);
  updatedemployees[index] = employee;
  localStorage.setItem('employeeDB', JSON.stringify(updatedemployees));
};

export const deleteEmployee = async (id) => {
  var updatedemployees = JSON.parse(localStorage.getItem('employeeDB'));
  let empIndex = updatedemployees.findIndex((obj) => obj.id === id);
  updatedemployees.splice(empIndex, 1);
  localStorage.setItem('employeeDB', JSON.stringify(updatedemployees));
};
