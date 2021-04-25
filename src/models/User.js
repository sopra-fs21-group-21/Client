/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.creationDate = null;
    this.collaboratingPortfolios = null;
    this.ownedPortfolios = null;
    this.status = null;
    this.token = null;
    this.username = null;
    this.id = null;
    Object.assign(this, data);
  }
}
export default User;
