import { FormField } from '@/components/formField';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { PowerNodeData } from '@/nodes/power/type';
import { useForm } from '@mantine/form';
import { useReactFlow, type Node } from '@xyflow/react';

type PowerNodeConfigProps = {
  node: Node;
};

export default function PowerNodeConfig(props: PowerNodeConfigProps) {
  const { updateNodeData } = useReactFlow();

  const form = useForm<PowerNodeData>({
    mode: 'uncontrolled',
    initialValues: {
      ...(props.node.data as PowerNodeData),
    },
    onValuesChange(values) {
      updateNodeData(props.node.id, values);
    },
  });

  const fields = {
    voltage: form.getInputProps('voltage'),
    ampere: form.getInputProps('ampere'),
    name: form.getInputProps('name'),
  };

  return (
    <div className='w-full py-5'>
      <form onSubmit={form.onSubmit((value) => console.log(value))}>
        <FieldSet>
          <FieldGroup className='gap-3'>
            <FormField id='name' label='Device Name' inline error={fields.name.error}>
              <Input
                id='name'
                defaultValue={fields.name.defaultValue}
                onChange={fields.name.onChange}
                placeholder='Insert device name here'
              />
            </FormField>
            <FormField id='voltage' label='Voltage' inline error={fields.voltage.error}>
              <Select
                defaultValue={fields.voltage.defaultValue}
                onValueChange={fields.voltage.onChange}
              >
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
              <Select
                defaultValue={fields.ampere.defaultValue}
                onValueChange={fields.ampere.onChange}
              >
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
        </FieldSet>
      </form>
    </div>
  );
}
