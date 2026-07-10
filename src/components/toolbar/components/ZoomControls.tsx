import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconBorderCorners, IconSelector } from '@tabler/icons-react';
import { useOnViewportChange, useReactFlow } from '@xyflow/react';
import { useEffect, useState } from 'react';

const zoomLevels = [
  { value: '0.25', label: '25%' },
  { value: '0.5', label: '50%' },
  { value: '0.75', label: '75%' },
  { value: '1', label: '100%' },
  { value: '2', label: '200%' },
];

export default function ZoomControls() {
  const flow = useReactFlow();

  const [zoom, setZoom] = useState(flow.getZoom());

  useOnViewportChange({
    onChange: (viewport) => setZoom(viewport.zoom),
  });

  useEffect(() => {
    flow.zoomTo(zoom);
  }, [zoom, flow]);

  return (
    <div className='z-50 relative flex flex-row gap-1 items-center'>
      <Button variant='ghost' size='icon-lg' onClick={() => flow.fitView()}>
        <IconBorderCorners className='w-5! h-5!' />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size='lg'
            variant='outline'
            className='bg-transparent! w-32 justify-between py-2 pl-2.5 pr-2 font-normal'
          >
            {(zoom * 100).toFixed(0)}%
            <IconSelector className='text-muted-foreground' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='center' className='w-fit'>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            {zoomLevels.map((val, index) => (
              <DropdownMenuItem
                key={index}
                className='min-w-34'
                onClick={() => setZoom(Number(val.value))}
              >
                {val.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
