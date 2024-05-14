import express from "express";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import _ from "lodash";
import chalk from "chalk";

const app = express()

app.listen(3002, console.log('vivos....'))
let users = [];

const lista = (array) => {
    let templateLista = `
    <ul>
    `
    array.forEach(user => {
        templateLista += `
        <li>Nombre: ${user.first}, Apellido: ${user.last}, ID: ${user.id}, TimeStamp: ${user.time}, Genero: ${user.gender}</li>
        `
        console.log(chalk.bgWhite.blue(`Nombre: ${user.first}, Apellido: ${user.last}, ID: ${user.id}, TimeStamp: ${user.time}, Genero: ${user.gender}`))
    })
    templateLista += `
    </ul>`
    
    return templateLista;
}

const fetcher = async () => {
    app.get('/usuarios', async (req, res) => {
        const { data } = await axios.get('https://randomuser.me/api')
        const { name: { first, last }, gender } = data.results[0]
        const id = uuidv4().slice(28)
        const time = moment().format('MM, YYYY, hh:mm:ss')
        users.push({ first, last, gender, id, time })
        const usersOrder = _.partition(users, ({ gender }) => gender == 'female');
        console.log(usersOrder[0])
        console.log(usersOrder[0].length)
        console.log(usersOrder[1])
        console.log(usersOrder[1].length)

        let template = `
        <h4>Total Mujeres ${usersOrder[0].length}</h4>
            ${lista(usersOrder[0])}        
        <h4>Total Hombres ${usersOrder[1].length}</h4>
            ${lista(usersOrder[1])}        
        `
        res.send(template)
    })
}

fetcher()