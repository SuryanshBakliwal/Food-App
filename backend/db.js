const mongoose = require("mongoose");

let db_link =
  "mongodb+srv://QuickFood:gff4eOVnBHlbJVFl@cluster0.lziukzq.mongodb.net/QuickFood?retryWrites=true&w=majority";
let mongoDb = async () => {
  await mongoose.connect(
    db_link,
    { useNewUrlParser: true },
    async (err, result) => {
      if (err) console.log(err);
      else {
        console.log("connected");
        const food_items = await mongoose.connection.db.collection(
          "Food_items"
        );
        food_items.find({}).toArray(async function (err, foodItem) {
          if (!err) {
            const food_cat = await mongoose.connection.db.collection(
              "Food_category"
            );
            food_cat.find({}).toArray(function (err, catdata) {
              if (err) console.log(err);
              else {
                global.food_items = foodItem;
                global.food_cat = catdata;
              }
            });
          }
        });
      }
    }
  );
};
module.exports = mongoDb();
