import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const ifExist = await User.findOne({ email });

    if (!ifExist) return res.status(404).json({ message: "User does not exist" });

    const isPassCorr = await bcrypt.compare(password, ifExist.password);
    if (!isPassCorr) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: ifExist.email, id: ifExist._id },
      process.env.JWT_SECRET || "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: ifExist, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async(req,res)=>{
    const {email, password,firstName,lastName, confirmPassword} =req.body;

    try {
        const ifExist =await User.findOne({email})
        if(ifExist)return res.status(400).json({message:"User exist"})

        if(password !==confirmPassword) 
            return res.status(400).json({message:"Passwords do not match"}) 

        const hashPass =await bcrypt.hash(password,12);

        const result = await User.create({
            email, 
            password:hashPass,
            name:`${firstName} ${lastName}`,
        });

        const token =jwt.sign(
            {email :result.email ,id:result._id},
            process.env.JWT_SECRET || "test",
            {expiresIn:"1h"}
        );

        res.status(200).json({result ,token}) 
    } catch (error) {
         res.status(500).json({message:"something went wrong"})
    }
}
