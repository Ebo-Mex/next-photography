"use client"

import { useRouter } from 'next/navigation';

type deleteButtonProps = {
    id: Number
}

export default function DeleteButton(props: deleteButtonProps){
    const router = useRouter();

    async function DeletePhotographById(id: Number) {

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
            <button className='bg-red-500 py-2 px-4 rounded-lg ' onClick={() => DeletePhotographById(props.id)}>Delete</button>
        </div>
    )
}
