"use client";

/**
 * ProductFormModal — modal "Adicionar novo produto".
 * ------------------------------------------------------------------
 * A categoria não é mais escolhida à mão num <select> — ela é detectada
 * automaticamente enquanto a pessoa digita o nome, chamando
 * `parseProductCategory` (a mesma inteligência usada na Vitrine e na
 * tabela de Produtos). Isso evita cadastrar um produto com a categoria
 * errada e mostra a "inteligência" funcionando em tempo real.
 *
 * Upload de imagem: como ainda não existe backend/storage de verdade,
 * a foto escolhida é lida no navegador (FileReader) e vira uma "data
 * URL" — uma string que já contém a imagem inteira, guardada junto do
 * produto em memória. Funciona igual em desktop e celular: em celular,
 * <input type="file" accept="image/*"> abre nativamente a opção de
 * escolher da galeria ou tirar uma foto na hora. Quando plugar upload de
 * verdade (S3, Cloudinary, etc.), troque só a função `handleFileChange`
 * por uma chamada de upload — o resto do formulário não precisa mudar.
 */

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import Modal from "@/components/admin/ui/Modal";
import type { AdminProduct } from "@/lib/admin/types";
import { getCategoryLabel, parseProductCategory } from "@/utils/categoryParser";

type ProductFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (product: AdminProduct) => void;
};

export default function ProductFormModal({ open, onClose, onSave }: ProductFormModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Recalculada a cada tecla digitada — é barata (só compara texto) e é
  // exatamente isso que demonstra a categorização automática funcionando.
  const detectedCategory = name.trim() ? getCategoryLabel(parseProductCategory(name)) : null;

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleClose() {
    setName("");
    setPrice("");
    setStock("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose();
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    onSave({
      id: `NOVO-${Date.now()}`,
      name,
      imageUrl: imagePreview ?? "/logo-gordao.jpg",
      price: Number(price) || 0,
      stock: Number(stock) || 0,
      soldOut: Number(stock) <= 0,
    });
    handleClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title="Adicionar novo produto">
      {/* Esqueleto de formulário — falta plugar persistência na API (upload de imagem já funciona). */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Nome</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
            placeholder="Ex.: Bag Vault pequena"
          />
          {detectedCategory && (
            <p className="mt-1 text-xs text-slate-500">
              Categoria detectada automaticamente: <span className="font-medium text-brand-forest">{detectedCategory}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Preço (R$)</label>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Estoque inicial</label>
            <input
              required
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Imagem</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="product-image-input"
          />

          {imagePreview ? (
            <div className="relative flex items-center gap-3 rounded-lg border border-slate-300 p-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                <Image src={imagePreview} alt="Pré-visualização" fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-slate-600">Foto selecionada</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-medium text-brand-forest hover:underline"
                >
                  Trocar foto
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Remover foto"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-6 text-sm text-slate-500 hover:border-brand-green hover:text-brand-forest"
            >
              <ImagePlus className="h-6 w-6" />
              Toque para escolher uma foto (galeria ou câmera)
            </button>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-brand-darker hover:bg-brand-greenLight"
          >
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
}
