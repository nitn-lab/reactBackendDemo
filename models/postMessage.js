import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  // title: String,
  // message: String,
  // creator: String,
  // name: String,
  // tags: [String],
  // selectedFile: String,
  // likeCount: {
  //     type: Number,
  //     default: 0
  // },
  // createdAt: {
  //     type: Date,
  //     default: new Date()
  // }
  Name: { type: String, required: true },

  Rank: { type: String, required: true },

  Emp_Code: { type: String, required: true },

  BeltNo: { type: String, required: true },

  PSINo: { type: String, required: true },

  ProfileImg: { type: String, required: true },

  Level: { type: String, required: true },

  Password: { type: String, required: true }, // if rights

  FathersOrHusbandsName: { type: String, required: true },

  Dob: { type: String, required: true },

  Doa: { type: String, required: true },

  EdnQualification: { type: String, required: true },

  Category: { type: String, required: true },

  PermanentAddress: { type: String, required: true },

  PlaceOfPosting: { type: String, required: true },

  From: { type: String, required: true },

  To: { type: String, required: true },

  Duration: { type: String, required: true },
  Posting: [
    {
      placeOfPosting: { type: String, required: true },
      From: { type: String, required: true },
      to: { type: String, required: true },
      duration: { type: String, required: true },
    },
  ],
  Rewards: [
    {
      RewardFor: { type: String, required: true },
      By_whom: { type: String },
      OB_No: { type: String },
    },
  ],
  Punishments: [
    {
      PunismentFor: { type: String },
      ByWhome: { type: String },
      OBNo: { type: String },
    },
  ],

  CL: "String",

  EL: "String",

  HPL: "String",

  CCL: "String",

  Maternity: "String",

  Others: "String",

  ConductedBy: "String",

  DateOfAwardofCertification: "String",

  TrainingDetails: "String",

  NameOfTrainingInstitute: "String",

  Duration: "String",

  DateOfCompletion: "String",
});

var PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
