const express=require('express');
const cors=require('cors');
const bodyParser= require('body-parser');
const models=require('./models');
const app=express();
const jwt = require ('jsonwebtoken');

const SECRET = 'dbdesafiothiago';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

let usuario=models.Usuario;
let pedido=models.Pedido;
let evento=models.Evento;

function verifyJWT(req,res, next){
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) =>{
      if(err) return res.status(401).end();
      req.id = decoded.id;
      next();
    })

}

//Login
app.post('/login',async(req,res)=>{
  
    const id = req.body.name;
    let response=await usuario.findOne({
        where:{email:req.body.name, senha: req.body.password}
    });
    if(response === null){
        res.send(JSON.stringify('errorSenha'))
    }else{
        const token = jwt.sign({id}, SECRET, {expiresIn: 600})
        //res.send(response);
        return res.json({auth: true, token});
    }  

});

//-------------Gerenciamento de Evento------------------

//Busca eventos
app.get('/evento',
async(req,res)=>{
    
    const  eventos = await evento.findAll();
    res.status(200).json(eventos);
    //console.log(eventos);
});

//Busca um só evento
app.get('/evento/:id',async(req,res)=>{
    
  const {id} = req.params;

  const eventos = await evento.findAll({
      where: {
        id: id
      }
    });
  
  res.status(200).send(eventos);
});

//Cria Eventos
app.post('/evento',async(req,res)=>{
    
    const {titulo,desc,tipo,foto,valor} = req.body;
   
    await evento.create({
        titulo: titulo,
        desc: desc,
        tipo: tipo,
        foto: foto,
        valor: valor,
        createAt: new Date(),
        updateAt: new Date()
    })
    res.status(201).send();
});

//Edita Eventos
app.put('/evento/:id',
verifyJWT,
async(req,res)=>{
    
    const {id} = req.params;
    const {titulo,desc,tipo,foto,valor} = req.body;
   
    await evento.update({ 
        titulo: titulo,
        desc: desc,
        tipo: tipo,
        foto: foto,
        valor: valor,
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
app.delete('/evento/:id',
verifyJWT,
async(req,res)=>{
    
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
app.get('/pedido',
verifyJWT,
async(req,res)=>{
    const pedidos = await pedido.findAll();
    res.status(200).json(pedidos);
});

//Busca Um só pedido
app.get('/pedido/:id',async(req,res)=>{
    
  const {id} = req.params;

  const user = await pedido.findAll({
      where: {
        idUsuario: id
      }
    });
  
  res.status(200).send(user);
});

//Cria Pedido
app.post('/pedido/:idUsuario',
verifyJWT,
async(req,res)=>{
    
    const {idEvento,valor,confirmacaopg} = req.body;
    const{idUsuario} = req.params;
    
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
app.put('/pedido/:id',
verifyJWT,
async(req,res)=>{
    
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
app.delete('/pedido/:id',
verifyJWT,
async(req,res)=>{
    
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
app.get('/usuario/',
verifyJWT,
async(req,res)=>{
    
    const  usuarios = await usuario.findAll();
    res.status(200).json(usuarios);
    console.log(usuarios);

});

//Busca Um usuario por ID
app.get('/usuario/:id',
verifyJWT,
async(req,res)=>{
    
    const {id} = req.params;

    const user = await usuario.findAll({
        where: {
          id: id
        }
      });
    
    res.status(200).send(user);
});

//Cria um usuario

app.post('/usuario',
async(req,res)=>{
    
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
app.put('/usuario/:id',
verifyJWT,
async(req,res)=>{
    
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

app.delete('/usuario/:id',
verifyJWT,
async(req,res)=>{
    
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