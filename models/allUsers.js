import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const allUserSchema = mongoose.Schema({
    email: { type: String},
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
    Posting: [
      {
        placeOfPosting: { type: String},
        From: { type: String},
        to: { type: String},
        duration: { type: String},
        tableData: {id: String}
      },
    ],
    Rewards: [
      {
        RewardFor: { type: String},
        By_whom: { type: String },
        OB_No: { type: String },
        tableData: {id: String}
      },
    ],
    Punishments: [
      {
        PunismentFor: { type: String },
        ByWhome: { type: String },
        OBNo: { type: String },
        tableData: {id: String}
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
        tableData: {id: String}
      },
    ],
    Training: [
      {
        TrainingDetails: { type: String },
        NameOfTrainingInstitute: { type: String },
        DateOfCompletion: { type: String },
        Duration: { type: String },
        tableData: {id: String}
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