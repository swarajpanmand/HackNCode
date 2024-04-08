import spacy
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer

from flask import Flask, render_template

app = Flask(__name__)

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Load GPT-2 model and tokenizer
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")



'''@app.route('/')
def index():
    # Your Python logic goes here
    user_input = input()
    message = generate_story(user_input)

    # Render HTML template with dynamic content
    return render_template('index.html', message=message)

if __name__ == '__main__':
    app.run(debug=True)
'''




def generate_story(user_input):
    # Tokenize the user input
    input_ids = tokenizer.encode(user_input, return_tensors="pt")
    
    # Generate story based on user input
    output = model.generate(input_ids, 
                            max_length=20000, 
                            num_return_sequences=1, 
                            no_repeat_ngram_size=2, 
                            top_k=50, 
                            top_p=0.95, 
                            temperature=0.7, 
                            do_sample=True,
                            pad_token_id=model.config.eos_token_id,  # Setting pad token ID to EOS token ID
                            attention_mask=torch.ones_like(input_ids))  # Setting attention mask
    
    # Decode generated output and return
    return tokenizer.decode(output[0], skip_special_tokens=True)


request = input(">>>>")
story = generate_story(request)

print(story)


