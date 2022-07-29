const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});

//random quote route
app.get("/api/quotes/random", (req, res, next) => {
  const randomQuote = { quote: getRandomElement(quotes) };

  randomQuote
    ? res.send(randomQuote)
    : res.status(404).send("No random quote!");
});

//gets all the quotes, get quotes by persons name
app.get("/api/quotes", (req, res, next) => {
  if (Object.keys(req.query).length === 0) {
    res.send({ quotes });
  }

  const { person } = req.query;
  const newQuotes = quotes.filter(quote => quote.person === person);
  if (newQuotes.length !== 0) {
    res.send({ quotes: newQuotes });
  } else {
    res.status(404).send("No person with that quote");
  }
});

//add new quotes
app.post("/api/quotes", (req, res, next) => {
  const newQuote = { quote: req.query.quote, person: req.query.person };

  if (req.query.quote !== "" && req.query.person !== "") {
    quotes.push(newQuote);
    res.send({ quote: newQuote });
  } else {
    res.status(400);
  }
});
