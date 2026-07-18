import mongoose from "mongoose";

const { Schema } = mongoose;

const faqSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    answer: {
      type: String,
      required: true,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const oldSlugSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

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

    oldSlugs: {
      type: [oldSlugSchema],
      default: [],
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    content: {
      type: String,
      required: true,
    },

    contentType: {
      type: String,
      enum: ["html", "markdown", "json"],
      default: "html",
    },

    cover: {
      type: String,
      required: true,
      trim: true,
    },

    coverAlt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    coverTitle: {
      type: String,
      default: "",
      trim: true,
      maxlength: 200,
    },

    coverCaption: {
      type: String,
      default: "",
      trim: true,
      maxlength: 300,
    },

    coverWidth: {
      type: Number,
      default: null,
      min: 1,
    },

    coverHeight: {
      type: Number,
      default: null,
      min: 1,
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

    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      default: null,
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
      index: true,
    },

    readingTime: {
      type: Number,
      required: true,
      min: 1,
    },

    wordCount: {
      type: Number,
      default: 0,
      min: 0,
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
      enum: ["draft", "review", "scheduled", "published", "archived"],
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

    scheduledAt: {
      type: Date,
      default: null,
      index: true,
    },

    contentUpdatedAt: {
      type: Date,
      default: null,
    },

    lastReviewedAt: {
      type: Date,
      default: null,
    },

    // Main SEO
    metaTitle: {
      type: String,
      default: "",
      trim: true,
      maxlength: 70,
    },

    metaDescription: {
      type: String,
      default: "",
      trim: true,
      maxlength: 180,
    },

    focusKeyword: {
      type: String,
      default: "",
      trim: true,
      maxlength: 120,
    },

    secondaryKeywords: {
      type: [String],
      default: [],
    },

    searchIntent: {
      type: String,
      enum: ["", "informational", "commercial", "transactional", "navigational"],
      default: "",
    },

    canonicalUrl: {
      type: String,
      default: "",
      trim: true,
    },

    // Robots
    noIndex: {
      type: Boolean,
      default: false,
      index: true,
    },

    noFollow: {
      type: Boolean,
      default: false,
    },

    noArchive: {
      type: Boolean,
      default: false,
    },

    noSnippet: {
      type: Boolean,
      default: false,
    },

    maxSnippet: {
      type: Number,
      default: -1,
    },

    maxImagePreview: {
      type: String,
      enum: ["none", "standard", "large"],
      default: "large",
    },

    maxVideoPreview: {
      type: Number,
      default: -1,
    },

    // Open Graph
    ogTitle: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    ogDescription: {
      type: String,
      default: "",
      trim: true,
      maxlength: 220,
    },

    ogImage: {
      type: String,
      default: "",
      trim: true,
    },

    ogImageAlt: {
      type: String,
      default: "",
      trim: true,
      maxlength: 200,
    },

    ogType: {
      type: String,
      enum: ["article", "website"],
      default: "article",
    },

    // Twitter Card
    twitterTitle: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    twitterDescription: {
      type: String,
      default: "",
      trim: true,
      maxlength: 220,
    },

    twitterImage: {
      type: String,
      default: "",
      trim: true,
    },

    twitterImageAlt: {
      type: String,
      default: "",
      trim: true,
      maxlength: 200,
    },

    twitterCard: {
      type: String,
      enum: ["summary", "summary_large_image"],
      default: "summary_large_image",
    },

    // Sitemap
    includeInSitemap: {
      type: Boolean,
      default: true,
      index: true,
    },

    sitemapPriority: {
      type: Number,
      default: 0.7,
      min: 0,
      max: 1,
    },

    sitemapChangefreq: {
      type: String,
      enum: ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"],
      default: "weekly",
    },

    // Structured Data
    schemaType: {
      type: String,
      enum: ["Article", "BlogPosting", "NewsArticle"],
      default: "BlogPosting",
    },

    seoSchema: {
      type: Schema.Types.Mixed,
      default: {},
    },

    faqs: {
      type: [faqSchema],
      default: [],
    },

    // Internal Linking / Topic Cluster
    relatedArticles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Article",
      },
    ],

    pillarArticle: {
      type: Schema.Types.ObjectId,
      ref: "Article",
      default: null,
      index: true,
    },

    topicCluster: {
      type: String,
      default: "",
      trim: true,
      index: true,
    },

    // Content Audit
    headingCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    imageCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    internalLinkCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    externalLinkCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    seoScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    readabilityScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // Optional language / hreflang
    language: {
      type: String,
      default: "fa",
      trim: true,
      lowercase: true,
      index: true,
    },

    alternateUrls: [
      {
        lang: {
          type: String,
          required: true,
          trim: true,
          lowercase: true,
        },

        url: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// Text Search
articleSchema.index(
  {
    title: "text",
    excerpt: "text",
    content: "text",
    tags: "text",
    focusKeyword: "text",
    secondaryKeywords: "text",
  },
  {
    weights: {
      title: 10,
      focusKeyword: 8,
      tags: 6,
      secondaryKeywords: 5,
      excerpt: 4,
      content: 1,
    },
  }
);

// Listing Indexes
articleSchema.index({ status: 1, publishedAt: -1 });
articleSchema.index({ category: 1, status: 1, publishedAt: -1 });
articleSchema.index({ isFeatured: 1, status: 1, publishedAt: -1 });
articleSchema.index({ authorSlug: 1, status: 1, publishedAt: -1 });
articleSchema.index({ tags: 1, status: 1, publishedAt: -1 });
articleSchema.index({ language: 1, status: 1, publishedAt: -1 });
articleSchema.index({ includeInSitemap: 1, noIndex: 1, status: 1, publishedAt: -1 });

articleSchema.pre("save", function (next) {
  if (!this.metaTitle) {
    this.metaTitle = this.title;
  }

  if (!this.canonicalUrl) {
    this.canonicalUrl = `/articles/${this.slug}`;
  }

  if (!this.ogTitle) {
    this.ogTitle = this.metaTitle || this.title;
  }

  if (!this.ogDescription) {
    this.ogDescription = this.metaDescription || "";
  }

  if (!this.ogImage) {
    this.ogImage = this.cover;
  }

  if (!this.ogImageAlt) {
    this.ogImageAlt = this.coverAlt;
  }

  if (!this.twitterTitle) {
    this.twitterTitle = this.ogTitle || this.metaTitle || this.title;
  }

  if (!this.twitterDescription) {
    this.twitterDescription = this.ogDescription || this.metaDescription || "";
  }

  if (!this.twitterImage) {
    this.twitterImage = this.ogImage || this.cover;
  }

  if (!this.twitterImageAlt) {
    this.twitterImageAlt = this.ogImageAlt || this.coverAlt;
  }

  if (this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  if (this.status === "published" && !this.contentUpdatedAt) {
    this.contentUpdatedAt = this.publishedAt || new Date();
  }

  if (this.noIndex) {
    this.includeInSitemap = false;
  }

  next();
});

export default mongoose.models.Article ||
  mongoose.model("Article", articleSchema);
