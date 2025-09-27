import { Link } from "react-router-dom";

function Navbar() {
    const isAuthenticated = true

    return (
        <nav className="px-8 py-8 font-lexend font-light">
            <div className="flex items-center justify-between max-w-6xl mx-auto min-h-[40px]">
                {/* Left Section: Logo + Links */}
                <ul className="flex flex-row items-center gap-10">
                    <li>
                        <Link to="/" className="font-bold text-lg">
                            Logo
                        </Link>
                    </li>
                    <li className="hidden sm:block">
                        <Link
                            to="/page1"
                            className="px-2 py-2 rounded-xl hover:bg-blue-200 transition"
                        >
                            Link1
                        </Link>
                    </li>
                    <li className="hidden sm:block">
                        <Link
                            to="/page2"
                            className="px-2 py-2 rounded-xl hover:bg-blue-200 transition"
                        >
                            Link2
                        </Link>
                    </li>
                    <li className="hidden sm:block">
                        <Link
                            to="/page3"
                            className="px-2 py-2 rounded-xl hover:bg-blue-200 transition"
                        >
                            Link3
                        </Link>
                    </li>
                </ul>

                {/* Right Section: Conditional Login/Register or Logout */}
                <ul className="flex flex-row items-center gap-10">
                    {!isAuthenticated && (
                        <>
                            <li className="hidden sm:block">
                                <Link
                                    to="/login"
                                    className="px-2 py-2 rounded-xl hover:bg-blue-200 transition"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-base hidden sm:block"
                                >
                                    Register
                                </Link>
                            </li>
                        </>
                    )}

                    {isAuthenticated && (
                        <li className="hidden sm:block">
                            <button
                                className="px-2 py-2 rounded-xl hover:bg-blue-200 transition"
                            >
                                Logout
                            </button>
                        </li>
                    )}

                    <li className="sm:hidden lg:hidden">
                        <Link
                            to="/menu"
                            className="hover:text-blue-600 text-2xl transition px-4 py-2"
                        >
                            ☰
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
