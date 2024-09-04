import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const GridLayout = ({ children, className = "", id }: Props) => (
  <div
    id={id || undefined}
    className={`container mx-auto max-w-screen-lg grow p-4 md:p-6 ${className}`}
  >
    <div className="grid grid-cols-12 gap-4 lg:gap-6">{children}</div>
  </div>
);

export const GridItemFour = ({ children, className = "", id }: Props) => (
  <div
    id={id || undefined}
    className={`col-span-12 lg:col-span-4 ${className}`}
  >
    {children}
  </div>
);

export const GridItemSix = ({ children, className = "", id }: Props) => (
  <div
    id={id || undefined}
    className={`col-span-12 lg:col-span-6 ${className}`}
  >
    {children}
  </div>
);

export const GridItemEight = ({ children, className = "", id }: Props) => (
  <div
    id={id || undefined}
    className={`col-span-12 lg:col-span-8 ${className}`}
  >
    {children}
  </div>
);

export const GridItemTwelve = ({ children, className = "", id }: Props) => (
  <div id={id || undefined} className={`col-span-12 ${className}`}>
    {children}
  </div>
);
