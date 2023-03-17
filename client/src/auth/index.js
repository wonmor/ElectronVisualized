import { createAuthProvider } from 'react-token-auth';

const authProvider = {
    [Symbol.iterator]: function* () {
      yield this.useAuth;
      yield this.authFetch;
      yield this.login;
      yield this.logout;
    },
    useAuth: null,
    authFetch: null,
    login: null,
    logout: null,
  };
  
  createAuthProvider({
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
  }).forEach((fn, i) => {
    switch (i) {
      case 0:
        authProvider.useAuth = fn;
        break;
      case 1:
        authProvider.authFetch = fn;
        break;
      case 2:
        authProvider.login = fn;
        break;
      case 3:
        authProvider.logout = fn;
        break;
      default:
        break;
    }
  });
  
  export const [useAuth, authFetch, login, logout] = authProvider;
  