from datetime import datetime
import os
import sys

# Garante que podemos importar o gerar_post.py da mesma pasta
sys.path.append(os.path.dirname(__file__))
from scripts.gerar_post import gerar_post

# === Temas com horário sugerido ===
posts = [
    {
        "titulo": "O que a ciência descobriu sobre gratidão e saúde mental",
        "descricao": "Veja como o simples ato de agradecer pode transformar seu bem-estar emocional, com base em pesquisas reais.",
    },
    {
        "titulo": "A verdade sobre multitarefa: produtividade ou sabotagem?",
        "descricao": "Descubra por que fazer muitas coisas ao mesmo tempo pode estar acabando com sua produtividade — e como mudar isso.",
    },
    {
        "titulo": "Por que você sempre sente que não fez o suficiente (mesmo tendo feito muito)",
        "descricao": "Entenda o fenômeno da autocobrança e como ele pode estar distorcendo sua percepção de valor e conquista.",
    }
]

# === Inserir errinhos propositalmente nos textos ===
def inserir_errinhos(texto):
    erros = [
        (" por que ", " porque "),
        (" mais ", " mas "),
        (" têm ", " tem "),
        (" está ", " esta "),
        (" é ", " e "),
    ]
    for errado, certo in erros[:2]:  # apenas dois errinhos por post
        texto = texto.replace(errado, certo, 1)
    return texto

# === Gerar os 3 posts com base nas ideias acima ===
for post in posts:
    post["descricao"] = inserir_errinhos(post["descricao"])
    prompt = ""  # o gerar_post já usa prompt dinâmico
    gerar_post(post["titulo"], post["descricao"], prompt)