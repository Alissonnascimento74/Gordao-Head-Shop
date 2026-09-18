/**
 * imageResize.ts — "revela" no arquivo final o zoom/tamanho escolhido pra foto.
 * ------------------------------------------------------------------
 * O admin regula o tamanho da foto arrastando um slider (o "zoom"). Enquanto
 * ele arrasta, a pré-visualização só usa CSS (`transform: scale(...)`) — é
 * instantâneo, mas não muda o arquivo de verdade. `bakeImageToDataUrl` é
 * chamada só na hora de salvar: desenha a imagem original num <canvas>
 * quadrado já com o zoom aplicado, e devolve o resultado como uma imagem
 * nova (JPEG) — é ESSE arquivo que vira a foto do produto.
 */

const OUTPUT_SIZE = 800; // pixels de lado da imagem final (quadrada)

export function bakeImageToDataUrl(sourceDataUrl: string, scale: number, outputSize = OUTPUT_SIZE): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = outputSize;
      canvas.height = outputSize;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas 2D não suportado neste navegador."));
        return;
      }

      // "cover" base: a menor escala que já preenche o quadrado inteiro sem
      // sobrar borda vazia; o `scale` do slider multiplica esse valor pra
      // dar o efeito de zoom in/out a partir daí.
      const coverScale = Math.max(outputSize / img.width, outputSize / img.height);
      const totalScale = coverScale * scale;
      const drawWidth = img.width * totalScale;
      const drawHeight = img.height * totalScale;

      // Centraliza o recorte (mesmo comportamento de `object-fit: cover`).
      const dx = (outputSize - drawWidth) / 2;
      const dy = (outputSize - drawHeight) / 2;

      ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };

    img.onerror = () => reject(new Error("Não foi possível carregar a imagem selecionada."));
    img.src = sourceDataUrl;
  });
}
