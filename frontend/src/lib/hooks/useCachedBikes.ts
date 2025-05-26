import { useEffect, useState } from "react";

const tempBikes = [
    {
        id: 0,
        name: 'Teslovel Model 1',
        nav_photo: 'https://i.ibb.co/YBJJGQ9N/teslovel-Landscape.png',
    },
    {
        id: 1,
        name: 'Teslovel Model 3',
        nav_photo: 'https://i.ibb.co/YBJJGQ9N/teslovel-Landscape.png',
    },
    {
        id: 2,
        name: 'Teslovel TV01-05',
        nav_photo: 'https://i.ibb.co/YBJJGQ9N/teslovel-Landscape.png',
    }
]

export function useCachedBikes(limit = 3) {
    const [bikes, setBikes] = useState<any[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        if (loaded) return;

        const fetchBikes = async () => {
            setBikes(tempBikes);
            setLoaded(true);
        }

        fetchBikes();

    }, [limit, loaded])

    return bikes;
}