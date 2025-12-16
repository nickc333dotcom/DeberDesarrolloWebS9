const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());   // Parsea JSON en el cuerpo de las solicitudes
app.use(cors());           // Permite solicitudes desde otros orígenes

// Datos en memoria (simula una base de datos simple)
let posts = [
  { id: 1, nombre: "Tutorial de React", tipo: "post" },
  { id: 2, nombre: "Propuesta Temporal de TC39", tipo: "post" },
  { id: 3, nombre: "Nuevo Post", tipo: "post" }
];
let nextId = 4;

// GET /api/posts → listar todos
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// POST /api/posts → crear nuevo
app.post('/api/posts', (req, res) => {
  const { nombre, tipo } = req.body;

  if (!nombre || !tipo) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const nuevo = { id: nextId++, nombre, tipo };
  posts.push(nuevo);
  res.status(201).json(nuevo); // 201 = Created
});

// PUT /api/posts/:id → actualizar
app.put('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, tipo } = req.body;

  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ error: "Post no encontrado" });
  }

  if (!nombre || !tipo) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  post.nombre = nombre;
  post.tipo = tipo;

  res.json(post);
});

// DELETE /api/posts/:id → borrar
app.delete('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Post no encontrado" });
  }

  posts.splice(index, 1);
  res.json({ mensaje: "Post eliminado correctamente" });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
