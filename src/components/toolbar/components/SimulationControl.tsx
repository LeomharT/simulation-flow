import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { EDGE_TYPES } from '@/edges';
import { run } from '@/lib/simulation';
import { IconAlertCircle, IconPlayerPlayFilled, IconPlayerStopFilled } from '@tabler/icons-react';
import { useEdges, useNodes } from '@xyflow/react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export default function RunBtn() {
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);

  const intervels = useRef<number[] | undefined>(undefined);

  const nodes = useNodes();
  const edges = useEdges();

  async function runSimulation() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);

    // const needsPower = nodes.filter(
    //   (n) => n.type === NODE_TYPES.SENSOR || n.type === NODE_TYPES.LIGHT
    // );

    // const invalidNodes = needsPower.filter((n) => !validateNodePower(n.id, nodes, edges));

    // if (invalidNodes.length > 0) {
    //   toast(<MessageError />, { style: { padding: 0 } });
    //   return;
    // }

    if (edges.some((value) => value.type === EDGE_TYPES.ERROR)) {
      toast(<MessageError />, { style: { padding: 0 }, position: 'top-center' });
      return;
    }

    intervels.current = run(nodes, edges);

    setRunning(true);
  }

  function stopSimulation() {
    setRunning(false);
    toast.dismiss();
    if (intervels.current) {
      for (const i of intervels.current) clearInterval(i);
    }
  }

  if (running)
    return (
      <Button size='lg' className='px-5! bg-rose-500 hover:bg-rose-400' onClick={stopSimulation}>
        <IconPlayerStopFilled />
        Stop
      </Button>
    );

  return (
    <Button
      size='lg'
      disabled={loading}
      className='px-5! bg-emerald-500 hover:bg-emerald-400'
      onClick={runSimulation}
    >
      {loading ? <Spinner data-icon='inline-start' /> : <IconPlayerPlayFilled />}
      Run
    </Button>
  );
}

function MessageError() {
  return (
    <Alert className='max-w-md border-red-200 bg-red-50 text-red-500'>
      <IconAlertCircle />
      <AlertTitle>Simulation failed</AlertTitle>
      <AlertDescription>
        Your simulation work flow is failed. Please cheke your work flow nodes and try again.
      </AlertDescription>
    </Alert>
  );
}
