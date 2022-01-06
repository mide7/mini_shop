import mongoose from "mongoose"

function connect() {
    const dbUri = process.env.DBURI

    return mongoose
        .connect(dbUri)
        .then(() => {
            console.log("Database connected!")
        })
        .catch((error) => {
            console.error("db error: ", error)
            process.exit(1)
        })
}

export default connect