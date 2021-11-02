const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")

const app = express()
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/wikiDB")

const articleschema = {
  title: String,
  content: String,
}

const Article = mongoose.model("Article", articleschema)

////////////////Request Targetting all articles////////////////////

app
  .route("/articles")
  .get(function (req, res) {
    Article.find(function (err, foundarticle) {
      if (!err) {
        res.send(foundarticle)
      } else {
        console.log("Error")
      }
    })
  })
  .post(function (req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    })

    newArticle.save(function (err) {
      if (!err) {
        res.send("Successfully added new document in database")
      }
    })
  })
  .delete(function (req, res) {
    Article.deleteMany(function (err) {
      if (!err) {
        res.send("Successfully deleted document")
      }
    })
  })

////////////////Request Targetting all articles////////////////////

////////////////Request Targetting specific articles////////////////////

app.route("/articles/:articleTitle").get(function (req, res) {
  Article.findOne(
    {
      title: req.params.articleTitle,
    },
    function (err, foundArticle) {
      if (foundArticle) {
        res.send(foundArticle)
      } else {
        res.send("No matching article found")
      }
    }
  )
})
////////////////Request Targetting specific articles////////////////////

///////listening/////////
app.listen(3000, function () {
  console.log("Server started successfully at port 3000")
})
