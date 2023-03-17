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
  
  const provider = createAuthProvider({
    accessTokenKey: 'access_token',
    onUpdateToken: async (token) => {
      const response = await fetch(
        process.env.NODE_ENV === 'production'
          ? '/api/refresh'
          : 'https://www.electronvisual.org/api/refresh',
        {
          method: 'POST',
          body: token.access_token,
        }
      );
      const data = await response.json();
      return data;
    },
  });
  
  provider.then(([useAuth, authFetch, login, logout]) => {
    authProvider.useAuth = useAuth;
    authProvider.authFetch = authFetch;
    authProvider.login = login;
    authProvider.logout = logout;
  });
  
  export const { useAuth, authFetch, login, logout } = authProvider;
  