import tamModal from "./tam.model";

const createTamServices = async (req: Request) => {
  const data = tamModal.create(req.body);
  if (!data) {
    throw Error("creation fail");
  }
  return data;
};

const getTamServices = async () => {
  const data = tamModal.aggregate([
    {
      $unwind: "$data",
    },
    {
      $group: {
        _id: "$data",
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: "$count",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
  if (!data) {
    throw Error("retrive fail");
  }
  return data;
};

export const tamServices = {
  getTamServices,
  createTamServices,
};
