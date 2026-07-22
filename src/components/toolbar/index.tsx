import { Card, CardContent } from '@/components/ui/card';
import clsx from 'clsx';
import { Separator } from '../ui/separator';
import AddNode from './components/AddNode';
import AIAgent from './components/AIAgent';
import RunBtn from './components/RunBtn';
import RunHistory from './components/RunHistory';
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
            <RunHistory />
            <RunBtn />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
