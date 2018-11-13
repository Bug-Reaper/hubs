import uuid from "uuid/v4";

export default class AuthChannel {
  constructor(store) {
    this.store = store;
    this.socket = null;
  }

  setSocket = socket => {
    this.socket = socket;
  };

  removeCredentials = () => {
    return this.store.update({ credentials: { token: "", email: "" } });
  };

  get authenticated() {
    return !!this.store.state.credentials.token;
  }

  async startAuthentication(email) {
    const channel = this.socket.channel(`auth:${uuid()}`);
    await new Promise((resolve, reject) =>
      channel
        .join()
        .receive("ok", resolve)
        .receive("error", reject)
    );

    const authComplete = new Promise(resolve =>
      channel.on("auth_credentials", async ({ credentials }) => {
        this.store.update({ credentials: { email, token: credentials } });
        resolve();
      })
    );

    channel.push("auth_request", { email, origin: "hubs" });

    // Returning an object with the authComplete promise since we want the caller to wait for the above await but not
    // for authComplete.
    return { authComplete };
  }
}