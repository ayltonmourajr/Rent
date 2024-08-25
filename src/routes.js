import {Router} from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import SessionController from './controllers/SessionController';
import CarController from './controllers/CarController';
import DashboardController from './controllers/DashboardController';
import ReserveController from './controllers/ReserveController';

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.post('/cars', upload.single('photo') , CarController.store);
routes.get('/cars', CarController.index);
routes.put('/cars/:car_id', upload.single('photo'), CarController.update);
routes.delete('/cars', CarController.destroy);

routes.get('/dashboard', DashboardController.show);

routes.post('/cars/:car_id/reserve',ReserveController.store);
routes.get('/reserves',ReserveController.index);
routes.delete('/reserves/cancel',ReserveController.destroy);


export default routes;

// mongodb+srv://ayltonmjr:ExhMmLhc9x0iviK2@hubnode.xiees.mongodb.net/?retryWrites=true&w=majority&appName=HubNode