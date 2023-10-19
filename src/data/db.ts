import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
    logging: false,
});

export async function connDB() {
    try {
        await sequelize.sync({ alter: true });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
