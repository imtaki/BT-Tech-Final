import "../index.css"

export default function NavBar() {
    return (
        <nav className="py-4">
            <div className="mx-auto max-h-screen px-4 flex justify-between items-center">
                <span className="text-4xl font-bold text-green-700">Boku University</span>
                <ul className="flex space-x-6 text-gray-700 font-medium">
                    <li><a href="/studies">Studies</a></li>
                    <li><a href="/about">Research</a></li>
                    <li><a href="/admissions">About</a></li>
                    <li><a href="/departments">Boku</a></li>
                    <li className="text-xl"><a href="/contact">Login </a></li>
                </ul>
            </div>
        </nav>
    );
}
