import Link from "next/link";

Link;
export default function NavBar() {
    return (
        <div className="p-8">
            <nav className="flex flex-wrap items-center justify-between">
                <h1>Photographs by Emma</h1>
                <ul>
                    <li>
                        <Link
                            className="p-2 border-solid border-2 rounded-lg hover:border-black cursor-pointer transition-colors duration-500"
                            href="/"
                        >
                            Home
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
