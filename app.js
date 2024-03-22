const pets = require("./petList");
const path = require("path");

const express = require('express')
const app = express()
const port = 8200


app.set('view engine', 'pug')


app.get('/', (req, res) => {
  res.render(
    path.resolve('index.pug'),
    {
      title: "Pet View",
      pets: pets
    }
  );
})

app.get('/animals/:petCategory/', (req, res) => {
  const {petCategory} = req.params;
  const {sort, language} = req.query;
  try{
    let foundAnimalCategory = Object.keys(pets).find(key => { return key === petCategory })
    if (!foundAnimalCategory)
    { 
      throw new Error('Animal category not found')
    }
  } catch (err) {
    res.send(`<h2>${err}</h2><br><a href="/">Back</a>`)
  }
  res.render(
    path.resolve('animalCategory.pug'),
    {
      title: "Pet View",
      petCategory: petCategory,
      petCategoryPets: pets[petCategory]
    }
  );
})

app.get('/animals/:petCategory/:petName', (req, res) => {
  const {petCategory, petName} = req.params;
  let pet;
  try{
    const foundAnimalCategory = Object.keys(pets).find(key => key === petCategory)
    if (!foundAnimalCategory) throw new Error('Animal category not found')
    const petsFromCategory = pets[petCategory]
    pet = petsFromCategory.find(pet => pet.name === petName)
    if (!pet) throw new Error('Animal not found')

  } catch (err) {
    res.send(`<h2>${err}</h2><br><a href="/">Back</a>`)
  }
  res.render(
    path.resolve('animal.pug'),
    {
      title: "Pet View",
      pet: pet,
      petCategory: petCategory
    }
  );
})

app.get(/^\/.*?$/, (req, res) => {
  res.redirect('/')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




