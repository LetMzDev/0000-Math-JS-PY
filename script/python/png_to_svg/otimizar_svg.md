# 📌 Como Usar o SVGO para Otimizar SVG

O **SVGO** (SVG Optimizer) é uma ferramenta poderosa para reduzir o tamanho dos arquivos **SVG**, removendo metadados desnecessários, simplificando caminhos e otimizando o código XML. A seguir, veja como instalá-lo e utilizá-lo corretamente.

---

## 🔹 1️⃣ Instalar o SVGO
Para usar o SVGO, primeiro instale-o globalmente no seu sistema via **npm**:
```sh
npm install -g svgo
```
> 💡 **Requisito:** É necessário ter o **Node.js** instalado. Caso não tenha, baixe aqui: [Node.js Download](https://nodejs.org/)

---

## 🔹 2️⃣ Otimizar um Arquivo SVG
Após a instalação, você pode otimizar qualquer arquivo **SVG** com o seguinte comando:
```sh
svgo input.svg -o output.svg
```
🔹 **Explicação:**  
- `input.svg` → Arquivo **original** (antes da otimização).  
- `output.svg` → Arquivo **otimizado** (depois da otimização).  

---

## 🔹 3️⃣ Executar SVGO em Todos os Arquivos SVG de uma Pasta
Se quiser otimizar **todos os arquivos SVG de uma pasta**, use:
```sh
svgo -f ./pasta_dos_svgs -o ./pasta_otimizada
```
🔹 **Explicação:**
- `./pasta_dos_svgs` → Pasta onde estão os **arquivos SVG originais**.
- `./pasta_otimizada` → Pasta onde os **arquivos otimizados** serão salvos.

---

## 🔹 4️⃣ Opções Avançadas do SVGO
Você pode personalizar a otimização com **parâmetros adicionais**. Exemplos:

✔ **Remover Comentários e Metadados:**
```sh
svgo --disable=removeTitle input.svg -o output.svg
```

✔ **Exibir Estatísticas de Otimização:**
```sh
svgo --pretty input.svg -o output.svg
```
Isso formata o código XML do SVG de forma mais legível.

---

## 📌 Conclusão
Agora você sabe como otimizar **arquivos SVG** de forma rápida e eficiente com o **SVGO**! 🚀
Caso tenha dúvidas ou queira explorar mais opções, consulte a documentação oficial:
🔗 [SVGO no GitHub](https://github.com/svg/svgo)

