import {PrismaClient} from '@prisma/client'

declare global{
  var prisma:PrismaClient | undefined
}

const client=globalThis.prisma|| new PrismaClient();


if (process.env.NODE_ENV !== 'production') globalThis.prisma=client;

// client.$use(async (params, next) => {
//   if (params.model === 'User' && params.action === 'create') {
//     const email = params.args.data.email
//     if (!params.args.data.username) {
//       params.args.data.username = email
//     }
//   }
//   return next(params)
// })


export default client;