export default function LogOut() {

    function logout() {
        localStorage.setItem("token", null)
        localStorage.setItem("user", null)
        alert("Loged Out!")
    }

    return (

        <button
            className="sweet-button"
            name="logout"
            id="logout"
            onClick={logout}
        >
            Logout
        </button>

    )

}