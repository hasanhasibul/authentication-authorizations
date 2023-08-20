import mongoose, { Schema, mongo } from "mongoose";

const tamSchema = new Schema<{ data: number[]; uid: number }>({
  data: [
    {
      type: Number,
    },
  ],
  uid: {
    type: Number,
  },
});

const tamModal = mongoose.model("tam", tamSchema);
export default tamModal