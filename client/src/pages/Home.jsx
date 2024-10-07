import { useEffect, useState } from "react"
import MotionNumber from 'motion-number'

export default function Home() {

    const [user, setUser] = useState({})

    async function transaction() {

        let amount = parseFloat(document.querySelector('input').value)

        let data = await fetch('http://localhost:3000/movements/new-transaction', {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amount
            })
        })

        data = await data.json()
        if (data.error) {
            alert(data.error)
        }
        fetchData()
    }

    function logout() {
        window.location.href = 'http://localhost:3000/login/logout'
    }

    async function fetchData() {
        let userData = await fetch('http://localhost:3000/user/getuser', {
            method: "GET",
            credentials: "include"
        })
        userData = await userData.json()
        setUser(userData.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <main className="w-screen h-screen flex flex-col items-center justify-center gap-10">
            <h1 className="font-bold text-6xl">Bienvenido!</h1>
            <div className="w-[500px] flex flex-col items-center justify-center text-center gap-2">
                {user.img ? <img src={user.img} alt="userImg" className="rounded-lg shadow-2xl" /> : <p>Cargando imagen...</p>}
                <h1 className="">{user.name}</h1>
                <p className="">{user.username}</p>
                <p>Tu dinero:</p>
                {
                    <MotionNumber 
                        className="text-blue-500 font-bold"
                        value={user.balance}
                        format={{ style: 'currency', currency: 'COP' }}
                    />
                }
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                <input type="number" placeholder="Ingrese la cantidad" className="bg-white text-black px-6 py-4 rounded-lg" />
                <button onClick={transaction} className="bg-white text-black rounded-sm px-4 py-2">Transferir</button>
            </div>
            <div>
                <button onClick={logout} className="bg-red-500 text-black rounded-sm px-4 py-2">Cerrar sesión</button>

            </div>
        </main>
    )
}
