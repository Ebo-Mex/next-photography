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
    const availableTags = ['city', 'rural', 'urban', 'flower', 'macro', 'pets'];

    const [photoId, setPhotoId] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [alt, setAlt] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [rating, setRating] = useState(1)
    const [iso, setIso] = useState('')
    const [aperture, setAperture] = useState('')
    const [shutter, setShutter] = useState('')
    const [focallength, setFocallength] = useState('')
    const [isLoading, setIsLoading] = useState(false)

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
        setIsLoading(true);

        const photograph: PhotographUploadData = {
            alt,
            rating,
            src: `https://picsum.photos/id/${photoId}/${width}/${height}`,
            tags,
            iso: `ISO-${iso}`,
            aperture: `f/${aperture}`,
            shutter: `${shutter} s`,
            focallength: `${focallength} mm`,
            description,
        }

        CreatePhotograph(photograph);
    }

    const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tag = e.target.value;
        if (!tags.includes(tag)) {
            setTags(previousTag => [...previousTag, tag]);
        }
    }

    const handleRemoveTag = (tag: string) => {
        setTags(previousTags => previousTags.filter((currentTag) => currentTag !== tag));
    }

    return (
        <div>
            <form action={handleUpload} className="flex flex-col">
                <div className="input-container src">
                    <label htmlFor="src">Source</label>
                    <div>
                        <span className="mr-2">https://picsum.photos/id/</span>
                        <input
                            id="src"
                            placeholder="id"
                            required
                            type="number"
                            onChange={(e) => setPhotoId(e.target.value)}
                        ></input>
                        <span className="mx-2">/</span>
                        <input
                            id="width"
                            placeholder="width"
                            required
                            type="number"
                            onChange={(e) => setWidth(e.target.value)}
                        ></input>
                        <span className="mx-2">/</span>
                        <input
                            id="height"
                            placeholder="height"
                            required
                            type="number"
                            onChange={(e) => setHeight(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className="input-container">
                    <label htmlFor="alt">Alternative text</label>
                    <input
                        id="alt"
                        placeholder="Short description"
                        required
                        onChange={(e) => setAlt(e.target.value)}
                    ></input>
                </div>
                <div className="input-container">
                    <label htmlFor="description">Description</label>
                    <textarea id="description"
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="input-container">
                    <label htmlFor="tags">Tags</label>
                    <select
                        id="tags"
                        onChange={handleTagChange}
                        value=''
                    >
                        <option hidden value="">Select a tag</option>
                        {availableTags.map((tag, idx) => (
                            <option className="capitalize" key={`option-tag-${idx}`} value={tag}>{tag}</option>
                        ))}
                    </select>
                    {tags.length > 0 &&
                        (
                            <div className="flex flex-wrap gap-4 mt-4">
                                {tags.map((tag, idx) => (
                                    <div className="chips capitalize w-fit flex items-center justify-center" key={`selected-tag-${idx}`}>
                                        <p>{tag}</p> <button type="button" onClick={() => handleRemoveTag(tag)} className="m-0 ml-2 py-1 px-2 border-2 text-red-500"><p className="m-0">x</p></button>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>
                <div className="input-container rating">
                    <label htmlFor="rating">Rating</label>
                    <input type="range" min="1" max="5" id="rating" value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    ></input>
                    <p>{rating === 1 ? '1 star' : rating + ' stars'}</p>
                </div>
                <div>
                    <h3>Technical details</h3>
                    <div className="input-container">
                        <label htmlFor="iso">ISO</label>
                        <div>
                        <span className="mr-2">ISO -</span>
                        <input
                            id="iso"
                            placeholder="400, 800, 1600..."
                            required
                            type="number"
                            onChange={(e) => setIso(e.target.value)}
                        ></input>
                        </div>
                    </div>
                    <div className="input-container">
                        <label htmlFor="aperture">Aperture</label>
                        <div>
                        <span className="mr-2">f /</span>
                        <input
                            id="aperture"
                            placeholder="4, 8, 16..."
                            required
                            type="number"
                            onChange={(e) => setAperture(e.target.value)}
                        ></input>
                        </div>
                    </div>
                    <div className="input-container">
                        <label htmlFor="shutter">Shutter</label>
                        <div>
                        <input
                            id="shutter"
                            placeholder="1, 1/4, 1/100..."
                            required
                            onChange={(e) => setShutter(e.target.value)}
                        ></input>
                        <span className="ml-2">s</span>
                        </div>
                    </div>
                    <div className="input-container">
                        <label htmlFor="focallength">Focal length</label>
                        <div>
                        <input
                            id="focallength"
                            placeholder="24, 55, 200..."
                            required
                            type="number"
                            onChange={(e) => setFocallength(e.target.value + ' mm')}
                        ></input>
                        <span className="ml-2">mm</span>
                        </div>
                    </div>
                </div>
                <button disabled={isLoading} className="w-fit py-2 px-4" >{isLoading ? 'Hang in there!' : 'Upload'}</button>
            </form>
        </div>
    )
}
