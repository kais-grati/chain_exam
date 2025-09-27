import { Link } from "react-router-dom";
import { NavigationMenu, DropdownMenu } from "radix-ui";

import { ConnectButton } from "@mysten/dapp-kit";

function Navbar() {

  return (
    <nav className="px-8 py-8 font-lexend font-light">
      <div className="flex items-center justify-between mx-auto min-h-[40px]">
        {/* Left Section: Logo + Navigation Menu */}
        <NavigationMenu.Root className="flex items-center gap-10">
          <NavigationMenu.List className="flex items-center gap-10">
            {/* Logo */}
            <NavigationMenu.Item>
              <Link to="/" className="font-bold text-lg">
                Chain Exam
              </Link>
            </NavigationMenu.Item>

            {/* Navigation Links */}
            <NavigationMenu.Item className="hidden sm:block">
              <NavigationMenu.Link asChild>
                <Link
                  to="/Dashboard"
                  className="px-2 py-2 rounded-xl hover:bg-blue-200 hover:text-black transition"
                >
                  Dashboard
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item className="hidden sm:block">
              <NavigationMenu.Link asChild>
                <Link
                  to="/page2"
                  className="px-2 py-2 rounded-xl hover:bg-blue-200 hover:text-black transition"
                >
                  About
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item className="hidden sm:block">
              <NavigationMenu.Link asChild>
                <Link
                  to="/page3"
                  className="px-2 py-2 rounded-xl hover:bg-blue-200 hover:text-black transition"
                >
                  Help
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Right Section: Auth Actions + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Desktop Auth Actions */}

          <div className="hidden sm:flex items-center gap-4">
            <NavigationMenu.Root>
              <NavigationMenu.List>
                <NavigationMenu.Item>
                  <ConnectButton />
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </div>

          {/* Mobile Menu Dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="sm:hidden hover:text-blue-600 text-2xl transition px-4 py-2">
                ☰
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[200px] bg-white rounded-md p-2 shadow-lg border border-gray-200"
                sideOffset={5}
                align="end"
              >
                {/* Mobile Navigation Links */}
                <DropdownMenu.Item className="focus:outline-none">
                  <Link
                    to="/page1"
                    className="block px-3 py-2 text-sm rounded hover:bg-blue-50 transition w-full text-left"
                  >
                    Link1
                  </Link>
                </DropdownMenu.Item>

                <DropdownMenu.Item className="focus:outline-none">
                  <Link
                    to="/page2"
                    className="block px-3 py-2 text-sm rounded hover:bg-blue-50 transition w-full text-left"
                  >
                    Link2
                  </Link>
                </DropdownMenu.Item>

                <DropdownMenu.Item className="focus:outline-none">
                  <Link
                    to="/page3"
                    className="block px-3 py-2 text-sm rounded hover:bg-blue-50 transition w-full text-left"
                  >
                    Link3
                  </Link>
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

                {/* Mobile Auth Actions */}

                <DropdownMenu.Item className="focus:outline-none">
                  <ConnectButton />
                </DropdownMenu.Item>

                <DropdownMenu.Arrow className="fill-white" />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
