import axios from "axios";
const DATABASEURL = process.env.NEXT_PUBLIC_API_URL;
const apiUrl = DATABASEURL + "owners/animals/historico";
console.log("APIURLGGanados", apiUrl);
export default async function getOwnerAnimals() {
  try {
    const resp = await axios.get(apiUrl);
    //console.log("RESPP", resp);
    return resp.data;
  } catch (error) {
    console.log("ERRORP", error);
    return error;
  }
}
