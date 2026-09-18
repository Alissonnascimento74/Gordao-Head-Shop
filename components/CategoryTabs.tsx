"use client";

/**
 * CategoryTabs — barra de filtro por categoria, reutilizável.
 * ------------------------------------------------------------------
 * Usado tanto na Vitrine pública (app/vitrine) quanto no Painel Admin
 * (Produtos e Promoções). Não guarda estado sozinho: quem usa esse
 * componente decide qual categoria está ativa (`active`) e o que
 * acontece quando o usuário clica numa aba (`onChange`) — isso é o que
 * o enunciado chama de "receber a categoria ativa e a função de
 * atualizar o estado via props".
 *
 * É genérico em `T` (o tipo do id de categoria) porque o Admin usa os
 * ids de utils/categoryParser.ts + o valor especial "todos", e no futuro
 * outra tela pode ter outro conjunto de categorias — o componente não
 * precisa saber disso, só recebe a lista pronta.
 */

type CategoryTabsProps<T extends string> = {
  /** Lista de categorias a mostrar, já no formato { id, label }. */
  categories: { id: T; label: string }[];
  /** Id da categoria selecionada no momento. */
  active: T;
  /** Chamado com o id da categoria clicada. */
  onChange: (id: T) => void;
};

export default function CategoryTabs<T extends string>({ categories, active, onChange }: CategoryTabsProps<T>) {
  return (
    // overflow-x-auto + flex-nowrap = permite arrastar/rolar as abas para
    // o lado em telas pequenas (celular), sem quebrar linha.
    <div className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => {
        const isActive = category.id === active;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-brand-green text-brand-darker"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
