import { DataTypes } from "sequelize";
import { sequelize } from "../db";

const Password = sequelize.define("Password", {
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Password;
