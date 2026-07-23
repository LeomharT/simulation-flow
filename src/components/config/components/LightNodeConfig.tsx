import { FormField } from '@/components/formField';
import { ColorPicker } from '@/components/ui/color-picker';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { LightNodeData } from '@/nodes/device/type';
import { useForm } from '@mantine/form';
import { useReactFlow, type Node } from '@xyflow/react';
import PowerFields from './PowerFields';

type LightNodeConfigProps = {
  node: Node;
};

export default function LightNodeConfig(props: LightNodeConfigProps) {
  const { updateNodeData } = useReactFlow();

  const form = useForm<LightNodeData>({
    mode: 'uncontrolled',
    initialValues: {
      ...(props.node.data as LightNodeData),
    },
    onValuesChange(values) {
      updateNodeData(props.node.id, values);
    },
  });

  const fields = {
    color: form.getInputProps('color'),
    name: form.getInputProps('name'),
    voltage: form.getInputProps('voltage'),
    ampere: form.getInputProps('ampere'),
  };

  const currentColor = props.node.data.color as string;

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
            <FormField id='color' label='Light Color' inline error={fields.color.error}>
              <Popover>
                <PopoverTrigger>
                  <InputGroup>
                    <InputGroupAddon>
                      <div
                        className='w-4.5 h-4.5 rounded-full'
                        style={{ background: currentColor }}
                      ></div>
                    </InputGroupAddon>
                    <InputGroupInput id='color' readOnly value={currentColor} />
                  </InputGroup>
                </PopoverTrigger>
                <PopoverContent align='start' style={{ boxShadow: 'none' }}>
                  <ColorPicker value={currentColor} onChange={fields.color.onChange} />
                </PopoverContent>
              </Popover>
            </FormField>
          </FieldGroup>
          <PowerFields fields={fields} />
        </FieldSet>
      </form>
    </div>
  );
}
