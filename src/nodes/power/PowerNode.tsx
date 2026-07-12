import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { NodeProps } from '@xyflow/react';

type PowerNodeProps = NodeProps & {
  data: {
    label: string;
  };
};

export default function PowerNode(props: PowerNodeProps) {
  return (
    <Card className='w-50'>
      <CardHeader>
        <CardTitle>{props.data.label}</CardTitle>
      </CardHeader>
      <CardContent>Conent</CardContent>
    </Card>
  );
}
