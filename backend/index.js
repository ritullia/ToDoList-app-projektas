import get from './controllers/get.js'
import post from './controllers/post.js'
import put from './controllers/put.js'
import dlt from './controllers/delete.js'
import { readFile, writeFile } from 'fs'
import express from 'express'
import cors from 'cors'

const database = 'database.json'
const app = express()


app.use(cors())

app.use(express.json())

app.use(express.urlencoded({
    extended: false
}))

app.use('/', get)
app.use('/', post)
app.use('/', put)
app.use('/', dlt)

get.get('/', (req, res) => {

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Nepavyko perskaityti failo' })
        } else {
            data = JSON.parse(data)
            res.json({ status: 'success', data })
        }
    })

})


// naujas  /:id routeris
get.get('/:id', (req, res) => {
    let id = req.params.id

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Nepavyko perskaityti failo' })
        } else {
            data = JSON.parse(data)
            const jsonId = data.findIndex((el) => el.id == id)

            if (jsonId === -1) {
                res.json({ status: 'failed', message: 'Nepavyko rasti tokio elemento' })
                return
            }

            res.json({ status: 'success', data: data[jsonId] })
            // console.log(jsonId)
        }

    })


})

post.post('/add-todo', (req, res) => {
    let task = req.body.task

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Nepavyko perskaityti failo' })
            return
        }

        let json = JSON.parse(data)
        let id = json.length > 0 ? json[json.length - 1].id + 1 : 0;

        //Alternatyva auksciau pazymetai eilutei
        // if(json.length > 0)
        //     id = json[json.length - 1].id + 1

        json.push({ id, task, done: false })

        writeFile(database, JSON.stringify(json), 'utf8', err => {
            if (err) {
                res.json({ status: 'failed', message: 'Nepavyko įrašyti failo' })
            } else {
                res.json({ status: 'success', message: 'Įrašas sėkmingai pridėtas' })
            }
        })

    })
})

// naujas /edit-todo/:id routeris
put.put('/edit-todo/:id', (req, res) => {
    let id = req.params.id
    let task = req.body.task

    if (task === undefined) {
        res.json({ status: 'failed', message: 'Neivesta jokia reiksme' })
        return
    }

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Nepavyko perskaityti failo' })
            return
        }
        //Issifruojame json informacija atgal i javascript masyva
        let json = JSON.parse(data)

        const jsonId = json.findIndex((el) => el.id == id)

        if (jsonId === -1) {
            res.json({ status: 'failed', message: 'Nepavyko rasti tokio elemento' })
            return
        }

        json[jsonId].task = task

        let jsonString = JSON.stringify(json)

        writeFile(database, jsonString, 'utf8', (err) => {
            if (err) {
                res.json({ status: 'failed', message: 'Nepavyko įrašyti failo' })
            } else {
                res.json({ status: 'success', message: 'Įrašas sėkmingai paredaguotas' })
            }
        })

    })
})



dlt.delete('/delete-todo/:id', (req, res) => {
    let id = req.params.id

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Nepavyko perskaityti failo' })
            return
        }
        //Issifruojame json informacija atgal i javascript masyva
        let json = JSON.parse(data)

        const jsonId = json.findIndex((el) => el.id == id)

        if (jsonId === -1) {
            res.json({ status: 'failed', message: 'Nepavyko rasti tokio elemento' })
            return
        }

        json.splice(jsonId, 1)

        let jsonString = JSON.stringify(json)

        writeFile(database, jsonString, 'utf8', (err) => {
            if (err) {
                res.json({ status: 'failed', message: 'Nepavyko įrašyti failo' })
            } else {
                res.json({ status: 'success', message: 'Įrašas sėkmingai ištrintas' })
            }
        })

    })
})

dlt.delete('/mass-delete', (req, res) => {
    let ids = req.body.ids

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Nepavyko perskaityti failo' })
            return
        }

        let json = JSON.parse(data)
        let dataArray = []
        json.forEach((value, index) => {
            if (!ids.includes(value.id.toString())) {
                dataArray.push(value)
            }
        })

        //console.log(json)

        let jsonString = JSON.stringify(dataArray)

        writeFile(database, jsonString, 'utf8', (err) => {
            if (err) {
                res.json({ status: 'failed', message: 'Nepavyko įrašyti žinutes' })
            } else {
                res.json({ status: 'success', message: 'Įrašai sėkmingai ištrintas' })
            }
        })

    })

})

put.put('/mark-done/:id', (req, res) => {
    let id = req.params.id

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Nepavyko perskaityti failo' })
            return
        }
        //Issifruojame json informacija atgal i javascript masyva
        let json = JSON.parse(data)

        const jsonId = json.findIndex((el) => el.id == id)

        if (jsonId === -1) {
            res.json({ status: 'failed', message: 'Nepavyko rasti tokio elemento' })
            return
        }

        json[jsonId].done = json[jsonId].done ? false : true

        let jsonString = JSON.stringify(json)

        writeFile(database, jsonString, 'utf8', (err) => {
            if (err) {
                res.json({ status: 'failed', message: 'Nepavyko įrašyti failo' })
            } else {
                res.json({ status: 'success', message: 'Užduotis atlikta' })
            }
        })

    })
})

app.listen(5001, () => {
    console.log('Serveris veikia')
})