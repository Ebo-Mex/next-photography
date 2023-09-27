async function CreatePhotograph(data: PhotographData) {
    const URL = "http://localhost:8000";
    // const res = await fetch(`${URL}/photographs`, { cache: "no-store" });
    const res = await fetch(`${URL}/photographs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    console.log(data);
    // return res.json();
}

async function handleUpload(data: FormData) {
    "use server";
    // TODO should use the photograph keys, assign defaults values, etc...
    const photograph: any = {};

    for (var [key, value] of data.entries()) {
        if (key === "tags") {
            photograph[key] = [];
            continue;
        }
        if (key === "rating") {
            photograph[key] = Number(value);
            continue;
        }
        photograph[key] = value;
    }
    CreatePhotograph(photograph);
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
    description: null | string;
}

export default function Create() {
    return (
        <div className="pt-4 px-16 pb-16 flex flex-col gap-4">
            <h2>Upload a photograph</h2>
            <p>Please fill out your photograph details</p>
            <form action={handleUpload} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="src">Source</label>
                    <input
                        id="src"
                        placeholder="https://picsum.photos/id/..."
                        name="src"
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="alt">Alternative text</label>
                    <input
                        id="alt"
                        placeholder="Short description"
                        name="alt"
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description"></textarea>
                </div>
                {/* TODO DROPDOWN */}
                <div>
                    <label htmlFor="tags">Tags</label>
                    <input id="tags" name="tags"></input>
                </div>
                {/* TODO SLIDER */}
                <div>
                    <label htmlFor="rating">Rating</label>
                    <input type="number" id="rating" name="rating"></input>
                </div>
                <div>
                    <h3>Technical details</h3>
                    <div>
                        <label htmlFor="iso">ISO</label>
                        <input
                            id="iso"
                            placeholder="ISO-800, ISO-1600..."
                            required
                            name="iso"
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="aperture">Aperture</label>
                        <input
                            id="aperture"
                            placeholder="f/4, f/8, f/16..."
                            required
                            name="aperture"
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="shutter">Shutter</label>
                        <input
                            id="shutter"
                            placeholder="1 s, 1/4 s, 1/100 s..."
                            required
                            name="shutter"
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="focallength">Focal length</label>
                        <input
                            id="focallength"
                            placeholder="24 mm, 32 mm, 55 mm, 200 mm..."
                            required
                            name="focallength"
                        ></input>
                    </div>
                </div>
                <input
                    className="w-fit py-2 px-4"
                    type="submit"
                    value="Upload!"
                />
            </form>
        </div>
    );
}
