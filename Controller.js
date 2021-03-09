const express=require('express');
const cors=require('cors');
const bodyParser= require('body-parser');
const models=require('./models');
const { response } = require('express');

const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

let usuario=models.Usuario;
let pedido=models.Pedido;
let evento=models.Evento;

app.get('/create', async(req,res)=>{
    let create=await usuario.create({ 
        
        nome: "Thiago", 
        sobrenome: "Ferreira",
        email:"thiagoferreira@gmail.com",
        senha:'123',
        createAt: new Date(),
        updateAt: new Date()
    });

    res.send('Usuário criado com SUCESSO');
})

app.get('/read',async(req,res)=>{
    let read=await usuario.findAll({
        raw:true
    });
    console.log(read);
});

app.get('/update',async(req,res)=>{
    let update=await usuario.findByPk(1).then((response)=>{
        response.nome='Gilmaaar';
        response.sobrenome='Furtadoooo';
        response.email='testeeeee@gmail.com';
        response.senha='updateeee';

        response.save();
    });
});

app.get('/delete',async(req,res)=>{
    usuario.destroy({
        where: {id:2}
    });
});


let port=process.env.PORT || 3000;

app.listen(port,(req,res)=>{
    console.log('SERVIDOR ONLINE');
})