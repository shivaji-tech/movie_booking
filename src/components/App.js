import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import { getTheatreDetails } from "../services/apis";
import './App.css'
import BookingSeat from "./Booking-seat/BookingSeat";
import MovieGallery from './Movie-gallery/MovieGallery';
import TheatreGallery from "./Theatre-gallery/TheatreGallery";

const App = (props) => {

    const [movieList, setMovieList] = useState([]);
    const [theatreList, setTheatreList] = useState([]);


    useEffect(() => {
        getTheatreListFromApi();
    }, []);

   const getTheatreListFromApi = () => {
    const payload = {user_mail_id: 'yshivaji321@gmail.com'};
    getTheatreDetails(payload).then(
        res => {
            console.log(res);
            const data = res?.data;
            setMovieList(data?.movies || []);
            setTheatreList(data?.theatre || []);
        },
        err => console.log(err)
    )
    }
    return (
        <>
            <div className='main-section'>
                <div className='card'>
                    {/* <MovieGallery /> */}
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={<MovieGallery movieList={movieList} />}
                            />
                            <Route
                                path="/movie"
                                element={<TheatreGallery theatreList={theatreList} />}
                            />
                            <Route
                                path="/seat"
                                element={<BookingSeat />}
                            />
                        </Routes>
                    </Router>
                </div>
            </div>
        </>
    )
}

export default App;