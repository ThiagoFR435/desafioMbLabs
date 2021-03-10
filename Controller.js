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

//Login
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

//-------------Gerenciamento de Evento------------------

//Busca eventos
app.get('/evento',async(req,res)=>{
    
    const  eventos = await evento.findAll();
    res.status(200).json(eventos);
    console.log(eventos);
});

//Cria Eventos
app.post('/evento',async(req,res)=>{
    
    const {titulo,desc,tipo,foto} = req.body;
   
    await evento.create({
        titulo: titulo,
        desc: desc,
        tipo: tipo,
        foto: foto,
        createAt: new Date(),
        updateAt: new Date()
    })
    res.status(201).send();
});

//Edita Eventos
app.put('/evento/:id',async(req,res)=>{
    
    const {id} = req.params;
    const {titulo,desc,tipo,foto} = req.body;
   
    await evento.update({ 
        titulo: titulo,
        desc: desc,
        tipo: tipo,
        foto: foto,
        createAt: new Date(),
        updateAt: new Date()
     }, {
        where: {
          id: id
        }
      });
    
    res.status(200).send();
});

//Apaga Eventos
app.delete('/evento/:id',async(req,res)=>{
    
    const {id} = req.params;

    await evento.destroy({
        where: {
          id: id
        }
      });
    
    res.status(200).send();
});
//-------------Gerenciamento de Pedido------------------

//Busca pedidos
app.get('/pedido',async(req,res)=>{
    
    const  pedidos = await pedido.findAll();
    res.status(200).json(pedidos);
    console.log(pedidos);
});

//Cria Pedido
app.post('/pedido/:idUsuario',async(req,res)=>{
    
    const {idEvento,valor,confirmacaopg} = req.body;
    const{idUsuario} = req.params;
    
    console.log(idEvento);
    console.log(idUsuario);
    console.log(valor);
    console.log(confirmacaopg);

    await pedido.create({
        idEvento: idEvento,
        idUsuario: idUsuario,
        valor: valor,
        confirmacaopg: confirmacaopg,
        createAt: new Date(),
        updateAt: new Date()
    })


    res.status(201).send();
});

//Edita pedido
app.put('/pedido/:id',async(req,res)=>{
    
    const{id} = req.params;
    const {idEvento,idUsuario,valor,confirmacaopg} = req.body;
   
    await pedido.update({ 
        idEvento: idEvento,
        idUsuario: idUsuario,
        valor: valor,
        confirmacaopg: confirmacaopg,
        createAt: new Date(),
        updateAt: new Date()
     }, {
        where: {
          id: id
        }
      });
    
    res.status(200).send();
});

//Apaga Pedido
app.delete('/pedido/:id',async(req,res)=>{
    
    const {id} = req.params;

    await pedido.destroy({
        where: {
          id: id
        }
      });
    
    res.status(200).send();
});

//------------------Gerenciamento de Usuario----------------

//Busca Todos usuarios do banco
app.get('/usuario/',async(req,res)=>{
    
    const  usuarios = await usuario.findAll();
    res.status(200).json(usuarios);
    console.log(usuarios);

});

//Busca Um usuario por ID
app.get('/usuario/:id',async(req,res)=>{
    
    const {id} = req.params;

    const user = await usuario.findAll({
        where: {
          id: id
        }
      });
    
    res.status(200).send(user);
});

//Cria um usuario

app.post('/usuario',async(req,res)=>{
    
    const {nome,sobrenome,email,senha} = req.body;
   
    await usuario.create({
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha,
        createAt: new Date(),
        updateAt: new Date()
    })
    res.status(201).send();
});

//Edita um usuario
app.put('/usuario/:id',async(req,res)=>{
    
    const{id} = req.params;
    const {nome,sobrenome,email,senha} = req.body;
   
    await usuario.update({ 
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha,
        createAt: new Date(),
        updateAt: new Date()
     }, {
        where: {
          id: id
        }
      });
    
    res.status(200).send();
});

//Apaga um usuario

app.delete('/usuario/:id',async(req,res)=>{
    
    const {id} = req.params;

    await usuario.destroy({
        where: {
          id: id
        }
      });
    
    res.status(200).send();
});



//Porta 
let port=process.env.PORT || 3000;

app.listen(port,(req,res)=>{
    console.log('SERVIDOR ONLINE');
})