import { API_BASE_URL } from "../constants/domain"

export default function appendToBaseApiUrl(string) {
    return API_BASE_URL + string
}
