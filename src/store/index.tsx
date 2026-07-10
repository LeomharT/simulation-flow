import { create } from 'zustand';

export type SimulationStore = {
  addingType: string | null;
  setAddingType: (val: string | null) => void;
  cancelAdding: () => void;
};

export const useSimulationStore = create<SimulationStore>((set) => ({
  addingType: null,
  setAddingType: (val) => set({ addingType: val }),
  cancelAdding: () => set({ addingType: null }),
}));
