"use client";

/**
 * ProductFormModal — modal "Adicionar novo produto" / "Editar produto".
 * ------------------------------------------------------------------
 * Um modal só serve pros dois casos: sem `editingProduct`, começa em branco
 * e cria um produto novo (id gerado na hora); com `editingProduct`, abre já
 * preenchido com os dados daquele produto (inclusive a foto atual) e, ao
 * salvar, mantém o MESMO id — é assim que a tela de Produtos
 * (ProductsClient.handleSaveProduct) sabe que é pra substituir em vez de
 * adicionar um item novo na lista.
 *
 * A categoria não é escolhida à mão num <select> — ela é detectada
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
 * (dentro de ProductImagePicker) por uma chamada de upload — o resto do
 * formulário não precisa mudar.
 *
 * Tamanho da foto: o `ProductImagePicker` deixa regular um zoom, com
 * pré-visualização de como a foto fica no card do celular e no do
 * computador — e isso funciona por produto, individualmente: editar um
 * produto carrega a FOTO DELE (não afeta o zoom de nenhum outro). Esse
 * zoom só é "gravado" de verdade na imagem (via canvas,
 * `bakeImageToDataUrl`) no momento de salvar — ver handleSubmit.
 */

import { useEffect, useState, type FormEvent } from "react";
import Modal from "@/components/admin/ui/Modal";
import type { AdminProduct } from "@/lib/admin/types";
import { getCategoryLabel, parseProductCategory } from "@/utils/categoryParser";
import { bakeImageToDataUrl } from "@/utils/imageResize";
import ProductImagePicker from "./ProductImagePicker";

type ProductFormModalProps = {
  open: boolean;
  /** Produto a editar; null/undefined = modal no modo "adicionar novo". */
  editingProduct?: AdminProduct | null;
  onClose: () => void;
  onSave: (product: AdminProduct) => void;
};

const BLANK_FORM = { name: "", price: "", stock: "" };

export default function ProductFormModal({ open, editingProduct, onClose, onSave }: ProductFormModalProps) {
  const [name, setName] = useState(BLANK_FORM.name);
  const [price, setPrice] = useState(BLANK_FORM.price);
  const [stock, setStock] = useState(BLANK_FORM.stock);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [imageScale, setImageScale] = useState(1);
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(editingProduct);

  // O modal nunca desmonta (só o conteúdo interno some quando `open` é
  // false — ver components/admin/ui/Modal.tsx), então os campos só são
  // preenchidos/limpos de novo aqui, toda vez que ele é reaberto.
  useEffect(() => {
    if (!open) return;

    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(String(editingProduct.price));
      setStock(String(editingProduct.stock));
      setRawImage(editingProduct.imageUrl ?? null);
    } else {
      setName(BLANK_FORM.name);
      setPrice(BLANK_FORM.price);
      setStock(BLANK_FORM.stock);
      setRawImage(null);
    }
    setImageScale(1);
  }, [open, editingProduct]);

  // Recalculada a cada tecla digitada — é barata (só compara texto) e é
  // exatamente isso que demonstra a categorização automática funcionando.
  const detectedCategory = name.trim() ? getCategoryLabel(parseProductCategory(name)) : null;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);

    const imageUrl = rawImage ? await bakeImageToDataUrl(rawImage, imageScale) : editingProduct?.imageUrl;

    onSave({
      id: editingProduct?.id ?? `NOVO-${Date.now()}`,
      name,
      imageUrl,
      price: Number(price) || 0,
      stock: Number(stock) || 0,
      soldOut: Number(stock) <= 0,
      featured: editingProduct?.featured,
      promoLabel: editingProduct?.promoLabel,
    });
    setSaving(false);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title={isEditing ? "Editar produto" : "Adicionar novo produto"}>
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
            <label className="mb-1 block text-sm font-medium text-slate-700">{isEditing ? "Estoque" : "Estoque inicial"}</label>
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
          <ProductImagePicker
            rawImage={rawImage}
            scale={imageScale}
            onPickImage={(dataUrl) => {
              setRawImage(dataUrl);
              setImageScale(1); // toda foto nova (ou trocada) começa sem zoom
            }}
            onScaleChange={setImageScale}
            onRemove={() => {
              setRawImage(null);
              setImageScale(1);
            }}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-brand-darker hover:bg-brand-greenLight disabled:opacity-60"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
