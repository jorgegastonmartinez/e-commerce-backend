import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, require: true, max: 50 },
    price: { type: Number, required: true },
    stock: { type: Number, require: true },
    category: { type: String, require: true, max: 50 },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true}, 
});

productsSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productsCollection, productsSchema);

export default productModel;