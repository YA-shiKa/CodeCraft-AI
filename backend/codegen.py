import os
from dotenv import load_dotenv
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# Load environment variables from .env file
load_dotenv()

# Hugging Face model name and token
MODEL_NAME = "bigcode/starcoderbase-1b"
HF_TOKEN = os.getenv("HF_TOKEN")

# Load tokenizer and model securely
def load_model_and_tokenizer():
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, use_auth_token=HF_TOKEN, trust_remote_code=True)
    model = AutoModelForCausalLM.from_pretrained(MODEL_NAME, use_auth_token=HF_TOKEN, trust_remote_code=True)
    return model, tokenizer

# Initialize model and tokenizer
model, tokenizer = load_model_and_tokenizer()

# Generate code from a given prompt
def generate_code(prompt: str) -> str:
    input_ids = tokenizer(prompt, return_tensors="pt").input_ids
    output = model.generate(
        input_ids,
        max_new_tokens=256,
        temperature=0.7,
        pad_token_id=tokenizer.eos_token_id
    )
    return tokenizer.decode(output[0], skip_special_tokens=True)
