import axios from 'axios';

const fetchURL = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

export default async (_req, context) => {
  const { url } = context.url.searchParams;

  let retBody = '';
  let retStatus = 200;

  console.log({ url });
  console.log({ context });

  if (url) {
    try {
      const data = await fetchURL(url);
      retStatus = 200;
      retBody = data;
    } catch (err) {
      console.log({ err });
      retStatus = 400
    }
  }

  return new Response(retBody, { status: retStatus });
}
