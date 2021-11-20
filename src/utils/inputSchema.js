import * as yup from 'yup'

export const inputSchema = yup
  .object({
    gif: yup
      .string()
      .url()
      .matches(
        /^(https|http):\/\/(media|c).(giphy|tenor).com\//gm,
        'GIF must come from giphy.com or tenor.com'
      )
      .required(),
  })
  .required()
