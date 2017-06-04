
module.exports = function () {
  var Faker = require('faker');
  let i;
  let res = [];
  for (i = 0; i < 100; i++) {
    res.push({
      "protocolId": i,
      "studyName": Faker.hacker.phrase(),
      "studyStatus": Faker.hacker.adjective(),
      "riskPlan": Faker.hacker.noun(),
      "planStatus": Faker.hacker.adjective(),
      "lastUpdated": Faker.date.past(),
      "updatedBy": Faker.date.future()
    });
  }
  return {"studies": res};
};