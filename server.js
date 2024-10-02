const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const path = require("path");

//MIDDLEWARE
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(__dirname));

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {
    console.log(req.body);

    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        //secure: false,
        auth: {
            user: "testem834@gmail.com",            
            pass: "Testem.123",            
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    transport
        .sendMail({
            from: req.body.inputEmail,
            to: "testem834@gmail.com",
            //replyTo: "<mail>" // email de terceiro
            subject: `Message from ${req.body.inputEmail}`,
            text: req.body.msg,
            //html: '<p>text for test</p>'
        })
        .then((info) => {
            res.send(info);
        })
        .catch((e) => {
            res.send(e);
        });
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});

// app.listen(process.env.PORT || 3000);