import { getDefaultUser } from 'models/User'
import { rest } from 'msw'
import { API } from 'public/reference/API'

export const authHandlers = [
  rest.post(API.SERVER + '/auth/register', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(false)
    )
  }),

  rest.post(API.SERVER + '/auth/signin', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ jwt: 'fake-token' })
    )
  }),

  rest.get(API.SERVER + '/auth/currentUser', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ ...getDefaultUser(), ...{
        id: 'test'
      } })
    )
  })
]
