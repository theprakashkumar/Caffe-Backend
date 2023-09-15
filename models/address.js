const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    addresses: [
        {
            name: { type: String, required: "User Must Have Name" },
            street: { type: String, required: "User Must Have Street" },
            city: { type: String, required: "User Must Have City" },
            state: { type: String, required: "User Must Have State" },
            zipCode: { type: Number, required: "User Must Have Zip Code" },
            mobile: { type: Number, required: "User Must Have Mobile" },
        },
    ],
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;
