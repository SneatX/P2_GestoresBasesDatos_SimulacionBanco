import { useEffect, useState } from "react"
import MotionNumber from "motion-number";

export default function Home() {

    const [user, setUser] = useState({})
    const [balance, setBalance] = useState(null)
    const [movements, setMovements] = useState([])

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
        fetchUserData()
        fetchMovements()
    }

    function logout() {
        window.location.href = 'http://localhost:3000/login/logout'
    }

    async function fetchMovements() {
        let movementsData = await fetch('http://localhost:3000/movements/usermovements', {
            method: "GET",
            credentials: "include"
        })
        movementsData = await movementsData.json()
        console.log(movementsData.data)
        setMovements(movementsData.data)
    }

    async function fetchUserData() {
        let userData = await fetch('http://localhost:3000/user/getuser', {
            method: "GET",
            credentials: "include"
        })
        userData = await userData.json()
        setUser(userData.data)
        setBalance(userData.data.balance)
    }

    useEffect(() => {
        fetchUserData()
        fetchMovements()
    }, [])

    return (
        <main className="w-screen h-screen flex justify-between p-10">
            <section className="flex flex-col items-center justify-center gap-10 w-1/2">
                <h1 className="font-bold text-6xl">Bienvenido!</h1>
                <div className="w-[500px] flex flex-col items-center justify-center text-center gap-2">
                    {user.img ? <img src={user.img} alt="userImg" className="rounded-lg shadow-2xl" /> : <p>Cargando imagen...</p>}
                    <h1 className="">{user.name}</h1>
                    <p className="">{user.username}</p>
                    <p>Tu dinero:</p>
                    {balance !== null ? (
                        <MotionNumber
                            className="text-blue-500 font-bold"
                            value={balance}
                            format={{ style: 'currency', currency: 'USD' }}
                            locales="en-US"
                        />
                    ) : (
                        <p>Cargando balance...</p>
                    )}
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                    <input type="number" placeholder="Ingrese la cantidad" className="bg-white text-black px-6 py-4 rounded-lg" />
                    <button onClick={transaction} className="bg-white text-black rounded-sm px-4 py-2">Transferir</button>
                </div>
                <div>
                    <button onClick={logout} className="bg-red-500 text-black rounded-sm px-4 py-2">Cerrar sesión</button>

                </div>
            </section>

            <section className="flex flex-col items-center w-1/2">
                <h1 className="font-bold text-6xl">Tus movimientos</h1>
                <table className="w-full">
                    <thead className="">
                        <tr className="text-center">
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movements.map((movement, index) => (
                            <tr key={index} className="text-center">
                                <td>
                                    <span>
                                        {new Date(movement.date).toLocaleDateString('es-ES', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {new Date(movement.date).toLocaleTimeString('es-ES', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric',
                                            hour12: true
                                        })}
                                    </span>
                                </td>
                                <td className={`${movement.amount >= 0 ? "text-blue-500" : "text-red-500"} text-end`}>{movement.amount.toLocaleString('es-MX', { style: 'currency', currency: 'COP' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    )
}
