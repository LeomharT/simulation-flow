import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { InputGroup, InputGroupAddon, InputGroupButton } from '@/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToggle } from '@mantine/hooks';
import {
  IconAiAgents,
  IconArrowUp,
  IconMessageCircleUp,
  IconPaperclip,
  IconPhoto,
  IconPlus,
  IconReload,
  IconTelescope,
  IconWorld,
} from '@tabler/icons-react';

export default function AIAgent() {
  const [open, setOpen] = useToggle();

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size='lg' variant='ghost'>
          <div className='border rounded-full w-7 h-7 bg-blue-500 flex items-center justify-center'>
            <IconAiAgents className='w-5! h-5! stroke-white' />
          </div>
          AI Agent
        </Button>
      </PopoverTrigger>
      <PopoverContent asChild>
        <Card className='w-sm h-140 mx-auto max-w-sm gap-0 p-2.5!'>
          <CardHeader className='gap-1 border-b p-1'>
            <CardTitle>New Chat</CardTitle>
            <CardDescription>How can I help you today?</CardDescription>
            <CardAction>
              <Button
                autoFocus={false}
                variant='outline'
                className='rounded-full'
                size='icon'
                aria-label='Reset conversation'
              >
                <IconReload />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className='flex-1 overflow-hidden p-0'>
            <div className='h-full'>
              <Empty className='h-full'>
                <EmptyHeader>
                  <EmptyMedia variant='icon'>
                    <IconMessageCircleUp />
                  </EmptyMedia>
                  <EmptyTitle>Morning, shadcn!</EmptyTitle>
                  <EmptyDescription>
                    What are we working on today? Press send to start a new conversation
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </div>
          </CardContent>
          <CardFooter className='flex-col gap-2 p-0 border-none rounded-lg'>
            <form className='w-full' onSubmit={(e) => e.preventDefault()}>
              <InputGroup>
                <div className='h-14 w-full px-3 py-2.5'>
                  <span className='line-clamp-2 opacity-60 data-[status=ready]:opacity-100'>
                    <span className='text-muted-foreground'>
                      No messages queued. Reset the conversation.
                    </span>
                  </span>
                </div>
                <InputGroupAddon align='block-end' className='pt-1'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <InputGroupButton
                        aria-label='Add files'
                        type='button'
                        size='icon-sm'
                        variant='outline'
                        className='rounded-full'
                      >
                        <IconPlus />
                      </InputGroupButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start' side='top' className='w-44'>
                      <DropdownMenuItem>
                        <IconPaperclip />
                        Add Photos & Files
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <IconPhoto />
                        Create Image
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconTelescope />
                        Deep Research
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconWorld />
                        Web Search
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <InputGroupButton
                    type='submit'
                    variant='default'
                    size='icon-sm'
                    className='ml-auto rounded-full'
                  >
                    <IconArrowUp />
                    <span className='sr-only'>Send</span>
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </form>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
