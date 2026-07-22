import { FormField } from '@/components/formField';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SensorNodeData } from '@/nodes/device/type';
import { useForm } from '@mantine/form';
import { useReactFlow, type Node } from '@xyflow/react';

type SensorNodeConfigProps = {
  node: Node;
};

export default function SensorNodeConfig(props: SensorNodeConfigProps) {
  const { updateNodeData } = useReactFlow();

  const form = useForm<SensorNodeData>({
    mode: 'uncontrolled',
    initialValues: {
      ...(props.node.data as SensorNodeData),
    },
    onValuesChange(values) {
      updateNodeData(props.node.id, values);
    },
  });

  const fields = {
    voltage: form.getInputProps('voltage'),
    ampere: form.getInputProps('ampere'),
  };

  return (
    <div className='w-full py-5'>
      <form onSubmit={form.onSubmit((value) => console.log(value))}>
        <FieldSet>
          <FieldGroup>
            <FormField id='voltage' label='Voltage' error={fields.voltage.error}>
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
            <FormField id='ampere' label='Ampere' error={fields.ampere.error}>
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
