import "../index.css";

export default function NavBar() {
    const navItems = [
        { id: 0, label: "Studies", href: "/studies" },
        { id: 1, label: "Research", href: "/research" },
        { id: 2, label: "About Boku", href: "/about" },
    ];

    const currentPath = window.location.pathname;

    return (
        <nav className="py-4 p-3">
            <div className="mx-auto max-h-screen px-4 flex justify-between items-center">
                <a href="/">
                    <span className="text-4xl font-extrabold text-green-700">Boku University</span>
                </a>
                <ul className="flex space-x-6 text-gray-700 font-medium">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <a
                                href={item.href}
                                className={
                                    currentPath === item.href
                                      ? "text-green-700 font-semibold text-lg border-b-2 border-green-700 pb-1"
                                      : "hover:text-green-700"
                                  }
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                    <li>
                    <a className="text-xl font-bold" href="/login">Login</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
