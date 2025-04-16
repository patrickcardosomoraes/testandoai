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

# 🔐 Carrega variável de ambiente
load_dotenv(dotenv_path=Path(".env"))
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 🔤 Gera slug baseado no título
def slugify(text):
    text = unidecode.unidecode(text.lower())
    return re.sub(r'[^a-z0-9]+', '-', text).strip('-')

def salvar_imagem(image_url, slug):
    os.makedirs("public/images", exist_ok=True)
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content)).convert("RGB")
    img = img.resize((1370, 768))
    nome_arquivo = f"public/images/{slug}.webp"
    img.save(nome_arquivo, "WEBP", quality=80)
    return f"/images/{slug}.webp"  # ✅ Caminho correto

# 🧠 Gera imagem via DALL·E
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

# 🧩 Insere errinhos para parecer mais humano
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

# 🚀 Gera o post completo (texto + imagem + .md)
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
    f"A cinematic, emotionally powerful scene illustrating the topic: '{titulo}'. "
    f"The visual should express the idea: '{descricao}' using warm light, cozy textures, and a peaceful mood. "
    "Include soft blankets, cushions, minimalist Scandinavian decor, and a calm environment. "
    "The composition should feel intimate, with natural lighting and subtle symbolic elements. "
    "Style: ultra-realistic, soft focus, editorial photo, 16:9 format."
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

    BASE_DIR = Path(__file__).resolve().parent.parent
    caminho_diretorio = BASE_DIR / "content/posts"
    caminho_diretorio.mkdir(parents=True, exist_ok=True)
    caminho_post = caminho_diretorio / f"{slug}-{data}.md"

    if caminho_post.exists():
        print(f"⚠️ Post já existe: {caminho_post}")
        return

    with open(caminho_post, "w") as f:
        f.write(front_matter + conteudo)

    print(f"✅ Post salvo: {caminho_post}")
    print(f"🖼️ Imagem salva: public{caminho_imagem}")