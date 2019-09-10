const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");

const dialogflow = require("dialogflow");
const uuid = require("uuid");

const app = express();

app.use(cors());
app.use((_, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:9000");
  next();
});
app.use(bodyParser.json());
app.use(logger("dev"));

app.post("/", async (req, res) => {
  console.log(req.body);

  const text = req.body.text;

  if (!text) {
    return res.status(400).send();
  }

  const sessionId = uuid.v4();
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath("hci-joevkw", sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text,
        languageCode: "en-US"
      }
    }
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;

  return res.send(result);
});

app.listen(3000, () => console.log("Listening..."));
