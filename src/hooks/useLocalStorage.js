import { useEffect, useState } from "react";

export default function useLocalStorage(key, defaulValue) {
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue !== null) return JSON.parse(jsonValue)
        if (typeof defaulValue === 'function') {
            return defaulValue()
        } else {
            return defaulValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}