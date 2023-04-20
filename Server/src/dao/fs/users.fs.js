class UsersManager {
  static #instance;
  static getInstance() {
    return this.#instance ? this.#instance : new UsersManager();
  }
}
export default UsersManager;
