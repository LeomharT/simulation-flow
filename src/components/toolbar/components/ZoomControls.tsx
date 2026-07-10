import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';
import { IconBorderCorners } from '@tabler/icons-react';
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
      <Select defaultValue={String(zoom)}>
        <SelectTrigger className='w-32 h-9!'>{(zoom * 100).toFixed(0)}%</SelectTrigger>
        <SelectContent position='popper'>
          <SelectGroup>
            <SelectLabel>Zoom level</SelectLabel>
            {zoomLevels.map((val, index) => (
              <SelectItem key={index} value={val.value} onClick={() => setZoom(Number(val.value))}>
                {val.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
