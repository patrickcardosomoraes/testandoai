import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": "Me diga uma curiosidade sobre saúde mental"}
    ]
)

print("🔍 RESPOSTA DA IA:")
print(response.choices[0].message.content)