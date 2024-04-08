const express = require('express');
const { GPT2Tokenizer } = require('transformers');
const { GPT2LMHeadModel } = require('transformers');
const bodyParser = require('body-parser');

const app = express();

// Load GPT-2 tokenizer
const tokenizer = new GPT2Tokenizer();

// Load GPT-2 model (ensure model files are downloaded)
const model = new GPT2LMHeadModel();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/generate_response", async (req, res) => {
  const userMessage = req.body.message;

  // Tokenize user message with special tokens
  const inputIds = tokenizer.encode(userMessage, { addSpecialTokens: true, padToMax: true });

  try {
    // Generate response based on user message
    const output = await model.generate(inputIds, { max_length: 100 });
    const response = tokenizer.decode(output[0], { skipSpecialTokens: true });

    res.json({ response });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Error generating response" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
