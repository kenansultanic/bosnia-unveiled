import { Request, Response } from 'express';
import { Sequelize } from "sequelize";
import express from 'express';
import User, {UserMap} from "../models";



const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("test-test");
});

app.listen(4000, () => {
    console.info(`Server listening on port ${4000}`);
});



const sequelize = new Sequelize('postgres://doypquff:PdeUDsuxhuH5IXj8anHbvjaspu298jh6@trumpet.db.elephantsql.com/doypquff');

async function main() {
    try {
        await sequelize.authenticate();
        await UserMap(sequelize);
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
main();
//radi
app.get('/all-users', async (req: Request, res: Response) => {
    try {
        await UserMap(sequelize);
        const result = await User.findAll();
        res.status(200).json({ users: result });
    } catch (error) {
        console.error("Error while fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//radi
app.get('/user/:id', async (req: Request, res: Response) => {
    try {
        await UserMap(sequelize);
        const id = req.params.id;
        const result = await User.findOne({where: {id: id}});
        res.status(200).json({ users: result });
    } catch (error) {
        console.error("Error while fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//radi
app.delete('/delete/:id',async (req:Request, res: Response)=>{
    try{
        const id = req.params.id;
        await User.destroy({where:{id:id}})
        res.status(200).send("User is deleted.")
    }catch (error){
        console.error("Error while deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


app.put('/edit/:id', async (req: Request, res: Response) => {
    console.log(req.body.name)
    console.log(req.params.id)
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
});

app.post('/add-user', async (req: Request, res: Response) => {
    console.log("o hej", req.body.name)
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
});

