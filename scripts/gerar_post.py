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

# Carrega variáveis de ambiente do .env na raiz
load_dotenv(dotenv_path=Path(".env"))

# Inicializa cliente OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# === FUNÇÕES ===

def slugify(text):
    text = unidecode.unidecode(text.lower())
    return re.sub(r'[^a-z0-9]+', '-', text).strip('-')

def escolher_prompt_visual(titulo, descricao):
    tema = (titulo + " " + descricao).lower()
    if any(palavra in tema for palavra in ["criança", "infância", "marshmallow", "experimento"]):
        return (
            "A group of 5 joyful children sitting at a rustic wooden table, eating cookies and smiling, natural lighting from a nearby window, warm tones, cozy atmosphere, shallow depth of field, realistic style, documentary photography aesthetic, cinematic mood, soft textures, 16:9 aspect ratio"
        )
    elif any(palavra in tema for palavra in ["saúde mental", "autocuidado", "emoções", "relaxar"]):
        return (
            "A calm Scandinavian room with soft ambient lighting, a cozy blanket on a couch, someone knitting or journaling, neutral warm tones, minimalistic design, soft textures, sunlight filtering through a window, 16:9 aspect ratio"
        )
    elif any(palavra in tema for palavra in ["crescimento", "autoconhecimento", "mentalidade", "sucesso"]):
        return (
            "A focused individual journaling or working in a serene study room, motivational quotes on the wall, soft backlight, organized desk, plants, warm tones, cinematic lighting, inspirational vibe, realistic style, 16:9 aspect ratio"
        )
    elif any(palavra in tema for palavra in ["trabalho", "produtividade", "multitarefa", "escritório"]):
        return (
            "A modern minimalistic workspace, a person working with focus on a laptop, notebooks around, a clock on the wall, sunlight entering from the side, neutral colors, realistic photography, cinematic soft shadows, 16:9 aspect ratio"
        )
    elif any(palavra in tema for palavra in ["natureza", "plantas", "vida", "verde"]):
        return (
            "A peaceful natural setting with plants and sunlight, symbolic objects like glass jars with sprouts, earthy tones, realistic style, soft light, minimal composition, hopeful and clean aesthetic, 16:9 aspect ratio"
        )
    else:
        return (
            f"A visually inspiring scene related to the topic: '{titulo}'. Create a calm, cozy, softly lit environment that visually expresses the idea: '{descricao}'. Use warm tones, Scandinavian minimalist decor, soft textures like blankets or cushions, relaxed posture of a person or symbolic composition, realistic style, cinematic lighting, 16:9 aspect ratio"
        )

def salvar_imagem(image_url, slug):
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content)).convert("RGB")
    img = img.resize((1370, 768))  # ✅ tamanho ideal para blog
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

def gerar_post(titulo, descricao, prompt_imagem):
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
                    "O estilo deve seguir o seguinte modelo: markdown organizado, emocional, com frases curtas "
                    "e linguagem empática. Gere uma estrutura que prende a atenção e inspira, com toques motivacionais. "
                    "Nada genérico, tudo bem escrito e com base científica sempre que possível."
                )
            },
            {
                "role": "user",
                "content": f"Crie um post com SEO sobre o tema: {titulo}. Use estrutura em Markdown, "
                           f"com subtítulos, emojis, perguntas, frases de impacto e links funcionais de fontes reais."
            }
        ]
    )

    conteudo = resposta.choices[0].message.content

    # Aplica prompt visual baseado no tema do post
    prompt_imagem_melhorado = escolher_prompt_visual(titulo, descricao)
    caminho_imagem = gerar_imagem(prompt_imagem_melhorado, slug)

    # Cria front matter
    front_matter = f"""---
title: "{titulo}"
excerpt: "{descricao}"
date: "{data}"
slug: "{slug}"
image: "{caminho_imagem}"
tags: ["mentalidade", "psicologia", "autoconhecimento"]
---

"""

    caminho_diretorio = "posts"
    os.makedirs(caminho_diretorio, exist_ok=True)

    caminho_post = f"{caminho_diretorio}/{slug}-{data}.md"
    with open(caminho_post, "w") as f:
        f.write(front_matter + conteudo)

    print(f"✅ Post gerado: {caminho_post}")
    print(f"🖼️ Imagem salva em: public{caminho_imagem}")

# === EXECUÇÃO DE LOTE COM TEMAS DINÂMICOS ===
posts_de_hoje = [
    {
        "titulo": "O experimento que mostrou como as crianças enxergam o futuro",
        "descricao": "Descubra o que a ciência aprendeu observando a paciência infantil — e como isso revela muito sobre o sucesso na vida adulta."
    },
    {
        "titulo": "Multitarefa está acabando com sua produtividade? Veja o que dizem os neurocientistas",
        "descricao": "Fazer várias coisas ao mesmo tempo pode parecer eficaz — mas o cérebro humano não foi feito pra isso. Saiba o que a ciência revela."
    },
    {
        "titulo": "Como 10 minutos de natureza por dia podem transformar seu humor",
        "descricao": "Você não precisa mudar de vida — só se reconectar com o básico. Veja como um pouco de sol, verde e respiração consciente impactam seu cérebro."
    }
]

for post in posts_de_hoje:
    gerar_post(
        titulo=post["titulo"],
        descricao=post["descricao"],
        prompt_imagem=""  # Dinâmico com base no título/descrição
    )
