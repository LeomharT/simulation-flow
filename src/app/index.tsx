import Toolbar from '@/components/toolbar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Background, BackgroundVariant, Panel, ReactFlow, ReactFlowProvider } from '@xyflow/react';

export default function App() {
  return (
    <div className='w-dvw h-dvh'>
      <TooltipProvider>
        <ReactFlowProvider>
          <ReactFlow fitView>
            <Background variant={BackgroundVariant.Dots} />
            <Panel position='bottom-center'>
              <Toolbar />
            </Panel>
          </ReactFlow>
        </ReactFlowProvider>
      </TooltipProvider>
    </div>
  );
}
