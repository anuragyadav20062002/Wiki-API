const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")

const app = express()
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"))

mongoose.connect("mongod://localhost:27017/wikiDB", { userNewParser: true })

const articleschema = {
  title: String,
  content: String,
}

const Article = mongoose.model("Article", articleschema)

///////listening/////////
app.listen(3000, function () {
  console.log("Server started successfully at port 3000")
})
