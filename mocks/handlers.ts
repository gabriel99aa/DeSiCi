import { rest } from 'msw'

export const handlers = [
  rest.get('https://i.dummyjson.com/data/products', (req, res, ctx) => {
    const data = [
      { name: 'Redux Toolkit', url: 'https://redux-toolkit.js.org/' },
      { name: 'MSW', url: 'https://mswjs.io/' },
    ]

    return res(ctx.status(200), ctx.json(data))
  }),
]
