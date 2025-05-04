import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
model_name = os.getenv("MODEL_NAME", "gpt-4o")

def get_llm(flow: str, agent: str):
    def call(messages: list[dict]):
        response = client.chat.completions.create(
            model=model_name,
            messages=messages,
            temperature=0
        )
        return response.choices[0].message.content
    return call
