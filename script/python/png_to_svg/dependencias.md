# Dependências Necessárias para Executar o Script de Conversão PNG para SVG

Este documento fornece todas as dependências necessárias para executar corretamente o script Python que converte imagens **PNG** para **SVG** usando o **Inkscape**.

## 1️⃣ Instalar o Python
O script requer **Python 3.6 ou superior**. Para verificar se o Python está instalado, execute:
```sh
python --version
```
Se não estiver instalado, baixe e instale pelo site oficial:
🔗 [Download Python](https://www.python.org/downloads/)

---

## 2️⃣ Instalar o Inkscape
O **Inkscape** é essencial para a conversão. Baixe e instale a versão mais recente:
🔗 [Download Inkscape](https://inkscape.org/release/)

**Verifique se está instalado corretamente:**
```sh
inkscape --version
```
Se o comando não for reconhecido, veja a seção "Adicionar Inkscape ao PATH" abaixo.

---

## 3️⃣ Adicionar Inkscape ao PATH (Se Necessário)
Se o comando `inkscape` não funcionar no terminal, faça o seguinte:

1. Abra o **Explorador de Arquivos** e navegue até:
   ```
   C:\Program Files\Inkscape\bin
   ```
2. Copie esse caminho.
3. No Windows, pesquise **"Variáveis de Ambiente"** e abra.
4. Clique em **"Variáveis de Ambiente"**.
5. Na seção **"Variáveis do Sistema"**, localize **"Path"** e clique em **Editar**.
6. Clique em **Novo** e cole o caminho copiado.
7. Clique em **OK** e reinicie o terminal.

Agora, teste novamente:
```sh
inkscape --version
```
Se mostrar a versão do Inkscape, está funcionando! 🚀

---

## 4️⃣ Criar um Ambiente Virtual (Opcional, mas Recomendado)
Se desejar um ambiente isolado para executar o script:
```sh
python -m venv env
source env/bin/activate  # Linux/macOS
env\Scripts\activate  # Windows
```

---

## 5️⃣ Rodar o Script de Conversão
Agora, rode o script:
```sh
python converter.py
```
Se a imagem `imagem.png` estiver na mesma pasta, ele criará `imagem.svg` com a conversão vetorizada.

---

## 📌 Conclusão
Agora você tem todas as dependências instaladas e prontas para usar o script Python que converte **PNG** para **SVG** preservando as cores e qualidade!

Caso tenha problemas, revise as etapas ou entre no site do **Inkscape** para suporte oficial:
🔗 [Suporte Inkscape](https://inkscape.org/learn/faq/)
