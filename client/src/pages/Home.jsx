export default function Home() {

    function logout() {
        window.location.href = 'http://localhost:3000/login/logout'
    }

    return (
        <>
            <h1 className="">Home</h1>
            <p>En teoría está logueado</p>
            <button onClick={logout}>Cerrar sesion</button>
        </>
    )
}
