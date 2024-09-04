import type { ReactNode } from "react";

import { SessionProvider } from "next-auth/react";

type SiteLayoutProps = {
  children?: ReactNode;
};
export default async function SiteLayout({ children }: SiteLayoutProps) {
  // const session = await auth();
  return false;
  // return (
  //   // <SessionProvider basePath="/auth" session={session}>
  //   //   {children}
  //   // </SessionProvider>
  // );
}
