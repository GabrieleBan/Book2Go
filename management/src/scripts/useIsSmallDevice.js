import { useEffect, useState } from "react";

export default function useIsSmallDevice() {
    const [isSmall, setIsSmall] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmall(window.innerWidth < 940); // Tailwind sm breakpoint
        };

        handleResize(); // Check on mount
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isSmall;
}