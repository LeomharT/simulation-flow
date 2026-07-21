import { Field, FieldError, FieldLabel } from '../ui/field';

export type FormFieldProps = {
  id: string;
  error?: string;
  label?: React.ReactNode;
  children?: React.ReactNode;
  optional?: boolean;
};

export function FormField(props: FormFieldProps) {
  return (
    <Field data-invalid={!!props.error}>
      <FieldLabel htmlFor={props.id}>
        {props.label}
        {props.optional && (
          <span className={props.error ? 'text-destructive' : 'text-muted-foreground'}>
            Optional
          </span>
        )}
      </FieldLabel>
      {props.children}
      {props.error && <FieldError>{props.error}</FieldError>}
    </Field>
  );
}
