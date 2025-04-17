import os
from dotenv import load_dotenv
from pathlib import Path
import requests

# Carrega variáveis de ambiente do arquivo .env
load_dotenv(dotenv_path=Path(".env"))

# Função exemplo para geração de post
def gerar_post():
    print("✅ Função de geração de post iniciada.")
    # Exemplo de uso de variável de ambiente
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("⚠️ API key não encontrada. Verifique o arquivo .env.")
    else:
        print("🔐 API key carregada com sucesso (oculta por segurança).")

if __name__ == "__main__":
    gerar_post()