import usePageTitle from '../hooks/usePageTitle';


const About = () => {
    usePageTitle('About')

    return (
        <div className="p-8 text-brand-text">About page</div>
    )
}

export default About;