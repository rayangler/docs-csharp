import axios from 'axios';

const fetchURL = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

export default async (_req, context) => {
  const { url } = context.params;
  const returnValue = {
    statusCode: 500,
    body: '',
  };
  
  try {
    const data = await fetchURL(url);
    returnValue.statusCode = 200;
    returnValue.body = data;
  } catch (err) {
    console.log({ err });
    returnValue.statusCode = 400
  }


  return returnValue;
}
