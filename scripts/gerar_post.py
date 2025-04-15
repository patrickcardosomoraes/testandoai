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

    caminho_diretorio = "posts"
    os.makedirs(caminho_diretorio, exist_ok=True)

    caminho_post = f"{caminho_diretorio}/{slug}-{data}.md"
    with open(caminho_post, "w") as f:
        f.write(front_matter + conteudo)

    print(f"✅ Post gerado: {caminho_post}")
    print(f"🖼️ Imagem salva em: public{caminho_imagem}")

# === EXECUÇÃO AUTOMÁTICA COM TEMAS ALEATÓRIOS ===
if __name__ == "__main__":
    temas_possiveis = [
        ("A ciência do bom humor: como pequenas ações mudam seu dia", "Estudos mostram como coisas simples como sorrir ou ouvir música influenciam diretamente sua química cerebral."),
        ("5 segredos psicológicos para aumentar sua autoestima agora", "Descubra gatilhos mentais validados pela ciência para desbloquear sua autoconfiança."),
        ("Como o silêncio afeta seu cérebro (e pode te curar)", "Neurocientistas revelam como momentos de silêncio reestruturam seu foco, emoções e criatividade."),
        ("Seu cérebro em overdose: o que a era da informação está fazendo com você", "Entenda por que nos sentimos tão cansados e como filtrar o excesso pode salvar sua sanidade."),
        ("Por que procrastinamos (e o que fazer a respeito, segundo a ciência)", "A neurociência explica como vencer a inércia com estratégias práticas."),
        ("Multitarefa está destruindo seu foco? Veja o que dizem os estudos", "A verdade sobre fazer mil coisas ao mesmo tempo e como recuperar sua produtividade."),
        ("Como abraçar o tédio pode turbinar sua criatividade", "Estudos mostram que momentos de pausa ajudam a mente a se reorganizar e inovar."),
        ("Você pensa demais? Como o excesso de análise pode te paralisar", "Overthinking é mais comum do que parece e tem solução."),
        ("Mindset de crescimento: como pensar como quem vence", "Entenda como quem tem sucesso encara erros, desafios e mudanças."),
        ("Pequenas vitórias: o truque psicológico que cria gigantes", "A ciência mostra como celebrar pequenas conquistas muda sua autoimagem."),
        ("Você é aquilo que assiste: o impacto da mídia no seu humor", "O que você consome está moldando sua visão do mundo — e do seu potencial."),
        ("Como dizer não pode salvar sua saúde mental", "Aprender a impor limites é um dos maiores sinais de maturidade emocional."),
        ("O experimento dos doces: o que crianças ensinam sobre sucesso", "A paciência infantil revelou os segredos da disciplina e visão de longo prazo."),
        ("Seu cérebro ama listas (e por isso elas funcionam tanto)", "Por que conteúdo em tópicos gera mais aprendizado e impacto."),
        ("Como a gratidão reprograma sua mente para o positivo", "Neurociência por trás do poder de dizer obrigado."),
        ("Você anda cansado demais? Pode ser decisão demais", "A ‘fadiga de decisão’ já afeta milhares — veja como minimizar."),
        ("O poder de dormir bem: o que a ciência mostra além do descanso", "Sono regula foco, humor, memórias e até empatia."),
        ("Autossabotagem: como parar de ser seu pior inimigo", "Os padrões ocultos que te puxam pra trás — e como quebrar o ciclo."),
        ("Como redes sociais afetam sua autoestima (sem você perceber)", "O feed pode parecer inocente, mas seu cérebro está fazendo comparações constantes."),
        ("Respirar com intenção: o atalho da calma segundo a neurociência", "Técnicas de respiração ativam partes do cérebro ligadas à estabilidade emocional."),
        ("Porque fazer nada também é fazer algo (e seu cérebro precisa disso)", "Momentos de pausa são tão valiosos quanto momentos de ação."),
        ("Você se compara demais? Descubra por que isso acontece e como mudar", "Comparação pode ser combustível ou veneno — tudo depende de como você lida."),
        ("Como a dopamina controla sua motivação (e como usar isso a seu favor)", "A química da recompensa pode ser reprogramada com hábitos simples."),
        ("Por que hábitos vencem a força de vontade", "Entenda como automatizar seu sucesso psicológico e emocional."),
        ("Pare de se distrair: o que realmente foca sua mente segundo a ciência", "Foco é mais sobre eliminação do que sobre esforço."),
        ("A regra dos 5 segundos: como enganar o cérebro para agir", "Uma técnica simples que interrompe a procrastinação antes que ela comece."),
        ("O poder da história que você conta sobre você mesmo", "Reescrever sua narrativa interna é um atalho para mudar sua vida."),
        ("Como a música altera sua mente (e seus hormônios)", "A playlist certa pode ativar áreas do cérebro ligadas à motivação, memória e prazer."),
        ("Você não precisa ser feliz o tempo todo (e está tudo bem)", "Aceitar emoções negativas é uma forma de inteligência emocional."),
        ("Por que seu ambiente molda sua mente (mais do que você imagina)", "O lugar onde você vive e trabalha está influenciando seu comportamento agora.")
    ]

    temas = random.sample(temas_possiveis, 3)

    for titulo, descricao in temas:
        gerar_post(titulo, descricao, prompt_imagem="")
