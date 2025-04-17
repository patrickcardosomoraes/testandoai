import os
from dotenv import load_dotenv
from pathlib import Path
import requests
import subprocess
from openai import OpenAI
from datetime import datetime
import unidecode
import re
import time

# Função auxiliar para gerar slug
def slugify(text):
    text = unidecode.unidecode(text.lower())
    return re.sub(r'[^a-z0-9]+', '-', text).strip('-')

# Carrega variáveis de ambiente do arquivo .env
load_dotenv(dotenv_path=Path(".env"))

# Função de geração de post
def gerar_post(titulo, descricao):
    print("🚀 Iniciando geração de post...")
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("❌ API key não encontrada. Verifique o arquivo .env.")
        return
    print("✅ API key carregada com sucesso (oculta por segurança).")

    client = OpenAI(api_key=api_key)
    prompt_usuario = f"Gere um post de blog com SEO e Markdown com base no seguinte título e descrição:\nTítulo: {titulo}\nDescrição: {descricao}"
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Você é um redator especialista em mentalidade, produtividade, saúde e bem-estar."},
            {"role": "user", "content": prompt_usuario}
        ]
    )

    raw_content = response.choices[0].message.content
    print("🔍 Conteúdo retornado:", raw_content)

    texto = raw_content
    slug = slugify(titulo)
    data = datetime.now().strftime("%Y-%m-%d")
    caminho = Path("content/posts")
    caminho.mkdir(parents=True, exist_ok=True)
    imagem_path = f"public/images/{slug}.webp"
    imagem_url = f"/images/{slug}.webp" if os.path.exists(imagem_path) else ""

    arquivo = caminho / f"{slug}-{data}.md"

    with open(arquivo, "w") as f:
        f.write(f"""---
title: "{titulo}"
excerpt: "{descricao}"
date: "{data}"
slug: "{slug}"
image: "{imagem_url}"
tags: ["psicologia", "autossabotagem", "comportamento"]
---

{texto}
""")

    print(f"📝 Post gerado com sucesso: {arquivo}")

def commit_e_push():
    print("📦 Commitando alterações no Git...")
    try:
        subprocess.run(["git", "add", "."], check=True)
        subprocess.run(["git", "commit", "-m", "✨ Novo post gerado automaticamente"], check=True)
        subprocess.run(["git", "push"], check=True)
        print("🚀 Push realizado com sucesso!")
    except subprocess.CalledProcessError:
        print("❌ Erro ao tentar fazer commit ou push. Verifique o status do Git.")