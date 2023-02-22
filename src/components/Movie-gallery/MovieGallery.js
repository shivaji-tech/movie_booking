import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getTheatreDetails } from "../../services/apis";
import './MovieGallery.css'
import TheatreGallery from "../Theatre-gallery/TheatreGallery";
import { useNavigate } from "react-router-dom";

const MovieGallery = (props) => {
    console.log(props)
    const movieList= props?.movieList
    const [showTheatreView, setShowTheatreView] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState({});
    const navigate = useNavigate();

//     useEffect(() => {
//         getTheatreListFromApi();
//     }, []);

//    const getTheatreListFromApi = () => {
//     const payload = {user_mail_id: 'yshivaji321@gmail.com'};
//     getTheatreDetails(payload).then(
//         res => {
//             console.log(res);
//             const data = res?.data;
//             setMovieList(data?.movies || []);
//         },
//         err => console.log(err)
//     )
//     }

    const handleMovieSelect = (movieDetails) => {
        console.log(movieDetails)
        setSelectedMovie(movieDetails);
        setShowTheatreView(true);
        navigate('/movie', {state: movieDetails})
    }

    return (
        <>
        {movieList?.map((item, idx) => {
            return (
                <div key={idx} onClick={() => handleMovieSelect(item)} className="movie-card">
                <img width={200} height={400} src={item?.thumbnail_url} />
                <div className="movie-name movie-details">{item?.movie_name}</div>
                <div className="movie-rating movie-details">IMDB: {item?.imdb_rating}</div>
                <div className="movie-tags movie-details">{item?.tags}</div>
            </div>  
            )
        })}
        </>
    )
}

export default MovieGallery;