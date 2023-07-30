import { Model, Sequelize, DataTypes } from 'sequelize';

export default class User extends Model {
    public id?: number;
    public name!: string;
};

export const UserMap = async (sequelize: Sequelize) => {
    try {
        User.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(255)
            },
        }, {
            sequelize,
            tableName: 'users',
            timestamps: false
        });

        await User.sync();
    } catch (error) {
        console.error("Error while initializing User model:", error);
        throw error;
    }
};
