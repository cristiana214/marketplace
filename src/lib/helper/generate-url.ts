export const generateUrl = (name: string): string =>
  name?.toLowerCase()?.replace(/\s+/g, "-");
