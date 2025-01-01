import { siteConfig } from "@/config/site";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { SiteHeaderLogin } from "./site-header-login";
import CartTotal from "./cart-total";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <CartTotal />
            <ThemeToggle />
            <SiteHeaderLogin />

            {/* <Link href="/signin">
              <Button className="px-2 py-1 text-sm md:px-4 md:py-2 md:text-base">
                Login
              </Button>
            </Link> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
