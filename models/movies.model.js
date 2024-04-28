module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      auteur: String,
      annee :  Number,
      genre: String,
      acteur : String,

    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const movies = mongoose.model("movies", schema);
  return movies;
};
