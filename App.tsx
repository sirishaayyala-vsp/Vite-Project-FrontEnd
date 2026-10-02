import { useEffect, useState } from "react";
import { EmployeeForm } from "./components/EmployeeForm/EmployeeForm";
import { EmployeeTable } from "./components/EmployeeTable/EmployeeTable";
import type { Employee } from "./types/employee";

export function App() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "Alice",
      department: "IT",
      salary: 50000,
    },
    {
      id: 2,
      name: "Bob",
      department: "HR",
      salary: 45000,
    },
    {
      id: 3,
      name: "Charlie",
      department: "Finance",
      salary: 55000,
    },
    {
      id: 4,
      name: "David",
      department: "Marketing",
      salary: 48000,
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  const [searchText, setSearchText] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All");

  const [sortOption, setSortOption] = useState("name-asc");

  const [currentPage, setCurrentPage] = useState(1);

  const employeesPerPage = 2;

  function addEmployee(employee: Employee) {
    setEmployees([...employees, employee]);
  }

  function deleteEmployee(id: number) {
    setEmployees(
      employees.filter((employee) => employee.id !== id)
    );
  }

  function editEmployee(employee: Employee) {
    setSelectedEmployee(employee);
  }

  function updateEmployee(updatedEmployee: Employee) {
    setEmployees(
      employees.map((employee) =>
        employee.id === updatedEmployee.id
          ? updatedEmployee
          : employee
      )
    );

    setSelectedEmployee(null);
  }

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "All" ||
      employee.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const sortedEmployees = [...filteredEmployees].sort(
    (a, b) => {
      if (sortOption === "name-asc") {
        return a.name.localeCompare(b.name);
      }

      if (sortOption === "name-desc") {
        return b.name.localeCompare(a.name);
      }

      if (sortOption === "salary-asc") {
        return a.salary - b.salary;
      }

      if (sortOption === "salary-desc") {
        return b.salary - a.salary;
      }

      return 0;
    }
  );

  const totalPages = Math.ceil(
    sortedEmployees.length / employeesPerPage
  );

  const startIndex = (currentPage - 1) * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;

  const paginatedEmployees = sortedEmployees.slice(
    startIndex,
    endIndex
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, selectedDepartment, sortOption]);

  return (
    <div>
      <h1>Employee Management System</h1>

      <EmployeeForm
        onAddEmployee={addEmployee}
        selectedEmployee={selectedEmployee}
        onUpdateEmployee={updateEmployee}
      />

      <hr />

      <div>
        <label>Search Employee: </label>

        <input
          type="text"
          value={searchText}
          placeholder="Search by name"
          onChange={(event) =>
            setSearchText(event.target.value)
          }
        />
      </div>

      <br />

      <div>
        <label>Filter Department: </label>

        <select
          value={selectedDepartment}
          onChange={(event) =>
            setSelectedDepartment(event.target.value)
          }
        >
          <option value="All">All</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      <br />

      <div>
        <label>Sort By: </label>

        <select
          value={sortOption}
          onChange={(event) =>
            setSortOption(event.target.value)
          }
        >
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="salary-asc">
            Salary Low to High
          </option>
          <option value="salary-desc">
            Salary High to Low
          </option>
        </select>
      </div>

      <br />

      <EmployeeTable
        employees={paginatedEmployees}
        onDeleteEmployee={deleteEmployee}
        onEditEmployee={editEmployee}
      />

      <div>
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          Previous
        </button>

        <span>
          {" "}
          Page {currentPage} of {totalPages || 1}{" "}
        </span>

        <button
          type="button"
          disabled={
            currentPage === totalPages || totalPages === 0
          }
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}