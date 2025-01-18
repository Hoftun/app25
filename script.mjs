import express from 'express';
import HTTP_CODES from './utils/httpCodes.mjs';

// Set up Express
const app = express();
const port = process.env.PORT || 8000;

// Set port and static folder
app.set('port', port);
app.use(express.static('public'));

// Define the root route ("/")
function getRoot(req, res, next) {
    res.status(HTTP_CODES.SUCCESS.OK).send('Hello World').end();
}
app.get('/', getRoot);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

//-----------------------------------------NY KODE------------------------------------------------------------------------

// Add the "/tmp/poem" route
app.get('/tmp/poem', (req, res) => {
    res.send(`
        Roses are red, <br>
        Violets are blue, <br>
        Writing this code <br>
        Is fun to do!
    `);
});

// Add the "/tmp/quote" route with 5 random quotes
const quotes = [
    "The journey of a thousand miles begins with one step.",
    "Life is what happens when you’re busy making other plans.",
    "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "The purpose of our lives is to be happy.",
    "In the end, we will remember not the words of our enemies, but the silence of our friends."
];

app.get('/tmp/quote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.send(quotes[randomIndex]);
});

//Legg til koden for "/tmp/sum/a/b":
app.post('/tmp/sum/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a); // converts "a" to a number
    const b = parseFloat(req.params.b); // converts "b" to a number

    //check if both parameters are valid numbers
    if (isNaN(a) || isNaN(b)) {
        res.status(400).send("Both parameters must be numbers.");
        return;
    }
    //calculate and return the sum
    res.send(`The sum of ${a} and ${b} is ${a + b}`);
});


