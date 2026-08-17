const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    link: {
      type: String,
      trim: true,
      default: "",
    },

    clientName: {
      type: String,
      required: true,
      trim: true,
    },

    brandName: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    industry: {
      type: String,
      required: true,
      trim: true,
    },

    projectType: {
      type: String,
      enum: ["website", "shop", "web-app", "cms", "seo", "portfolio", "custom"],
      default: "website",
      index: true,
    },

    technologies: {
      type: [String],
      required: true,
      default: [],
    },

    tags: {
      type: [String],
      required: true,
      default: [],
      index: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    longDescription: {
      type: String,
      required: true,
    },

    challenge: {
      type: String,
      default: "",
    },

    solution: {
      type: String,
      default: "",
    },

    features: {
      type: [String],
      default: [],
    },

    seoTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 70,
    },

    seoDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 170,
    },

    seoKeywords: {
      type: [String],
      default: [],
    },

    canonicalUrl: {
      type: String,
      trim: true,
      default: "",
    },

    ogTitle: {
      type: String,
      trim: true,
      default: "",
    },

    ogDescription: {
      type: String,
      trim: true,
      default: "",
    },

    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },

    mainPicture: {
      type: String,
      required: true,
      trim: true,
    },

    gallery: {
      type: [String],
      default: [],
    },

    imageAlt: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },

    publishedAt: {
      type: Date,
      default: null,
      index: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

projectSchema.index({
  title: "text",
  clientName: "text",
  brandName: "text",
  category: "text",
  industry: "text",
  shortDescription: "text",
  longDescription: "text",
  tags: "text",
  technologies: "text",
  seoKeywords: "text",
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

module.exports = Project;
