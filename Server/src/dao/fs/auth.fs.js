class AuthManager {
  static #instance;
  static getInstance() {
    return this.#instance ? this.#instance : new AuthManager();
  }
}
export default AuthManager;
