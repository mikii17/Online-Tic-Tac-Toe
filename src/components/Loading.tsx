import { useEffect, useState } from "react"

const Loading = () => {
    const [turn, setTurn] = useState<0 | 1 | 2 | 3>(0)
    useEffect(() => {
        const id = setInterval(() => {
            setTurn(prevTurn => (prevTurn + 1) % 4 as 0 | 1 | 2 | 3)
        }, 1500)

        return () => clearInterval(id);  
    }, [])
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-10">
        <p className="font-bold text-skin-muted text-2xl sm:text-3xl">Loading...</p>
        <div className="grid grid-cols-2 box-size-md">
            <div className={`border-r-4 border-b-4 border-[rgb(--color-text-base)] x-tic ${turn === 0 ?  "": "fade"}`}></div>
            <div className={`border-b-4 border-[rgb(--color-text-base)] o-tic ${turn === 1 ? "" : "fade"}`}></div>
            <div className={`border-r-4 border-[rgb(--color-text-base)] o-tic ${turn === 3 ? "" : "fade"}`}></div>
            <div className={`border-[rgb(--color-text-base)] x-tic ${turn === 2 ? "" : "fade"}`}></div>
        </div>
    </main>
  )
}

export default Loading