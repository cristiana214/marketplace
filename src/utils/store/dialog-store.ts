/* eslint-disable import/no-extraneous-dependencies */
import { create } from "zustand";

interface DialogState {
  isOpen: boolean;
  content: React.ReactNode | null;
  openDialog: (content: React.ReactNode) => void;
  closeDialog: () => void;
}

const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  content: null,
  openDialog: (content: React.ReactNode) => set({ isOpen: true, content }),
  closeDialog: () => set({ isOpen: false, content: null }),
}));

export default useDialogStore;
