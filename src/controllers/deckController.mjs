const decks = {}; // In-memory storage for decks

export const createDeck = (req, res) => {
  const deckId = Math.random().toString(36).substring(2, 10);
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  
  decks[deckId] = suits.flatMap(suit => values.map(value => ({ suit, value })));
  res.status(201).json({ deck_id: deckId });
};

export const shuffleDeck = (req, res) => {
  const { deck_id } = req.params;
  if (!decks[deck_id]) return res.status(404).json({ error: `Deck ${deck_id} not found` });

  let deck = decks[deck_id];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  res.json({ message: "Deck shuffled" });
};

export const getDeck = (req, res) => {
  const { deck_id } = req.params;
  if (!decks[deck_id]) return res.status(404).json({ error: `Deck ${deck_id} not found` });
  
  res.json(decks[deck_id]);
};

export const drawCard = (req, res) => {
  const { deck_id } = req.params;
  if (!decks[deck_id]) return res.status(404).json({ error: `Deck ${deck_id} not found` });

  if (decks[deck_id].length === 0) return res.status(400).json({ error: "No more cards in the deck" });

  res.json(decks[deck_id].pop());
};
