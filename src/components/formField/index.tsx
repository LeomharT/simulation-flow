import clsx from 'clsx';
import { Field, FieldError, FieldLabel } from '../ui/field';

export type FormFieldProps = {
  id: string;
  error?: string;
  label?: React.ReactNode;
  children?: React.ReactNode;
  optional?: boolean;
  inline?: boolean;
};

export function FormField(props: FormFieldProps) {
  const className = clsx(props.inline ? 'grid grid-cols-[1fr_2fr]' : 'flex flex-col gap-2');

  return (
    <Field data-invalid={!!props.error}>
      <div className={className}>
        <FieldLabel htmlFor={props.id}>
          {props.label}
          {props.optional && (
            <span className={props.error ? 'text-destructive' : 'text-muted-foreground'}>
              Optional
            </span>
          )}
        </FieldLabel>
        {props.children}
      </div>
      {props.error && <FieldError>{props.error}</FieldError>}
    </Field>
  );
}
