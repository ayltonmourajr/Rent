import Car from "../models/Car";

class CarController{

    async index(req, res){
        const {rent} = req.query;
        
        const cars = await Car.find({rent});
        return res.json( cars);
    }

    async store(req, res){
        const { filename } = req.file;
        const { name, model, year, color, fuel, price, description, rent } = req.body;
        const { user_id } = req.headers;

        const car = await Car.create({
            user: user_id,
            photo: filename,
            name,
            model,
            year,
            color,
            fuel,
            price,
            description,
            rent
        });

        return res.json({ car });
    }
    
    async update(req, res){
        const { car_id } = req.params;
        const { filename } = req.file;
        const { name, model, year, color, fuel, price, description, rent } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const cars = await Car.findById(car_id);

        if(String(user.id) !== String(car_id)){
            return res.status(401).json({error: 'Não autorizado.'})
        }
 
        await Car.updateOne({_id: car_id}, {
            user: user_id,
            photo: filename,
            name,
            model,
            year,
            color,
            fuel,
            price,
            description,
            rent
        });
        
        return res.json({cars});
    }
    
    async destroy(req, res){
        const { car_id } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const cars = await Car.findById(car_id);

        if(String(user.id) !== String(car_id)){
            return res.status(401).json({error: 'Não autorizado.'})
        }

        await Car.findByIdAndDelete({ _id: car_id})

        return res.json({message: "Excluída com sucesso!"});
    }
}

export default new CarController();