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

# Carrega variáveis de ambiente do .env na raiz
load_dotenv(dotenv_path=Path(".env"))

# Inicializa cliente OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# === FUNÇÕES ===

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

    conteudo = inserir_errinhos(resposta.choices[0].message.content)

    prompt_imagem_melhorado = (
        f"A visually inspiring scene related to the topic: '{titulo}'. "
        f"Create a calm, cozy, softly lit environment that visually expresses the idea: '{descricao}'. "
        "Use warm tones, Scandinavian minimalist decor, soft textures like blankets or cushions, "
        "relaxed posture of a person or symbolic composition, realistic style, cinematic lighting, 16:9 aspect ratio"
    )

    caminho_imagem = gerar_imagem(prompt_imagem_melhorado, slug)

    front_matter = f"""---
title: \"{titulo}\"
excerpt: \"{descricao}\"
date: \"{data}\"
slug: \"{slug}\"
image: \"{caminho_imagem}\"
tags: ["mentalidade", "psicologia", "autoconhecimento"]
---

"""

    caminho_diretorio = "content/posts"
    os.makedirs(caminho_diretorio, exist_ok=True)

    caminho_post = f"{caminho_diretorio}/{slug}-{data}.md"
    if os.path.exists(caminho_post):
        print(f"⚠️ Post já existe: {caminho_post} — pulando geração.")
        return

    with open(caminho_post, "w") as f:
        f.write(front_matter + conteudo)

    print(f"✅ Post gerado: {caminho_post}")
    print(f"🖼️ Imagem salva em: public{caminho_imagem}")

# === EXECUÇÃO AUTOMÁTICA COM 3 TEMAS ===
if __name__ == "__main__":
    from datetime import datetime
    USADOS_PATH = "logs/temas_usados.txt"
    os.makedirs("logs", exist_ok=True)
    if not os.path.exists(USADOS_PATH):
        with open(USADOS_PATH, "w") as f:
            f.write("")

    temas_alta = [
        ("5 segredos psicológicos para aumentar sua autoestima agora", "Descubra gatilhos mentais validados pela ciência para desbloquear sua autoconfiança."),
        ("Por que procrastinamos (e o que fazer a respeito, segundo a ciência)", "A neurociência explica como vencer a inércia com estratégias práticas."),
        ("Multitarefa está destruindo seu foco? Veja o que dizem os estudos", "A verdade sobre fazer mil coisas ao mesmo tempo e como recuperar sua produtividade."),
        ("Autossabotagem: como parar de ser seu pior inimigo", "Os padrões ocultos que te puxam pra trás — e como quebrar o ciclo."),
        ("Você se compara demais? Descubra por que isso acontece e como mudar", "Comparação pode ser combustível ou veneno — tudo depende de como você lida."),
        ("O poder da história que você conta sobre você mesmo", "Reescrever sua narrativa interna é um atalho para mudar sua vida."),
    ]

    temas_media = [
        ("Seu cérebro em overdose: o que a era da informação está fazendo com você", "Entenda por que nos sentimos tão cansados e como filtrar o excesso pode salvar sua sanidade."),
        ("Como abraçar o tédio pode turbinar sua criatividade", "Estudos mostram que momentos de pausa ajudam a mente a se reorganizar e inovar."),
        ("Mindset de crescimento: como pensar como quem vence", "Entenda como quem tem sucesso encara erros, desafios e mudanças."),
        ("Como dizer não pode salvar sua saúde mental", "Aprender a impor limites é um dos maiores sinais de maturidade emocional."),
        ("Você é aquilo que assiste: o impacto da mídia no seu humor", "O que você consome está moldando sua visão do mundo — e do seu potencial."),
        ("Você não precisa ser feliz o tempo todo (e está tudo bem)", "Aceitar emoções negativas é uma forma de inteligência emocional."),
    ]

    temas_longtail = [
        ("A ciência do bom humor: como pequenas ações mudam seu dia", "Estudos mostram como coisas simples como sorrir ou ouvir música influenciam diretamente sua química cerebral."),
        ("Como o silêncio afeta seu cérebro (e pode te curar)", "Neurocientistas revelam como momentos de silêncio reestruturam seu foco, emoções e criatividade."),
        ("Pequenas vitórias: o truque psicológico que cria gigantes", "A ciência mostra como celebrar pequenas conquistas muda sua autoimagem."),
        ("Como a gratidão reprograma sua mente para o positivo", "Neurociência por trás do poder de dizer obrigado."),
        ("Respirar com intenção: o atalho da calma segundo a neurociência", "Técnicas de respiração ativam partes do cérebro ligadas à estabilidade emocional."),
        ("Por que hábitos vencem a força de vontade", "Entenda como automatizar seu sucesso psicológico e emocional."),
    ]

    with open(USADOS_PATH, "r") as f:
        usados = f.read().splitlines()

    temas_alta = [t for t in temas_alta if slugify(t[0]) not in usados]
    temas_media = [t for t in temas_media if slugify(t[0]) not in usados]
    temas_longtail = [t for t in temas_longtail if slugify(t[0]) not in usados]

    if not temas_alta and not temas_media and not temas_longtail:
        os.remove(USADOS_PATH)
        print("🔁 Todos os temas foram utilizados. Reiniciando a lista para novo ciclo.")
        exec(open(__file__).read())

    dia_semana = datetime.now().weekday()  # segunda = 0, domingo = 6
    estrategia = ""

    if dia_semana in [0, 1]:  # segunda e terça
        temas = random.sample(temas_alta, 3)
        estrategia = "Alta performance"
    elif dia_semana in [2, 3]:  # quarta e quinta
        temas = random.sample(temas_media, 3)
        estrategia = "Média performance"
    else:  # sexta, sábado e domingo
        temas = random.sample(temas_longtail, 3)
        estrategia = "SEO Long Tail"

    print(f"\n🚀 Estratégia do dia: {estrategia}")
    print("📌 Temas selecionados:")
    for i, (titulo, _) in enumerate(temas, start=1):
        print(f"{i}. {titulo}")
        with open("logs/execucao_diaria.txt", "a") as log:
            log.write(f"{datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | {estrategia} | {titulo}\n")
    print()

    for titulo, descricao in temas:
        with open(USADOS_PATH, "a") as f:
            f.write(slugify(titulo) + "\n")
        gerar_post(titulo, descricao, prompt_imagem="")
