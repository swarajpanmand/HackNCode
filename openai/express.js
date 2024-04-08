const express = require('express');
const { GPT2Tokenizer, GPT2LMHeadModel } = require('transformers');
const bodyParser = require('body-parser');

const app = express();

// Load GPT-2 model and tokenizer
const tokenizer = GPT2Tokenizer.from_pretrained("gpt2");
const model = GPT2LMHeadModel.from_pretrained("gpt2");

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/generate_story", (req, res) => {
    const user_input = req.body.user_input;

    // Tokenize the user input
    const input_ids = tokenizer.encode(user_input);

    // Generate story based on user input
    model.generate(input_ids, {
        max_length: 200,
        num_return_sequences: 1,
        no_repeat_ngram_size: 2,
        top_k: 50,
        top_p: 0.95,
        temperature: 0.7,
        do_sample: true,
        pad_token_id: model.config.eos_token_id,
        attention_mask: input_ids.map(() => 1) // Setting attention mask
    }).then(output => {
        // Decode generated output and return
        const story = tokenizer.decode(output[0], { skipSpecialTokens: true });
        res.json({ story });
    }).catch(error => {
        console.error("Error generating story:", error);
        res.status(500).json({ error: "Error generating story" });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
