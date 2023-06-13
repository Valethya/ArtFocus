import { faker } from "@faker-js/faker";
faker.locale = "es";

const generateProducts = () => {
  const products = [];

  const product = {
    title: faker.lorem.words(2),
    description: faker.lorem.words(10),
    price: faker.commerce.price(1000, 100000, 0, "$"),
    thumbnail: [faker.image.abstract()],
    stock: faker.random.numeric(2, { bannedDigits: ["0"] }),
    code: faker.datatype.boolean(),
    category: "varios",
    code: faker.datatype.hexadecimal({ length: 10, case: "upper" }),
    id: faker.database.mongodbObjectId(),
  };

  for (let i = 0; i < 100; i++) {
    products.push(product);
  }
  return products;
};

export default generateProducts;
