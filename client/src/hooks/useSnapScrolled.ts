import { useState, useEffect } from "react";
import useScrollPos from "./useScrollPos";

const useSnapScrolled = () => {
    const [isSnapScrolled, setIsSnapScrolled] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        const handleScroll = () => {
            clearTimeout(timer)

            timer = setTimeout(() => {
                const windowScrollY: number = window.scrollY;
                if (windowScrollY === window.innerHeight) {
                    setIsSnapScrolled(true);
                } else if (windowScrollY === 0) {
                    setIsSnapScrolled(false);
                }
            }, 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll)
        };
    }, []);

    return isSnapScrolled;
};

export default useSnapScrolled;