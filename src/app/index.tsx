import NodeConfig from '@/components/config';
import Toolbar from '@/components/toolbar';
import { EDGE_TYPES, edgeTypes } from '@/edges';
import { NODE_TYPES, nodeTypes } from '@/nodes';
import { useSimulationStore } from '@/store';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Panel,
  ReactFlow,
  useReactFlow,
  type Edge,
  type Node,
  type OnNodesChange,
  type ReactFlowProps,
} from '@xyflow/react';
import React, { useCallback, useState } from 'react';
import { useShallow } from 'zustand/shallow';

const initialNodes: Node[] = [
  // { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  // { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
  {
    id: 'powerNode',
    position: { x: 0, y: -100 },
    type: 'powerNode',
    data: { voltage: '12V', ampere: '3A' },
  },
  {
    id: 'lightNode',
    position: { x: 0, y: 100 },
    type: 'lightNode',
    data: { color: '#7f22fe', voltage: '12V', ampere: '3A' },
  },
  {
    id: 'sensorNode',
    position: { x: 300, y: -100 },
    type: NODE_TYPES.SENSOR,
    data: { voltage: '24V', ampere: '5A' },
  },
];

const initialEdges: Edge[] = [{ id: 'n1-n2', source: 'n1', target: 'n2', type: 'smoothstep' }];

export default function App() {
  const { addingType, cancelAdding, setSelectNode } = useSimulationStore(
    useShallow((store) => ({
      addingType: store.addingType,
      cancelAdding: store.cancelAdding,
      setSelectNode: store.setSelectNode,
    }))
  );

  const { screenToFlowPosition, updateNode } = useReactFlow();

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );

  const onEdgesChange: ReactFlowProps['onEdgesChange'] = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  const onConnect: ReactFlowProps['onConnect'] = useCallback((params) => {
    const edge = {
      ...params,
    } as Edge;

    if (params.sourceHandle !== params.targetHandle) {
      edge.type = EDGE_TYPES.ERROR;
      edge.animated = true;
    }

    // const sourceNode = getNode(params.source);
    // const targetNode = getNode(params.target);

    setEdges((edgesSnapshot) => addEdge(edge, edgesSnapshot));
  }, []);

  function onPaneMouseMove(e: React.MouseEvent) {
    if (!addingType) return;

    const position = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });

    updateNode('draft', { position });
  }

  function onNodeClick(_: React.MouseEvent, node: Node) {
    if (addingType) {
      onPlaceNode();
      return;
    }

    setSelectNode(node);
  }

  function onPlaceNode() {
    if (!addingType) return;

    cancelAdding();
    updateNode('draft', { id: crypto.randomUUID() });
  }

  return (
    <div className='w-dvw h-dvh'>
      <NodeConfig />
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        deleteKeyCode={['Delete']}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneMouseMove={onPaneMouseMove}
        onPaneClick={onPlaceNode}
        onNodeClick={onNodeClick}
        minZoom={0.25}
        maxZoom={2}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} />
        <Panel position='bottom-center'>
          <Toolbar />
        </Panel>
      </ReactFlow>
    </div>
  );
}
