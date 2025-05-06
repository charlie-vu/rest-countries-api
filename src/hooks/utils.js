import { useEffect, useRef } from "react";

// useEffect Skip First Render
const useEffectMounted = (fn, dependencies) => {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current) {
            return fn();
        }
        didMountRef.current = true;
    }, dependencies);
}

export { useEffectMounted }