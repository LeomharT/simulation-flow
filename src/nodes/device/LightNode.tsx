import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { IconBulbFilled } from '@tabler/icons-react';

export default function LightNode() {
  return (
    <Card className='w-50 [--card-spacing:--spacing(2)] ring-0 hover:shadow-sm transition-shadow'>
      <CardHeader>
        <CardTitle className='flex flex-row items-center gap-4'>
          <div className='w-5 h-5 rounded shadow-xs p-1 flex items-center justify-center bg-blue-600 text-white'>
            <IconBulbFilled className='w-3! h-3!' />
          </div>
          Light
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
