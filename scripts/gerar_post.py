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
    prompt_usuario = (
        "Você é um redator profissional especializado em mentalidade, produtividade, saúde mental e bem-estar. "
        "Escolha um tema atual e muito relevante aleatoriamente entre esses tópicos e escreva um post de blog completo e envolvente em português, em formato Markdown. "
        "O texto deve ter título chamativo, subtítulos com emojis, listas, citação com >, e uma conclusão com chamada para salvar ou compartilhar. "
        "Escreva de forma escaneável, emocional e inspiradora. "
        "Adicione até 2 pequenos erros de português propositalmente para parecer mais humano."
    )
    print("⏳ Enviando requisição para OpenAI...")
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Você é um redator especialista em mentalidade, produtividade, saúde e bem-estar."},
                {"role": "user", "content": prompt_usuario}
            ],
            timeout=15
        )
        print("✅ Resposta recebida!")
    except Exception as e:
        print(f"❌ Erro ao tentar gerar post com a OpenAI: {e}")
        return

    if not response.choices or not response.choices[0].message.content:
        print("⚠️ Nenhum conteúdo retornado pela OpenAI. Verifique sua chave de API ou o modelo utilizado.")
        return

    raw_content = response.choices[0].message.content
    
    print("\n📄 Conteúdo gerado pela IA:\n")
    print(raw_content)
    print("🔍 Conteúdo retornado com sucesso. Gerando post...")
    linhas = raw_content.strip().split("\n")
    titulo_extraido = ""
    for linha in linhas:
        if linha.strip().startswith("# "):
            titulo_extraido = linha.strip("# ").strip()
            break
    descricao_extraida = next((linha for linha in linhas if linha and not linha.startswith("#")), "")[:120]
    titulo = titulo_extraido or "Post sem título"
    descricao = descricao_extraida or "Descrição gerada automaticamente."
    slug = slugify(titulo)
    data = datetime.now().strftime("%Y-%m-%d-%H%M")
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

{raw_content}
""")
    print(f"📂 Verificando se o arquivo existe: {arquivo.exists()} → {arquivo.resolve()}")

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

if __name__ == "__main__":
    gerar_post("", "")