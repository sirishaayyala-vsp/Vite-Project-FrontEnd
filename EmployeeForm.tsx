import { useEffect, useState } from "react";
import { TextInput } from "../TextInput/TextInput";
import { Select } from "../Select/Select";
import { Button } from "../Button";
import { FormSection } from "../FormSection";

import type { Employee } from "../../types/employee";

interface EmployeeFormProps {
  onAddEmployee: (employee: Employee) => void;
  selectedEmployee: Employee | null;
  onUpdateEmployee: (employee: Employee) => void;
}

const departmentOptions = [
  { value: "IT", label: "IT" },
  { value: "HR", label: "HR" },
  { value: "Finance", label: "Finance" },
  { value: "Marketing", label: "Marketing" },
];

export function EmployeeForm({
  onAddEmployee,
  selectedEmployee,
  onUpdateEmployee,
}: EmployeeFormProps) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  const [nameError, setNameError] = useState<string | undefined>();
  const [departmentError, setDepartmentError] = useState<
    string | undefined
  >();
  const [salaryError, setSalaryError] = useState<string | undefined>();

  useEffect(() => {
    if (selectedEmployee) {
      setName(selectedEmployee.name);
      setDepartment(selectedEmployee.department);
      setSalary(String(selectedEmployee.salary));

      setNameError(undefined);
      setDepartmentError(undefined);
      setSalaryError(undefined);
    } else {
      setName("");
      setDepartment("");
      setSalary("");

      setNameError(undefined);
      setDepartmentError(undefined);
      setSalaryError(undefined);
    }
  }, [selectedEmployee]);

  function validateForm() {
    let isValid = true;

    setNameError(undefined);
    setDepartmentError(undefined);
    setSalaryError(undefined);

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    }

    if (!department) {
      setDepartmentError("Department is required");
      isValid = false;
    }

    const salaryNumber = Number(salary);

    if (!salary || salaryNumber <= 0) {
      setSalaryError("Salary must be greater than 0");
      isValid = false;
    }

    return isValid;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const employee: Employee = {
      id: selectedEmployee ? selectedEmployee.id : Date.now(),
      name: name.trim(),
      department,
      salary: Number(salary),
    };

    if (selectedEmployee) {
      onUpdateEmployee(employee);
    } else {
      onAddEmployee(employee);
    }

    setName("");
    setDepartment("");
    setSalary("");

    setNameError(undefined);
    setDepartmentError(undefined);
    setSalaryError(undefined);
  }

  const isEditing = selectedEmployee !== null;

  return (
    <FormSection
      title="Employee Information"
      description="Enter employee details below."
    >
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          value={name}
          onChange={setName}
          placeholder="Enter employee name"
          required
          error={nameError}
        />

        <Select
          label="Department"
          value={department}
          options={departmentOptions}
          onChange={setDepartment}
          required
          helperText="Select the employee's department."
          error={departmentError}
        />

        <TextInput
          label="Salary"
          value={salary}
          onChange={setSalary}
          placeholder="Enter salary"
          type="number"
          required
          salaryField
          error={salaryError}
        />

        <Button type="submit">
          {isEditing ? "Update Employee" : "Add Employee"}
        </Button>
      </form>
    </FormSection>
  );
}