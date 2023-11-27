import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourUsername = "<create username through api site";
const yourPassword = "<create password through api site>";
const yourAPIKey = "93b1edbd-92b3-44de-9933-699cfa8aa185";
//if api is wrong, use api instructions under the api key section
const yourBearerToken = "746f9c62-8ca3-4b6f-9425-00383c723613";
//to create new token visit token section on site

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
    try {
      const result = await axios.get(API_URL + "/random");
      res.render("index.ejs", {content: JSON.stringify(result.data)});
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

app.get("/basicAuth", async (req, res) => {
    try {
      const result = await axios.get(API_URL + "/all?page=2",
      {},
      {
        auth: {
          username: yourUsername,
          password: yourPassword,
        }, 
      }
    );
      res.render("index.ejs", {content: JSON.stringify(result.data)});
    } catch (error) {
      res.status(404).send(error.message);
    }
});

app.get("/apiKey",async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/filter?score=5",{
      params: {
      score: 5,
      apiKey: yourAPIKey,
      }
    });
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/bearerToken", async(req, res) => {
  try {
    const result = await axios.get(API_URL + "/secrets?id=2",
      {
        headers: { 
          Authorization: `Bearer ${yourBearerToken}` 
        },
      });
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
