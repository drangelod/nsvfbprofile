import firebase from "nativescript-plugin-firebase";
import BackendService from "./BackendService";
import { backendService } from "../main";

export default class AuthService extends BackendService {
  async register(user) {
    const createdUser = await firebase.createUser({
      email: user.email,
      password: user.password
    });
    return await firebase.firestore.set("users", createdUser.uid, {});
  }

  async login(user) {
    await firebase
      .login({
        type: firebase.LoginType.PASSWORD,
        passwordOptions: {
          email: user.email,
          password: user.password
        }
      })
      .then(async firebaseUser => {
        backendService.token = firebaseUser.uid;
        return firebaseUser;
      });
  }

  async loginFacebook(user) {
    await firebase
      .login({
        type: firebase.LoginType.FACEBOOK,
        facebookOptions: {
          scope: ["public_profile", "email"]
        }
      })
      .then(result => {
        return Promise.resolve(JSON.stringify(result));
      })
      .catch(error => {
        console.log("Error logging in with Facebook");
        console.error(error);
        return Promise.reject(error);
      });
  }

  async loginGoogle(user) {
    await firebase
      .login({
        type: firebase.LoginType.GOOGLE
      })
      .then(result => {
        return Promise.resolve(JSON.stringify(result));
      })
      .catch(error => {
        console.log("Error logging in with Facebook");
        console.error(error);
        return Promise.reject(error);
      });
  }

  async resetPassword(email) {
    return await firebase.resetPassword({
      email: email
    });
  }

  async logout() {
    backendService.token = "";
    return await firebase.logout();
  }
}
