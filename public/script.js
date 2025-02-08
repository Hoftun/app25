async function fetchAPI(endpoint, method = "GET", body = null) {
  try {
    const options = { method, headers: { "Content-Type": "application/json" } };
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(endpoint, options);
    const data = await res.json();
    
    if (!res.ok) throw new Error(data.error || "Unknown error");

    return data;
  } catch (err) {
    displayMessage(`Error: ${err.message}`, "red");
  }
}

// Display messages with color
function displayMessage(message, color = "black") {
  const output = document.getElementById("output");
  output.textContent = message;
  output.style.color = color;
}

// Create Deck
document.getElementById("createDeck").addEventListener("click", async () => {
  const data = await fetchAPI("/api/decks", "POST");
  if (data) displayMessage(`Deck ID: ${data.deck_id}`, "black");
});

// Shuffle Deck
document.getElementById("shuffleDeck").addEventListener("click", async () => {
  const deckId = document.getElementById("deckId").value;
  if (!deckId) return displayMessage("Enter a valid Deck ID!", "red");

  const data = await fetchAPI(`/api/decks/shuffle/${deckId}`, "PATCH");
  if (data) {
    if (data.error) {
      displayMessage(data.error, "red"); // Show error in red
    } else {
      displayMessage("Deck shuffled successfully!", "black"); // Normal message in black
    }
  }
});


// Get Deck
document.getElementById("getDeck").addEventListener("click", async () => {
  const deckId = document.getElementById("deckId").value;
  if (!deckId) return displayMessage("Enter a valid Deck ID!", "red");

  const data = await fetchAPI(`/api/decks/${deckId}`);
  if (data) {
    if (data.error) {
      displayMessage(data.error, "red");
    } else {
      displayMessage(JSON.stringify(data, null, 2), "black");
    }
  }
});

// Draw Card
document.getElementById("drawCard").addEventListener("click", async () => {
  const deckId = document.getElementById("deckId").value;
  if (!deckId) return displayMessage("Enter a valid Deck ID!", "red");

  const data = await fetchAPI(`/api/decks/${deckId}/card`);
  if (data) {
    if (data.error) {
      displayMessage(data.error, "red");
    } else {
      displayMessage(JSON.stringify(data), "black");
    }
  }
});
