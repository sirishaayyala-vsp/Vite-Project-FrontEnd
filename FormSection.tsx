interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section>
      <h2>{title}</h2>

      {description && <p>{description}</p>}

      {children}
    </section>
  );
}