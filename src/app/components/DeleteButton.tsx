"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type deleteButtonProps = {
    id: Number
}

export default function DeleteButton(props: deleteButtonProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    async function DeletePhotographById(id: Number) {
        setIsLoading(true);
        const URL = "http://localhost:8000";
        const res = await fetch(`${URL}/photographs/${id}`, {
            method: "DELETE",
        });

        if (res.status === 200) {
            router.refresh();
            router.push('/');
        }
    }

    return (
        <div>
            <button disabled={isLoading} className='bg-red-500 py-2 px-4 rounded-lg ' onClick={() => DeletePhotographById(props.id)}>{isLoading ? 'Deleting...' : 'Delete'}</button>
        </div>
    )
}
