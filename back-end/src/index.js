//Conceitos API-REST

const express = require("express") //importamos

const cors = require("cors") //importamos

const app = express() //atribuímos as funções a variável
const { uuid } = require("uuidv4")



app.use(cors())
app.use(express.json())


//query params(listar, filtrar as minhas informações)
//route params(identificar recursos -> atualizar e deletar)
//request body(criar ou editar um recurso -> JSON)

const projetos = []

app.get('/projeto', (request, response) => {
    const {title} = request.query

    const resultados = title 
        ? projetos.filter(projeto => projeto.title.includes(title))
        : projetos

    return response.json(resultados)
 })
 
app.post('/projeto', (request, response)=>{
    const {title, dev} = request.body
    const projeto = {id: uuid(), title, dev}

    projetos.push(projeto)

    return response.json(projeto)
})

app.put('/projeto/:id', (request, response) => {  
    const {id} = request.params
    const {title, dev} = request.body

    const projectIndex = projetos.findIndex(project => project.id === id)

    if(projectIndex < 0){
        return response.status(400).json({error: "Projeto não encontrado"})
    }
    // [1projeto:id=1, 2projeto:id=2, 3projeto:id=3]
    //       0              1              2

    const projeto = {
        id,
        title,
        dev
    }

    projetos[projectIndex] = projeto

    return response.json(projeto)
})
//http://localhost:3333/projeto/4

app.delete('/projeto/:id', (request, response) => {
    const {id} = request.params

    const projectIndex = projetos.findIndex(project => project.id === id)

    if(projectIndex < 0){
        return response.status(400).json({error: "Projeto não encontrado"})
    }
    projetos.splice(projectIndex, 1)

    return response.status(204).send()
})

app.listen(3333, () => {
    console.log("Back-end started")
})