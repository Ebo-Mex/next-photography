import Link from "next/link";

Link;
export default function NavBar() {
    return (
        <div>
            <nav>
                <h1>Photographs by Emma 🎞️</h1>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
