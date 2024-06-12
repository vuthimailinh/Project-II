import sequelize from "../../configs/sequelize";

async function testConnection() {
    try {
        // Authenticate the connection
        await sequelize.authenticate();
        console.log("Connection to database successful");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    } finally {
        // Close the Sequelize connection
        await sequelize.close();
    }
}

export default testConnection;
