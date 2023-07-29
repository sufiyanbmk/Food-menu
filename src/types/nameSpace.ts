// export {}

//   declare global {
//     namespace Express {
//       interface Request {
//         userId?:string;
//       }
//     }
//   }

import {Request} from 'express'

export default interface CustomRequest extends Request {
    userId:string;
}
