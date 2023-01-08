export const officers = state => state.officers;
export const isModalActive = state => officers(state).isModalActive;
export const isRegistration = state => officers(state).isRegistration;

export const auth = state => state.auth;
export const isAuthorization = state => auth(state).isAuthorization;
export const isError = state => auth(state).isError;