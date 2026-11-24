import axios from "axios";
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const apiUrl = NEXT_PUBLIC_API_URL + "owners/animalsMautesLives"; // Endpoint for fetching owners with live animals
console.log("API", apiUrl);
export default async function getOwners() {
  try {
    const resp = await axios.get(apiUrl);
    //console.log("RESPP", resp);
    return resp.data;
  } catch (error) {
    console.log("ERRORP", error);
    return error;
  }
}
