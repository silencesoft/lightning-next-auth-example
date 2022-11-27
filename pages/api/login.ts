import type { NextApiRequest, NextApiResponse } from 'next';
import lnurl from 'lnurl';
import { randomBytes } from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const k1 = randomBytes(32).toString('hex');
  const callbackUrl = `${process.env.NEXTAUTH_URL}/api/validate?k1=${k1}&tag=login`;
  const encoded = lnurl.encode(callbackUrl).toUpperCase();

  res.send(JSON.stringify({ login: encoded }));
}
