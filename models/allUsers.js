import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const allUserSchema = mongoose.Schema({
    email: { type: String, required: true },
    Name:String,
    Rank:String,
    EmpCode:{ type : String , unique : true, required : true, dropDups: true },
    BeltNo:{ type : String , unique : true, required : true, dropDups: true },
    PSINo:{ type : String , unique : true, required : true, dropDups: true },
    ProfileImg:String,
    isAdmin:Boolean,
    Level:String,
    Password:{type:String},
    FathersOrHusbandsName:String,
    Dob:{type: Date},
    Doa:{type: Date},
    EdnQualification:String,
    Category:String,
    PermanentAddress:String,
    PlaceOfPosting:String,
    From:String,
    To:String,
    Duration:String,
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
    CL:String,
    EL:String,
    HPL:String,
    CCL:String,
    Maternity:String,
    Others:String,
    Qualification: [
      {
        Course: { type: String },
        ConductedBy: { type: String },
        DateOfAwardofCertification: { type: String },
      },
    ],
    Training: [
      {
        TrainingDetails: { type: String },
        NameOfTrainingInstitute: { type: String },
        DateOfCompletion: { type: String },
        Duration: { type: String },
      },
    ],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

allUserSchema.pre('save', async function (next) {

    if (this.isAdmin) {
      this.Password =  await bcrypt.hash(this.Password, 12);
    }
    else{
        this.Password='Undefined';
    }
    next(); 
  });
var AllUsers = mongoose.model("AllUsers", allUserSchema);



export default AllUsers;