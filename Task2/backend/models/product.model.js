import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Electronics", "Grocery", "Clothing", "Books"],
    },
    price: {
      type: Number,
      required: true,
      min: 0.01,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate SKU like SKU-1001 if not provided
productSchema.pre("validate", async function () {
  if (!this.sku) {
    const lastProduct = await mongoose
      .model("Product")
      .findOne({ sku: { $regex: /^SKU-\d+$/ } }, { sku: 1 })
      .sort({ sku: -1 });

    if (lastProduct && lastProduct.sku && lastProduct.sku.startsWith("SKU-")) {
      const lastNum = parseInt(lastProduct.sku.replace("SKU-", ""), 10);
      if (!isNaN(lastNum)) {
        this.sku = `SKU-${lastNum + 1}`;
        return;
      }
    }
    const count = await mongoose.model("Product").countDocuments();
    this.sku = `SKU-${1001 + count}`;
  }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
