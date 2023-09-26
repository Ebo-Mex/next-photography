import Image from "next/image";
import Link from "next/link";

async function GetPhotographs() {
    const URL = "http://localhost:8000";
    const res = await fetch(`${URL}/photographs`);
    return res.json();
}

interface PhotographData {
    id: number;
    alt: string;
    rating: number;
    src: string;
    tags: string[];
    iso: string;
    aperture: string;
    shutter: string;
    focallength: string;
}

export default async function PhotographBoard() {
    const photographs = await GetPhotographs();
    return (
        <div
            style={{
                height: "auto",
                width: "fit-content",
            }}
        >
            {photographs.map((data: PhotographData) => (
                <Link href={`/${data.id}`} key={data.id}>
                    <div
                        style={{
                            position: "relative",
                            height: "250px",
                            width: "250px",
                        }}
                    >
                        <Image
                            alt={data.alt}
                            fill={true}
                            quality={100}
                            sizes="40vw"
                            src={data.src}
                            style={{
                                objectFit: "contain",
                            }}
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
}
