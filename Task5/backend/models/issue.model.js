import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  memberName: {
    type: String,
    required: true,
    trim: true,
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  returnedAt: {
    type: Date,
    default: null,
  },
});

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
