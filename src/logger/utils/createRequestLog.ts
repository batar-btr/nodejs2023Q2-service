import { Request } from 'express';

export default function createRequestLog(req: Request) {
  const { url, body, query } = req;
  return `Request: URL: ${url}, BODY: ${JSON.stringify(
    body,
  )}, Query: ${JSON.stringify(query)}\n`;
}
