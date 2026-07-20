import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { EDGE_TYPES } from '@/edges';
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import { useEdges } from '@xyflow/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function RunBtn() {
  const [loading, setLoading] = useState(false);

  const edges = useEdges();

  async function runSimulation() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);

    if (edges.some((value) => value.type === EDGE_TYPES.ERROR)) {
      console.error('Wrong Simulation');
      toast('Some thing wrong. Please your workflow');
    }
  }

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
