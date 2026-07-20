import { NODE_TYPES } from '@/nodes';
import { useSimulationStore } from '@/store';
import {
  IconBoltFilled,
  IconBulbFilled,
  IconFolder,
  IconX,
  type ReactNode,
} from '@tabler/icons-react';
import { useReactFlow } from '@xyflow/react';
import { useShallow } from 'zustand/shallow';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../ui/empty';
import { Input } from '../ui/input';
import LightNodeConfig from './components/LightNodeConfig';
import PowerNodeConfig from './components/PowerNodeConfig';

const icons: Record<string, ReactNode> = {
  [NODE_TYPES.POWER]: (
    <div className='w-5 h-5 rounded shadow-xs p-1 flex items-center justify-center bg-blue-600 text-white'>
      <IconBoltFilled className='w-3! h-3!' />
    </div>
  ),
  [NODE_TYPES.LIGHT]: (
    <div className='w-5 h-5 rounded shadow-xs p-1 flex items-center justify-center bg-violet-600 text-white'>
      <IconBulbFilled className='w-3! h-3!' />
    </div>
  ),
  default: '',
};

export default function NodeConfig() {
  const { selectedNode, cancelSelect } = useSimulationStore(
    useShallow((store) => ({
      selectedNode: store.selectedNode,
      cancelSelect: store.cancelSelect,
    }))
  );

  const { getNode } = useReactFlow();

  const currentNode = selectedNode ? getNode(selectedNode.id) : null;

  return (
    <Drawer open={!!selectedNode} direction='right' modal={false} onClose={cancelSelect}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className='flex justify-between'>
            <div className='flex items-center gap-2'>
              {icons[currentNode?.type as keyof typeof icons]}
              <span>{currentNode?.type}</span>
            </div>
            <DrawerClose asChild>
              <Button size='icon' variant='outline'>
                <IconX />
              </Button>
            </DrawerClose>
          </DrawerTitle>
          <DrawerDescription>
            <Input placeholder='Insert description here' className='border-0' />
          </DrawerDescription>
        </DrawerHeader>
        <div className='px-4 no-scrollbar overflow-y-auto'>
          {currentNode?.type === NODE_TYPES.POWER ? (
            <PowerNodeConfig node={currentNode} />
          ) : currentNode?.type === NODE_TYPES.LIGHT ? (
            <LightNodeConfig />
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant='icon'>
                  <IconFolder />
                </EmptyMedia>
                <EmptyTitle>No Selected Node</EmptyTitle>
                <EmptyDescription>
                  You haven&apos;t select any node yet. Get started by click node on the pane.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent className='flex-row justify-center gap-2'>
                <Button>Selecte Node</Button>
              </EmptyContent>
            </Empty>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
