import type { Node } from '@xyflow/react';
import { create } from 'zustand';

export type SimulationStore = {
  addingType: string | null;
  selectedNode: Node | null;
  setAddingType: (val: string | null) => void;
  cancelAdding: () => void;
  setSelectNode: (node: Node) => void;
  cancelSelect: () => void;
};

export const useSimulationStore = create<SimulationStore>((set) => ({
  addingType: null,
  selectedNode: null,
  setAddingType: (val) => set({ addingType: val }),
  cancelAdding: () => set({ addingType: null }),
  setSelectNode: (node) => set({ selectedNode: node }),
  cancelSelect: () => set({ selectedNode: null }),
}));
