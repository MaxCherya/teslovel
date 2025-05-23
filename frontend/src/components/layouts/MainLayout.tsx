import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    return (
        <div className='max-w-screen w-screen min-h-screen h-screen overflow-x-hidden'>
            <header className='bg-white w-full'>
                <h1>Teslovel</h1>
                {/* Nav Bar will be added here */}
            </header>

            <main>
                <Outlet />
            </main>

            <footer className='bg-white w-full'>
                {/* Footer will be added here */}
                <p>© 2025 Teslovel</p>
            </footer>
        </div>
    )
}