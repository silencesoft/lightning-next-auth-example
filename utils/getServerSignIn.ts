/*
 * Modified from https://github.com/nextauthjs/next-auth/issues/45#issuecomment-1318996248
 */

import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { getCsrfToken, SignInAuthorizationParams, SignInOptions } from 'next-auth/react';
import { NextAuthHandler } from 'next-auth/core';
import { setCookie } from 'cookies-next';
import type { NextAuthOptions } from 'next-auth';
import type { BuiltInProviderType, RedirectableProviderType } from 'next-auth/providers';
import type { LiteralUnion } from 'next-auth/react/types';

/**
 * Gets the sign from the server side.
 * @param context The request/response context (typically the context from getServerSideProps)
 * @param providerId The provider id that you want to sign in with.
 * @param authOptions The NextAuth options (i.e. from api/auth/[...nextauth].ts)
 * @param options Sign in options ... should be equivalent to the client side sign in options, minus the redirect
 *                param...i don't think it applies here
 * @param authorizationParams Additional parameters to pass to the authorization request
 */
export async function getServerSignIn<P extends RedirectableProviderType | undefined = undefined>(
  context: GetServerSidePropsContext | { req: NextApiRequest; res: NextApiResponse },
  providerId: LiteralUnion<P extends RedirectableProviderType ? P | BuiltInProviderType : BuiltInProviderType>,
  authOptions: NextAuthOptions,
  options: Omit<SignInOptions, 'redirect'> = {},
  authorizationParams: SignInAuthorizationParams = {}
): Promise<string> {
  const params = new URLSearchParams({
    ...(options as Record<string, string>),
    csrfToken: (await getCsrfToken({ ctx: context })) || '',
    json: 'true',
  });
  const result = await NextAuthHandler({
    options: authOptions,
    req: {
      host: detectHost(context.req.headers['x-forwarded-host'] || ''),
      action: 'callback',
      method: 'POST',
      cookies: context.req.cookies,
      headers: context.req.headers,
      providerId,
      body: Object.fromEntries(params.entries()),
      query: authorizationParams as Record<string, string>,
    },
  });

  const { redirect, cookies } = result;

  cookies?.forEach((cookie) =>
    setCookie(cookie.name, cookie.value, { ...cookie.options, req: context.req, res: context.res })
  );

  return redirect || '';
}

/**
 * Copied from next-auth since it isn't exported in a way that we can use it.
 * Tweaked types to be more explicit and accept an array of strings since that is what req.headers[*] potentially gives.
 * @param forwardedHost
 */
function detectHost(forwardedHost: string | string[]): string {
  // If we detect a Vercel environment, we can trust the host
  if (process.env.VERCEL ?? process.env.AUTH_TRUST_HOST)
    return Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost;
  // If `NEXTAUTH_URL` is `undefined` we fall back to "http://localhost:3000"
  return process.env.NEXTAUTH_URL;
}
