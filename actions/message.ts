import axios from "axios"

export function sendMessage(data: any) {
  const config = {
    method: "post",
    url: `https://graph.facebook.com/v17.0/105897529220647`,
    headers: {
      Authorization: `Bearer EAAJXZCNay1JkBAEXWwmRsuAaZAyM8zh0YoD11JLxYt2ARUaYwcnSLCN9S3ukBMQbTqJMJwz7HrOZAfZCkfY9ZCmzxbxEExGebv3TfGX49u1Vm98KEZBZBMMLDA4jBbm6iVwyiHqsZAVW8nkutEgZCCEI8IY9hZBGUUt92AktNnoKJIB60LEmHCExu4bZCu4dn52hiVhTUIbVqV6cwZDZD`,
      "Content-Type": "application/json",
    },
    data: data,
  }

  return axios(config)
}

export function getTextMessageInput(recipient: number, text: string) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: recipient,
    type: "text",
    text: {
      body: text,
    },
  })
}

export function getTemplateMessageInput(
  recipient: number,
  thumbnail: string,
  listing_name: string,
  date: string,
  guests: number,
  infant: number
) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: recipient,
    type: "template",
    template: {
      name: "reservation",
      language: {
        code: "en_GB",
      },
    },
    components: [
      {
        type: "header",
        paramaters: [
          {
            type: "image",
            image: {
              link: thumbnail,
            },
          },
        ],
      },
      {
        type: "body",
        parameters: [
          {
            type: "text",
            text: listing_name,
          },
          {
            type: "text",
            text: date,
          },
          {
            type: "text",
            text: guests,
          },
          {
            type: "text",
            text: infant,
          },
        ],
      },
    ],
  })
}
