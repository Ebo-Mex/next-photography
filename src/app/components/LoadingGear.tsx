import Image from "next/image";

import simpleGear from "public/simple-Gear.svg";

export default function LoadingGear() {
    return (
        <Image
            src={simpleGear}
            alt="loading"
            className="animate-spin-slow h-16 w-16 m-4"
        />
    );
}
