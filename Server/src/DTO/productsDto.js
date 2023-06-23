class productDto {
  constructor(product) {
    this.id = product._id;
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
    this.thumbnail = product.thumbnail;
    this.stock = product.stock;
    this.code = product.code;
    this.category = product.category;
    this.owner = product.owner;
  }
}
export default productDto;

export class ResponseDTO {
  constructor(
    totalDocs,
    totalPages,
    prevPage,
    nextPage,
    page,
    hasNextPage,
    hasPrevPage,
    prevLink,
    nextLink,
    payload
  ) {
    this.totalDocs = totalDocs;
    this.totalPages = totalPages;
    this.prevPage = prevPage;
    this.nextPage = nextPage;
    this.page = page;
    this.hasNextPage = hasNextPage;
    this.hasPrevPage = hasPrevPage;
    this.prevLink = prevLink;
    this.nextLink = nextLink;
    this.payload = payload;
  }
}
