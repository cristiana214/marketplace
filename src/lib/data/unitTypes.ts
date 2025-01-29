export type ComboboxItem = {
  id: number;
  name: string;
  url?: string;
};

export type ComboboxUnitItem = ComboboxItem & { displayName?: string };
const unitTypes: ComboboxUnitItem[] = [
  {
    id: 1,
    name: "Kilogram",
    displayName: "kg",
  },
  {
    id: 2,
    name: "Gram",
    displayName: "g",
  },
  {
    id: 5,
    name: "Box",
    displayName: "box",
  },
  {
    id: 6,
    name: "Dozen",
    displayName: "dozen",
  },
  {
    id: 7,
    name: "Piece",
    displayName: "pc",
  },
  {
    id: 8,
    name: "Liter",
    displayName: "L",
  },
  {
    id: 9,
    name: "Milliliter",
    displayName: "ml",
  },
  {
    id: 10,
    name: "Sack",
    displayName: "sack",
  },
];
const statusTypes: ComboboxItem[] = [
  {
    id: 0,
    name: "In Progress",
  },
  {
    id: 1,
    name: "Completed",
  },
];

export { unitTypes, statusTypes };
