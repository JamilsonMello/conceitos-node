const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;

  const data = {
    id: uuid(),
    url,
    title,
    techs,
    likes,
  }

  repositories.push(data);

  return response.json(data);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const data = {
    id,
    url,
    title,
    techs
  }

  const index = repositories.findIndex( repository => repository.id === id);

  if (index >= 0) {
    repositories[index] = data;

    return response.json(data);
  } else {
    return response.status(404).json({ error: 'Repository not found' });
  }
  
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex( repository => repository.id === id);

  if (index >= 0) {
    repositories.splice(index, 1);

    return response.json();
  } else {
    return response.status(404).json({ error: 'Repository not found' });
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex( repository => repository.id === id);

  if (index >= 0) {
    repositories[index].likes = repositories[index].likes + 1;

    return response.json(repositories[index].likes);
  } else {
    return response.status(400).json({ error: 'this repository not exist'});
  }

});

module.exports = app;
