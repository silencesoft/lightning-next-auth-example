import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyAuthorizationSignature } from 'lnurl';
import { authOptions } from './auth/[...nextauth]';
import { getCookie } from 'cookies-next';

import { getServerSignIn } from '../../utils/getServerSignIn';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { k1, key, sig } = req.query;
  const authorize = await verifyAuthorizationSignature(sig, k1, key);

  if (authorize) {
    const context = { req, res };
    const csrfToken = decodeURIComponent(getCookie('next-auth.csrf-token')?.toString() || '')?.split('|')[0] || '';

    await getServerSignIn(context, 'lightning', authOptions, {
      csrfToken: csrfToken,
      message: key,
    });

    res.send(JSON.stringify({ status: 'OK', success: true, k1 }));
  } else {
    res.status(400).json({
      success: false,
      error: 'Error in keys.',
    });
  }
}
