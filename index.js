import dotenv from "dotenv"
dotenv.config()

import { getApod, createApod } from "./services/notion.js"
import { fetchNasa } from "./services/nasa.js"
import { upload } from "./services/cloudinary.js"

try {
  const {
    copyright,
    date,
    explanation,
    hdurl,
    media_type,
    url,
    service_version,
    title,
  } = await fetchNasa()

  const { secure_url } = await upload(url)

  await createApod({
    title: title,
    explanation: explanation,
    media_type: media_type,
    media: secure_url,
    service_version: service_version,
    date: date,
    copyright: copyright || "no copyright",
  })
  console.log("✔️ " + "Element added in notion")
} catch (error) {
  console.error("❌ ", error.message)
}
