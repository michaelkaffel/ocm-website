import { useState } from 'react';

const STATUS = { idle: 'idle', loading: 'loading', success: 'success', error: 'error' };

const SubscribeForm = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(STATUS.idle);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(STATUS.loading);
        setErrorMsg('')

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json '},
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.error || 'Something went wrong.');
                setStatus(STATUS.error);
                return;
            }

            setStatus(STATUS.success);
            setEmail('');
        } catch {
            setErrorMsg('Network error. Please try again');
            setStatus(STATUS.error);
        }
    };

    if (status === STATUS.success) {
        return (
            <p className='text-brand-accent text-center text-sm font-medium'>
                You&apos;re subscribed. You&apos;ll hear from us when new articles go up.
            </p>
        );
    }

    return (
        <div>
            <p className='text-sm text-center text-gray-400 mb-3'>
                New articles, straight to your inbox.
            </p>
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-2'>
                <input 
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='your@email.com'
                    required
                    disabled={status === STATUS.loading}
                    className='flex-1 px-4 py-2 rounded bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-brand-accent text-sm disabled:opacity-50'
                />
                <button
                    type='submit'
                    disabled={status === STATUS.loading}
                    className='px-5 py-2 rounded bg-brand-accent text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap'
                >
                    {status === STATUS.loading ? 'Subscribing...' : 'Subscribe'}
                </button>
            </form>
            {status === STATUS.error && (
                <p className='text-red-400 text-sx mt-2'>{errorMsg}</p>
            )}
        </div>
    );
};

export default SubscribeForm;