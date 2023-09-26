import Image from "next/image";

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
        <main>
            <h2>More details about photograph with ID: {id}</h2>
            <div className="relative w-60 h-60">
                <Image
                    alt={photograph.alt}
                    fill={true}
                    quality={100}
                    sizes="40vw"
                    src={photograph.src}
                    className="object-contain"
                />
            </div>
            <p>{photograph.rating} out of 5!</p>
            <p>Tags: {photograph.tags.join(", ")}</p>
            <p>Technical details:</p>
            <ul>
                <li>ISO: {photograph.iso}</li>
                <li>Aperture: {photograph.aperture}</li>
                <li>Shutter speed: {photograph.shutter}</li>
                <li>Focal length: {photograph.focallength}</li>
            </ul>
        </main>
    );
}
