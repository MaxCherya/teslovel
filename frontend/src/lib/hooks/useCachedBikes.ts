import { useEffect, useState } from "react";

const tempBikes = [
    {
        id: 0,
        name: 'Teslovel Model 1',
        nav_photo: 'https://media-public.canva.com/6mCgM/MAEO-X6mCgM/1/s.svg',
    },
    {
        id: 1,
        name: 'Teslovel Model 3',
        nav_photo: 'https://media-public.canva.com/6mCgM/MAEO-X6mCgM/1/s.svg',
    },
    {
        id: 2,
        name: 'Teslovel TV01-05',
        nav_photo: 'https://media-public.canva.com/6mCgM/MAEO-X6mCgM/1/s.svg',
    }
]

export function useCachedBikes() {
    const [bikes, setBikes] = useState<any[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        if (loaded) return;

        const fetchBikes = async () => {
            setBikes(tempBikes);
            setLoaded(true);
        }

        fetchBikes();

    }, [loaded])

    return bikes;
}