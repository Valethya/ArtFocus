class InfoDto {
  constructor(infoUser) {
    this.name = infoUser.firstName;
    this.lastname = infoUser.lastName ? infoUser.lastName : "";
    this.role = infoUser.role;
    this.fullName = infoUser.lastName
      ? infoUser.firstName + " " + infoUser.lastName
      : infoUser.firstName;
    this.email = infoUser.email ? infoUser.email : "";
    this.cartId = infoUser.cart;
  }
}
export default InfoDto;
