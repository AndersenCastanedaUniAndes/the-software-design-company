const {v4} = require("uuid");
const { faker } = require("@faker-js/faker");
const fs = require("node:fs");
const path = require('path');

exports.generateRamdomMember = () => {
  const id = v4();
  const name = faker.person.firstName().toLocaleLowerCase();
  return {
    fullname: name,
    email: `${name}-${id}@test.com`,
  };
};

exports.generateInvalidMemberEmail = (name) => {
  const id = v4();
  return {
    email: `${name}-${id}@test.`,
  };
};

exports.clean =  (directory) => {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
}

exports.generateTitle = () => faker.string.alpha(10);