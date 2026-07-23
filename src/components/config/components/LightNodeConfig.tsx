import { FormField } from '@/components/formField';
import { ColorPicker } from '@/components/ui/color-picker';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { LightNodeData } from '@/nodes/device/type';
import { useForm } from '@mantine/form';
import { useReactFlow, type Node } from '@xyflow/react';

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
        </FieldSet>
      </form>
    </div>
  );
}
