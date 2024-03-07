const Express = require("express")


const app = Express()
const port = 8000
const cors = require("cors")

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



app.get('/api/note', (req,res) => {
    res.json(notes)
})

app.post('/api/note', (req,res) => {
    notes.push(req.body)
    res.json(req.body)
})





app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
})