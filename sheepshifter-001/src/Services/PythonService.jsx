import config from "../Config/config";

const urls = config.urls;
const { pythonServerUrl, reactUrl } = urls;

const url = `${pythonServerUrl}segment`;

async function getSegments() {
  try {
    const response = await fetch(url, {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrer: reactUrl,
      referrerPolicy: "strict-origin-when-cross-origin",
      body: JSON.stringify({
        search: { image: "flowers" },
      }),
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Fetch failed: ${error.message}`);
  }
}

const PythonService = { getSegments };
export default PythonService;
