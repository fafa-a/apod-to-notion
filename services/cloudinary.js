import dotenv from "dotenv"
import cloudinary from "cloudinary"

dotenv.config({ path: "D:/WorkSpace/Side project/ApodToNotion/.env" })

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const upload = async (oldUrl) => {
  const data = await cloudinary.v2.uploader.upload(
    oldUrl,
    {
      format: "webp",
    },
    function (error, result) {
      if (error) {
        console.log("❌", error)
      }
      console.log("✔️ " + "Upload completed")
      return result
    }
  )
  return data
}
export { upload }
