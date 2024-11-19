import express from "express";
const app = express();
const port = 8080;

app.use(express.json());

let teaData = [];
let nextID = 1;

//?  Add a new Tea

app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTeaData = { id: nextID++, name: name, price: price };
  teaData.push(newTeaData);
  res.status(200).send(newTeaData);
});

// ? Get all tea

app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// ? Get a tea with id

app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

// ? Update a tea

app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Not found!");
  }

  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

//? Delete a tea

app.delete("/teas/:id", (req, res) => {
  const teaIndex = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (teaIndex === -1) {
    return res.status(404).send("Not found!");
  }
  teaData.splice(teaIndex, 1);
  return res.status(200).send(teaData, teaIndex , "Success");
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
