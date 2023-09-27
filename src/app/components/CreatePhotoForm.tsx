"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';

interface PhotographUploadData {
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

export default function CreatePhotoForm() {
    const router = useRouter();
    const [src, setSrc] = useState('')
    const [alt, setAlt] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState([])
    const [rating, setRating] = useState(1)
    const [iso, setIso] = useState('')
    const [aperture, setAperture] = useState('')
    const [shutter, setShutter] = useState('')
    const [focallength, setFocallength] = useState('')


    async function CreatePhotograph(data: PhotographUploadData) {
        const URL = "http://localhost:8000";
        const res = await fetch(`${URL}/photographs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (res.status === 201) {
            router.refresh();
            router.push('/');
        }
    }

    const handleUpload = () => {
        const photograph: PhotographUploadData = {
            alt,
            rating,
            src,
            tags,
            iso,
            aperture,
            shutter,
            focallength,
            description,
        }

        CreatePhotograph(photograph);
    }

    return (
        <div>
            <form action={handleUpload} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="src">Source</label>
                    <input
                        id="src"
                        placeholder="https://picsum.photos/id/..."
                        required
                        onChange={(e) => setSrc(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="alt">Alternative text</label>
                    <input
                        id="alt"
                        placeholder="Short description"
                        required
                        onChange={(e) => setAlt(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description"
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                {/* TODO DROPDOWN */}
                <div>
                    <label htmlFor="tags">Tags</label>
                    <input id="tags"
                    // onChange={(e) => setTags(e.target.value)}
                    ></input>
                </div>
                {/* TODO SLIDER */}
                <div>
                    <label htmlFor="rating">Rating</label>
                    <input type="number" id="rating"
                        onChange={(e) => setRating(Number(e.target.value))}
                    ></input>
                </div>
                <div>
                    <h3>Technical details</h3>
                    <div>
                        <label htmlFor="iso">ISO</label>
                        <input
                            id="iso"
                            placeholder="ISO-800, ISO-1600..."
                            required
                            onChange={(e) => setIso(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="aperture">Aperture</label>
                        <input
                            id="aperture"
                            placeholder="f/4, f/8, f/16..."
                            required
                            onChange={(e) => setAperture(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="shutter">Shutter</label>
                        <input
                            id="shutter"
                            placeholder="1 s, 1/4 s, 1/100 s..."
                            required
                            onChange={(e) => setShutter(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="focallength">Focal length</label>
                        <input
                            id="focallength"
                            placeholder="24 mm, 55 mm, 200 mm..."
                            required
                            onChange={(e) => setFocallength(e.target.value)}
                        ></input>
                    </div>
                </div>
                <button
                    className="w-fit py-2 px-4"
                >Upload!</button>
            </form>
        </div>
    )
}
