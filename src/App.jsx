import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Coaching from './pages/Coaching';
import Podcast from './pages/Podcast';
import Articles from './pages/Articles';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />}/>
                <Route path='coaching' element={<Coaching />}/>
                <Route path='podcast' element={<Podcast />}/>
                <Route path='articles' element={<Articles />}/>
                <Route path='about' element={<About />}/>
                <Route path='contact' element={<Contact />}/>
            </Route>
        </Routes>
    </BrowserRouter>
)

export default App;