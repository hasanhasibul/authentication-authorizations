import { Request } from "express";
import cowModel from "./cow.modal";
import { paginationHelper } from "../../../helpers";
import { SortOrder } from "mongoose";
import pick from "../../../shared/pick";

const createCowServices = async (req: Request) => {
  const response = await cowModel.create(req.body);
  if (!response) {
    throw new Error("cow created fail");
  }
  return response;
};

const getAllCowServices = async (req: Request) => {
  const { limit, page, skip, searchTerm, sortBy, sortOrder } =
    paginationHelper(req);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: ["location", "breed", "category"].map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  // Filters needs $and to fullfill all the conditions

  const filtersDataByPrice = pick(req.query, ["minPrice", "maxPrice"]);
  if (Object.keys(filtersDataByPrice).length) {
    andConditions.push({
      $and: Object.entries(filtersDataByPrice).map(([field, value]) => {
        if (field === "minPrice") {
          return {
            price: { $gte: value },
          };
        }
        if (field === "maxPrice") {
          return {
            price: { $lte: value },
          };
        }
      }),
    });
  }

  const filtersDataByLocation = pick(req.query, ["location"]);
  if (Object.keys(filtersDataByLocation).length) {
    andConditions.push({
      $and: Object.entries(filtersDataByLocation).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whereConditions: any =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const total = await cowModel.countDocuments();
  const response = await cowModel
    .find(whereConditions)
    .populate("seller")
    .sort(sortConditions)
    .skip(skip)
    .limit(Number(limit));
  if (!response) {
    throw new Error("cow retrived fail");
  }
  return {
    meta: {
      page: page,
      limit: limit,
      count: total,
    },
    response: response,
  };
};

const getSingleCowServices = async (req: Request) => {
  const id = req.params.id;
  const response = await cowModel.findById(id);
  if (!response) {
    throw new Error("cow retrived fail");
  }
  return response;
};
const updateCowServices = async (req: Request) => {
  const id = req.params.id;
  const response = await cowModel.findByIdAndUpdate(id, req.body);
  if (!response) {
    throw new Error("cow updated fail");
  }
  return response;
};

const deleteCowServices = async (req: Request) => {
  const id = req.params.id;
  const response = await cowModel.findOneAndDelete({
    _id: id,
    seller: req.user?.id,
  });
  if (!response) {
    throw new Error("cow deleted fail");
  }
  return response;
};

export const cowServices = {
  createCowServices,
  getAllCowServices,
  getSingleCowServices,
  deleteCowServices,
  updateCowServices,
};
