"use client";

/**
 * ProductFormModal — modal "Adicionar novo produto" (esqueleto de formulário).
 * ------------------------------------------------------------------
 * A categoria não é mais escolhida à mão num <select> — ela é detectada
 * automaticamente enquanto a pessoa digita o nome, chamando
 * `parseProductCategory` (a mesma inteligência usada na Vitrine e na
 * tabela de Produtos). Isso evita cadastrar um produto com a categoria
 * errada e mostra a "inteligência" funcionando em tempo real.
 */

import { useState, type FormEvent } from "react";
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

  // Recalculada a cada tecla digitada — é barata (só compara texto) e é
  // exatamente isso que demonstra a categorização automática funcionando.
  const detectedCategory = name.trim() ? getCategoryLabel(parseProductCategory(name)) : null;

  function handleClose() {
    setName("");
    setPrice("");
    setStock("");
    onClose();
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    onSave({
      id: `NOVO-${Date.now()}`,
      name,
      imageUrl: "/logo-gordao.jpg",
      price: Number(price) || 0,
      stock: Number(stock) || 0,
      soldOut: Number(stock) <= 0,
    });
    handleClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title="Adicionar novo produto">
      {/* Esqueleto de formulário — falta plugar upload de imagem real e persistência na API. */}
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

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Imagem</label>
          <div className="rounded-lg border border-dashed border-slate-300 px-3 py-6 text-center text-sm text-slate-400">
            Upload de imagem — a plugar
          </div>
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
