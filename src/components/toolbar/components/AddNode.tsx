import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { NODE_TYPES, type nodeTypes } from '@/nodes';
import { useSimulationStore } from '@/store';
import { useToggle } from '@mantine/hooks';
import {
  IconAiGateway,
  IconBoltFilled,
  IconBulbFilled,
  IconCpu,
  IconPlus,
  IconSearch,
} from '@tabler/icons-react';
import { useKeyPress, useReactFlow, type Node } from '@xyflow/react';
import clsx from 'clsx';
import type React from 'react';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

const classNames = {
  label: clsx('flex h-5.5 items-start text-sm font-medium text-muted-foreground'),
};

export default function AddNode() {
  const [open, setOpen] = useToggle();

  const escPress = useKeyPress('Escape');

  const { addingType, setAddingType, cancelAdding } = useSimulationStore(
    useShallow((store) => ({
      setAddingType: store.setAddingType,
      addingType: store.addingType,
      cancelAdding: store.cancelAdding,
    }))
  );

  const { screenToFlowPosition, setNodes, deleteElements } = useReactFlow();

  function addNewNode(e: React.MouseEvent, type: keyof typeof nodeTypes) {
    setOpen(false);

    setAddingType(type);

    const position = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });

    const newNode: Node = {
      id: 'draft',
      type,
      data: {},
      position,
    };

    switch (type) {
      case NODE_TYPES.POWER:
        newNode.data.voltage = '12V';
        newNode.data.ampere = '3A';
        break;
      case NODE_TYPES.LIGHT:
        newNode.data.color = '#7f22fe';
        newNode.data.voltage = '12V';
        newNode.data.ampere = '3A';
        break;
      case NODE_TYPES.SENSOR:
        newNode.data.voltage = '24V';
        newNode.data.ampere = '5A';
        newNode.data.fieldName = 'key';
        newNode.data.payload = 'value';
        newNode.data.mode = 'fixed';
        newNode.data.intervalMs = '1000';
        break;
      case NODE_TYPES.GATEWAY:
        newNode.data.voltage = '24V';
        newNode.data.ampere = '5A';
        break;
      default:
        break;
    }

    setNodes((node) => [...node, newNode]);
  }

  useEffect(() => {
    if (addingType && escPress) {
      cancelAdding();
      deleteElements({ nodes: [{ id: 'draft' }] });
    }
  }, [escPress, addingType, cancelAdding, deleteElements]);

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size='lg' className='px-5 bg-violet-100 hover:bg-violet-200 text-violet-600'>
          <IconPlus />
          Add Node
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-100 [&_button]:justify-start'>
        <PopoverHeader>
          <PopoverTitle>Nodes</PopoverTitle>
        </PopoverHeader>
        <InputGroup className='not-focus:bg-muted'>
          <InputGroupAddon>
            <IconSearch />
          </InputGroupAddon>
          <InputGroupInput placeholder='Search Nodes' autoFocus={false} />
        </InputGroup>
        <Separator className='-ml-2.5 -mr-2.5 w-[inherit]!' />
        <div className={classNames.label}>Power</div>
        <Button variant='ghost' size='lg' onClick={(e) => addNewNode(e, NODE_TYPES.POWER)}>
          <div className='rounded p-1 bg-blue-600 text-white'>
            <IconBoltFilled />
          </div>
          Power Source
        </Button>
        <div className={classNames.label}>Device</div>
        <div className='flex flex-col gap-1'>
          <Button variant='ghost' size='lg' onClick={(e) => addNewNode(e, NODE_TYPES.LIGHT)}>
            <div className='rounded p-1 bg-violet-600 text-white'>
              <IconBulbFilled />
            </div>
            Light
          </Button>
          <Button variant='ghost' size='lg' onClick={(e) => addNewNode(e, NODE_TYPES.SENSOR)}>
            <div className='rounded p-1 bg-violet-600 text-white'>
              <IconCpu />
            </div>
            Sensor
          </Button>
        </div>
        <div className={classNames.label}>Gateway</div>
        <Button variant='ghost' size='lg' onClick={(e) => addNewNode(e, NODE_TYPES.GATEWAY)}>
          <div className='rounded p-1 bg-emerald-600 text-white'>
            <IconAiGateway />
          </div>
          Gateway
        </Button>
      </PopoverContent>
    </Popover>
  );
}
