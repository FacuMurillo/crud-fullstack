// importamos las dependencias necesarias
const { PrismaClient } = require('@prisma/client/extension'); 
const {prismaclient} = require('./generated/prisma/client');
const express = require('express');
const app = express();
const prisma = new PrismaClient(); // creamos un nuevo objeto de la clase PrismaClient

app.use(express.json()); // middleware para parsear el cuerpo de las solicitudes como JSON
//? middleware es una funcion que se ejecuta entre cliente y la respuesta del servidro  que nos permite comunicar o recibir informacion  
app.listen(3000, () => { // escuchamos en el puerto 3000 
    console.log('Servidor escuchando en el puerto 3000'); //y mandamos un consolelog para ver si esta OK
});

//! Ends Points
//* Crea un nuevo post
app.post('/posts', 
    async (req, res) => { 
    const { titulo, content } = req.body;
    const post = await prisma.post.create({
        data: {
            titulo,
            content
        }
    });
    res.json(post);});
//* Muestra todos los posts
app.get('/posts', async (req, res) => {
    const posts = await prisma.post.findMany();
    res.json(posts);
});
//* Actualiza un post existente
app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, content } = req.body;
    const post = await prisma.post.update({
        where: {
            id
        },
        data: {
            titulo,
            content
        }
    });
    res.json(post);});
//* Elimina un post existente
app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.post.delete({  
        where: {
            id
        }
    });
    res.json({ message: 'Post eliminado' });});

