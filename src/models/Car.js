import {Schema, get, model} from "mongoose";


const CarSchema = new Schema({
    photo: String,
    name: String,
    model: String,
    year: String,
    color: String,
    fuel: String,
    price: String,
    description: String,
     rent: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    }
});

CarSchema.virtual('photo_url').get(function(){
    return `http://localhost:3333/files/${this.photo}`;
})

export default model('Car', CarSchema);