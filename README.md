> The example repository is maintained from a [monorepo](https://github.com/nextauthjs/next-auth/tree/main/apps/example-nextjs). Pull Requests should be opened against [`nextauthjs/next-auth`](https://github.com/nextauthjs/next-auth).

<p align="center">
   <br/>
   <a href="https://next-auth.js.org" target="_blank"><img width="150px" src="https://next-auth.js.org/img/logo/logo-sm.png" /></a>
   <h3 align="center">NextAuth.js Example App</h3>
   <p align="center">
   Open Source. Full Stack. Own Your Data.
   </p>
   <p align="center" style="align: center;">
      <a href="https://npm.im/next-auth">
        <img alt="npm" src="https://img.shields.io/npm/v/next-auth?color=green&label=next-auth">
      </a>
      <a href="https://bundlephobia.com/result?p=next-auth-example">
        <img src="https://img.shields.io/bundlephobia/minzip/next-auth?label=next-auth" alt="Bundle Size"/>
      </a>
      <a href="https://www.npmtrends.com/next-auth">
        <img src="https://img.shields.io/npm/dm/next-auth?label=next-auth%20downloads" alt="Downloads" />
      </a>
      <a href="https://npm.im/next-auth">
        <img src="https://img.shields.io/badge/npm-TypeScript-blue" alt="TypeScript" />
      </a>
   </p>
</p>

## Sign-In with Lightning and NextAuth.js Example

This is an example application that shows how to integrate lightning login to `next-auth`.

## Getting Started

### Dependencies

Node.js
Yarn
Lightning wallet with login support (this project was tested with [Alby](https://getalby.com))

```
git clone https://github.com/silencesoft/lightning-next-auth-example
cd lightning-next-auth-example
yarn
```

### Configure your local environment

Copy the .env.local.example file in this directory to .env.local (which will be ignored by Git):

```
cp .env.local.example .env.local
```

Update with your values.

### Start the application

To run your site locally, use:

```
yarn dev
```

## License

ISC

