import { RequestHandler } from "express";
import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import { WindData } from "../models/winddata";

export const getAllWindData: RequestHandler = async (req, res, next) => {
  const winddata: WindData[] = await WindData.findAll();
  return res
    .status(200)
    .json({ message: "All Wind Data fetched successfully", data: winddata });
};
export const saveWindData: RequestHandler = async (req, res, next) => {
  var winddata = await WindData.create({ ...req.body });
  return res
    .status(200)
    .json({ message: "Todo created successfully", data: winddata });
};

export const getAverageWindSpeed: RequestHandler = async (req, res, next) => {
  const district = req.query?.district;
  const sourceDirection = req.query?.sourceDirection;
  const destinationDirection = req.query?.destinationDirection;
  //TODO: Between below time range
  const timeStart = req.query?.timeStart;
  const timeEnd = req.query?.timeEnd;

  const winddata = await WindData.findAll({
    attributes: [[Sequelize.fn("avg", Sequelize.col("speed")), "AverageSpeed"]],
    where: {
      district,
      sourceDirection,
      destinationDirection,
      // date: {
      //   [Op.between]: [timeStart, timeEnd],
      // },
    },
  });
  return res
    .status(200)
    .json({ message: "All Wind Data fetched successfully", data: winddata });
};

// select speed from winddata where date between '2022-08-15 00:00:00' and '2022-08-30 00:00:00';

export const getMaxWindSpeed: RequestHandler = async (req, res, next) => {
  //TODO: Determine range and number of occurance
  const maxSpeed = await WindData.findOne({
    attributes: [[Sequelize.fn("max", Sequelize.col("speed")), "MaxSpeed"]],
  });

  const allData = await WindData.findAll();
  let maxSpeed2 = -1;
  allData.forEach((element) => {
    maxSpeed2 = Math.max(Number(maxSpeed2), Number(element.speed));
  });

  const range1 = maxSpeed2 + 5;
  const range2 = maxSpeed2 - 5;
  let count = 0;
  allData.forEach((element) => {
    if (element.speed >= range1 && element.speed <= range2) count++;
  });

  return res.status(200).json({
    message: "All Wind Data fetched successfully",
    data: {
      range1,
      range2,
      count,
      maxSpeed,
    },
  });
};

/*********************BELOW IS USELESS*******************/

export const createToDo: RequestHandler = async (req, res, next) => {
  var winddata = await WindData.create({ ...req.body });
  return res
    .status(200)
    .json({ message: "Todo created successfully", data: winddata });
};

export const deleteToDo: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const deletedTodo: WindData | null = await WindData.findByPk(id);
  await WindData.destroy({ where: { id } });
  return res
    .status(200)
    .json({ message: "Todo deleted successfully", data: deletedTodo });
};

export const getTodoById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const winddata: WindData | null = await WindData.findByPk(id);
  return res
    .status(200)
    .json({ message: "Todo fetched successfully", data: winddata });
};

export const updateTodo: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  await WindData.update({ ...req.body }, { where: { id } });
  const updatedTodos: WindData | null = await WindData.findByPk(id);
  return res
    .status(200)
    .json({ message: "Todo updated successfully", data: updatedTodos });
};
