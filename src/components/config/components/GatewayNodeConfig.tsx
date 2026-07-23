import { FormField } from '@/components/formField';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FieldDescription, FieldGroup, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { GATEWAY_PROTOCOL, type GatewayNodeData } from '@/nodes/gateway/type';
import { useForm } from '@mantine/form';
import { IconChevronDown, IconPlus, IconTrash } from '@tabler/icons-react';
import { useEdges, useReactFlow, type Node } from '@xyflow/react';
import PowerFields from './PowerFields';

type GatewayNodeConfigProps = {
  node: Node;
};

export default function GatewayNodeConfig(props: GatewayNodeConfigProps) {
  const { updateNodeData, deleteElements } = useReactFlow();

  const edges = useEdges();

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
    voltage: form.getInputProps('voltage'),
    ampere: form.getInputProps('ampere'),
  };

  const data = props.node.data as GatewayNodeData;

  function updateDataInputs(data: GatewayNodeData['dataInputs'][number], index: number) {
    updateNodeData(props.node.id, (node) => {
      (node.data as GatewayNodeData).dataInputs[index] = data;
      return node.data;
    });
  }

  function addDataInput() {
    updateNodeData(props.node.id, (node) => {
      const newItem = {
        id: crypto.randomUUID() as string,
        url: '',
        protocol: GATEWAY_PROTOCOL[0],
      };
      (node.data as GatewayNodeData).dataInputs.push(newItem);
      return node.data;
    });
  }

  function deleteDataInput(id: string) {
    if (data.dataInputs.length <= 1) return;

    deleteElements({
      edges: edges.filter((value) => value.targetHandle === id),
    });

    updateNodeData(props.node.id, (node) => {
      const data = node.data as GatewayNodeData;
      (node.data as GatewayNodeData).dataInputs = data.dataInputs.filter(
        (value) => value.id !== id
      );
      return node.data;
    });
  }

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
        <PowerFields fields={fields} />
        <FieldGroup className='gap-3'>
          <FieldDescription>Data Inputs</FieldDescription>
          {data.dataInputs.map((value, index) => (
            <FormField key={value.id} id={value.id} label={'Data Input ' + (index + 1)} inline>
              <InputGroup>
                <InputGroupAddon>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <InputGroupButton className='pr-1.5! text-xs' variant='ghost'>
                        {value.protocol}
                        <IconChevronDown />
                      </InputGroupButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start'>
                      <DropdownMenuGroup>
                        {GATEWAY_PROTOCOL.map((protocol) => (
                          <DropdownMenuItem
                            key={protocol}
                            onClick={() => updateDataInputs({ ...value, protocol }, index)}
                          >
                            {protocol}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </InputGroupAddon>
                <InputGroupInput
                  id={value.id}
                  defaultValue={value.url}
                  onChange={(e) => updateDataInputs({ ...value, url: e.target.value }, index)}
                />
                <InputGroupAddon align='inline-end'>
                  <Button variant='ghost' size='icon-xs' onClick={() => deleteDataInput(value.id)}>
                    <IconTrash />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </FormField>
          ))}
          <Button variant='secondary' onClick={addDataInput}>
            <IconPlus />
            Add New Input
          </Button>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
