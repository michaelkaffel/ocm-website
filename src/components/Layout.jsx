import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = () => (
    <div className='min-h-screen flex flex-col bg-brand-bg'>
        <NavBar />
        <main className='flex-1 pt-16'>
            <Outlet />
        </main>
        <Footer />
    </div>
)

export default Layout;