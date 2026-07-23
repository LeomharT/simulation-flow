import { Button } from '@/components/ui/button';
import { Empty, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IconClockPlay, IconHistory } from '@tabler/icons-react';

export default function RunHistory() {
  return (
    <Popover modal>
      <ToolbarTooltip content='Run History'>
        <PopoverTrigger asChild>
          <Button size='icon-lg' variant='ghost'>
            <IconClockPlay className='w-5! h-5!' />
          </Button>
        </PopoverTrigger>
      </ToolbarTooltip>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Run History</PopoverTitle>
        </PopoverHeader>
        <Empty>
          <EmptyMedia variant='icon'>
            <IconHistory />
          </EmptyMedia>
          <EmptyTitle>No run history yet</EmptyTitle>
        </Empty>
      </PopoverContent>
    </Popover>
  );
}
type ToolbarTooltipProps = {
  content: string;
  children: React.ReactNode;
};

function ToolbarTooltip({ content, children }: ToolbarTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side='top' className='[&_svg]:hidden!'>
        {content}
      </TooltipContent>
    </Tooltip>
  );
}
