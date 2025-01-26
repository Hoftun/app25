//------------Create Deck-----------------------------------------------------------
document.getElementById("createDeck").addEventListener("click", async () => {
  try {
    const res = await fetch("/temp/deck", { method: "POST" });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(
        error.error || "Unknown error occurred while creating the deck",
      );
    }

    const data = await res.json();
    document.getElementById("output").textContent = `Deck ID: ${data.deck_id}`;
  } catch (err) {
    document.getElementById("output").textContent = `Error: ${err.message}`;
  }
});
//------------Shuffle Deck-----------------------------------------------------------
document.getElementById("shuffleDeck").addEventListener("click", async () => {
  const deckId = document.getElementById("deckId").value;

  // Check if deckId is been inputted
  if (!deckId) {
    document.getElementById("output").textContent =
      "Error: Please provide a valid Deck ID.";
    return;
  }

  try {
    const res = await fetch(`/temp/deck/shuffle/${deckId}`, {
      method: "PATCH",
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(
        error.error || "Unknown error occurred while shuffling the deck",
      );
    }

    const data = await res.json();
    document.getElementById("output").textContent = JSON.stringify(data);
  } catch (err) {
    document.getElementById("output").textContent = `Error: ${err.message}`;
  }
});
//-------------GET DECK------------------------------------------------------------
document.getElementById("getDeck").addEventListener("click", async () => {
  const deckId = document.getElementById("deckId").value;

  // Check if deckId is been inputted
  if (!deckId) {
    document.getElementById("output").textContent =
      "Error: Please provide a valid Deck ID.";
    return;
  }

  try {
    const res = await fetch(`/temp/deck/${deckId}`);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(
        error.error || "Unknown error occurred while getting the deck",
      );
    }

    const data = await res.json();
    document.getElementById("output").textContent = JSON.stringify(
      data,
      null,
      2,
    );
  } catch (err) {
    document.getElementById("output").textContent = `Error: ${err.message}`;
  }
});
//---------------Draw Card--------------------------------------------------------
document.getElementById("drawCard").addEventListener("click", async () => {
  const deckId = document.getElementById("deckId").value;

  // Check if deckId is been inputted
  if (!deckId) {
    document.getElementById("output").textContent =
      "Error: Please provide a valid Deck ID.";
    return;
  }

  try {
    const res = await fetch(`/temp/deck/${deckId}/card`);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(
        error.error || "Unknown error occurred while Drawing a card",
      );
    }

    const data = await res.json();
    document.getElementById("output").textContent = JSON.stringify(data);
  } catch (err) {
    document.getElementById("output").textContent = `Error: ${err.message}`;
  }
});
