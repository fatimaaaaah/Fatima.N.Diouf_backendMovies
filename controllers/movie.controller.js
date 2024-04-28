const db = require("../models");
const Movie = db.movies;

exports.create = function (req, res) {

  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" 
  });
    return   ;
}
  
  
  const movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    auteur: req.body.auteur,
    annee: req.body.annee,
    genre: req.body.genre,
    acteur: req.body.acteur,
  });


  movie.save()
    .then(data => {
      res.status(201).send(data); 
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Oups! Une erreur s'est produite lors de la création du film.Veuillez réessayer.",
      });
    });


}

// Retrieve all Movies from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title
      ? { title: { $regex: new RegExp(title), $options: "i" } }
      : {};
    Movie.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Movies.",
        });
      });
  };
