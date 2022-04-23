import { Request } from 'express-generator'

export const GET = (req, res) => {
  res.send('Hello World!');
}

export const POST  = (req, res) => {
  res.send('Hello Post World!');
}