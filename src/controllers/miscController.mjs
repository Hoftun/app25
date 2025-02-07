const quotes = [
  "The journey of a thousand miles begins with one step.",
  "Life is what happens when you’re busy making other plans.",
  "The greatest glory in living lies not in never falling, but in rising every time we fall.",
  "The purpose of our lives is to be happy.",
  "In the end, we will remember not the words of our enemies, but the silence of our friends.",
];

export const getPoem = (req, res) => {
  res.send(`
        Roses are red, <br>
        Violets are blue, <br>
        Writing this code <br>
        Is fun to do!
    `);
};

export const getQuote = (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.send(quotes[randomIndex]);
};

export const sumNumbers = (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);

  if (isNaN(a) || isNaN(b)) {
    res.status(400).send("Both parameters must be numbers.");
    return;
  }

  res.send(`The sum of ${a} and ${b} is ${a + b}`);
};
