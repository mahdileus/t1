import mongoose from "mongoose";
const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    cover: {
      type: String,
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "ArticleCategory",
      required: true,
      index: true,
    },

    tags: {
      type: [String],
      default: [],
      index: true,
    },

    authorName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    authorSlug: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    readingTime: {
      type: Number,
      required: true,
      min: 1,
    },

    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    commentCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

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

    // SEO
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

    metaKeywords: {
      type: [String],
      default: [],
    },

    canonicalUrl: {
      type: String,
      default: "",
      trim: true,
    },

    seoSchema: {
      type: Schema.Types.Mixed,
      default: {},
    },

    noIndex: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

articleSchema.index({ title: "text", excerpt: "text", content: "text", tags: "text" });
articleSchema.index({ status: 1, publishedAt: -1 });
articleSchema.index({ category: 1, status: 1, publishedAt: -1 });
articleSchema.index({ slug: 1 }, { unique: true });

articleSchema.pre("save", function (next) {
  if (!this.metaTitle) this.metaTitle = this.title;
  if (!this.metaDescription) this.metaDescription = this.excerpt;
  if (!this.metaKeywords?.length) this.metaKeywords = this.tags || [];
  if (!this.canonicalUrl) this.canonicalUrl = `/articles/${this.slug}`;
  if (this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

export default mongoose.models.Article ||
  mongoose.model("Article", articleSchema);
