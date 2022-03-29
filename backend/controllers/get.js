import express from 'express'
import { readFile } from 'fs'
import { database } from '../config/index.js'

const router = express.Router()

router.get('/', (req, res) => {


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
router.get('/:id', (req, res) => {
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



export default router