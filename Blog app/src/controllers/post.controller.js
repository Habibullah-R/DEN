import Post from "../models/post.model.js";
import ApiError from "../utills/ApiError.js";
import asyncHandler from "../utills/AsyncHandler.js";
import ApiResponse from "../utills/ApiResponse.js";
import uploadFile from "../utills/cloudinary.js";

export const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;


  if (!title || !content || content==="") {
    throw new ApiError(401, "All fields are required.");
  }

  const imageLocalePath = req.file?.path;
  
  if (!imageLocalePath) {
    throw new ApiError(400, "Image is required.");
  }
  
  const slug = title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");


  const uploadedImage = await uploadFile(imageLocalePath);

  const newPost = await Post.create({
    title,
    content,
    slug,
    image: uploadedImage?.url,
    userId: req.user?._id,
  });

  const createdPost = await Post.findById(newPost._id);

  return res
    .status(201)
    .json(
      new ApiResponse(200, { post: createdPost }, "Post created successfully.")
    );
});

export const getCurrentUserPosts = asyncHandler(async (req, res) => {
  const myPosts = await Post.find({ userId: req.user?._id });
  return res
    .status(201)
    .json(
      new ApiResponse(200, { posts: myPosts }, "Posts fetched successfully")
    );
});

export const deleteCurrentPost = asyncHandler(async (req, res) => {
  if (String(req.user?._id) !== req.params.userId) {
    throw new ApiError(401, "unauthorised Access");
  }

  const deletedPost = await Post.findByIdAndDelete(req.params.postId);

  if (!deletedPost) {
    throw new ApiError("400", "something went wrong while deleting post");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, {}, "Post deleted Successfully."));
});

export const getAllPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1;
  const skip = (page - 1) * limit;
  const count = await Post.countDocuments({});
  const allPosts = await Post.find().sort({ createdAt: -1 , _id:1 }).skip(skip).limit(limit).exec();


  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { posts: allPosts , count },
        "All posts fetched successfully."
      )
    );
});

export const updateImage = asyncHandler(async (req, res) => {
  const imageLocalePath = req.file?.path;

  if (!imageLocalePath) {
    throw new ApiError(400, "Image is required.");
  }

  const uploadedFile = await uploadFile(imageLocalePath);

  if (!uploadedFile) {
    throw new ApiError(500, "Something went wrong while uploading avatar.");
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.postId,
    {
      $set: {
        image: uploadedFile?.url,
      },
    },
    {
      $new: true,
    }
  );
  return res
    .status(201)
    .json(
      new ApiResponse(200, { posts: updatedPost }, "Image updated successfully")
    );
});

export const updateContent = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    throw new ApiError(400, "All field are required.");
  }

  const existingPost = await Post.findById(req.params.postId);

  let slug;
  if (title !== existingPost.title) {
    slug = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, " ");
  } else {
    slug = existingPost.slug;
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.postId,
    {
      $set: {
        title,
        content,
        slug,
      },
    },
    {
      $new: true,
    }
  );

  return res
    .status(201)
    .json(
      new ApiResponse(200, { posts: updatedPost }, "Post updated successfully")
    );
});


export const getPostBySlug = asyncHandler(async(req,res)=>{
  const slug = req.params.postSlug;
  const post = await Post.findOne({slug:slug});

  if(!post){
    throw new ApiError(400,"Post does not exist Or not available.")
  }

  return res.status(201).json(
    new ApiResponse(200,{posts:post},"Fetched successfully.")
  )
})
