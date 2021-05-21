import axios from "axios"

const fetchNasa = async () => {
  const res = axios.get(
    "https://api.nasa.gov/planetary/apod?api_key=CVmpFpda8Tpzc10wOLge6z3QyM42XEXnNwhHiqSl"
  )
  const {
    data: {
      copyright,
      date,
      explanation,
      hdurl,
      media_type,
      service_version,
      title,
      url,
    },
  } = await res

  return {
    copyright,
    date,
    explanation,
    hdurl,
    media_type,
    url,
    service_version,
    title,
  }
}
export { fetchNasa }
