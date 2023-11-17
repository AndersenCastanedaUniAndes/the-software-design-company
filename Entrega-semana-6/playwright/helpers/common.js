import { v4 as uuidv4 } from 'uuid';
const { faker } = require("@faker-js/faker");

export const generateRamdomMember = () => {
  const id = uuidv4();
  const name = faker.person.firstName().toLocaleLowerCase();
  return {
    fullname: name,
    email: `${name}-${id}@test.com`,
  };
};

export const generateInvalidMemberEmail = (name) => {
  const id = uuidv4();
  return {
    email: `${name}-${id}@test.`,
  };
};

export const generateTitle = () => faker.string.alpha(10);