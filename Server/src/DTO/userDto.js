class InfoDtoCurrent {
  constructor(infoUser) {
    this.name = infoUser.firstName;
    this.lastname = infoUser.lastName ? infoUser.lastName : "";
    this.role = infoUser.role;
    this.fullName = infoUser.lastName
      ? infoUser.firstName + " " + infoUser.lastName
      : infoUser.firstName;
    this.email = infoUser.email ? infoUser.email : "";
    this.cartId = infoUser.cart;
    this.document = infoUser.document;
    this.lastConnection = infoUser.lastConnection;
    this.thumbnail = infoUser.thumbnail ? infoUser.thumbnail : [];
  }
}
export default InfoDtoCurrent;

export class InfoUserDto {
  constructor(infoUser) {
    this.firstName = infoUser.firstName;
    this.lastName = infoUser.lastName ? infoUser.lastName : "";
    this.role = infoUser.role;
    this.email = infoUser.email ? infoUser.email : "";
    this.cartId = infoUser.cart;
    this.document = infoUser.document;
    this.lastConnection = infoUser.lastConnection;
    this.thumbnail = infoUser.thumbnail ? infoUser.thumbnail : [];
  }
}
