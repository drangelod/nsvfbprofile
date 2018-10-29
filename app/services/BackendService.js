import { getString, setString } from 'tns-core-modules/application-settings'

const tokenKey = "token";

export default class BackendService {
  
  isLoggedIn() {
    return !!getString(tokenKey);
  }

  get token() {
    return getString(tokenKey);
  }

  set token(newToken) {
    setString(tokenKey, newToken);
  }

  
}
