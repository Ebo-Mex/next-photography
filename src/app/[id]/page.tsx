import Image from "next/image";

import goldStar from "public/gold-star.svg";

async function GetPhotographById(id: Number) {
    const URL = "http://localhost:8000";
    const res = await fetch(`${URL}/photographs/${id}`);
    return res.json();
}

interface PhotoId {
    params: {
        [id: string]: number;
    };
}

export default async function Photograph({ params }: PhotoId) {
    const { id } = params;
    const photograph = await GetPhotographById(id);
    return (
        <main className="pt-4 px-16 pb-16 flex flex-col gap-4">
            <h2>More details</h2>
            <div className="flex flex-wrap items-start justify-around p-8">
                <div className="relative w-60 h-60">
                    <Image
                        alt={photograph.alt}
                        fill={true}
                        quality={100}
                        sizes="40vw"
                        src={photograph.src}
                        className="object-contain "
                    />
                </div>
                <p className="max-w-2xl text-justify">
                    {photograph.description
                        ? photograph.description
                        : "No description available at the time!"}
                </p>
            </div>
            <div className="flex gap-2 items-center">
                Rating:
                {Array.apply(null, Array(photograph.rating)).map((_x, idx) => (
                    <Image
                        width={24}
                        height={24}
                        key={idx}
                        src={goldStar}
                        alt="Gold star"
                    />
                ))}
            </div>
            <div className="flex gap-2 items-center">
                Tags:
                <div className="flex gap-4">
                    {photograph.tags.map((tag: String, idx: Number) => (
                        <p className="chips" key={`tag-${idx}`}>
                            {tag}
                        </p>
                    ))}
                </div>
            </div>
            <div>
                <p>Technical details:</p>
                <ul className="list-disc pl-8">
                    <li>ISO: {photograph.iso}</li>
                    <li>Aperture: {photograph.aperture}</li>
                    <li>Shutter speed: {photograph.shutter}</li>
                    <li>Focal length: {photograph.focallength}</li>
                </ul>
            </div>
        </main>
    );
}
