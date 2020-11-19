let express = require("express");
let userRouter = require("./user");
let postRouter  = require("./post");
let friendRouter = require("./friend");
let app = express();

app.use("/user/",userRouter);
app.use("/post/",postRouter);
app.use("/friend/",friendRouter);

 module.exports = app;
