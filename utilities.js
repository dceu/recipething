// Utility Functions
/**
 *
 * @param {url} url to pass into a fetch(url)
 * @returns {data} from await res.json();
 */
export const getJson = async function (url) {
  try {
    const res = await fetch(url);
    // console.log(res);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const get = async function (url) {
  try {
    const res = await fetch(url);
    const readableStream = await res.body.getReader();
    const read = readableStream.read();
    return read;
  } catch (err) {
    throw err;
  }
};
