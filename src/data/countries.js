import axios from "axios";

async function mapEffect({ leafletElement: map } = {}) {
  let response;
  try {
    response = await axios.get("https://corona.lmao.ninja/v2/countries");
  } catch (e) {
    console.log("can't fetch data");
    return;
  }

  const { data = {} } = response;

  console.log(data);
}
export default mapEffect;
