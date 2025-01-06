export type ComboboxItem = {
  id: string | number;
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
    id: 3,
    name: "Ton",
    displayName: "t",
  },
  {
    id: 4,
    name: "Pound",
    displayName: "lb",
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

export { unitTypes };
