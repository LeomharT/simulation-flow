import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IconClockPlay } from '@tabler/icons-react';

export default function RunHistory() {
  return (
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
  );
}
