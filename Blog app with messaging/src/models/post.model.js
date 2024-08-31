import { Schema , model} from "mongoose";

const postSchema = new Schema({
    userId : {
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})

const Post = model("Post",postSchema);

export default Post;