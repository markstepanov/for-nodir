const Sequelize = require("sequelize")

const DataTypes = Sequelize.DataTypes


const sequelize = new  Sequelize({
        dialect: 'sqlite',
        storage: 'db.db',
    }
)

async function run(){
    await sequelize.sync({force: true})
}



const Note = sequelize.define("notes", {
    text:  {
        type: DataTypes.STRING,
        allowNull: false
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})


const populateData = async () => {
    
    await Note.create({
        "text": "This is a sample note",
        "latitude": 37.42216,
        "longitude": -122.08427,
        "user": "John Doe"
    })


}

if (require.main == module){
    (async ()=>{
        await run()
        await populateData()
    })()

}

module.exports = {
    Note ,
    sequelize
}