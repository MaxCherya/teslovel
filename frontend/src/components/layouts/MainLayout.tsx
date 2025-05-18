import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    return (
        <div>
            <header>
                <h1>Teslovel</h1>
                {/* Nav Bar will be added here */}
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                {/* Footer will be added here */}
                <p>© 2025 Teslovel</p>
            </footer>
        </div>
    )
}