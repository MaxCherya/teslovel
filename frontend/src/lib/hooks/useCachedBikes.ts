import { useEffect, useState } from "react";
import { fetchNavBarBikes } from "../../endpoints/NavBar";

export function useCachedBikes() {
    const [bikes, setBikes] = useState<any>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        if (loaded) return;

        const fetchBikes = async () => {
            try {
                const bikes = await fetchNavBarBikes();
                if (bikes) {
                    setBikes(bikes)
                    setLoaded(true);
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchBikes();

    }, [loaded])

    return bikes;
}