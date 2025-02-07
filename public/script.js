async function fetchAPI(endpoint, method = "GET", body = null) {
  try {
    const options = { method, headers: { "Content-Type": "application/json" } };
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(endpoint, options);
    if (!res.ok) throw new Error((await res.json()).error || "Unknown error");

    return await res.json();
  } catch (err) {
    document.getElementById("output").textContent = `Error: ${err.message}`;
  }
}

//------------Create Deck-----------------------------------------------------------
document.getElementById("createDeck").addEventListener("click", async () => {
  const data = await fetchAPI("/api/decks", "POST");
  document.getElementById("output").textContent = `Deck ID: ${data.deck_id}`;
});

//------------Shuffle Deck-----------------------------------------------------------
document.getElementById("shuffleDeck").addEventListener("click", async () => {
  const deckId = document.getElementById("deckId").value;
  if (!deckId) {
    document.getElementById("output").textContent =
      "Error: Please provide a valid Deck ID.";
    return;
  }
  
  await fetchAPI(`/api/decks/shuffle/${deckId}`, "PATCH");
});

//-------------GET DECK------------------------------------------------------------
document.getElementById("getDeck").addEventListener("click", async () => {
  const deckId = document.getElementById("deckId").value;
  if (!deckId) {
    document.getElementById("output").textContent =
      "Error: Please provide a valid Deck ID.";
    return;
  }

  const data = await fetchAPI(`/api/decks/${deckId}`);
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
});

//---------------Draw Card--------------------------------------------------------
document.getElementById("drawCard").addEventListener("click", async () => {
  const deckId = document.getElementById("deckId").value;
  if (!deckId) {
    document.getElementById("output").textContent =
      "Error: Please provide a valid Deck ID.";
    return;
  }

  const data = await fetchAPI(`/api/decks/${deckId}/card`);
  document.getElementById("output").textContent = JSON.stringify(data);
});
