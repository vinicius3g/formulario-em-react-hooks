const express = require("express");
const server = express();

//configurar servidor para mostrar arquivos estaticos
server.use(express.static("public"))

//habilitar body do formulario 
server.use(express.urlencoded({extended:true}))

//configurar a conexao com banco de dados
const Pool = require('pg').Pool;
//'new' estrutura um novo objeto
const db = new Pool({
    user:'postgres',
    password:'vini159753',
    host:'localhost',
    port:5432,
    database:'preencher_donation'
})

//configurando a template engine 
const nunjucks = require("nunjucks");

nunjucks.configure("./", {
    express: server,
    noCache: true
})

//lista de doadores: Vetor ou array


//configura a exibição da pagina
server.get("/", function(req,res){

    db.query("SELECT * FROM donors", function(err, result) {
        if(err) return res.send("erro de banco de dados.")

        const donors = result.rows;
        return res.render("index.html", {donors})
    })

    
})

server.post("/", function(req, res){
    const name = req.body.name
    const email = req.body.email
    const preencher = req.body.preencher

    if(name == "" || email == "" || preencher == "") {
        return res.send("Todos os campos são obrigatórios.")
    }

//colocar valores dentro do banco de dados
    const query = `
        INSERT INTO donors ("name", "email", "preencher")
        VALUES ($1, $2, $3)`

    const values = [name, email, preencher]

    db.query(query, values, function(err) {
        //fluxo de erro - fluxo idel
        if (err) {
            return res.send ("erro no banco de dados.")
        }else{
            return res.redirect("/")
        } 
    })

})
// ligar o servidor e liberar o acesso a porta 3000
server.listen(3000, function(){
    console.log("servidor iniciado")
})