import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    return (
        <div>
            <header className='flex flex-col items-center bg-yellow-500'>
                <h1>Teslovel</h1>
                {/* Nav Bar will be added here */}
            </header>

            <main>
                <Outlet />
            </main>

            <footer className='flex flex-col items-center bg-yellow-500'>
                {/* Footer will be added here */}
                <p>© 2025 Teslovel</p>
            </footer>
        </div>
    )
}