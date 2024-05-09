import { useEffect } from "react"

export const useClickAway = ({ ref, clickHandler }) => {
    console.log('here')
    useEffect(() => {
        window.addEventListener('click', (e) => {
            if (ref.current && ref.current.contains(e.target)) {
                clickHandler()
            }
        }, true)
    })
}