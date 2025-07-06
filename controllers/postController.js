import Post from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.status(200).json({
      success: true,
      message: "All posts fetched successfully",
      status: 200,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching posts",
      status: 500,
      error: error.message,
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
        status: 404,
      });
    }

    res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      status: 200,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching post",
      status: 500,
      error: error.message,
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, authorName, content, category, imageUrl } = req.body;

    if (!title || !authorName || !content || !category || !imageUrl) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required: title, authorName, content, category, imageUrl",
        status: 400,
      });
    }

    const post = await Post.create({
      title,
      authorName,
      content,
      category,
      imageUrl,
      author: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      status: 201,
      data: {
        _id: post._id,
        title: post.title,
        authorName: post.authorName,
        content: post.content,
        category: post.category,
        imageUrl: post.imageUrl,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while creating post",
      status: 500,
      error: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
        status: 404,
      });
    }

    if (
      post.author.toString() !== req.user._id.toString() &&
      req.user.role === "user"
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this post",
        status: 403,
      });
    }

    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      status: 200,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while updating post",
      status: 500,
      error: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
        status: 404,
      });
    }

    if (
      post.author.toString() !== req.user._id.toString() &&
      req.user.role === "user"
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this post",
        status: 403,
      });
    }

    await post.deleteOne();
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while deleting post",
      status: 500,
      error: error.message,
    });
  }
};
