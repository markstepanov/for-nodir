const Express = require("express")


const app = Express()
const port = 8000
const cors = require("cors")
const sequelize = require("./db")
const Joi = require("joi")

const notes = [
    {
        "title": "one",
        "body": "1"
    },
    {
        "title": "two",
        "body": "2"
    }
]


app.use(Express.json());
app.use(cors())



app.get('/api/note', async (req,res) => {
    const notes = await sequelize.Note.findAll()
    
    res.json(notes)
})

app.post('/api/note', async (req,res) => {

    const schema = Joi.object({
        text: Joi.string().required(),
        user : Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required()
    })

    let body; 

    try {
        body = await schema.validateAsync(req.body)
    } catch (e){
        return res.status(406).json({
            message: e
        })
    }
    console.log(body)

    const newNote = await sequelize.Note.create(body)


    res.json(newNote)
})





app.listen(port, async () => {

    try {
        await sequelize.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

      console.log(`Example app listening on port ${port}`)
})