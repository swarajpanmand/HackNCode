import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load GPT-2 model and tokenizer
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/generate_story", methods=["POST"])
def generate_story():
    data = request.json
    user_input = data["user_input"]

    # Tokenize the user input
    input_ids = tokenizer.encode(user_input, return_tensors="pt")
    
    # Generate story based on user input
    output = model.generate(input_ids, 
                            max_length=200, 
                            num_return_sequences=1, 
                            no_repeat_ngram_size=2, 
                            top_k=50, 
                            top_p=0.95, 
                            temperature=0.7, 
                            do_sample=True,
                            pad_token_id=model.config.eos_token_id,  # Setting pad token ID to EOS token ID
                            attention_mask=torch.ones_like(input_ids))  # Setting attention mask
    
    # Decode generated output and return
    story = tokenizer.decode(output[0], skip_special_tokens=True)
    return jsonify(story)

if __name__ == "__main__":
    app.run(debug=True)

