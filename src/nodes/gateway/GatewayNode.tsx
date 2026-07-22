import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { IconAiGateway } from '@tabler/icons-react';
import BaseNode from '../BaseNode';
import type { GatewayNodeProps } from './type';

export default function GatewayNode(props: GatewayNodeProps) {
  return (
    <BaseNode {...props}>
      <Card className='w-50 [--card-spacing:--spacing(2)] ring-0'>
        <CardHeader>
          <CardTitle className='flex flex-row items-center gap-4'>
            <div className='w-5 h-5 rounded shadow-xs p-1 flex items-center justify-center bg-emerald-600 text-white'>
              <IconAiGateway className='w-3! h-3!' />
            </div>
            {props.data.name ?? 'Gateway'}
          </CardTitle>
        </CardHeader>
      </Card>
    </BaseNode>
  );
}
