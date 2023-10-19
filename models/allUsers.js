import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const allUserSchema = mongoose.Schema({
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
    RewardFor:String,
    By_whom:String,
    OB_No:String,
    PunismentFor:String,
    ByWhome:String,
    OBNo:String,
    CL:String,
    EL:String,
    HPL:String,
    CCL:String,
    Maternity:String,
    Others:String,
    ConductedBy:String,
    DateOfAwardofCertification:String,
    TrainingDetails:String,
    NameOfTrainingInstitute:String,
    Duration:String,
    DateOfCompletion:String,
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