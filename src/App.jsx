import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Coaching from './pages/Coaching';
import Podcast from './pages/Podcast';
import PodcastEpisode from './pages/PodcastEpisode';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail'
import About from './pages/About';


const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />}/>
                <Route path='coaching' element={<Coaching />}/>
                <Route path='podcast' element={<Podcast />}/>
                <Route path='/podcast/:slug' element={<PodcastEpisode />}/>
                <Route path='articles' element={<Articles />}/>
                <Route path='articles/:slug' element={<ArticleDetail />}/>
                <Route path='about' element={<About />}/>
            </Route>
        </Routes>
    </BrowserRouter>
)

export default App;