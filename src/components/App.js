import './App.css'
import MovieGallery from './Movie-gallery/MovieGallery';
const App = (props) => {
    return (
        <>
        <div className='main-section'>
            <div className='card'>
                <MovieGallery />
            </div>
        </div>
        </>
    )
}

export default App;