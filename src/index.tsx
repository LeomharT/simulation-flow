import { ReactFlowProvider } from '@xyflow/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import App from './app';
import { TooltipProvider } from './components/ui/tooltip';
import './index.css';

const root = createRoot(document.querySelector('#root')!);
root.render(
  <React.StrictMode>
    <TooltipProvider>
      <ReactFlowProvider>
        <Toaster position='top-center' />
        <App />
      </ReactFlowProvider>
    </TooltipProvider>
  </React.StrictMode>
);
