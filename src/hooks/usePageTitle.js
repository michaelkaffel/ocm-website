import { useEffect } from 'react';

const usePageTitle = (title) => {
    useEffect(() => {
        document.title = title
            ? `${title} | Owl Chrysalis Medicine`
            : 'Owl Chrysalis Medicine';
    }, [title]);
};

export default usePageTitle;