import mongoose from "mongoose";
const connectdb = async (req, res) => {   
    try {
        
        const connection = await mongoose.connect(
          "mongodb+srv://nitin-event-app:nitinevent123@cluster0.d3h0d.mongodb.net/"
        );
        console.log("Connected to MongoDB", connection);
    }
    catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }   
}
export default connectdb;