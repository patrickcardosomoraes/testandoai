from datetime import datetime
import os
import sys
from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
import random
import json

load_dotenv(dotenv_path=Path(".env"))
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 🔧 Garante que o script 'gerar_post.py' será encontrado corretamente
sys.path.append(os.path.dirname(__file__))

# 🧠 Importa a função principal de geração
from scripts.gerar_post import gerar_post

def gerar_novos_temas():
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "Você é um especialista em marketing de conteúdo, com foco em psicologia, produtividade e alta performance."
            },
            {
                "role": "user",
                "content": (
                    "Gere 3 temas de post de blog com foco em psicologia, produtividade, alta performance e mentalidade positiva. "
                    "Cada um deve ter:\n"
                    "- Título chamativo\n"
                    "- Descrição curta e emocional\n"
                    "Retorne em formato JSON com a estrutura: "
                    "[{\"titulo\": \"...\", \"descricao\": \"...\"}, ...]"
                )
            }
        ]
    )

    conteudo = response.choices[0].message.content.strip()
    try:
        return json.loads(conteudo)
    except json.JSONDecodeError:
        print("⚠️ Erro ao interpretar a resposta da OpenAI. Conteúdo bruto:")
        print(conteudo)
        return []

posts = gerar_novos_temas()

# 🤖 Insere até 2 "errinhos" para parecer texto mais humano
def inserir_errinhos(texto):
    erros = [
        (" por que ", " porque "),
        (" mais ", " mas "),
        (" têm ", " tem "),
        (" está ", " esta "),
        (" é ", " e "),
    ]
    for errado, certo in erros[:2]:
        texto = texto.replace(errado, certo, 1)
    return texto

# 🚀 Gera os posts automaticamente
for post in posts:
    titulo = post["titulo"]
    descricao = inserir_errinhos(post["descricao"])
    gerar_post(titulo, descricao, prompt_imagem="")