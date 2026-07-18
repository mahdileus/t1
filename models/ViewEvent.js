// models/ViewEvent.js
import mongoose from "mongoose";

const ViewEventSchema = new mongoose.Schema(
  {
    targetType: {
      type: String,
      enum: ["ARTICLE", "PAGE", "PROJECT"],
      required: true,
      index: true,
    },

    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      index: true,
    },

    path: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    title: {
      type: String,
      default: "",
      trim: true,
    },

    referrer: {
      type: String,
      default: "",
      trim: true,
    },

    userAgent: {
      type: String,
      default: "",
    },

    ipHash: {
      type: String,
      default: "",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

ViewEventSchema.index({ createdAt: -1 });
ViewEventSchema.index({ targetType: 1, targetId: 1, createdAt: -1 });
ViewEventSchema.index({ path: 1, createdAt: -1 });

export default mongoose.models.ViewEvent ||
  mongoose.model("ViewEvent", ViewEventSchema);
