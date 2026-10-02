interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  helperText?: string;
}

export function Select({
  label,
  value,
  options,
  onChange,
  required = false,
  error,
  helperText,
}: SelectProps) {
  return (
    <div>
      <label>
        {label}
        {required && <span> *</span>}
      </label>

      <select
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {helperText && !error && <small>{helperText}</small>}

      {error && <p>{error}</p>}
    </div>
  );
}