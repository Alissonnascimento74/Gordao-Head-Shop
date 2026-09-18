"use client";

/**
 * ProductImagePicker — escolhe a foto do produto e deixa regular o tamanho.
 * ------------------------------------------------------------------
 * O slider "Tamanho da foto" controla o zoom aplicado à imagem. As duas
 * caixinhas de pré-visualização mostram o resultado no formato usado pelo
 * card de produto em cada tela — uma bem estreita e alta (como a coluna de
 * foto do card no celular, ver app/page.tsx) e uma quadrada (como a foto no
 * card do computador) — assim dá pra ver e ajustar o enquadramento para os
 * dois formatos ao mesmo tempo, antes de salvar.
 *
 * As pré-visualizações usam só CSS (`transform: scale`) — instantâneo mas
 * não gera um arquivo novo. O "corte" de verdade só acontece na hora de
 * salvar, em utils/imageResize.ts (`bakeImageToDataUrl`).
 */

import { useRef, type ChangeEvent } from "react";
import { ImagePlus, X, ZoomIn } from "lucide-react";

type ProductImagePickerProps = {
  /** Foto original (sem o zoom aplicado ainda), como data URL. */
  rawImage: string | null;
  /** Zoom atual (1 = sem zoom, valores maiores aproximam/cortam mais). */
  scale: number;
  onPickImage: (dataUrl: string) => void;
  onScaleChange: (scale: number) => void;
  onRemove: () => void;
};

export default function ProductImagePicker({ rawImage, scale, onPickImage, onScaleChange, onRemove }: ProductImagePickerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => onPickImage(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

      {!rawImage ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-6 text-sm text-slate-500 hover:border-brand-green hover:text-brand-forest"
        >
          <ImagePlus className="h-6 w-6" />
          Toque para escolher uma foto (galeria ou câmera)
        </button>
      ) : (
        <div className="space-y-3 rounded-lg border border-slate-300 p-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-medium text-brand-forest hover:underline"
            >
              Trocar foto
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Remover foto"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div>
            <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <ZoomIn className="h-3.5 w-3.5" />
              Tamanho da foto
            </label>
            <input
              type="range"
              min="1"
              max="2.5"
              step="0.05"
              value={scale}
              onChange={(e) => onScaleChange(Number(e.target.value))}
              className="w-full accent-brand-green"
            />
          </div>

          <div className="flex justify-center gap-6">
            <div className="text-center">
              <p className="mb-1 text-[11px] text-slate-400">No celular</p>
              {/* Proporção parecida com a coluna de foto do card mobile. */}
              <div className="h-24 w-16 overflow-hidden rounded-lg bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element -- prévia local com data URL + CSS transform, next/image não se aplica aqui */}
                <img
                  src={rawImage}
                  alt="Prévia no celular"
                  className="h-full w-full object-cover"
                  style={{ transform: `scale(${scale})` }}
                />
              </div>
            </div>
            <div className="text-center">
              <p className="mb-1 text-[11px] text-slate-400">No computador</p>
              {/* Quadrada, como a foto no card do desktop. */}
              <div className="h-20 w-20 overflow-hidden rounded-lg bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element -- prévia local com data URL + CSS transform, next/image não se aplica aqui */}
                <img
                  src={rawImage}
                  alt="Prévia no computador"
                  className="h-full w-full object-cover"
                  style={{ transform: `scale(${scale})` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
