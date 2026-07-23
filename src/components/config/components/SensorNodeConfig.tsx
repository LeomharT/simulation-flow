import { FormField } from '@/components/formField';
import { FieldDescription, FieldGroup, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Item, ItemContent } from '@/components/ui/item';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { SensorNodeData } from '@/nodes/device/type';
import { useForm } from '@mantine/form';
import { useReactFlow, type Node } from '@xyflow/react';
import PowerFields from './PowerFields';

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

      if (!values.fieldName) form.setFieldError('fieldName', 'Please Insert Field Name');
      if (!values.payload) form.setFieldError('payload', 'Please Insert Payload Value');
    },
  });

  const fields = {
    name: form.getInputProps('name'),
    voltage: form.getInputProps('voltage'),
    ampere: form.getInputProps('ampere'),
    fieldName: form.getInputProps('fieldName'),
    mode: form.getInputProps('mode'),
    payload: form.getInputProps('payload'),
    intervalMs: form.getInputProps('intervalMs'),
  };

  return (
    <div className='w-full py-5'>
      <form onSubmit={form.onSubmit((value) => console.log(value))}>
        <FieldSet>
          <FieldGroup className='gap-3'>
            <FieldDescription>Device</FieldDescription>
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
          <FieldGroup className='gap-3'>
            <FieldDescription>Data</FieldDescription>
            <FormField id='mode' label='Mode' inline error={fields.mode.error}>
              <Select defaultValue={fields.mode.defaultValue} onValueChange={fields.mode.onChange}>
                <SelectTrigger id='mode' className='w-full'>
                  <SelectValue placeholder='Select mode' />
                </SelectTrigger>
                <SelectContent position='popper'>
                  <SelectGroup>
                    <SelectItem value='fixed'>Fixed</SelectItem>
                    <SelectItem value='random'>Random</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormField>
            <FormField id='intervalMs' label='IntervalMs' inline error={fields.intervalMs.error}>
              <Input
                id='intervalMs'
                required
                aria-invalid={!!fields.intervalMs.error}
                defaultValue={fields.intervalMs.defaultValue}
                onChange={fields.intervalMs.onChange}
              />
            </FormField>
            <FormField id='fieldName' label='FieldName' inline error={fields.fieldName.error}>
              <Input
                id='fieldName'
                required
                aria-invalid={!!fields.fieldName.error}
                defaultValue={fields.fieldName.defaultValue}
                onChange={fields.fieldName.onChange}
              />
            </FormField>
            <FormField id='payload' label='Payload' error={fields.payload.error}>
              <Item variant='muted' className='p-0'>
                <ItemContent>
                  <Textarea
                    id='payload'
                    aria-invalid={!!fields.payload.error}
                    className='resize-none'
                    defaultValue={fields.payload.defaultValue}
                    onChange={fields.payload.onChange}
                  />
                </ItemContent>
              </Item>
            </FormField>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
