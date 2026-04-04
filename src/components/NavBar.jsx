import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const links = [
    { to: '/about', label: 'About' },
    { to: '/podcast', label: 'Podcast' },
    { to: '/articles', label: 'Articles' },
    { to: '/coaching', label: 'Coaching' },
    { to: '/#contact', label: 'Contact' },
]

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname + location.hash;

    const baseDesktop = 'text-xs tracking-widest2 uppercase transition-colors duration-200';
    const baseMobile = 'text-sm tracking-widest2 uppercase transition-colors duration-200';
    const active = 'text-brand-accent';
    const inactive = 'text-brand-muted hover:text-brand-text';

    const desktopNavLinkClass = ({ isActive }) => 
        `${baseDesktop} ${isActive ? active : inactive}`

    const mobileNavLinkClass = ({ isActive }) => 
        `${baseMobile} ${isActive ? active : inactive}`

    const isAnchorActive = (href) => currentPath === href;

    return (
        <header className='fixed top-0 left-0 right-0 z-50 bg-brand-bg border-b border-brand-border'>
            <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>

                <NavLink 
                    to='/' 
                    className='border border-brand-border px-4 py-2 shrink-0'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <span className='font-heading text-sm tracking-widest2 uppercase text-brand-text'>
                        Owl C Medicine
                    </span>
                </NavLink>

                {/* Desktop nav */}

                <nav className='hidden lg:flex items-center gap-8'>
                    {links.map(({ to, label }) => 
                        to.startsWith('/#') ? (
                            <button
                                key={to}
                                onClick={() => navigate(to)}
                                className={`text-left ${baseDesktop} ${isAnchorActive(to) ? active : inactive}`}
                            >
                                {label}
                            </button>
                    ) : (
                        <NavLink 
                            key={to} 
                            to={to} 
                            end={to === '/'} 
                            className={desktopNavLinkClass}
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>

                <button
                    className='lg:hidden flex flex-col gap-1.5 p-2'
                    onClick={() => setOpen(o => !o)}
                    aria-label='Toggle menu'
                    aria-expanded={open}
                >
                    <span className={`block w-6 h-px bg-brand-text transition-transform duration-200 ${open ? 'translate-y-2.5 rotate-45' : ''}`}></span>
                    <span className={`block w-6 h-px bg-brand-text transition-opacity duration-200 ${open ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-px bg-brand-text transition-transform duration-200 ${open ? '-translate-y-2.5 -rotate-45' : ''}`}></span>
                </button>
            </div>


            {/* Mobile drawer */}
            {open && (
                <nav className='lg:hidden border-t border-brand-border bg-brand-surface px-6 py-4 flex flex-col gap-4'>
                    {links.map(({ to, label }) =>
                        to.startsWith('/#') ? (
                            <button
                                key={to}
                                onClick={() => { navigate(to); setOpen(false); }}
                                className={`text-left ${baseMobile} ${isAnchorActive(to) ? active : inactive}`}
                            >
                                {label}
                            </button>
                        ) : (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/'}
                                className={mobileNavLinkClass}
                                onClick={() => setOpen(false)}
                            >
                                {label}
                            </NavLink>
                        ))}
                </nav>
            )}
        </header>
    );
};

export default NavBar;