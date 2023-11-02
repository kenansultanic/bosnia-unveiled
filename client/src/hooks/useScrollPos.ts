import { useState, useEffect } from "react";

const useScrollPos = () => {
    const [scrollPos, setScrollPos] = useState(0);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const SCROLL_STEP: number = 50;

    const handleScroll = (e: Event) => {
        if (Math.abs(window.scrollY - scrollPos) > SCROLL_STEP) {
            setPrevScrollPos(scrollPos);
            setScrollPos(window.scrollY);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrollPos]);

    return { prevScrollPos, scrollPos };
};

export default useScrollPos;