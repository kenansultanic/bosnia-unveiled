import { useState, useEffect } from "react";

const useScrollPos = (scrollStep: number) => {
    const [scrollPos, setScrollPos] = useState(0);

    const handleScroll = (e: Event) => {
        if (Math.abs(window.scrollY - scrollPos) > scrollStep) {
            setScrollPos(window.scrollY);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrollPos]);

    return scrollPos;
};

export default useScrollPos;