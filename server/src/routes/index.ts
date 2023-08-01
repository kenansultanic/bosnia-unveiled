import { Router } from "express";
import { addUser, deleteUser, editUser, getAllUsers, getUser } from "../controllers";

const router = Router();

router.get('/all-users', getAllUsers);

router.get('/user/:id', getUser);

router.delete('/delete/:id', deleteUser)

router.put('/edit/:id', editUser);

router.post('/add-user', addUser);

export default router;