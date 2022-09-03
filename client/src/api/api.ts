import axios from "axios";

const fetchWords = async (setState: Function, endpointUrl: string) => {
  try {
    const response = await axios.get(endpointUrl);
    setState(response.data);
  } catch (error) {
    console.error(error);
  }
};

const fetchScores = async (
  setState: Function,
  endpointUrl: string,
  score: number
) => {
  const payload = { score: score };
  try {
    const response = await axios.post(endpointUrl, payload);
    setState(response.data);
  } catch (error) {
    console.error(error);
  }
};

export { fetchScores, fetchWords };
