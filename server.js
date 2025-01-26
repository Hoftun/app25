//--------------------------------------------------------------------------------------------------------
const express = require("express"); // Loads the Express library, which is used to create a web server.
const app = express(); //Creates an instance of an Express application

app.use(express.json()); // Adds middleware to parse incomming JSON data in requests

const PORT = 3000; // Specifies that the server will run on port 3000

app.listen(PORT, () => {
  //Starts the server and listenes for incoming requests on port 3000. When the server starts it logs a message indicatin gthe server's URL
  console.log(`Server running on http://localhost:${PORT}`);
});

//---Serve the public folder as static files--------------------------------------------------------------

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

//-----------Add the Endpoint----------------------------------------------------------------

// Object to store decks by ID
const decks = {}; // This decks object acts as in-memory storage, where decks will be stored with unique IDs as keys

//Create a new deck
app.post("/temp/deck", (req, res) => {
  //This decks object acts as in-memory storage, where decks will be stored with unique IDs as keys
  //Generates a Unique Deck ID:
  const deckId = Math.random().toString(36).substring(2, 10); //Creates a random string of 8 characters using Math.random(). This ID is used to uniquely identify each deck.
  //Defines Suits and Values:
  const suits = ["hearts", "diamonds", "clubs", "spades"]; //Lists all possible suits (hearts, diamonds, clubs, spades) ...
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ]; // ...and card values (2 to A).

  // Create a full deck of cards
  const deck = suits.flatMap((suit) =>
    values.map((value) => ({ suit, value })),
  ); //Uses flatMap to combine suits and values into an array of card objects, where each object represents a card with its suit and value.

  // Save the deck in memory
  decks[deckId] = deck; //Saves the deck in the decks object with the generated deckId as the key
  // Respond with the deck ID
  res.status(201).json({ deck_id: deckId }); //Sends a response to the client with status code 201 (Created) and a JSON object containing the deck_id.
});

//-----------Add the Shuffle Endpoint-----------------------------------------------------------------

// Shuffle a deck
app.patch("/temp/deck/shuffle/:deck_id", (req, res) => {
  const { deck_id } = req.params;

  // Check if the deck exists
  if (!decks[deck_id]) {
    return res.status(404).json({ error: `Deck with ID ${deck_id} not found` });
  }

  // Shuffle the deck (Fisher-Yates Shuffle Algorithm)
  const deck = decks[deck_id];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  res.json({ message: "Deck shuffled" });
});

//-----------Add the Get Deck Endpoint--------------------------------------------------------------

// Get a deck by ID
app.get("/temp/deck/:deck_id", (req, res) => {
  const { deck_id } = req.params;

  // Check if the deck exists
  if (!decks[deck_id]) {
    return res.status(404).json({ error: `Deck with ID ${deck_id} not found` });
  }

  res.json(decks[deck_id]); // Return the deck
});

//--------Add the Draw Card Endpoint-------------------------------------------------------------------

// Draw a card from a deck
app.get("/temp/deck/:deck_id/card", (req, res) => {
  const { deck_id } = req.params;

  // Check if the deck exists
  if (!decks[deck_id]) {
    return res.status(404).json({ error: `Deck with ID ${deck_id} not found` });
  }

  const deck = decks[deck_id];

  // Check if there are cards left
  if (deck.length === 0) {
    return res.status(400).json({ error: "No more cards in the deck" });
  }

  const card = deck.pop(); // Remove and return the last card
  res.json(card);
});

//-----Global error handler---------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error to the console
  res
    .status(500)
    .json({
      error: "Something went wrong on the server. Please try again later.",
    });
});

//-----Handle unhandled routes-------------------------------------------------------------
app.use((req, res) => {
  res
    .status(404)
    .json({ error: "Route not found. Please check the URL and try again." });
});
