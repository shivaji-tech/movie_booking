import { useLocation, useNavigate } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import './TheatreGallery.css'
import { useEffect, useState } from "react";

const TheatreGallery = (props) => {
    const dataState = useLocation();
    const navigate = useNavigate();
    const selectedMovieDetails = dataState?.state;
    const theatreList = props?.theatreList;
    const [filteredTheatre, setFilteredTheatre] = useState([]);
    console.log(selectedMovieDetails, theatreList);

    useEffect(() => {
        let tempData = [];
        let showTiming = [];
        const selectedMovie = selectedMovieDetails?.movie_name;
        theatreList.forEach(item => {
            if (Object.values(item)?.indexOf(selectedMovie) >= 0) {
                tempData.push(item);
            }
        });
        tempData.forEach(item => {
            if (item?.show1_movie === selectedMovie) {
                showTiming.push(item?.show1_time);
            }
            if (item?.show2_movie === selectedMovie) {
                showTiming.push(item?.show2_time);
            }
            if (item?.show3_movie === selectedMovie) {
                showTiming.push(item?.show3_time);
            }
            if (item?.show4_movie === selectedMovie) {
                showTiming.push(item?.show4_time);
            }
            item.showTimings = showTiming;
        });
        console.log(tempData)
        setFilteredTheatre(tempData);
    }, [selectedMovieDetails, theatreList]);

    const handleShowTiming = (timing, theatre) => {
        const showDetails = {...selectedMovieDetails, showTiming: timing, ...theatre};
        navigate('/seat', {state: showDetails})
    }

    return (
        <>
            {filteredTheatre?.map((theatre, idx) => {
                return (
                    <div key={idx} className="thatre-section">
                        <div  className="theatre-card">
                            <Image width={150} height={150} src={theatre?.thumbnail_url} alt={theatre?.theatre_name} />
                            <div className="movie-name movie-details">{theatre?.theatre_name}</div>
                            <div className="movie-rating movie-details">Customer rating: {theatre?.customer_rating}</div>
                            <div className="theatre-location">Address: {theatre?.address}</div>
                        </div>
                        <div className="show-timings">
                            {theatre?.showTimings?.map((timing, idx) => {
                                return (
                                    <button key={idx} onClick={() => handleShowTiming(timing, theatre)} className="show-timing-btn">{timing}</button>
                                )
                            })}

                            {/* <button className="show-timing-btn">10</button>
            <button className="show-timing-btn">10</button> */}
                        </div>
                    </div>
                )
            })}
            {/* <div className="thatre-section">
            <div className="theatre-card">
                <Image width={150} height={150} src="https://lh3.googleusercontent.com/p/AF1QipMrgKxJIQkJKXyvOoBjqXuPpVYqupxwMMOjuQtU=s1360-w1360-h1020" />
            <div className="movie-name movie-details">Gokul Theatre</div>
            <div className="movie-rating movie-details">IMDB: 8</div>
            </div>
            <div className="show-timings">
            <button className="show-timing-btn">10</button>
            <button className="show-timing-btn">10</button>
            <button className="show-timing-btn">10</button>
            </div>
            </div> */}

            {/* <div className="thatre-section">
            <div className="theatre-card">
                <Image width={150} height={150} src="https://lh3.googleusercontent.com/p/AF1QipMrgKxJIQkJKXyvOoBjqXuPpVYqupxwMMOjuQtU=s1360-w1360-h1020" />
            <div className="movie-name movie-details">Gokul Theatre</div>
            <div className="movie-rating movie-details">IMDB: 8</div>
            </div>
            <div className="show-timings">
            <button className="show-timing-btn">10</button>
            <button className="show-timing-btn">10</button>
            <button className="show-timing-btn">10</button>
            </div>
            </div> */}
        </>
    )
}

export default TheatreGallery;