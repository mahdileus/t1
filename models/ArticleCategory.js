import mongoose from "mongoose";
const { Schema } = mongoose;

const articleCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },

    parent: {
      type: Schema.Types.ObjectId,
      ref: "ArticleCategory",
      default: null,
      index: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 500,
    },

    image: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
      index: true,
    },

    level: {
      type: Number,
      default: 0,
      min: 0,
      max: 2,
      index: true,
    },

    metaTitle: {
      type: String,
      default: "",
      trim: true,
      maxlength: 160,
    },

    metaDescription: {
      type: String,
      default: "",
      trim: true,
      maxlength: 320,
    },
  },
  { timestamps: true }
);

articleCategorySchema.index({ parent: 1, sortOrder: 1 });
articleCategorySchema.index({ parent: 1, title: 1 }, { unique: true });

export default mongoose.models.ArticleCategory ||
  mongoose.model("ArticleCategory", articleCategorySchema);
