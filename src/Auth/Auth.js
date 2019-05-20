import auth0 from "auth0-js";
import history from "../history";
import { setToken } from "../index";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "berryman.eu.auth0.com",
    clientID: "21o589q6G8Un2aVO08VTIgqg240ucnlj",
    redirectUri: "http://localhost:3000/callback",
    responseType: "token id_token",
    scope: "openid",
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    localStorage.setItem("redirect_url", window.location.pathname);
    this.auth0.authorize();
  }

  handleAuthentication() {
    console.log("handleAuthentication");
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        const redirectUrl = localStorage.getItem("redirect_url");

        console.log(redirectUrl);
        history.replace(redirectUrl);
        localStorage.removeItem("redirect_url");
        setToken(authResult.accessToken);

        console.log("auth good");
      } else if (err) {
        console.log("auth error");

        // history.replace("/manage");
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    console.log("setSession");
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("sub", authResult.idTokenPayload.sub);
    // navigate to the home route
    // history.replace("/manage");
  }

  logout() {
    console.log("logout");
    // Clear Access Token and ID Token from local storage

    this.auth0.logout({
      returnTo: "http://localhost:3000",
      clientID: "21o589q6G8Un2aVO08VTIgqg240ucnlj",
    });

    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("sub");

    // navigate to the home route
    history.replace("/");
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    console.log(new Date().getTime() < expiresAt);
    return new Date().getTime() < expiresAt;
  }
}
