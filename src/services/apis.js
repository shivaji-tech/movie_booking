import axios from "axios";
import { bookTicketUrl, getTheatreDetailsUrl } from "../utils/constant";

export function getTheatreDetails(payload) {
    return axios.post(getTheatreDetailsUrl, payload)
}

export function bookTicket(payload) {
    return axios.post(bookTicketUrl, payload)
}