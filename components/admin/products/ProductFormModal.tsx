"use client";

import { useState, type FormEvent } from "react";
import Modal from "@/components/admin/ui/Modal";
import type { AdminProduct, ProductCategory } from "@/lib/admin/types";

const CATEGORY_OPTIONS: { value: ProductCategory; label: string }[] = [
  { value: "tabaco", label: "Tabaco" },
  { value: "sedas", label: "Sedas e Piteiras" },
  { value: "acessorios", label: "Acessórios" },
];

type ProductFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (product: AdminProduct) => void;
};

export default function ProductFormModal({ open, onClose, onSave }: ProductFormModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<ProductCategory>("acessorios");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  function handleClose() {
    setName("");
    setCategory("acessorios");
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
      category,
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
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
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
