import { Card, CardContent } from '@/components/ui/card';
import { IconClockPlay } from '@tabler/icons-react';
import clsx from 'clsx';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import AddNode from './components/AddNode';
import AIAgent from './components/AIAgent';
import RunBtn from './components/RunBtn';
import ZoomControls from './components/ZoomControls';

const classNames = {
  card: clsx('py-1 justify-center'),
  content: clsx('px-1 flex flex-row gap-2.5 items-center'),
  sepearator: clsx('self-center! h-4'),
  button: clsx('px-5'),
};

export default function Toolbar() {
  return (
    <div className='flex flex-row gap-3'>
      <Card className={classNames.card}>
        <CardContent className={classNames.content}>
          <ZoomControls />
          <Separator orientation='vertical' className={classNames.sepearator} />
          <AddNode />
        </CardContent>
      </Card>
      <Card className={classNames.card}>
        <CardContent className={classNames.content}>
          <AIAgent />
          <Separator orientation='vertical' className={classNames.sepearator} />
          <div className='flex flex-row gap-2'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size='icon-lg' variant='ghost'>
                  <IconClockPlay className='w-5! h-5!' />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='top' className='[&_svg]:hidden!'>
                Run History
              </TooltipContent>
            </Tooltip>
            <RunBtn />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
