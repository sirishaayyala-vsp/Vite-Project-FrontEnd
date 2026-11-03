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
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {icon && <span className="mr-1">{icon}</span>}
        {label}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-2 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-100"
            : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
        }`}
      />

      {salaryField && (
        <p className="mt-1.5 text-xs text-slate-500">
          Enter the employee's annual salary.
        </p>
      )}

      {helperText && !error && (
        <p className="mt-1.5 text-xs text-slate-500">
          {helperText}
        </p>
      )}

      {error && (
        <p className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
