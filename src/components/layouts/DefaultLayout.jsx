'use client';
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { useEffect, useState } from "react";
import { configActions } from "@/store/configSlice";

export default function DefaultLayout({ children }) {
    const mode = useSelector(state => state.config.mode)
    const dispatch = useDispatch()

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // Check mode from localStorage
        if (!localStorage.getItem('mode')) {
            dispatch(configActions.setMode('light'))
        } else {
            dispatch(configActions.setMode(localStorage.getItem('mode')))
        }

        setMounted(true)
    }, [])

    return (
        mounted ?
            <html lang="en" data-bs-theme={mode}>
                <body>
                    <Header />
                    <main>
                        {children}
                    </main>
                </body>
            </html> :

            <html><body></body></html>
    )
}