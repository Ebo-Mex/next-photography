import PhotographBoard from "./components/PhotographBoard";

export default function Home() {
    return (
        <main className="pt-4 px-16 pb-16">
            <h2>Dashboard</h2>
            <p>Here you will find some of my best work!</p>
            <PhotographBoard />
        </main>
    );
}
