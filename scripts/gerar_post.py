from openai import OpenAI
import os
from datetime import datetime
import requests
from PIL import Image
from io import BytesIO
import re
import unidecode
from dotenv import load_dotenv
from pathlib import Path
import random

load_dotenv(dotenv_path=Path(".env"))
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def slugify(text):
    text = unidecode.unidecode(text.lower())
    return re.sub(r'[^a-z0-9]+', '-', text).strip('-')

def salvar_imagem(image_url, slug):
    os.makedirs("public/results", exist_ok=True)
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content)).convert("RGB")
    img = img.resize((1370, 768))
    nome_arquivo = f"public/results/{slug}.webp"
    img.save(nome_arquivo, "WEBP", quality=80)
    return f"/results/{slug}.webp"

def gerar_imagem(prompt, slug):
    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        n=1
    )
    url = response.data[0].url
    return salvar_imagem(url, slug)

def inserir_errinhos(texto):
    substituicoes = {
        "também": "tambem",
        "mais": "mas",
        "porque": "por que",
        "com": "comh",
        "você": "voce",
        "está": "esta",
        "é": "eh",
    }
    for correto, errado in random.sample(list(substituicoes.items()), k=2):
        texto = texto.replace(correto, errado, 1)
    return texto

def gerar_post(titulo, descricao, prompt_imagem=""):
    slug = slugify(titulo)
    data = datetime.now().strftime("%Y-%m-%d")

    resposta = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": (
                    "Você é um redator especialista em SEO, psicologia e copywriting emocional. "
                    "Crie textos com linguagem humana e inspiradora, escaneáveis, com uso moderado de emojis, "
                    "títulos envolventes, parágrafos curtos, listas quando necessário e links reais (válidos). "
                    "Nada genérico. Use Markdown e gere uma estrutura emocional e confiável."
                )
            },
            {
                "role": "user",
                "content": f"Crie um post com SEO sobre o tema: {titulo}. Use estrutura em Markdown, "
                           f"com subtítulos, emojis, perguntas, frases de impacto e links funcionais de fontes reais."
            }
        ]
    )

    conteudo = inserir_errinhos(resposta.choices[0].message.content)

    prompt_imagem_melhorado = (
        f"A visually inspiring scene related to the topic: '{titulo}'. "
        f"Create a calm, cozy, softly lit environment that visually expresses the idea: '{descricao}'. "
        "Use warm tones, Scandinavian minimalist decor, soft textures like blankets or cushions, "
        "relaxed posture of a person or symbolic composition, realistic style, cinematic lighting, 16:9 aspect ratio"
    )

    caminho_imagem = gerar_imagem(prompt_imagem_melhorado, slug)

    front_matter = f"""---
title: "{titulo}"
excerpt: "{descricao}"
date: "{data}"
slug: "{slug}"
image: "{caminho_imagem}"
tags: ["mentalidade", "psicologia", "autoconhecimento"]
---

"""

    caminho_diretorio = "content/posts"
    os.makedirs(caminho_diretorio, exist_ok=True)
    caminho_post = f"{caminho_diretorio}/{slug}-{data}.md"

    if os.path.exists(caminho_post):
        print(f"⚠️ Post já existe: {caminho_post}")
        return

    with open(caminho_post, "w") as f:
        f.write(front_matter + conteudo)

    print(f"✅ Post salvo: {caminho_post}")
    print(f"🖼️ Imagem salva: public{caminho_imagem}")