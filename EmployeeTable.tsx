import { Table } from "../Table";
import { Button } from "../Button";
import type { Employee } from "../../types/employee";

interface EmployeeTableProps {
  employees: Employee[];
  onDeleteEmployee: (id: number) => void;
  onEditEmployee: (employee: Employee) => void;
}

export function EmployeeTable({
  employees,
  onDeleteEmployee,
  onEditEmployee,
}: EmployeeTableProps) {
  const columns = [
    {
      header: "Name",
      accessor: "name" as const,
    },
    {
      header: "Department",
      accessor: "department" as const,
    },
    {
      header: "Salary",
      accessor: "salary" as const,
      render: (value: number) => `₹${value.toLocaleString()}`,
    },
  ];

  return (
    <Table
      data={employees}
      columns={columns}
      getRowKey={(employee) => employee.id}
      emptyMessage="No employees found"
      renderActions={(employee) => (
        <>
          <Button onClick={() => onEditEmployee(employee)}>
            Edit
          </Button>

          <Button onClick={() => onDeleteEmployee(employee.id)}>
            Delete
          </Button>
        </>
      )}
    />
  );
}