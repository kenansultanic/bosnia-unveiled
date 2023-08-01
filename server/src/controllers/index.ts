import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import User, { UserMap } from "../models";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        //await UserMap(sequelize);
        const result = await User.findAll();
        res.status(200).json({ user: result });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        //await UserMap(sequelize);
        const id = req.params.id;
        const result = await User.findOne({where: {id: id}});
        res.status(200).json({ users: result });
    } catch (error) {
        console.error("Error while fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteUser = async (req:Request, res: Response)=>{
    try{
        const id = req.params.id;
        await User.destroy({where:{id:id}})
        res.status(200).send("User is deleted.")
    }catch (error){
        console.error("Error while deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const editUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const name = req.body.name;

        // Update the user's information
        await User.update({ name : name }, {where:{id:id}});

        return res.status(200).json({ message: 'User updated successfully.' });
    } catch (error) {
        console.error('Error while editing user: ', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

export const addUser = async (req: Request, res: Response) => {
    try {
        const newUser = {
            name: req.body.name
        }
        const user = await User.create(newUser)
        res.status(200).send(user)
    } catch (error) {
        console.log("Error while adding new user: ", error);
        res.status(500).json({ error: "Internal server error"});
    }
};