import Link from "next/link";

Link;
export default function NavBar() {
    return (
        <div className="p-8">
            <nav className="flex flex-wrap items-center justify-between">
                <h1>Photographs by Emma</h1>
                <ul className="flex">
                    <li>
                        <Link className="nav-bar-item" href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-bar-item" href="/create">
                            Upload
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
