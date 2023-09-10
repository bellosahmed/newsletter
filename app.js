const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us12.api.mailchimp.com/3.0/lists/c220424ae8";

    const options = {
        method: "POST",
        auth: "bello1:e837dfffc28947dac7de0f77b60ccdce-us12"
    };

    const request = https.request(url, options, function (respone) {
        respone.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.listen(process.env.PORT || 3000, function () {
    console.log("The server is running in port 3000");
});

// Api Key
// e837dfffc28947dac7de0f77b60ccdce-us12

// list id
// c220424ae8

