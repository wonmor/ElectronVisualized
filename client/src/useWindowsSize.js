import { useState, useEffect } from "react";

/*
█───█ ─▀─ █▀▀▄ █▀▀▄ █▀▀█ █───█ 　 █▀▀ █▀▀█ █▀▀▄ ▀▀█▀▀ █▀▀█ █▀▀█ █── █── █▀▀ █▀▀█ 
█▄█▄█ ▀█▀ █──█ █──█ █──█ █▄█▄█ 　 █── █──█ █──█ ──█── █▄▄▀ █──█ █── █── █▀▀ █▄▄▀ 
─▀─▀─ ▀▀▀ ▀──▀ ▀▀▀─ ▀▀▀▀ ─▀─▀─ 　 ▀▀▀ ▀▀▀▀ ▀──▀ ──▀── ▀─▀▀ ▀▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀ ▀─▀▀
*/

export default function useWindowSize() {
    /*
    Initialize state with undefined width/height so server and client renders match

    Parameters
    ----------
    None

    Returns
    -------
    Array
        Contains the x and y sizes of the current window
    */

    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
        // only execute all the code below in client side
        if (typeof window !== "undefined") {
            // Handler to call on window resize
            function handleResize() {
                // Set window width/height to state
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }

            // Add event listener
            window.addEventListener("resize", handleResize);

            // Call handler right away so state gets updated with initial window size
            handleResize();

            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}