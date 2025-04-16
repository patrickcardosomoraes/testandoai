from datetime import datetime

def gerar_post(titulo, descricao, prompt=""):
    agora = datetime.now().strftime("%Y-%m-%d %H:%M")
    print(f"\n📌 Gerando post automático:")
    print(f"Título: {titulo}")
    print(f"Descrição: {descricao}")
    print(f"Prompt customizado: {prompt}")
    print(f"[{agora}] ✅ Post simulado com sucesso!\n")