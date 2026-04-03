import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            setTimeout(() => {
                const el = document.getElementById(hash.replace('#', ''));
                
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth'});
                }
            }, 100)
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);
    return null
}

const Layout = () => (
    <div className='min-h-screen flex flex-col bg-brand-bg'>
        <NavBar />
        <main className='flex-1 pt-16'>
            <ScrollToTop />
            <Outlet />
        </main>
        <Footer />
    </div>
)

export default Layout;