const {v4} = require("uuid");
const { faker } = require("@faker-js/faker");
const fs = require("node:fs");
const path = require('path');

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

exports.generateRamdomMemberInMemory = () => {
  const id = v4();
  const name = faker.person.firstName().toLocaleLowerCase();
  return {
    fullname: name,
    email: `${name}-${id}@test.com`,
  };
};

exports.generateInvalidMemberEmailInMemory = (name) => {
  const id = v4();
  return {
    email: `${name}-${id}@test.`,
  };
};

exports.generateValidRamdomMemberFromPool = (dataPool) => {
  const size = dataPool["validData"].length - 1;
  const arrayIndex = getRandomInt(0,size);
  const data = dataPool["validData"][arrayIndex]
  return {
    fullname: data["person_name"],
    email: data["person_email"],
  };
};

exports.generateInvalidRamdomMemberFromPool = (dataPool) => {
  const size = dataPool["invalidData"].length - 1;
  const arrayIndex = getRandomInt(0,size);
  const data = dataPool["invalidData"][arrayIndex]
  return {
    fullname: data["person_name"],
    email: data["person_email"],
  };
};

exports.generageRandomTextFromPool = (dataPool) => {
  const size = dataPool["ramdom"].length - 1;
  const arrayIndex = getRandomInt(0,size);
  const data = dataPool["ramdom"][arrayIndex]
  return {
    text: data["data"],
  };
}

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