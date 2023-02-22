import { useEffect, useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Toast from 'react-bootstrap/Toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookTicket } from '../../services/apis';
import { seats } from '../../utils/constant';
import styles from './BookingSeat.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BookingSeat = (props) => {
    const dataState = useLocation();
    const navigate = useNavigate();
    const [seatDetails, setSeatDetails] = useState(seats);
    const [selectedSeats, setSelectedSeats] = useState('');
    const showDetails = dataState?.state;

    useEffect(() => {
        if (!seats) {
            clearSelectedSeats();
        }
    }, [])

    const formatDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedToday = dd + '/' + mm + '/' + yyyy;
        return formattedToday
    }

    const getClassNameForSeats = (seatValue) => {
        let dynamicClass;
        if (seatValue === 0) {
            dynamicClass = styles.seatNotBooked;
        } else if (seatValue === 1) {
            dynamicClass = styles.seatBooked;
        } else if (seatValue === 2) {
            dynamicClass = styles.seatSelected;
        } else {
            dynamicClass = styles.seatBlocked;
        }
        return `${styles.seats} ${dynamicClass}`
    }

    const clearSelectedSeats = () => {
        let newMovieSeatDetails = { ...seatDetails };
        for (let key in seatDetails) {
            seatDetails[key].forEach((seatValue, seatIndex) => {
                if (seatValue === 2) {
                    seatDetails[key][seatIndex] = 0;
                }
            })
        }
        setSeatDetails(newMovieSeatDetails);
    }

    const RenderSeats = () => {
        let seatArray = [];
        for (let key in seatDetails) {
            let colValue = seatDetails[key].map((seatValue, rowIndex) => (
                <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
                    <span className={getClassNameForSeats(seatValue)} onClick={() => onSeatClick(seatValue, rowIndex, key)}>
                        {(rowIndex +1) + 1 * key}
                    </span>
                    {seatDetails && rowIndex === seatDetails[key].length - 1 && <><br /><br /></>}
                </span>
            ))
            seatArray.push(colValue);
        }
        return (
            <div className={styles.seatsLeafContainer}>{seatArray}</div>
        )
    }

    const onSeatClick = (seatValue, rowIndex, key) => {
        if (seatDetails) {
            if (seatValue === 1 || seatValue === 3) {
                return;
            } else if (seatValue === 0) {
                seatDetails[key][rowIndex] = 2;
                let updatedVal = [...selectedSeats, Number(key) + Number(rowIndex + 1)];
                setSelectedSeats(updatedVal);
            } else {
                seatDetails[key][rowIndex] = 0;
                let updatedVal = [...selectedSeats];
                const idx = updatedVal.indexOf(`${key}${rowIndex + 1}`);
                if (idx > -1) updatedVal.splice(idx, 1);
                setSelectedSeats(updatedVal);
            }
        }
        setSeatDetails({ ...seatDetails });
    }

    const handleTicketBooking = () => {
        bookTicketApi();
    }

    const bookTicketApi = () => {
        const payload = {
            show_time: showDetails?.showTiming,
            movie_name: showDetails?.movie_name,
            theatre_name: showDetails?.theatre_name,
            booked_seats: JSON.stringify(selectedSeats),
            date: formatDate(),
            user_mail_id: 'yshivaji321@gmail.com'
        }
        bookTicket(payload).then(
            res => {
                toast.success('Ticket Booked Successfully!', {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(() => {
                    navigate('/');
                }, 2000);
                setSelectedSeats([]);
            },
            err => {

            }
        );
    }

    return (
        <>
            <div className={styles.seatCard}>
                <ToastContainer />
                <RenderSeats />
                <div className={styles.screenView}>Screen This way</div>
                {selectedSeats?.length > 0 && <div className={styles.bookingSection}>
                    <button onClick={handleTicketBooking} className={styles.bookBtn}>Pay and Book</button>
                </div>
                }
            </div>
        </>
    )
}

export default BookingSeat;