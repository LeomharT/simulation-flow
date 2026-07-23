import { FormField } from '@/components/formField';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { GatewayNodeData } from '@/nodes/gateway/type';
import { useForm } from '@mantine/form';
import { useReactFlow, type Node } from '@xyflow/react';

type GatewayNodeConfigProps = {
  node: Node;
};

export default function GatewayNodeConfig(props: GatewayNodeConfigProps) {
  const { updateNodeData } = useReactFlow();

  const form = useForm<GatewayNodeData>({
    mode: 'uncontrolled',
    initialValues: {
      ...(props.node.data as GatewayNodeData),
    },
    onValuesChange(values) {
      updateNodeData(props.node.id, values);
    },
  });

  const fields = {
    name: form.getInputProps('name'),
  };

  return (
    <div className='w-full py-5'>
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
      </FieldSet>
    </div>
  );
}
