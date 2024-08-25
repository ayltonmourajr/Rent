import Reserve from "../models/Reserve";
import User from "../models/User";
import Car from "../models/Car";

class ReserveController{

    async index(req, res){
        const { user_id } = req.headers;
        const reserves = await Reserve.find({user: user_id}).populate('car');
        return res.json(reserves);
    }

    async destroy(req, res){
        const { reserve_id } = req.body;
        await Reserve.findByIdAndDelete({ _id: reserve_id });
        return res.json({ message: "Reserve deleted"});
    }

    async store(req, res){
        const { user_id } = req.headers;
        const { car_id } = req.params;
        const { date } = req.body;

        const car = await Car.findById(car_id);
        if(!car) {
            return res.status(400).json({ error: "Car not found"})
        }
        if(car.rent !==true){
            return res.status(400).json({ error: "Car is not for rent"});
        }
        const user = await User.findById(user_id);
        if(String(user._id) === String(car.user)){
            return res.status(401).json({ error: "Rent is not possible"});
        }

        const reserve = await Reserve.create({
            user: user_id,
            car: car_id,
            date
        });

        const populatedReserve = await Reserve.findById(reserve._id).populate('car').populate('user');

        return res.json(populatedReserve);
    }
 
}

export default new ReserveController