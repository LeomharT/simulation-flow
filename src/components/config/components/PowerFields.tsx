import { FormField } from '@/components/formField';
import { FieldDescription, FieldGroup } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { GetInputPropsReturnType } from '@mantine/form';

type PowerFieldsProps = {
  fields: {
    voltage: GetInputPropsReturnType;
    ampere: GetInputPropsReturnType;
  };
};

export default function PowerFields({ fields }: PowerFieldsProps) {
  return (
    <FieldGroup className='gap-3'>
      <FieldDescription>Power</FieldDescription>
      <FormField id='voltage' label='Voltage' inline error={fields.voltage.error}>
        <Select defaultValue={fields.voltage.defaultValue} onValueChange={fields.voltage.onChange}>
          <SelectTrigger id='voltage' className='w-full'>
            <SelectValue placeholder='Select voltage' />
          </SelectTrigger>
          <SelectContent position='popper'>
            <SelectGroup>
              <SelectItem value='12V'>12V</SelectItem>
              <SelectItem value='24V'>24V</SelectItem>
              <SelectItem value='36V'>36V</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormField>
      <FormField id='ampere' label='Ampere' inline error={fields.ampere.error}>
        <Select defaultValue={fields.ampere.defaultValue} onValueChange={fields.ampere.onChange}>
          <SelectTrigger id='ampere' className='w-full'>
            <SelectValue placeholder='Select ampere' />
          </SelectTrigger>
          <SelectContent position='popper'>
            <SelectGroup>
              <SelectItem value='3A'>3A</SelectItem>
              <SelectItem value='5A'>5A</SelectItem>
              <SelectItem value='10A'>10A</SelectItem>
              <SelectItem value='20A'>20A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormField>
    </FieldGroup>
  );
}
