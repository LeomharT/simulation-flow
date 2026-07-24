import { Card, CardContent } from '@/components/ui/card';
import type { NodeProps } from '@xyflow/react';
import BaseNode from '../BaseNode';

type NoteNodeProps = NodeProps;

export default function NoteNode(props: NoteNodeProps) {
  return (
    <BaseNode {...props}>
      <Card className='w-150 [--card-spacing:--spacing(2)] ring-0 bg-blue-50 border border-sky-300'>
        <CardContent className='flex flex-col gap-2'>
          <p className='font-bold'>👋 Hello, and this is a basic Simulationflow!</p>
          <p>
            This canvas demonstrates a basic virtual simulation flow for powered devices and sensor
            data delivery.
          </p>
          <ol className='list-decimal pl-4 space-y-1 list-none'>
            <li>
              1️⃣ Power Source provides voltage and current to devices such as Light and Sensor.
            </li>
            <li>
              2️⃣ Light and Sensor must be connected to matching positive and negative power ports
              before the simulation can run.
            </li>
            <li>3️⃣ Sensor generates payload data at a configured interval.</li>
            <li>
              ✅️ Gateway receives data from connected Sensor nodes through its data input ports.
            </li>
            <li>
              ❎ Click Run to validate the workflow and start sending simulated sensor payloads.
            </li>
            <li>6️⃣ Click Stop to stop all running simulated data tasks.</li>
          </ol>
          <p className='text-muted-foreground'>
            🚨🚨🚨 Current research version supports one central Gateway. More runtime behavior will
            later move into node.data and the simulation engine.
          </p>
        </CardContent>
      </Card>
    </BaseNode>
  );
}
