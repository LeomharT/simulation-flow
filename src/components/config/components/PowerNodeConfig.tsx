import { FormField } from '@/components/formField';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { PowerNodeData } from '@/nodes/power/type';
import { useForm } from '@mantine/form';
import { useReactFlow, type Node } from '@xyflow/react';
import PowerFields from './PowerFields';

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
          </FieldGroup>
          <PowerFields fields={fields} />
        </FieldSet>
      </form>
    </div>
  );
}
