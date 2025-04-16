from datetime import datetime
import os
import sys

# Adiciona o diretório atual ao sys.path para importar o gerar_post.py corretamente
sys.path.append(os.path.dirname(__file__))
from gerar_post import gerar_post

# === Lista de temas com títulos e descrições ===
posts = [
    {
        "titulo": "O que a ciência descobriu sobre gratidão e saúde mental",
        "descricao": "Veja como o simples ato de agradecer pode transformar seu bem-estar emocional, com base em pesquisas reais.",
    },
    {
        "titulo": "A verdade sobre multitarefa: produtividade ou sabotagem?",
        "descricao": "Descubra porque fazer muitas coisas ao mesmo tempo pode estar acabando com sua produtividade — e como mudar isso.",
    },
    {
        "titulo": "Por que você sempre sente que não fez o suficiente (mesmo tendo feito muito)",
        "descricao": "Entenda o fenômeno da autocobrança e como ele pode estar distorcendo sua percepção de valor e conquista.",
    }
]

# === Função que insere errinhos propositalmente na descrição ===
def inserir_errinhos(texto):
    erros = [
        (" por que ", " porque "),
        (" mais ", " mas "),
        (" têm ", " tem "),
        (" está ", " esta "),
        (" é ", " e "),
    ]
    for errado, certo in erros[:2]:  # insere até 2 erros por texto
        texto = texto.replace(errado, certo, 1)
    return texto

# === Geração dos posts com pequenas alterações no texto ===
for post in posts:
    post["descricao"] = inserir_errinhos(post["descricao"])
    gerar_post(post["titulo"], post["descricao"], prompt_imagem="")