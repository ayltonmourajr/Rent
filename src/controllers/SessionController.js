
//métodos: index, show, update, store, destroy

import User from '../models/User';



class SessionController{
    async store(req, res){
        const { email } = req.body;
        const {nome} = req.body;

        let user = await User.findOne({email});
        if (!user) {
            user = await User.create({ email, nome});
        }

        return res.json(user);
    }
}

export default new SessionController();