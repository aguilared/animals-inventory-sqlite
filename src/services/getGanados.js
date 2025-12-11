import axios from "axios";
const DATABASEURL = process.env.NEXT_PUBLIC_API_URL;
const apiUrl = DATABASEURL + "owners/ganados/lives";
console.log("APIURLGGanados", apiUrl);
export default async function getGanados() {
  try {
    const resp = await axios.get(apiUrl);
    console.log("RESPP", resp);
    return resp.data;
  } catch (error) {
    console.log("ERRORP", error);
    return error;
  }
}
