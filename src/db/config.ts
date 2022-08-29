import { DistrictData } from "./../models/districtdata";
import { Sequelize } from "sequelize-typescript";
import { WindData } from "../models/winddata";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "root",
  database: "brillio",
  logging: false,
  models: [WindData, DistrictData],
});

export default connection;
