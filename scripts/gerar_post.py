import os
import re
from datetime import datetime
from unidecode import unidecode

def slugify(text):
    text = unidecode(text.lower())
    text = re.sub(r"[^\w\s-]", "", text)         # remove caracteres especiais
    text = re.sub(r"[\s_-]+", "-", text)         # substitui espaços e underscores por hifens
    text = re.sub(r"^-+|-+$", "", text)          # remove hifens no início/fim
    return text

def gerar_post(titulo, descricao, prompt_customizado=""):
    agora = datetime.now().strftime("%Y-%m-%d %H:%M")
    
    # Exibição no terminal
    print("\n📌 Gerando post automático:")
    print(f"📝 Título...........: {titulo}")
    print(f"📄 Descrição........: {descricao}")
    print(f"🧠 Prompt customizado: {prompt_customizado or '(nenhum)'}")
    print(f"⏰ Horário...........: {agora}")
    
    # Criar conteúdo do post
    conteudo = f"""---
title: "{titulo}"
description: "{descricao}"
date: {datetime.now().strftime('%Y-%m-%d')}
---

{descricao}
"""

    # Garantir que a pasta exista
    pasta_posts = "content/posts"
    os.makedirs(pasta_posts, exist_ok=True)

    # Criar nome do arquivo baseado no título
    slug = slugify(titulo)
    nome_arquivo = os.path.join(pasta_posts, f"{slug}.md")

    # Salvar o arquivo
    with open(nome_arquivo, "w", encoding="utf-8") as f:
        f.write(conteudo)

    print(f"📁 Post salvo com sucesso em: {nome_arquivo}\n")