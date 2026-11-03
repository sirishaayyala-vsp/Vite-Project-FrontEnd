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
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Employee Management System
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Manage your employees, departments, salaries, and employee records.
          </p>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">

          {/* Employee Form */}
          <div className="lg:col-span-1">
            <EmployeeForm
              onAddEmployee={addEmployee}
              selectedEmployee={selectedEmployee}
              onUpdateEmployee={updateEmployee}
            />
          </div>

          {/* Employee List Section */}
          <div className="min-w-0 space-y-6 lg:col-span-2">

            {/* Search, Filter and Sort */}
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Find Employees
              </h2>

              <div className="mb-4">
              <label
                htmlFor="employee-search"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
              Search Employees
              </label>
              <input
                  id="employee-search"
                  type="text"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="Search by employee name..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Department Filter */}
                <div>
                  <label
                    htmlFor="department-filter"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Filter by Department
                  </label>

                  <select
                    id="department-filter"
                    value={selectedDepartment}
                    onChange={(event) =>
                      setSelectedDepartment(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="All">All Departments</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label
                    htmlFor="employee-sort"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Sort By
                  </label>

                  <select
                    id="employee-sort"
                    value={sortOption}
                    onChange={(event) =>
                      setSortOption(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="name-asc">Name A–Z</option>
                    <option value="name-desc">Name Z–A</option>
                    <option value="salary-asc">Salary: Low to High</option>
                    <option value="salary-desc">Salary: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Employee Table */}
            <EmployeeTable
              employees={paginatedEmployees}
              onDeleteEmployee={deleteEmployee}
              onEditEmployee={editEmployee}
            />

            {/* Pagination */}
            <div className="flex flex-col items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:flex-row">

              <p className="text-sm text-slate-600">
                Page {currentPage} of {totalPages || 1}
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={
                    currentPage === totalPages || totalPages === 0
                  }
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(page + 1, totalPages)
                    )
                  }
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
