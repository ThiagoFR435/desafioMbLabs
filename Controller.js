const express=require('express');
const cors=require('cors');
const bodyParser= require('body-parser');
const models=require('./models');
const { response } = require('express');
const { useReducer } = require('react');

const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

let usuario=models.Usuario;
let pedido=models.Pedido;
let evento=models.Evento;

app.post('/login',async(req,res)=>{
    let response=await usuario.findOne({
        where:{nome:req.body.name, senha: req.body.password}
    });
    if(response === null){
        res.send(JSON.stringify('errorSenha'))
    }else{
        res.send(response);
    }  
});


let port=process.env.PORT || 3000;

app.listen(port,(req,res)=>{
    console.log('SERVIDOR ONLINE');
})