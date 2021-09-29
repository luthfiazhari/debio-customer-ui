import axios from "axios"
const baseUrl = "https://backend-dev.debio.network"

export const getCategories = async () => {
  return axios.get(`${baseUrl}/service-category`)
}
