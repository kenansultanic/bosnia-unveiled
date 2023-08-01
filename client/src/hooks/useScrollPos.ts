import { useState, useEffect } from "react";

const useScrollPos = () => {
    const [scrollPos, setScrollPos] = useState(0);

    const handleScroll = (e: Event) => {
        setScrollPos(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return scrollPos;
};

export default useScrollPos;