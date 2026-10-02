interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  icon?: string;
  salaryField?: boolean;
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  helperText,
  error,
  icon,
  salaryField = false,
}: TextInputProps) {
  return (
    <div>
      <label>
        {icon && <span>{icon} </span>}
        {label}
        {required && <span> *</span>}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
      />

      {salaryField && <small>Enter the employee's annual salary.</small>}

      {helperText && !error && <small>{helperText}</small>}

      {error && <p>{error}</p>}
    </div>
  );
}