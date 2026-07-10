import { Card, CardContent } from '@/components/ui/card';
import { IconAiAgents, IconClockPlay, IconPlayerPlayFilled, IconPlus } from '@tabler/icons-react';
import clsx from 'clsx';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
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
          <Button size='lg' className={classNames.button}>
            <IconPlus />
            Add Node
          </Button>
        </CardContent>
      </Card>
      <Card className={classNames.card}>
        <CardContent className={classNames.content}>
          <Button size='lg' variant='ghost'>
            <div className='border rounded-full w-7 h-7 bg-blue-500 flex items-center justify-center'>
              <IconAiAgents className='w-5! h-5! stroke-white' />
            </div>
            Agent
          </Button>
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
            <Button
              size='lg'
              className={clsx(classNames.button, 'bg-emerald-500 hover:bg-emerald-400')}
            >
              <IconPlayerPlayFilled />
              Run
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
