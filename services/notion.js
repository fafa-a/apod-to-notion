import dotenv from "dotenv"
import { Client } from "@notionhq/client"
dotenv.config({ path: "D:/WorkSpace/Side project/ApodToNotion/.env" })

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
const databaseId = process.env.NOTION_DATABASE_ID

const getApod = async () => {
  const payload = {
    path: `databases/${databaseId}/query`,
    method: "POST",
  }

  const { results } = await notion.request(payload)

  const result = results.map((page) => {
    return {
      explanation: page.properties.explanation.rich_text[0].text.content,
      media_type: page.properties.media_type.rich_text[0].text.content,
      media: page.properties.media.rich_text[0].text.content,
      service_version:
        page.properties.service_version.rich_text[0].text.content,
      date: page.properties.date.date.start,
      copyright: page.properties.copyright.rich_text[0].text.content,
      title: page.properties.title.title[0].text.content,
    }
  })
  return result
}

const createApod = async ({
  title,
  explanation,
  media_type,
  media,
  service_version,
  date,
  copyright,
}) => {
  const response = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      title: [
        {
          type: "text",
          text: {
            content: title,
          },
        },
      ],
      explanation: [
        {
          text: {
            content: explanation,
          },
        },
      ],
      media_type: [
        {
          id: "QNLt",
          text: {
            content: media_type,
          },
        },
      ],
      media: [
        {
          id: "R^vX",
          type: "text",
          text: {
            content: media,
          },
        },
      ],
      service_version: [
        {
          type: "text",
          text: {
            content: service_version,
          },
        },
      ],
      date: {
        id: "qn;m",
        start: date,
      },
      copyright: [
        {
          type: "text",
          text: {
            content: copyright,
          },
        },
      ],
    },
  })
  // console.log(response)
}
export { getApod, createApod }
