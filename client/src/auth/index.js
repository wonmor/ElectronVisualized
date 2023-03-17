import { createAuthProvider } from 'react-token-auth';

const authProvider = createAuthProvider({
  accessTokenKey: 'access_token',
  onUpdateToken: (token) =>
    fetch(
      process.env.NODE_ENV === 'production'
        ? '/api/refresh'
        : 'https://www.electronvisual.org/api/refresh',
      {
        method: 'POST',
        body: token.access_token,
      }
    ).then((r) => r.json()),
});

console.log(authProvider);

export const [useAuth, authFetch, login, logout] = authProvider;
