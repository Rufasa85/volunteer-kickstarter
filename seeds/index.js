const sequelize = require("../config/connection");
const { Volunteer, Opportunity } = require("../models");

const volunteers = [
  {
    username: "joejoejoe",
    password: "password"
  },
  {
    username: "weAreTheCats",
    password: "iLoveSalmon123"
  },
  {
    username: "otherJoe",
    password: "password1"
  }
];

const opps = [
  {
    title: "help its hot here",
    description: "come to the equator and help keep me cool",
    lattitude: 0,
    longitude: 0,
    date: new Date(),
    volunteersNeeded: 2,
    CreatorId:1
  },
  {
    title: "hang out with cats",
    description: "they need companions",
    lattitude: 47.6101,
    longitude: -122.16,
    date: new Date("06/01/2022"),
    volunteersNeeded: 20,
    CreatorId:1
  }
];

const seedIt = async () => {
  await sequelize.sync({ force: true });
  await Volunteer.bulkCreate(volunteers, {
    individualHooks: true
  });
  const createdOpps = await Opportunity.bulkCreate(opps);
  console.log(createdOpps)
  await createdOpps[1].addAttendee(1);
  await createdOpps[1].addAttendee(2);
  process.exit(0);

};

seedIt();
