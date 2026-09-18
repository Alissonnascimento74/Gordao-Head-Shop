// Catálogo gerado a partir da exportação do Nex (catalogo_produtos.xls).
// Descrições geradas automaticamente por palavra-chave (o Nex não exporta descrição).
// Reimporte rodando o mesmo processo sempre que quiser atualizar preços/estoque.

export type CategoryId = "tabaco" | "sedas" | "acessorios";

export type Product = {
  id: string;
  imageUrl?: string;
  name: string;
  category: CategoryId;
  price: number;
  stock?: number;
  description?: string;
  badge?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "000103",
    imageUrl: "/products/catalog/000103.jpg",
    name: "Alça puff",
    category: "acessorios",
    price: 50.0,
    stock: 3,
    description: "Item selecionado do nosso catálogo, direto pra sua sessão.",
    badge: "Últimas unidades"
  },
  {
    id: "000118",
    imageUrl: "/products/catalog/000118.jpg",
    name: "Anel de silicone",
    category: "acessorios",
    price: 20.0,
    stock: 7,
    description: "Anel de silicone, resistente e confortável."
  },
  {
    id: "000246-1",
    imageUrl: "/products/catalog/000246-1.jpg",
    name: "Aste de limpeza",
    category: "acessorios",
    price: 5.0,
    stock: 37,
    description: "Haste pra limpar cachimbos e piteiras com facilidade."
  },
  {
    id: "000298-1",
    imageUrl: "/products/catalog/000298-1.jpg",
    name: "Bag Vault pequena",
    category: "acessorios",
    price: 110.0,
    stock: 2,
    description: "Bag com trava e vedação pra guardar com discrição.",
    badge: "Últimas unidades"
  },
  {
    id: "000300-1",
    imageUrl: "/products/catalog/000300-1.jpg",
    name: "Bag Vault transversal",
    category: "acessorios",
    price: 120.0,
    stock: 1,
    description: "Bag com trava e vedação pra guardar com discrição.",
    badge: "Últimas unidades"
  },
  {
    id: "000299-1",
    name: "Bag Vault usb",
    category: "acessorios",
    price: 120.0,
    stock: 0,
    description: "Bag com trava e vedação pra guardar com discrição.",
    badge: "Esgotado"
  },
  {
    id: "000002",
    imageUrl: "/products/catalog/000002.jpg",
    name: "Balança de precisão",
    category: "acessorios",
    price: 30.0,
    stock: 3,
    description: "Balança de precisão pra medir certinho.",
    badge: "Últimas unidades"
  },
  {
    id: "000042-1",
    imageUrl: "/products/catalog/000042-1.jpg",
    name: "Bandeja gelo",
    category: "acessorios",
    price: 90.0,
    stock: 1,
    description: "Bandeja espaçosa pra organizar tudo na hora de preparar.",
    badge: "Últimas unidades"
  },
  {
    id: "000027-5",
    imageUrl: "/products/catalog/000027-5.jpg",
    name: "Bandeja média",
    category: "acessorios",
    price: 25.0,
    stock: 2,
    description: "Bandeja espaçosa pra organizar tudo na hora de preparar.",
    badge: "Últimas unidades"
  },
  {
    id: "000046-1",
    imageUrl: "/products/catalog/000046-1.jpg",
    name: "Bandeja Narcos",
    category: "acessorios",
    price: 140.0,
    stock: 3,
    description: "Bandeja espaçosa pra organizar tudo na hora de preparar.",
    badge: "Últimas unidades"
  },
  {
    id: "000029-5",
    name: "Bandeja raw com pé",
    category: "acessorios",
    price: 400.0,
    stock: 1,
    description: "Bandeja espaçosa pra organizar tudo na hora de preparar.",
    badge: "Últimas unidades"
  },
  {
    id: "000133-1",
    imageUrl: "/products/catalog/000133-1.jpg",
    name: "Bandeja sadhu com pé",
    category: "acessorios",
    price: 220.0,
    stock: 2,
    description: "Bandeja espaçosa pra organizar tudo na hora de preparar.",
    badge: "Últimas unidades"
  },
  {
    id: "000128-1",
    imageUrl: "/products/catalog/000128-1.jpg",
    name: "Bandeja sadhu com tampa",
    category: "acessorios",
    price: 80.0,
    stock: 2,
    description: "Bandeja espaçosa pra organizar tudo na hora de preparar.",
    badge: "Últimas unidades"
  },
  {
    id: "000138-1",
    name: "Bandeja sadhu grande",
    category: "acessorios",
    price: 70.0,
    stock: 0,
    description: "Bandeja espaçosa pra organizar tudo na hora de preparar.",
    badge: "Esgotado"
  },
  {
    id: "000137-1",
    name: "Bandeja sadhu média",
    category: "acessorios",
    price: 35.0,
    stock: 0,
    description: "Bandeja espaçosa pra organizar tudo na hora de preparar.",
    badge: "Esgotado"
  },
  {
    id: "000136-1",
    imageUrl: "/products/catalog/000136-1.jpg",
    name: "Bandeja sadhu mini",
    category: "acessorios",
    price: 25.0,
    stock: 5,
    description: "Bandeja espaçosa pra organizar tudo na hora de preparar."
  },
  {
    id: "000141-1",
    imageUrl: "/products/catalog/000141-1.jpg",
    name: "Bolador hi tobacco pequeno",
    category: "acessorios",
    price: 15.0,
    stock: 12,
    description: "Item selecionado do nosso catálogo, direto pra sua sessão."
  },
  {
    id: "000058-1",
    imageUrl: "/products/catalog/000058-1.jpg",
    name: "Bolador sadhu grande",
    category: "acessorios",
    price: 30.0,
    stock: 10,
    description: "Item selecionado do nosso catálogo, direto pra sua sessão."
  },
  {
    id: "000057-1",
    name: "Bolador sadhu médio",
    category: "acessorios",
    price: 25.0,
    stock: 0,
    description: "Item selecionado do nosso catálogo, direto pra sua sessão.",
    badge: "Esgotado"
  },
  {
    id: "000056-1",
    imageUrl: "/products/catalog/000056-1.jpg",
    name: "Bolador sadhu pequeno",
    category: "acessorios",
    price: 15.0,
    stock: 12,
    description: "Item selecionado do nosso catálogo, direto pra sua sessão."
  },
  {
    id: "000274-1",
    name: "Bong de acrílico",
    category: "acessorios",
    price: 36.0,
    stock: 0,
    description: "Bong pra uma tragada mais suave e filtrada.",
    badge: "Esgotado"
  },
  {
    id: "000282-1",
    name: "Bong de vidro mini",
    category: "acessorios",
    price: 20.0,
    stock: 0,
    description: "Bong pra uma tragada mais suave e filtrada.",
    badge: "Esgotado"
  },
  {
    id: "000111",
    imageUrl: "/products/catalog/000111.jpg",
    name: "Bong de vidro pequeno",
    category: "acessorios",
    price: 30.0,
    stock: 2,
    description: "Bong pra uma tragada mais suave e filtrada.",
    badge: "Últimas unidades"
  },
  {
    id: "000110",
    imageUrl: "/products/catalog/000110.jpg",
    name: "Bong de vidro Rick and Marty",
    category: "acessorios",
    price: 150.0,
    stock: 1,
    description: "Bong pra uma tragada mais suave e filtrada.",
    badge: "Últimas unidades"
  },
  {
    id: "000272-1",
    imageUrl: "/products/catalog/000272-1.jpg",
    name: "Bong de vidro sadhu",
    category: "acessorios",
    price: 200.0,
    stock: 5,
    description: "Bong pra uma tragada mais suave e filtrada."
  },
  {
    id: "000003",
    imageUrl: "/products/catalog/000003.jpg",
    name: "Cabo de iphone",
    category: "acessorios",
    price: 10.0,
    stock: 1,
    description: "Cabo de carregador, prático pro dia a dia.",
    badge: "Últimas unidades"
  },
  {
    id: "000004",
    imageUrl: "/products/catalog/000004.jpg",
    name: "Cabo tipo c",
    category: "acessorios",
    price: 10.0,
    stock: 4,
    description: "Cabo de carregador, prático pro dia a dia."
  },
  {
    id: "000034-5",
    imageUrl: "/products/catalog/000034-5.jpg",
    name: "Case cânhamo",
    category: "acessorios",
    price: 30.0,
    stock: 3,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000119",
    imageUrl: "/products/catalog/000119.jpg",
    name: "Case colmeia",
    category: "acessorios",
    price: 52.0,
    stock: 1,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000042-5",
    imageUrl: "/products/catalog/000042-5.jpg",
    name: "Case de pano",
    category: "acessorios",
    price: 30.0,
    stock: 5,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000304-1",
    imageUrl: "/products/catalog/000304-1.jpg",
    name: "Case Dubai",
    category: "acessorios",
    price: 40.0,
    stock: 2,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000001-5",
    imageUrl: "/products/catalog/000001-5.jpg",
    name: "Case Dubai couro",
    category: "acessorios",
    price: 90.0,
    stock: 5,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000074",
    imageUrl: "/products/catalog/000074.jpg",
    name: "Case estampada",
    category: "acessorios",
    price: 35.0,
    stock: 1,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000076",
    imageUrl: "/products/catalog/000076.jpg",
    name: "Case estampada grande",
    category: "acessorios",
    price: 60.0,
    stock: 3,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000015-5",
    imageUrl: "/products/catalog/000015-5.jpg",
    name: "Case icebud grande emborrachado",
    category: "acessorios",
    price: 70.0,
    stock: 0,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Esgotado"
  },
  {
    id: "000014-5",
    imageUrl: "/products/catalog/000014-5.jpg",
    name: "Case icebud média emborrachado",
    category: "acessorios",
    price: 60.0,
    stock: 5,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000073",
    imageUrl: "/products/catalog/000073.jpg",
    name: "Case lisa média",
    category: "acessorios",
    price: 25.0,
    stock: 42,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000092",
    name: "Case lisa pequena",
    category: "acessorios",
    price: 20.0,
    stock: 0,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Esgotado"
  },
  {
    id: "000058",
    imageUrl: "/products/catalog/000058.jpg",
    name: "Case low dog com alça",
    category: "acessorios",
    price: 80.0,
    stock: 4,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000059",
    imageUrl: "/products/catalog/000059.jpg",
    name: "Case low dog sem alça",
    category: "acessorios",
    price: 70.0,
    stock: -1,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Esgotado"
  },
  {
    id: "000082",
    imageUrl: "/products/catalog/000082.jpg",
    name: "Case puff clássica",
    category: "acessorios",
    price: 150.0,
    stock: 5,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000083-1",
    name: "Case puff clássica bem bolado",
    category: "acessorios",
    price: 200.0,
    stock: 0,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Esgotado"
  },
  {
    id: "000105",
    imageUrl: "/products/catalog/000105.jpg",
    name: "Case puff clássica brasilidades",
    category: "acessorios",
    price: 200.0,
    stock: 4,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000315-1",
    name: "Case puff clássica raw",
    category: "acessorios",
    price: 200.0,
    stock: 0,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Esgotado"
  },
  {
    id: "000316-1",
    imageUrl: "/products/catalog/000316-1.jpg",
    name: "Case puff clássica vents",
    category: "acessorios",
    price: 160.0,
    stock: 1,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000317-1",
    imageUrl: "/products/catalog/000317-1.jpg",
    name: "Case puff estojo",
    category: "acessorios",
    price: 90.0,
    stock: 1,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000084",
    imageUrl: "/products/catalog/000084.jpg",
    name: "Case puff estojo pequeno",
    category: "acessorios",
    price: 70.0,
    stock: 2,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000318-1",
    imageUrl: "/products/catalog/000318-1.jpg",
    name: "Case puff estojo pequeno vents",
    category: "acessorios",
    price: 90.0,
    stock: 1,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000083",
    imageUrl: "/products/catalog/000083.jpg",
    name: "Case puff estojo vents",
    category: "acessorios",
    price: 120.0,
    stock: 1,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000320-1",
    imageUrl: "/products/catalog/000320-1.jpg",
    name: "Case puff pro",
    category: "acessorios",
    price: 250.0,
    stock: 5,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000106",
    imageUrl: "/products/catalog/000106.jpg",
    name: "Case puff pro brasilidades",
    category: "acessorios",
    price: 280.0,
    stock: 3,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000081",
    imageUrl: "/products/catalog/000081.jpg",
    name: "Case puff pro raw",
    category: "acessorios",
    price: 280.0,
    stock: 2,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000319-1",
    name: "Case puff pro vents",
    category: "acessorios",
    price: 260.0,
    stock: 0,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Esgotado"
  },
  {
    id: "000321-1",
    imageUrl: "/products/catalog/000321-1.jpg",
    name: "Case puff street",
    category: "acessorios",
    price: 120.0,
    stock: 1,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000075",
    name: "Case Rick and Morty",
    category: "acessorios",
    price: 50.0,
    stock: 0,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Esgotado"
  },
  {
    id: "000088",
    imageUrl: "/products/catalog/000088.jpg",
    name: "Case sadhu canhamo estojo",
    category: "acessorios",
    price: 120.0,
    stock: 1,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000090",
    name: "Case sadhu canhamo grande",
    category: "acessorios",
    price: 170.0,
    stock: 0,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Esgotado"
  },
  {
    id: "000089",
    imageUrl: "/products/catalog/000089.jpg",
    name: "Case sadhu canhamo media",
    category: "acessorios",
    price: 120.0,
    stock: 1,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000080",
    imageUrl: "/products/catalog/000080.jpg",
    name: "Case sadhu estojo",
    category: "acessorios",
    price: 60.0,
    stock: 4,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000326-1",
    imageUrl: "/products/catalog/000326-1.jpg",
    name: "Case sadhu full print mundial",
    category: "acessorios",
    price: 120.0,
    stock: 11,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000087",
    imageUrl: "/products/catalog/000087.jpg",
    name: "Case sadhu grande full print",
    category: "acessorios",
    price: 120.0,
    stock: 8,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000085",
    imageUrl: "/products/catalog/000085.jpg",
    name: "Case sadhu media",
    category: "acessorios",
    price: 100.0,
    stock: 6,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000086",
    imageUrl: "/products/catalog/000086.jpg",
    name: "Case sadhu pequena",
    category: "acessorios",
    price: 80.0,
    stock: 5,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000305-1",
    imageUrl: "/products/catalog/000305-1.jpg",
    name: "Chaveiro porta clipper",
    category: "acessorios",
    price: 30.0,
    stock: 5,
    description: "Isqueiro recarregável, resistente e de fácil aceso."
  },
  {
    id: "000122-1",
    imageUrl: "/products/catalog/000122-1.jpg",
    name: "Cinzeiro automotivo",
    category: "acessorios",
    price: 25.0,
    stock: 10,
    description: "Cinzeiro prático, fácil de limpar e guardar."
  },
  {
    id: "000033-5",
    imageUrl: "/products/catalog/000033-5.jpg",
    name: "Cinzeiro automotivo cânhamo",
    category: "acessorios",
    price: 25.0,
    stock: 9,
    description: "Cinzeiro prático, fácil de limpar e guardar."
  },
  {
    id: "000121-1",
    imageUrl: "/products/catalog/000121-1.jpg",
    name: "Cinzeiro de vidro",
    category: "acessorios",
    price: 30.0,
    stock: 13,
    description: "Cinzeiro prático, fácil de limpar e guardar."
  },
  {
    id: "000071",
    imageUrl: "/products/catalog/000071.jpg",
    name: "Cinzeiro gelo",
    category: "acessorios",
    price: 40.0,
    stock: 4,
    description: "Cinzeiro prático, fácil de limpar e guardar."
  },
  {
    id: "000125-1",
    imageUrl: "/products/catalog/000125-1.jpg",
    name: "Cinzeiro metal",
    category: "acessorios",
    price: 15.0,
    stock: 3,
    description: "Cinzeiro prático, fácil de limpar e guardar.",
    badge: "Últimas unidades"
  },
  {
    id: "000123-1",
    imageUrl: "/products/catalog/000123-1.jpg",
    name: "Cinzeiro sadhu metal",
    category: "acessorios",
    price: 18.0,
    stock: 2,
    description: "Cinzeiro prático, fácil de limpar e guardar.",
    badge: "Últimas unidades"
  },
  {
    id: "000127-1",
    imageUrl: "/products/catalog/000127-1.jpg",
    name: "Cinzeiro silicone quadrado",
    category: "acessorios",
    price: 15.0,
    stock: 6,
    description: "Cinzeiro prático, fácil de limpar e guardar."
  },
  {
    id: "000126-1",
    imageUrl: "/products/catalog/000126-1.jpg",
    name: "Cinzeiro silicone redondo",
    category: "acessorios",
    price: 15.0,
    stock: 1,
    description: "Cinzeiro prático, fácil de limpar e guardar.",
    badge: "Últimas unidades"
  },
  {
    id: "000124-1",
    imageUrl: "/products/catalog/000124-1.jpg",
    name: "Cinzeiro smoke haze",
    category: "acessorios",
    price: 25.0,
    stock: 2,
    description: "Cinzeiro prático, fácil de limpar e guardar.",
    badge: "Últimas unidades"
  },
  {
    id: "000003-5",
    imageUrl: "/products/catalog/000003-5.jpg",
    name: "Clipper smoking",
    category: "acessorios",
    price: 10.0,
    stock: 42,
    description: "Isqueiro recarregável, resistente e de fácil aceso."
  },
  {
    id: "000231-1",
    imageUrl: "/products/catalog/000231-1.jpg",
    name: "Coletor",
    category: "acessorios",
    price: 50.0,
    stock: 0,
    description: "Coletor de vidro, prático e fácil de limpar.",
    badge: "Esgotado"
  },
  {
    id: "000283-1",
    imageUrl: "/products/catalog/000283-1.jpg",
    name: "Coletor de vidro",
    category: "acessorios",
    price: 30.0,
    stock: 4,
    description: "Coletor de vidro, prático e fácil de limpar."
  },
  {
    id: "000041-1",
    imageUrl: "/products/catalog/000041-1.jpg",
    name: "Cuia abduzido",
    category: "acessorios",
    price: 20.0,
    stock: 4,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000040-1",
    imageUrl: "/products/catalog/000040-1.jpg",
    name: "Cuia abduzido spa",
    category: "acessorios",
    price: 20.0,
    stock: 17,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000045-1",
    imageUrl: "/products/catalog/000045-1.jpg",
    name: "Cuia aura",
    category: "acessorios",
    price: 70.0,
    stock: 7,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000043-1",
    imageUrl: "/products/catalog/000043-1.jpg",
    name: "Cuia banheira",
    category: "acessorios",
    price: 15.0,
    stock: 4,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000028-5",
    name: "Cuia bem bolado",
    category: "acessorios",
    price: 25.0,
    stock: 6,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000037-5",
    imageUrl: "/products/catalog/000037-5.jpg",
    name: "Cuia cânhamo",
    category: "acessorios",
    price: 20.0,
    stock: 17,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000107",
    imageUrl: "/products/catalog/000107.jpg",
    name: "Cuia desenhada",
    category: "acessorios",
    price: 20.0,
    stock: 5,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000068",
    imageUrl: "/products/catalog/000068.jpg",
    name: "Cuia gelo",
    category: "acessorios",
    price: 30.0,
    stock: 15,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000067",
    imageUrl: "/products/catalog/000067.jpg",
    name: "Cuia ice bud e toca do narguile",
    category: "acessorios",
    price: 15.0,
    stock: 75,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000094",
    imageUrl: "/products/catalog/000094.jpg",
    name: "Cuia lion circus",
    category: "acessorios",
    price: 25.0,
    stock: 10,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000072",
    imageUrl: "/products/catalog/000072.jpg",
    name: "Cuia mini",
    category: "acessorios",
    price: 10.0,
    stock: 27,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000044-1",
    imageUrl: "/products/catalog/000044-1.jpg",
    name: "Cuia raw",
    category: "acessorios",
    price: 38.0,
    stock: 47,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "00021-1",
    imageUrl: "/products/catalog/00021-1.jpg",
    name: "Cuia sadhu compact",
    category: "acessorios",
    price: 20.0,
    stock: 8,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000120-1",
    imageUrl: "/products/catalog/000120-1.jpg",
    name: "Cuia sadhu mini",
    category: "acessorios",
    price: 20.0,
    stock: 6,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000119-1",
    imageUrl: "/products/catalog/000119-1.jpg",
    name: "Cuia sadhu shot",
    category: "acessorios",
    price: 25.0,
    stock: 28,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000069",
    imageUrl: "/products/catalog/000069.jpg",
    name: "Cuia squadafum",
    category: "acessorios",
    price: 30.0,
    stock: 4,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000070",
    imageUrl: "/products/catalog/000070.jpg",
    name: "Cuia to na be",
    category: "acessorios",
    price: 20.0,
    stock: 5,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000030-5",
    name: "Dichavador bem bolado",
    category: "acessorios",
    price: 18.0,
    stock: 6,
    description: "Dichavador pra triturar de forma uniforme, sem esforço."
  },
  {
    id: "000145-1",
    imageUrl: "/products/catalog/000145-1.jpg",
    name: "Dichavador cubo mágico",
    category: "acessorios",
    price: 60.0,
    stock: 2,
    description: "Dichavador pra triturar de forma uniforme, sem esforço.",
    badge: "Últimas unidades"
  },
  {
    id: "000061",
    imageUrl: "/products/catalog/000061.jpg",
    name: "Dichavador de ferro da sadhu",
    category: "acessorios",
    price: 100.0,
    stock: 1,
    description: "Dichavador pra triturar de forma uniforme, sem esforço.",
    badge: "Últimas unidades"
  },
  {
    id: "000065",
    imageUrl: "/products/catalog/000065.jpg",
    name: "Dichavador de plastico sadhu grande",
    category: "acessorios",
    price: 20.0,
    stock: 11,
    description: "Dichavador pra triturar de forma uniforme, sem esforço."
  },
  {
    id: "000064",
    name: "Dichavador de plastico sadhu pequeno",
    category: "acessorios",
    price: 15.0,
    stock: -1,
    description: "Dichavador pra triturar de forma uniforme, sem esforço.",
    badge: "Esgotado"
  },
  {
    id: "000144-1",
    imageUrl: "/products/catalog/000144-1.jpg",
    name: "Dichavador gato",
    category: "acessorios",
    price: 80.0,
    stock: 1,
    description: "Dichavador pra triturar de forma uniforme, sem esforço.",
    badge: "Últimas unidades"
  },
  {
    id: "000139-1",
    imageUrl: "/products/catalog/000139-1.jpg",
    name: "Dichavador metal grande",
    category: "acessorios",
    price: 50.0,
    stock: 1,
    description: "Dichavador pra triturar de forma uniforme, sem esforço.",
    badge: "Últimas unidades"
  },
  {
    id: "000140-1",
    imageUrl: "/products/catalog/000140-1.jpg",
    name: "Dichavador metal mini",
    category: "acessorios",
    price: 20.0,
    stock: 2,
    description: "Dichavador pra triturar de forma uniforme, sem esforço.",
    badge: "Últimas unidades"
  },
  {
    id: "000143-1",
    imageUrl: "/products/catalog/000143-1.jpg",
    name: "Dichavador Rick",
    category: "acessorios",
    price: 80.0,
    stock: 2,
    description: "Dichavador pra triturar de forma uniforme, sem esforço.",
    badge: "Últimas unidades"
  },
  {
    id: "000114",
    imageUrl: "/products/catalog/000114.jpg",
    name: "Dichavador Rick and Marty grande",
    category: "acessorios",
    price: 60.0,
    stock: 12,
    description: "Dichavador pra triturar de forma uniforme, sem esforço."
  },
  {
    id: "000113",
    imageUrl: "/products/catalog/000113.jpg",
    name: "Dichavador Rick and Marty pequeno",
    category: "acessorios",
    price: 50.0,
    stock: 8,
    description: "Dichavador pra triturar de forma uniforme, sem esforço."
  },
  {
    id: "000142-1",
    imageUrl: "/products/catalog/000142-1.jpg",
    name: "Dichavador slum",
    category: "acessorios",
    price: 10.0,
    stock: 2,
    description: "Dichavador pra triturar de forma uniforme, sem esforço.",
    badge: "Últimas unidades"
  },
  {
    id: "000277-1",
    imageUrl: "/products/catalog/000277-1.jpg",
    name: "Espátula metal para meleca",
    category: "acessorios",
    price: 10.0,
    stock: 2,
    description: "Espátula de metal pra limpar sem desperdiçar nada.",
    badge: "Últimas unidades"
  },
  {
    id: "000251-1",
    imageUrl: "/products/catalog/000251-1.jpg",
    name: "Estampa puff",
    category: "acessorios",
    price: 14.0,
    stock: 9,
    description: "Item com estampa exclusiva, pra dar seu estilo."
  },
  {
    id: "1",
    name: "Etiqueta suco",
    category: "acessorios",
    price: 0.0,
    stock: 433,
    description: "Suco natural, refrescante pra qualquer hora."
  },
  {
    id: "000281-1",
    name: "Filtro acrema",
    category: "sedas",
    price: 13.0,
    stock: 0,
    description: "Filtro pra deixar a tragada mais suave.",
    badge: "Esgotado"
  },
  {
    id: "000275-1",
    name: "Filtro guru spirit",
    category: "sedas",
    price: 10.0,
    stock: -1,
    description: "Filtro pra deixar a tragada mais suave.",
    badge: "Esgotado"
  },
  {
    id: "000280-0",
    name: "Filtro palmer",
    category: "sedas",
    price: 9.0,
    stock: 10,
    description: "Filtro pra deixar a tragada mais suave."
  },
  {
    id: "000261-1",
    imageUrl: "/products/catalog/000261-1.jpg",
    name: "Filtro smoking",
    category: "sedas",
    price: 1.0,
    stock: 135,
    description: "Filtro pra deixar a tragada mais suave."
  },
  {
    id: "000112-1",
    imageUrl: "/products/catalog/000112-1.jpg",
    name: "Fluido para isqueiro",
    category: "acessorios",
    price: 25.0,
    stock: 2,
    description: "Isqueiro prático pra acender sem complicação.",
    badge: "Últimas unidades"
  },
  {
    id: "10",
    name: "Garrafinha 300ml",
    category: "acessorios",
    price: 0.0,
    stock: 100,
    description: "Garrafinha prática pra levar sua bebida."
  },
  {
    id: "000113-1",
    imageUrl: "/products/catalog/000113-1.jpg",
    name: "Gás butano",
    category: "acessorios",
    price: 30.0,
    stock: 7,
    description: "Gás butano pra recarregar isqueiros e maçaricos."
  },
  {
    id: "000214-1",
    imageUrl: "/products/catalog/000214-1.jpg",
    name: "Isqueiro bic personalizado",
    category: "acessorios",
    price: 10.0,
    stock: 41,
    description: "Isqueiro prático pra acender sem complicação."
  },
  {
    id: "000055",
    imageUrl: "/products/catalog/000055.jpg",
    name: "Isqueiro clipper",
    category: "acessorios",
    price: 10.0,
    stock: 101,
    description: "Isqueiro prático pra acender sem complicação."
  },
  {
    id: "000111-1",
    name: "Isqueiro de fluido",
    category: "acessorios",
    price: 25.0,
    stock: 1,
    description: "Isqueiro prático pra acender sem complicação.",
    badge: "Últimas unidades"
  },
  {
    id: "000215-1",
    imageUrl: "/products/catalog/000215-1.jpg",
    name: "Isqueiro gti",
    category: "acessorios",
    price: 5.0,
    stock: 16,
    description: "Isqueiro prático pra acender sem complicação."
  },
  {
    id: "000057",
    imageUrl: "/products/catalog/000057.jpg",
    name: "Isqueiro mini moon",
    category: "acessorios",
    price: 2.0,
    stock: 112,
    description: "Isqueiro prático pra acender sem complicação."
  },
  {
    id: "000104",
    imageUrl: "/products/catalog/000104.jpg",
    name: "Isqueiro puff emborrachado",
    category: "acessorios",
    price: 45.0,
    stock: 11,
    description: "Isqueiro prático pra acender sem complicação."
  },
  {
    id: "000107-1",
    imageUrl: "/products/catalog/000107-1.jpg",
    name: "Isqueiro raw",
    category: "acessorios",
    price: 50.0,
    stock: 17,
    description: "Isqueiro prático pra acender sem complicação."
  },
  {
    id: "000123",
    name: "Isqueiro recarregável",
    category: "acessorios",
    price: 5.0,
    stock: 100,
    description: "Isqueiro prático pra acender sem complicação."
  },
  {
    id: "000216-1",
    imageUrl: "/products/catalog/000216-1.jpg",
    name: "Isqueiro simples",
    category: "acessorios",
    price: 3.0,
    stock: 100,
    description: "Isqueiro prático pra acender sem complicação."
  },
  {
    id: "000297-1",
    imageUrl: "/products/catalog/000297-1.jpg",
    name: "Kit bandeja",
    category: "acessorios",
    price: 20.0,
    stock: 9,
    description: "Bandeja espaçosa pra organizar tudo na hora de preparar."
  },
  {
    id: "000112",
    imageUrl: "/products/catalog/000112.jpg",
    name: "Kit bong de vidro",
    category: "acessorios",
    price: 250.0,
    stock: 1,
    description: "Bong pra uma tragada mais suave e filtrada.",
    badge: "Últimas unidades"
  },
  {
    id: "000100",
    imageUrl: "/products/catalog/000100.jpg",
    name: "Kit case Mr. Baba grande",
    category: "acessorios",
    price: 80.0,
    stock: 3,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000295-1",
    name: "Kit case Mr. Baba média",
    category: "acessorios",
    price: 70.0,
    stock: 0,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Esgotado"
  },
  {
    id: "000273-1",
    name: "Kit dichavador + pipe",
    category: "acessorios",
    price: 20.0,
    stock: 0,
    description: "Dichavador pra triturar de forma uniforme, sem esforço.",
    badge: "Esgotado"
  },
  {
    id: "000120",
    imageUrl: "/products/catalog/000120.jpg",
    name: "Kit montado de 100",
    category: "sedas",
    price: 100.0,
    stock: 3,
    description: "Kit completo com os itens essenciais pra sua sessão.",
    badge: "Últimas unidades"
  },
  {
    id: "000232-1",
    imageUrl: "/products/catalog/000232-1.jpg",
    name: "Kit montado de 50",
    category: "sedas",
    price: 50.0,
    stock: 4,
    description: "Kit completo com os itens essenciais pra sua sessão."
  },
  {
    id: "000044-5",
    name: "Kit montado de 60",
    category: "sedas",
    price: 60.0,
    stock: 0,
    description: "Kit completo com os itens essenciais pra sua sessão.",
    badge: "Esgotado"
  },
  {
    id: "000129-1",
    name: "Kit sadhu cuia + tesoura metal",
    category: "acessorios",
    price: 35.0,
    stock: 0,
    description: "Cuia pra preparar com mais espaço e conforto.",
    badge: "Esgotado"
  },
  {
    id: "000130-1",
    name: "Kit sadhu cuia grande + tesoura metal",
    category: "acessorios",
    price: 50.0,
    stock: 0,
    description: "Cuia pra preparar com mais espaço e conforto.",
    badge: "Esgotado"
  },
  {
    id: "000131-1",
    imageUrl: "/products/catalog/000131-1.jpg",
    name: "Kit sadhu spliff branco",
    category: "sedas",
    price: 40.0,
    stock: 12,
    description: "Kit completo com os itens essenciais pra sua sessão."
  },
  {
    id: "000132-1",
    imageUrl: "/products/catalog/000132-1.jpg",
    name: "Kit sadhu spliff preto",
    category: "sedas",
    price: 40.0,
    stock: 12,
    description: "Kit completo com os itens essenciais pra sua sessão."
  },
  {
    id: "000296-1",
    imageUrl: "/products/catalog/000296-1.jpg",
    name: "Lúpulo",
    category: "acessorios",
    price: 30.0,
    stock: 1,
    description: "Lúpulo selecionado pra dar aquele toque especial.",
    badge: "Últimas unidades"
  },
  {
    id: "000056",
    imageUrl: "/products/catalog/000056.jpg",
    name: "Maçarico blaz",
    category: "acessorios",
    price: 15.0,
    stock: 18,
    description: "Maçarico recarregável, chama forte e constante."
  },
  {
    id: "000116-1",
    imageUrl: "/products/catalog/000116-1.jpg",
    name: "Maçarico blaz com tampa",
    category: "acessorios",
    price: 20.0,
    stock: 0,
    description: "Maçarico recarregável, chama forte e constante.",
    badge: "Esgotado"
  },
  {
    id: "000118-1",
    imageUrl: "/products/catalog/000118-1.jpg",
    name: "Maçarico de 10",
    category: "acessorios",
    price: 10.0,
    stock: 0,
    description: "Maçarico recarregável, chama forte e constante.",
    badge: "Esgotado"
  },
  {
    id: "000115-1",
    imageUrl: "/products/catalog/000115-1.jpg",
    name: "Maçarico fire",
    category: "acessorios",
    price: 25.0,
    stock: 1,
    description: "Maçarico recarregável, chama forte e constante.",
    badge: "Últimas unidades"
  },
  {
    id: "000117-1",
    imageUrl: "/products/catalog/000117-1.jpg",
    name: "Maçarico grande",
    category: "acessorios",
    price: 30.0,
    stock: 4,
    description: "Maçarico recarregável, chama forte e constante."
  },
  {
    id: "000025-5",
    name: "Maçarico guru",
    category: "acessorios",
    price: 15.0,
    stock: 0,
    description: "Maçarico recarregável, chama forte e constante.",
    badge: "Esgotado"
  },
  {
    id: "000110-1",
    imageUrl: "/products/catalog/000110-1.jpg",
    name: "Maçarico naar",
    category: "acessorios",
    price: 50.0,
    stock: 7,
    description: "Maçarico recarregável, chama forte e constante."
  },
  {
    id: "000244-1",
    name: "Maçarico pistola",
    category: "acessorios",
    price: 120.0,
    stock: 0,
    description: "Maçarico recarregável, chama forte e constante.",
    badge: "Esgotado"
  },
  {
    id: "000011-5",
    imageUrl: "/products/catalog/000011-5.jpg",
    name: "Maçarico pistola com led",
    category: "acessorios",
    price: 140.0,
    stock: 5,
    description: "Maçarico recarregável, chama forte e constante."
  },
  {
    id: "000012-5",
    imageUrl: "/products/catalog/000012-5.jpg",
    name: "Maçarico pistola sniper",
    category: "acessorios",
    price: 70.0,
    stock: 1,
    description: "Maçarico recarregável, chama forte e constante.",
    badge: "Últimas unidades"
  },
  {
    id: "000124",
    name: "Maçarico recarregável",
    category: "acessorios",
    price: 5.0,
    stock: 49,
    description: "Maçarico recarregável, chama forte e constante."
  },
  {
    id: "000054",
    imageUrl: "/products/catalog/000054.jpg",
    name: "Maçarico sadhu",
    category: "acessorios",
    price: 35.0,
    stock: 15,
    description: "Maçarico recarregável, chama forte e constante."
  },
  {
    id: "000325-1",
    imageUrl: "/products/catalog/000325-1.jpg",
    name: "Maçarico sadhu mundial",
    category: "acessorios",
    price: 35.0,
    stock: 7,
    description: "Maçarico recarregável, chama forte e constante."
  },
  {
    id: "000108-1",
    imageUrl: "/products/catalog/000108-1.jpg",
    name: "Maçarico smoking zengaz",
    category: "acessorios",
    price: 40.0,
    stock: 2,
    description: "Maçarico recarregável, chama forte e constante.",
    badge: "Últimas unidades"
  },
  {
    id: "000024-5",
    name: "Maçarico WF",
    category: "acessorios",
    price: 15.0,
    stock: 18,
    description: "Maçarico recarregável, chama forte e constante."
  },
  {
    id: "000109-1",
    imageUrl: "/products/catalog/000109-1.jpg",
    name: "Maçarico zengaz",
    category: "acessorios",
    price: 30.0,
    stock: 7,
    description: "Maçarico recarregável, chama forte e constante."
  },
  {
    id: "000018-5",
    imageUrl: "/products/catalog/000018-5.jpg",
    name: "Maçarico zengaz grande",
    category: "acessorios",
    price: 60.0,
    stock: 2,
    description: "Maçarico recarregável, chama forte e constante.",
    badge: "Últimas unidades"
  },
  {
    id: "000288-1",
    imageUrl: "/products/catalog/000288-1.jpg",
    name: "Papel dover grande",
    category: "sedas",
    price: 25.0,
    stock: 14,
    description: "Item selecionado do nosso catálogo, direto pra sua sessão."
  },
  {
    id: "000060",
    imageUrl: "/products/catalog/000060.jpg",
    name: "Papel dover pequeno",
    category: "sedas",
    price: 20.0,
    stock: 12,
    description: "Item selecionado do nosso catálogo, direto pra sua sessão."
  },
  {
    id: "000245-1",
    imageUrl: "/products/catalog/000245-1.jpg",
    name: "Pega rato",
    category: "acessorios",
    price: 20.0,
    stock: 6,
    description: "Item prático de limpeza e organização."
  },
  {
    id: "000004-5",
    imageUrl: "/products/catalog/000004-5.jpg",
    name: "Piteira 710 larga",
    category: "sedas",
    price: 6.0,
    stock: 10,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000014-1",
    imageUrl: "/products/catalog/000014-1.jpg",
    name: "Piteira 710 mega larga",
    category: "sedas",
    price: 8.0,
    stock: 1,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Últimas unidades"
  },
  {
    id: "000022-1",
    imageUrl: "/products/catalog/000022-1.jpg",
    name: "Piteira A piteira eco",
    category: "sedas",
    price: 5.0,
    stock: 24,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000021-1",
    imageUrl: "/products/catalog/000021-1.jpg",
    name: "Piteira A piteira gorilla",
    category: "sedas",
    price: 7.0,
    stock: 11,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000020-1",
    imageUrl: "/products/catalog/000020-1.jpg",
    name: "Piteira A piteira mega longa",
    category: "sedas",
    price: 8.0,
    stock: 15,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000007-1",
    imageUrl: "/products/catalog/000007-1.jpg",
    name: "Piteira abduzido extra larga",
    category: "sedas",
    price: 7.0,
    stock: 3,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Últimas unidades"
  },
  {
    id: "000009-5",
    imageUrl: "/products/catalog/000009-5.jpg",
    name: "Piteira abduzido extra longa",
    category: "sedas",
    price: 9.0,
    stock: 20,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000008-1",
    imageUrl: "/products/catalog/000008-1.jpg",
    name: "Piteira abduzido larga",
    category: "sedas",
    price: 6.0,
    stock: 4,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000010-5",
    imageUrl: "/products/catalog/000010-5.jpg",
    name: "Piteira abduzido monster size",
    category: "sedas",
    price: 9.0,
    stock: 20,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000053-1",
    imageUrl: "/products/catalog/000053-1.jpg",
    name: "Piteira Badauí",
    category: "sedas",
    price: 7.0,
    stock: 13,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000072-1",
    imageUrl: "/products/catalog/000072-1.jpg",
    name: "Piteira bem bolado hiper larga marrom",
    category: "sedas",
    price: 7.0,
    stock: 20,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000071-1",
    imageUrl: "/products/catalog/000071-1.jpg",
    name: "Piteira bem bolado hiper larga rosa",
    category: "sedas",
    price: 7.0,
    stock: 22,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000050",
    imageUrl: "/products/catalog/000050.jpg",
    name: "Piteira bem bolado super larga marron",
    category: "sedas",
    price: 6.0,
    stock: 8,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000052",
    imageUrl: "/products/catalog/000052.jpg",
    name: "Piteira bem bolado super larga rosa",
    category: "sedas",
    price: 6.0,
    stock: 22,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000051",
    imageUrl: "/products/catalog/000051.jpg",
    name: "Piteira bem bolado super larga verde",
    category: "sedas",
    price: 6.0,
    stock: 29,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000055-1",
    imageUrl: "/products/catalog/000055-1.jpg",
    name: "Piteira blue ice",
    category: "sedas",
    price: 7.0,
    stock: 18,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000026-1",
    imageUrl: "/products/catalog/000026-1.jpg",
    name: "Piteira bud charlies",
    category: "sedas",
    price: 6.0,
    stock: 7,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000016-1",
    imageUrl: "/products/catalog/000016-1.jpg",
    name: "Piteira cremaria extra larga",
    category: "sedas",
    price: 6.0,
    stock: 22,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000018-1",
    imageUrl: "/products/catalog/000018-1.jpg",
    name: "Piteira cremaria larga",
    category: "sedas",
    price: 6.0,
    stock: 21,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000017-1",
    imageUrl: "/products/catalog/000017-1.jpg",
    name: "Piteira cremaria mega larga",
    category: "sedas",
    price: 6.0,
    stock: 24,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000303-1",
    imageUrl: "/products/catalog/000303-1.jpg",
    name: "Piteira de vidro",
    category: "sedas",
    price: 8.0,
    stock: 59,
    description: "Piteira de vidro reutilizável, fácil de limpar."
  },
  {
    id: "000312-1",
    imageUrl: "/products/catalog/000312-1.jpg",
    name: "Piteira de vidro AK47",
    category: "sedas",
    price: 80.0,
    stock: 2,
    description: "Piteira de vidro reutilizável, fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000029-1",
    imageUrl: "/products/catalog/000029-1.jpg",
    name: "Piteira de vidro bud charlies",
    category: "sedas",
    price: 120.0,
    stock: 6,
    description: "Piteira de vidro reutilizável, fácil de limpar."
  },
  {
    id: "000234-1",
    imageUrl: "/products/catalog/000234-1.jpg",
    name: "Piteira de vidro de 15",
    category: "sedas",
    price: 15.0,
    stock: 17,
    description: "Piteira de vidro reutilizável, fácil de limpar."
  },
  {
    id: "000233-1",
    imageUrl: "/products/catalog/000233-1.jpg",
    name: "Piteira de vidro de 20",
    category: "sedas",
    price: 20.0,
    stock: 90,
    description: "Piteira de vidro reutilizável, fácil de limpar."
  },
  {
    id: "000227-1",
    imageUrl: "/products/catalog/000227-1.jpg",
    name: "Piteira de vidro de 40",
    category: "sedas",
    price: 40.0,
    stock: 7,
    description: "Piteira de vidro reutilizável, fácil de limpar."
  },
  {
    id: "000226-1",
    imageUrl: "/products/catalog/000226-1.jpg",
    name: "Piteira de vidro de 60",
    category: "sedas",
    price: 60.0,
    stock: 8,
    description: "Piteira de vidro reutilizável, fácil de limpar."
  },
  {
    id: "000117",
    imageUrl: "/products/catalog/000117.jpg",
    name: "Piteira de vidro duplo",
    category: "sedas",
    price: 30.0,
    stock: 1,
    description: "Piteira de vidro reutilizável, fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000323-1",
    imageUrl: "/products/catalog/000323-1.jpg",
    name: "Piteira de vidro hippster",
    category: "sedas",
    price: 20.0,
    stock: 16,
    description: "Piteira de vidro reutilizável, fácil de limpar."
  },
  {
    id: "000054-1",
    imageUrl: "/products/catalog/000054-1.jpg",
    name: "Piteira de vidro Nilo",
    category: "sedas",
    price: 35.0,
    stock: 2,
    description: "Piteira de vidro reutilizável, fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000225-1",
    imageUrl: "/products/catalog/000225-1.jpg",
    name: "Piteira de vidro Rick/Meninas Super",
    category: "sedas",
    price: 20.0,
    stock: 30,
    description: "Piteira de vidro reutilizável, fácil de limpar."
  },
  {
    id: "000228-1",
    name: "Piteira de vidro sadhu",
    category: "sedas",
    price: 30.0,
    stock: 0,
    description: "Piteira de vidro reutilizável, fácil de limpar.",
    badge: "Esgotado"
  },
  {
    id: "000230-1",
    imageUrl: "/products/catalog/000230-1.jpg",
    name: "Piteira de vidro simples",
    category: "sedas",
    price: 5.0,
    stock: 184,
    description: "Piteira de vidro reutilizável, fácil de limpar."
  },
  {
    id: "000229-1",
    name: "Piteira de vidro simples longa",
    category: "sedas",
    price: 10.0,
    stock: -2,
    description: "Piteira de vidro reutilizável, fácil de limpar.",
    badge: "Esgotado"
  },
  {
    id: "000284-1",
    imageUrl: "/products/catalog/000284-1.jpg",
    name: "Piteira de vidro vapor de prata",
    category: "sedas",
    price: 70.0,
    stock: 4,
    description: "Piteira de vidro reutilizável, fácil de limpar."
  },
  {
    id: "000008",
    imageUrl: "/products/catalog/000008.jpg",
    name: "Piteira gelo",
    category: "sedas",
    price: 7.0,
    stock: 69,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000013-1",
    imageUrl: "/products/catalog/000013-1.jpg",
    name: "Piteira gelo mega larga",
    category: "sedas",
    price: 9.0,
    stock: 22,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000018",
    name: "Piteira Gordão head shop",
    category: "sedas",
    price: 6.0,
    stock: 0,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Esgotado"
  },
  {
    id: "000028-1",
    imageUrl: "/products/catalog/000028-1.jpg",
    name: "Piteira guru spirit mega larga branca",
    category: "sedas",
    price: 6.0,
    stock: 4,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000030-1",
    imageUrl: "/products/catalog/000030-1.jpg",
    name: "Piteira guru spirit mega larga marrom",
    category: "sedas",
    price: 6.0,
    stock: 6,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000027-1",
    imageUrl: "/products/catalog/000027-1.jpg",
    name: "Piteira guru spirit mega larga verge",
    category: "sedas",
    price: 6.0,
    stock: 5,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000301-1",
    imageUrl: "/products/catalog/000301-1.jpg",
    name: "Piteira hippster club",
    category: "sedas",
    price: 10.0,
    stock: 38,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000039-1",
    imageUrl: "/products/catalog/000039-1.jpg",
    name: "Piteira hornet",
    category: "sedas",
    price: 4.0,
    stock: 49,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000015-1",
    imageUrl: "/products/catalog/000015-1.jpg",
    name: "Piteira king XXL",
    category: "sedas",
    price: 7.0,
    stock: 13,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000031-1",
    imageUrl: "/products/catalog/000031-1.jpg",
    name: "Piteira lion circus extra larga",
    category: "sedas",
    price: 7.0,
    stock: 17,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000099",
    imageUrl: "/products/catalog/000099.jpg",
    name: "Piteira lion circus longa",
    category: "sedas",
    price: 7.0,
    stock: 21,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000097",
    imageUrl: "/products/catalog/000097.jpg",
    name: "Piteira lion circus mega longa",
    category: "sedas",
    price: 7.0,
    stock: 9,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000098",
    imageUrl: "/products/catalog/000098.jpg",
    name: "Piteira lion circus ultra longa",
    category: "sedas",
    price: 7.0,
    stock: 22,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000024-1",
    imageUrl: "/products/catalog/000024-1.jpg",
    name: "Piteira mirage longa",
    category: "sedas",
    price: 6.0,
    stock: 21,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000023-1",
    imageUrl: "/products/catalog/000023-1.jpg",
    name: "Piteira mirage mega longa",
    category: "sedas",
    price: 7.0,
    stock: 5,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000025-1",
    imageUrl: "/products/catalog/000025-1.jpg",
    name: "Piteira mirage super larga",
    category: "sedas",
    price: 6.0,
    stock: 4,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000049",
    imageUrl: "/products/catalog/000049.jpg",
    name: "Piteira nilo",
    category: "sedas",
    price: 8.0,
    stock: 8,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000090-1",
    imageUrl: "/products/catalog/000090-1.jpg",
    name: "Piteira papelito larga",
    category: "sedas",
    price: 6.0,
    stock: 18,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000092-1",
    imageUrl: "/products/catalog/000092-1.jpg",
    name: "Piteira papelito longa",
    category: "sedas",
    price: 6.0,
    stock: 22,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "00095-1",
    imageUrl: "/products/catalog/00095-1.jpg",
    name: "Piteira papelito mega longa",
    category: "sedas",
    price: 7.0,
    stock: 21,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000091-1",
    imageUrl: "/products/catalog/000091-1.jpg",
    name: "Piteira papelito tradicional",
    category: "sedas",
    price: 5.0,
    stock: 29,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000093-1",
    imageUrl: "/products/catalog/000093-1.jpg",
    name: "Piteira papelito ultra longa",
    category: "sedas",
    price: 6.0,
    stock: 18,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000032-1",
    imageUrl: "/products/catalog/000032-1.jpg",
    name: "Piteira puff extra larga",
    category: "sedas",
    price: 7.0,
    stock: 15,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000033-1",
    imageUrl: "/products/catalog/000033-1.jpg",
    name: "Piteira puff larga",
    category: "sedas",
    price: 7.0,
    stock: 17,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000035-1",
    imageUrl: "/products/catalog/000035-1.jpg",
    name: "Piteira raw Matuê",
    category: "sedas",
    price: 8.0,
    stock: 41,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000041-5",
    imageUrl: "/products/catalog/000041-5.jpg",
    name: "Piteira RD",
    category: "sedas",
    price: 6.0,
    stock: 48,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000271-1",
    imageUrl: "/products/catalog/000271-1.jpg",
    name: "Piteira reggae",
    category: "sedas",
    price: 1.0,
    stock: 14,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000050-1",
    imageUrl: "/products/catalog/000050-1.jpg",
    name: "Piteira sadhu larga branca",
    category: "sedas",
    price: 5.0,
    stock: 7,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000051-1",
    imageUrl: "/products/catalog/000051-1.jpg",
    name: "Piteira sadhu larga marrom",
    category: "sedas",
    price: 4.0,
    stock: 6,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000052-1",
    imageUrl: "/products/catalog/000052-1.jpg",
    name: "Piteira sadhu larga preta",
    category: "sedas",
    price: 5.0,
    stock: 5,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000017",
    name: "Piteira sadhu mega larga branca",
    category: "sedas",
    price: 6.0,
    stock: -9,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Esgotado"
  },
  {
    id: "000060-1",
    imageUrl: "/products/catalog/000060-1.jpg",
    name: "Piteira sadhu mega larga marrom",
    category: "sedas",
    price: 6.0,
    stock: 33,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000016",
    imageUrl: "/products/catalog/000016.jpg",
    name: "Piteira sadhu mega larga preta",
    category: "sedas",
    price: 6.0,
    stock: 1,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Últimas unidades"
  },
  {
    id: "000059-1",
    imageUrl: "/products/catalog/000059-1.jpg",
    name: "Piteira sadhu rosa",
    category: "sedas",
    price: 6.0,
    stock: 19,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000048-1",
    imageUrl: "/products/catalog/000048-1.jpg",
    name: "Piteira sadhu slim branca",
    category: "sedas",
    price: 4.0,
    stock: 3,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Últimas unidades"
  },
  {
    id: "000049-1",
    imageUrl: "/products/catalog/000049-1.jpg",
    name: "Piteira sadhu slim preta",
    category: "sedas",
    price: 4.0,
    stock: 48,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000053",
    imageUrl: "/products/catalog/000053.jpg",
    name: "Piteira sadhu ultra larga",
    category: "sedas",
    price: 7.0,
    stock: 2,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Últimas unidades"
  },
  {
    id: "000291-1",
    imageUrl: "/products/catalog/000291-1.jpg",
    name: "Piteira sadhu ultra larga mundial",
    category: "sedas",
    price: 7.0,
    stock: -2,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Esgotado"
  },
  {
    id: "000020",
    imageUrl: "/products/catalog/000020.jpg",
    name: "Piteira sesh larga",
    category: "sedas",
    price: 5.0,
    stock: 12,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000037-1",
    imageUrl: "/products/catalog/000037-1.jpg",
    name: "Piteira sesh small",
    category: "sedas",
    price: 3.0,
    stock: 23,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000034-1",
    imageUrl: "/products/catalog/000034-1.jpg",
    name: "Piteira sesh XL",
    category: "sedas",
    price: 6.0,
    stock: 11,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000019-1",
    imageUrl: "/products/catalog/000019-1.jpg",
    name: "Piteira squadafum",
    category: "sedas",
    price: 6.0,
    stock: 17,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000036-1",
    imageUrl: "/products/catalog/000036-1.jpg",
    name: "Piteira the og larga",
    category: "sedas",
    price: 5.0,
    stock: 13,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000038-1",
    imageUrl: "/products/catalog/000038-1.jpg",
    name: "Piteira the og small",
    category: "sedas",
    price: 3.0,
    stock: 23,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000003-1",
    imageUrl: "/products/catalog/000003-1.jpg",
    name: "Piteira to na be double cotton",
    category: "sedas",
    price: 6.0,
    stock: 15,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000006-1",
    name: "Piteira to na be hiper longa",
    category: "sedas",
    price: 8.0,
    stock: -8,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Esgotado"
  },
  {
    id: "000002-1",
    imageUrl: "/products/catalog/000002-1.jpg",
    name: "Piteira to na be larga",
    category: "sedas",
    price: 6.0,
    stock: 0,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Esgotado"
  },
  {
    id: "000005-1",
    imageUrl: "/products/catalog/000005-1.jpg",
    name: "Piteira to na be mega longa",
    category: "sedas",
    price: 7.0,
    stock: 37,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000019",
    imageUrl: "/products/catalog/000019.jpg",
    name: "Piteira to na be super larga",
    category: "sedas",
    price: 6.0,
    stock: 26,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000004-1",
    imageUrl: "/products/catalog/000004-1.jpg",
    name: "Piteira to na be ultra longa",
    category: "sedas",
    price: 6.0,
    stock: 1,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Últimas unidades"
  },
  {
    id: "000302-1",
    name: "Piteira vidro promoção",
    category: "sedas",
    price: 5.0,
    stock: 0,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Esgotado"
  },
  {
    id: "8",
    name: "Polpa açaí",
    category: "acessorios",
    price: 0.0,
    stock: 9,
    description: "Polpa de fruta natural, prática pra fazer sucos."
  },
  {
    id: "4",
    name: "Polpa cajá",
    category: "acessorios",
    price: 0.0,
    stock: 0,
    description: "Polpa de fruta natural, prática pra fazer sucos.",
    badge: "Esgotado"
  },
  {
    id: "6",
    name: "Polpa goiaba",
    category: "acessorios",
    price: 0.0,
    stock: 5,
    description: "Polpa de fruta natural, prática pra fazer sucos."
  },
  {
    id: "5",
    name: "Polpa laranja com acerola",
    category: "acessorios",
    price: 0.0,
    stock: 0,
    description: "Polpa de fruta natural, prática pra fazer sucos.",
    badge: "Esgotado"
  },
  {
    id: "7",
    name: "Polpa manga",
    category: "acessorios",
    price: 0.0,
    stock: 5,
    description: "Polpa de fruta natural, prática pra fazer sucos."
  },
  {
    id: "3",
    name: "Polpa maracujá",
    category: "acessorios",
    price: 0.0,
    stock: 0,
    description: "Polpa de fruta natural, prática pra fazer sucos.",
    badge: "Esgotado"
  },
  {
    id: "000247-1",
    imageUrl: "/products/catalog/000247-1.jpg",
    name: "Porta piteira de vidro grande",
    category: "sedas",
    price: 70.0,
    stock: 1,
    description: "Piteira de vidro reutilizável, fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000150-1",
    imageUrl: "/products/catalog/000150-1.jpg",
    name: "Pote hermético duplo médio",
    category: "acessorios",
    price: 20.0,
    stock: 1,
    description: "Pote hermético que mantém o aroma e a frescura.",
    badge: "Últimas unidades"
  },
  {
    id: "000149-1",
    imageUrl: "/products/catalog/000149-1.jpg",
    name: "Pote hermético duplo pequeno",
    category: "acessorios",
    price: 18.0,
    stock: 1,
    description: "Pote hermético que mantém o aroma e a frescura.",
    badge: "Últimas unidades"
  },
  {
    id: "000077",
    imageUrl: "/products/catalog/000077.jpg",
    name: "Pote hermético Gordão head shop",
    category: "acessorios",
    price: 15.0,
    stock: 16,
    description: "Pote hermético que mantém o aroma e a frescura."
  },
  {
    id: "000148-1",
    imageUrl: "/products/catalog/000148-1.jpg",
    name: "Pote hermético plástico",
    category: "acessorios",
    price: 15.0,
    stock: 3,
    description: "Pote hermético que mantém o aroma e a frescura.",
    badge: "Últimas unidades"
  },
  {
    id: "000062",
    name: "Pote hermético raw medio",
    category: "acessorios",
    price: 40.0,
    stock: 0,
    description: "Pote hermético que mantém o aroma e a frescura.",
    badge: "Esgotado"
  },
  {
    id: "000063",
    name: "Pote hermético raw pequeno",
    category: "acessorios",
    price: 30.0,
    stock: 0,
    description: "Pote hermético que mantém o aroma e a frescura.",
    badge: "Esgotado"
  },
  {
    id: "000011-1",
    imageUrl: "/products/catalog/000011-1.jpg",
    name: "Pote hermético sadhu grande",
    category: "acessorios",
    price: 70.0,
    stock: 1,
    description: "Pote hermético que mantém o aroma e a frescura.",
    badge: "Últimas unidades"
  },
  {
    id: "000010-1",
    imageUrl: "/products/catalog/000010-1.jpg",
    name: "Pote hermético sadhu médio",
    category: "acessorios",
    price: 60.0,
    stock: 1,
    description: "Pote hermético que mantém o aroma e a frescura.",
    badge: "Últimas unidades"
  },
  {
    id: "000079",
    imageUrl: "/products/catalog/000079.jpg",
    name: "Praça completa",
    category: "acessorios",
    price: 60.0,
    stock: 4,
    description: "Kit completo com os itens essenciais pra sua sessão."
  },
  {
    id: "000134-1",
    imageUrl: "/products/catalog/000134-1.jpg",
    name: "Pré bolado",
    category: "sedas",
    price: 20.0,
    stock: 27,
    description: "Pré-enrolado, prático e rápido pra usar na hora."
  },
  {
    id: "000267-1",
    imageUrl: "/products/catalog/000267-1.jpg",
    name: "Seda 1 1/4 zomo marrom",
    category: "sedas",
    price: 1.0,
    stock: 38,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000160-1",
    imageUrl: "/products/catalog/000160-1.jpg",
    name: "Seda acrema branca",
    category: "sedas",
    price: 6.0,
    stock: 137,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000161-1",
    imageUrl: "/products/catalog/000161-1.jpg",
    name: "Seda acrema marrom",
    category: "sedas",
    price: 6.0,
    stock: 147,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000158-1",
    imageUrl: "/products/catalog/000158-1.jpg",
    name: "Seda aleda clássica",
    category: "sedas",
    price: 4.0,
    stock: 17,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000159-1",
    imageUrl: "/products/catalog/000159-1.jpg",
    name: "Seda aleda ouro",
    category: "sedas",
    price: 4.0,
    stock: 3,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Últimas unidades"
  },
  {
    id: "000076-1",
    imageUrl: "/products/catalog/000076-1.jpg",
    name: "Seda bem bolado 1 1/4 100 folhas marrom",
    category: "sedas",
    price: 3.0,
    stock: 26,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000038",
    imageUrl: "/products/catalog/000038.jpg",
    name: "Seda bem bolado 1 1/4 com piteira marrom",
    category: "sedas",
    price: 7.0,
    stock: 66,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000073-1",
    imageUrl: "/products/catalog/000073-1.jpg",
    name: "Seda bem bolado 1 1/4 slim branca",
    category: "sedas",
    price: 3.0,
    stock: 4,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000037",
    imageUrl: "/products/catalog/000037.jpg",
    name: "Seda bem bolado 100 folhas branca",
    category: "sedas",
    price: 6.0,
    stock: 31,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000034",
    imageUrl: "/products/catalog/000034.jpg",
    name: "Seda bem bolado Kevin",
    category: "sedas",
    price: 5.0,
    stock: 21,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000035",
    imageUrl: "/products/catalog/000035.jpg",
    name: "Seda bem bolado larga branca",
    category: "sedas",
    price: 4.0,
    stock: 85,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000080-1",
    imageUrl: "/products/catalog/000080-1.jpg",
    name: "Seda bem bolado larga marrom",
    category: "sedas",
    price: 4.0,
    stock: 28,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000044",
    imageUrl: "/products/catalog/000044.jpg",
    name: "Seda bem bolado longa branca",
    category: "sedas",
    price: 6.0,
    stock: 29,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000043",
    imageUrl: "/products/catalog/000043.jpg",
    name: "Seda bem bolado longa marron",
    category: "sedas",
    price: 6.0,
    stock: 55,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000077-1",
    imageUrl: "/products/catalog/000077-1.jpg",
    name: "Seda bem bolado metro",
    category: "sedas",
    price: 12.0,
    stock: 23,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000081-1",
    imageUrl: "/products/catalog/000081-1.jpg",
    name: "Seda bem bolado planet hemp",
    category: "sedas",
    price: 5.0,
    stock: 7,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000082-1",
    imageUrl: "/products/catalog/000082-1.jpg",
    name: "Seda bem bolado Sabotage",
    category: "sedas",
    price: 5.0,
    stock: 29,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000078-1",
    imageUrl: "/products/catalog/000078-1.jpg",
    name: "Seda bem bolado slim branca",
    category: "sedas",
    price: 4.0,
    stock: 11,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000078-0",
    imageUrl: "/products/catalog/000078-0.jpg",
    name: "Seda bem bolado slim marrom",
    category: "sedas",
    price: 4.0,
    stock: 47,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000036",
    imageUrl: "/products/catalog/000036.jpg",
    name: "Seda bem bolado vermelha",
    category: "sedas",
    price: 4.0,
    stock: 67,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000254-1",
    imageUrl: "/products/catalog/000254-1.jpg",
    name: "Seda black trunk",
    category: "sedas",
    price: 6.0,
    stock: 24,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000153-1",
    imageUrl: "/products/catalog/000153-1.jpg",
    name: "Seda blunt king",
    category: "sedas",
    price: 12.0,
    stock: 124,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000164-1",
    imageUrl: "/products/catalog/000164-1.jpg",
    name: "Seda bola aí branca",
    category: "sedas",
    price: 3.0,
    stock: 40,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000166-1",
    imageUrl: "/products/catalog/000166-1.jpg",
    name: "Seda bola aí marrom",
    category: "sedas",
    price: 3.0,
    stock: 48,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000165-1",
    imageUrl: "/products/catalog/000165-1.jpg",
    name: "Seda bola aí rosa",
    category: "sedas",
    price: 3.0,
    stock: 42,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000211-1",
    imageUrl: "/products/catalog/000211-1.jpg",
    name: "Seda bros com piteira rosa",
    category: "sedas",
    price: 4.0,
    stock: 5,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000154-1",
    imageUrl: "/products/catalog/000154-1.jpg",
    name: "Seda celulose 1 1/4 aleda",
    category: "sedas",
    price: 3.5,
    stock: 19,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000030",
    imageUrl: "/products/catalog/000030.jpg",
    name: "Seda celulose aleda azul",
    category: "sedas",
    price: 5.0,
    stock: 87,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000031",
    imageUrl: "/products/catalog/000031.jpg",
    name: "Seda celulose aleda verde",
    category: "sedas",
    price: 5.0,
    stock: 59,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000224-1",
    imageUrl: "/products/catalog/000224-1.jpg",
    name: "Seda de vidro",
    category: "sedas",
    price: 12.0,
    stock: 3,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Últimas unidades"
  },
  {
    id: "000253-1",
    imageUrl: "/products/catalog/000253-1.jpg",
    name: "Seda dólar",
    category: "sedas",
    price: 5.0,
    stock: 21,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000178-1",
    imageUrl: "/products/catalog/000178-1.jpg",
    name: "Seda elements branca",
    category: "sedas",
    price: 9.0,
    stock: 51,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000202-1",
    name: "Seda elements metro",
    category: "sedas",
    price: 20.0,
    stock: 0,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Esgotado"
  },
  {
    id: "000177-1",
    imageUrl: "/products/catalog/000177-1.jpg",
    name: "Seda elements rosa",
    category: "sedas",
    price: 11.0,
    stock: 33,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000179-1",
    imageUrl: "/products/catalog/000179-1.jpg",
    name: "Seda elements verde",
    category: "sedas",
    price: 7.0,
    stock: 20,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000180-1",
    imageUrl: "/products/catalog/000180-1.jpg",
    name: "Seda elements vermelha",
    category: "sedas",
    price: 5.0,
    stock: 29,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000008-5",
    imageUrl: "/products/catalog/000008-5.jpg",
    name: "Seda gelo",
    category: "sedas",
    price: 10.0,
    stock: 24,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000187-1",
    imageUrl: "/products/catalog/000187-1.jpg",
    name: "Seda guru spirit 1 1/4 slim branca",
    category: "sedas",
    price: 2.0,
    stock: 14,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000199-1",
    imageUrl: "/products/catalog/000199-1.jpg",
    name: "Seda guru spirit larga branca",
    category: "sedas",
    price: 3.0,
    stock: 35,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000188-1",
    imageUrl: "/products/catalog/000188-1.jpg",
    name: "Seda guru spirit larga marrom",
    category: "sedas",
    price: 3.0,
    stock: 16,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000046",
    imageUrl: "/products/catalog/000046.jpg",
    name: "Seda guru spirit longa larga branca",
    category: "sedas",
    price: 6.0,
    stock: 2,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Últimas unidades"
  },
  {
    id: "000048",
    imageUrl: "/products/catalog/000048.jpg",
    name: "Seda guru spirit longa larga marrom",
    category: "sedas",
    price: 6.0,
    stock: 10,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000045",
    imageUrl: "/products/catalog/000045.jpg",
    name: "Seda guru spirit longa slim branca",
    category: "sedas",
    price: 6.0,
    stock: 72,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000047",
    imageUrl: "/products/catalog/000047.jpg",
    name: "Seda guru spirit longa slim marrom",
    category: "sedas",
    price: 6.0,
    stock: 1,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Últimas unidades"
  },
  {
    id: "000197-1",
    imageUrl: "/products/catalog/000197-1.jpg",
    name: "Seda guru spirit slim branca",
    category: "sedas",
    price: 3.0,
    stock: 19,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000200-1",
    imageUrl: "/products/catalog/000200-1.jpg",
    name: "Seda guru spirit slim marrom",
    category: "sedas",
    price: 3.0,
    stock: 5,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000329-1",
    imageUrl: "/products/catalog/000329-1.jpg",
    name: "Seda king",
    category: "sedas",
    price: 3.0,
    stock: 15,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000208-1",
    imageUrl: "/products/catalog/000208-1.jpg",
    name: "Seda king branca",
    category: "sedas",
    price: 3.0,
    stock: 28,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000102",
    imageUrl: "/products/catalog/000102.jpg",
    name: "Seda king longa marrom",
    category: "sedas",
    price: 5.0,
    stock: 23,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000101",
    imageUrl: "/products/catalog/000101.jpg",
    name: "Seda king longa slim",
    category: "sedas",
    price: 5.0,
    stock: 11,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000209-1",
    imageUrl: "/products/catalog/000209-1.jpg",
    name: "Seda king marrom",
    category: "sedas",
    price: 3.0,
    stock: 32,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000328-1",
    imageUrl: "/products/catalog/000328-1.jpg",
    name: "Seda king mini",
    category: "sedas",
    price: 2.0,
    stock: 40,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000109",
    imageUrl: "/products/catalog/000109.jpg",
    name: "Seda la brisa branca",
    category: "sedas",
    price: 3.0,
    stock: 50,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000256-1",
    imageUrl: "/products/catalog/000256-1.jpg",
    name: "Seda lion circus alfafa",
    category: "sedas",
    price: 6.0,
    stock: 10,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000257-1",
    imageUrl: "/products/catalog/000257-1.jpg",
    name: "Seda lion circus com piteira",
    category: "sedas",
    price: 6.0,
    stock: 8,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000095",
    imageUrl: "/products/catalog/000095.jpg",
    name: "Seda lion circus longa slim",
    category: "sedas",
    price: 6.0,
    stock: 43,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000255-1",
    imageUrl: "/products/catalog/000255-1.jpg",
    name: "Seda lion circus marrom",
    category: "sedas",
    price: 4.0,
    stock: 27,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000096",
    imageUrl: "/products/catalog/000096.jpg",
    name: "Seda lion circus mega longa slim",
    category: "sedas",
    price: 7.0,
    stock: 41,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000176-1",
    imageUrl: "/products/catalog/000176-1.jpg",
    name: "Seda lion circus sabor chocolate",
    category: "sedas",
    price: 7.0,
    stock: 8,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000173-1",
    name: "Seda lion circus sabor morango",
    category: "sedas",
    price: 7.0,
    stock: 0,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Esgotado"
  },
  {
    id: "000175-1",
    name: "Seda lion circus sabor uva",
    category: "sedas",
    price: 7.0,
    stock: 0,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Esgotado"
  },
  {
    id: "000258-1",
    imageUrl: "/products/catalog/000258-1.jpg",
    name: "Seda lion circus slim branca",
    category: "sedas",
    price: 4.0,
    stock: 21,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000259-1",
    name: "Seda lion circus terpenada",
    category: "sedas",
    price: 18.0,
    stock: 0,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Esgotado"
  },
  {
    id: "000006",
    imageUrl: "/products/catalog/000006.jpg",
    name: "Seda longa Badauí",
    category: "sedas",
    price: 8.0,
    stock: 27,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000191-1",
    imageUrl: "/products/catalog/000191-1.jpg",
    name: "Seda mirage longa larga branca",
    category: "sedas",
    price: 6.0,
    stock: 19,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000189-1",
    imageUrl: "/products/catalog/000189-1.jpg",
    name: "Seda mirage longa larga marrom",
    category: "sedas",
    price: 6.0,
    stock: 27,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000190-1",
    imageUrl: "/products/catalog/000190-1.jpg",
    name: "Seda mirage longa slim marrom",
    category: "sedas",
    price: 6.0,
    stock: 11,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000012",
    imageUrl: "/products/catalog/000012.jpg",
    name: "Seda mirage longa slim prata",
    category: "sedas",
    price: 6.0,
    stock: 81,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000193-1",
    imageUrl: "/products/catalog/000193-1.jpg",
    name: "Seda mirage marrom",
    category: "sedas",
    price: 3.0,
    stock: 45,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000192-1",
    imageUrl: "/products/catalog/000192-1.jpg",
    name: "Seda mirage slim branca",
    category: "sedas",
    price: 3.0,
    stock: 30,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000270-1",
    imageUrl: "/products/catalog/000270-1.jpg",
    name: "Seda moon branca",
    category: "sedas",
    price: 1.0,
    stock: -23,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Esgotado"
  },
  {
    id: "000210-1",
    imageUrl: "/products/catalog/000210-1.jpg",
    name: "Seda moon com piteira marrom",
    category: "sedas",
    price: 4.0,
    stock: 21,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000157-1",
    imageUrl: "/products/catalog/000157-1.jpg",
    name: "Seda naar",
    category: "sedas",
    price: 6.0,
    stock: 48,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000163-1",
    imageUrl: "/products/catalog/000163-1.jpg",
    name: "Seda O2 longa marrom",
    category: "sedas",
    price: 5.0,
    stock: 17,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000289-1",
    imageUrl: "/products/catalog/000289-1.jpg",
    name: "Seda O2 longa slim",
    category: "sedas",
    price: 5.0,
    stock: 19,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000162-1",
    imageUrl: "/products/catalog/000162-1.jpg",
    name: "Seda O2 marrom",
    category: "sedas",
    price: 4.0,
    stock: 47,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000290-1",
    imageUrl: "/products/catalog/000290-1.jpg",
    name: "Seda O2 slim",
    category: "sedas",
    price: 4.0,
    stock: 42,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000171-1",
    imageUrl: "/products/catalog/000171-1.jpg",
    name: "Seda OCB",
    category: "sedas",
    price: 7.0,
    stock: 78,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000085-1",
    imageUrl: "/products/catalog/000085-1.jpg",
    name: "Seda papelito alfafa",
    category: "sedas",
    price: 6.0,
    stock: 43,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000084-1",
    imageUrl: "/products/catalog/000084-1.jpg",
    name: "Seda papelito com bandeja branca",
    category: "sedas",
    price: 8.0,
    stock: 12,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000039",
    imageUrl: "/products/catalog/000039.jpg",
    name: "Seda papelito com bandeja marron",
    category: "sedas",
    price: 8.0,
    stock: 37,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000040",
    imageUrl: "/products/catalog/000040.jpg",
    name: "Seda papelito com piteira slim branca",
    category: "sedas",
    price: 7.0,
    stock: 22,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000086-1",
    imageUrl: "/products/catalog/000086-1.jpg",
    name: "Seda papelito insano marrom",
    category: "sedas",
    price: 6.0,
    stock: 49,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000099-1",
    imageUrl: "/products/catalog/000099-1.jpg",
    name: "Seda papelito longa marrom",
    category: "sedas",
    price: 6.0,
    stock: 10,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000042",
    imageUrl: "/products/catalog/000042.jpg",
    name: "Seda papelito longa slim branca",
    category: "sedas",
    price: 6.0,
    stock: 40,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000098-1",
    imageUrl: "/products/catalog/000098-1.jpg",
    name: "Seda papelito longa tradicional",
    category: "sedas",
    price: 6.0,
    stock: 7,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000095-1",
    imageUrl: "/products/catalog/000095-1.jpg",
    name: "Seda papelito marrom",
    category: "sedas",
    price: 4.0,
    stock: 39,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000087-1",
    imageUrl: "/products/catalog/000087-1.jpg",
    name: "Seda papelito preta",
    category: "sedas",
    price: 6.0,
    stock: 34,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000088-1",
    imageUrl: "/products/catalog/000088-1.jpg",
    name: "Seda papelito rosa",
    category: "sedas",
    price: 6.0,
    stock: 44,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000096-1",
    imageUrl: "/products/catalog/000096-1.jpg",
    name: "Seda papelito slim branca",
    category: "sedas",
    price: 4.0,
    stock: 78,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000097-1",
    imageUrl: "/products/catalog/000097-1.jpg",
    name: "Seda papelito tradicional",
    category: "sedas",
    price: 4.0,
    stock: 40,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000040-5",
    imageUrl: "/products/catalog/000040-5.jpg",
    name: "Seda pay pay longa",
    category: "sedas",
    price: 10.0,
    stock: 42,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000170-1",
    imageUrl: "/products/catalog/000170-1.jpg",
    name: "Seda pay-pay",
    category: "sedas",
    price: 7.0,
    stock: 20,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000172-1",
    imageUrl: "/products/catalog/000172-1.jpg",
    name: "Seda pay-pay cone",
    category: "sedas",
    price: 15.0,
    stock: 26,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000152-1",
    imageUrl: "/products/catalog/000152-1.jpg",
    name: "Seda puff marrom",
    category: "sedas",
    price: 7.0,
    stock: 20,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000151-1",
    imageUrl: "/products/catalog/000151-1.jpg",
    name: "Seda puff prata",
    category: "sedas",
    price: 7.0,
    stock: 0,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Esgotado"
  },
  {
    id: "000204-1",
    imageUrl: "/products/catalog/000204-1.jpg",
    name: "Seda raw clássica",
    category: "sedas",
    price: 9.0,
    stock: 35,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000091",
    imageUrl: "/products/catalog/000091.jpg",
    name: "Seda raw dourada",
    category: "sedas",
    price: 50.0,
    stock: 46,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000026-5",
    name: "Seda raw lyrical lemonade",
    category: "sedas",
    price: 30.0,
    stock: 0,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Esgotado"
  },
  {
    id: "000203-1",
    imageUrl: "/products/catalog/000203-1.jpg",
    name: "Seda raw Matuê",
    category: "sedas",
    price: 13.0,
    stock: 27,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000293-1",
    imageUrl: "/products/catalog/000293-1.jpg",
    name: "Seda raw orgânica",
    category: "sedas",
    price: 9.0,
    stock: 30,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000205-1",
    imageUrl: "/products/catalog/000205-1.jpg",
    name: "Seda raw preta",
    category: "sedas",
    price: 11.0,
    stock: 11,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000068-1",
    imageUrl: "/products/catalog/000068-1.jpg",
    name: "Seda sadhu 1 1/4 marrom",
    category: "sedas",
    price: 3.0,
    stock: 24,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000066-1",
    imageUrl: "/products/catalog/000066-1.jpg",
    name: "Seda sadhu 1 1/4 prata",
    category: "sedas",
    price: 3.0,
    stock: 19,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000005",
    imageUrl: "/products/catalog/000005.jpg",
    name: "Seda sadhu blue ice",
    category: "sedas",
    price: 8.0,
    stock: 19,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000067-1",
    imageUrl: "/products/catalog/000067-1.jpg",
    name: "Seda sadhu com piteira marrom",
    category: "sedas",
    price: 6.0,
    stock: 3,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Últimas unidades"
  },
  {
    id: "000064-1",
    imageUrl: "/products/catalog/000064-1.jpg",
    name: "Seda sadhu larga marrom",
    category: "sedas",
    price: 4.0,
    stock: 9,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000065-1",
    imageUrl: "/products/catalog/000065-1.jpg",
    name: "Seda sadhu larga preta",
    category: "sedas",
    price: 4.0,
    stock: 19,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000009",
    imageUrl: "/products/catalog/000009.jpg",
    name: "Seda sadhu longa marrom",
    category: "sedas",
    price: 7.0,
    stock: 72,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000010",
    imageUrl: "/products/catalog/000010.jpg",
    name: "Seda sadhu longa prata",
    category: "sedas",
    price: 7.0,
    stock: 158,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000011",
    imageUrl: "/products/catalog/000011.jpg",
    name: "Seda sadhu longa preta",
    category: "sedas",
    price: 7.0,
    stock: 17,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000324-1",
    imageUrl: "/products/catalog/000324-1.jpg",
    name: "Seda sadhu longa slim mundial",
    category: "sedas",
    price: 5.0,
    stock: 1392,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000062-1",
    imageUrl: "/products/catalog/000062-1.jpg",
    name: "Seda sadhu metro marrom",
    category: "sedas",
    price: 9.0,
    stock: 13,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000063-1",
    imageUrl: "/products/catalog/000063-1.jpg",
    name: "Seda sadhu metro prata",
    category: "sedas",
    price: 9.0,
    stock: -1,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Esgotado"
  },
  {
    id: "000061-1",
    imageUrl: "/products/catalog/000061-1.jpg",
    name: "Seda sadhu metro preta",
    category: "sedas",
    price: 9.0,
    stock: 3,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Últimas unidades"
  },
  {
    id: "000033",
    imageUrl: "/products/catalog/000033.jpg",
    name: "Seda sadhu slim prata",
    category: "sedas",
    price: 4.0,
    stock: 82,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000206-1",
    imageUrl: "/products/catalog/000206-1.jpg",
    name: "Seda smk branca",
    category: "sedas",
    price: 5.0,
    stock: 41,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000207-1",
    imageUrl: "/products/catalog/000207-1.jpg",
    name: "Seda smk marrom",
    category: "sedas",
    price: 5.0,
    stock: 47,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000007-5",
    imageUrl: "/products/catalog/000007-5.jpg",
    name: "Seda smoking azul",
    category: "sedas",
    price: 7.0,
    stock: 45,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000182-1",
    imageUrl: "/products/catalog/000182-1.jpg",
    name: "Seda smoking kukuxumusu",
    category: "sedas",
    price: 7.0,
    stock: 13,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000015",
    imageUrl: "/products/catalog/000015.jpg",
    name: "Seda smoking marron",
    category: "sedas",
    price: 7.0,
    stock: 84,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000201-1",
    imageUrl: "/products/catalog/000201-1.jpg",
    name: "Seda smoking prata",
    category: "sedas",
    price: 7.0,
    stock: 35,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000014",
    imageUrl: "/products/catalog/000014.jpg",
    name: "Seda smoking preta",
    category: "sedas",
    price: 7.0,
    stock: 50,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000006-5",
    imageUrl: "/products/catalog/000006-5.jpg",
    name: "Seda smoking rosa",
    category: "sedas",
    price: 7.0,
    stock: 44,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000181-1",
    imageUrl: "/products/catalog/000181-1.jpg",
    name: "Seda smoking supreme com piteira",
    category: "sedas",
    price: 14.0,
    stock: 10,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000005-5",
    imageUrl: "/products/catalog/000005-5.jpg",
    name: "Seda smoking supreme marrom",
    category: "sedas",
    price: 7.0,
    stock: 47,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000013",
    imageUrl: "/products/catalog/000013.jpg",
    name: "Seda smoking supreme prata",
    category: "sedas",
    price: 7.0,
    stock: 126,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000169-1",
    imageUrl: "/products/catalog/000169-1.jpg",
    name: "Seda Snoop dogg",
    category: "sedas",
    price: 6.0,
    stock: 24,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000168-1",
    imageUrl: "/products/catalog/000168-1.jpg",
    name: "Seda squadafum",
    category: "sedas",
    price: 6.0,
    stock: 13,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000045-5",
    name: "Seda suave longa",
    category: "sedas",
    price: 7.0,
    stock: 25,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000196-1",
    imageUrl: "/products/catalog/000196-1.jpg",
    name: "Seda tatu do bem larga branca",
    category: "sedas",
    price: 4.0,
    stock: 10,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000311-1",
    imageUrl: "/products/catalog/000311-1.jpg",
    name: "Seda tatu do bem longa marrom",
    category: "sedas",
    price: 5.0,
    stock: 24,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000310-1",
    imageUrl: "/products/catalog/000310-1.jpg",
    name: "Seda tatu do bem longa slim branca",
    category: "sedas",
    price: 5.0,
    stock: 22,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000195-1",
    imageUrl: "/products/catalog/000195-1.jpg",
    name: "Seda tatu do bem marrom",
    category: "sedas",
    price: 4.0,
    stock: 14,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000194-1",
    imageUrl: "/products/catalog/000194-1.jpg",
    name: "Seda tatu do bem slim branca",
    category: "sedas",
    price: 4.0,
    stock: 4,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000262-1",
    name: "Seda zomo alfafa",
    category: "sedas",
    price: 3.0,
    stock: 0,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Esgotado"
  },
  {
    id: "000268-1",
    imageUrl: "/products/catalog/000268-1.jpg",
    name: "Seda zomo azul",
    category: "sedas",
    price: 1.0,
    stock: 0,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Esgotado"
  },
  {
    id: "000264-1",
    imageUrl: "/products/catalog/000264-1.jpg",
    name: "Seda zomo mansão maromba branca",
    category: "sedas",
    price: 3.0,
    stock: 21,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000265-1",
    imageUrl: "/products/catalog/000265-1.jpg",
    name: "Seda zomo mansão maromba marrom",
    category: "sedas",
    price: 3.0,
    stock: 19,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000263-1",
    imageUrl: "/products/catalog/000263-1.jpg",
    name: "Seda zomo marrom",
    category: "sedas",
    price: 2.0,
    stock: 50,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000266-1",
    imageUrl: "/products/catalog/000266-1.jpg",
    name: "Seda zomo slim branca",
    category: "sedas",
    price: 2.0,
    stock: 17,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000269-1",
    imageUrl: "/products/catalog/000269-1.jpg",
    name: "Seda zomo verde",
    category: "sedas",
    price: 1.0,
    stock: 48,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000115",
    imageUrl: "/products/catalog/000115.jpg",
    name: "Shoulder bag colmeia",
    category: "acessorios",
    price: 110.0,
    stock: 2,
    description: "Bolsa transversal prática pro dia a dia.",
    badge: "Últimas unidades"
  },
  {
    id: "000043-5",
    imageUrl: "/products/catalog/000043-5.jpg",
    name: "Slick 15ml nqt",
    category: "acessorios",
    price: 15.0,
    stock: 5,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "000218-1",
    imageUrl: "/products/catalog/000218-1.jpg",
    name: "Slick com divisória",
    category: "acessorios",
    price: 20.0,
    stock: 15,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "000002-5",
    imageUrl: "/products/catalog/000002-5.jpg",
    name: "Slick de silicone e vidro",
    category: "acessorios",
    price: 25.0,
    stock: 3,
    description: "Slick de silicone, antiaderente e fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000147-1",
    imageUrl: "/products/catalog/000147-1.jpg",
    name: "Slick de vidro grande",
    category: "acessorios",
    price: 30.0,
    stock: 3,
    description: "Slick de silicone, antiaderente e fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000146-1",
    imageUrl: "/products/catalog/000146-1.jpg",
    name: "Slick de vidro pequeno",
    category: "acessorios",
    price: 25.0,
    stock: 0,
    description: "Slick de silicone, antiaderente e fácil de limpar.",
    badge: "Esgotado"
  },
  {
    id: "000250-1",
    imageUrl: "/products/catalog/000250-1.jpg",
    name: "Slick double Gordão Head Shop",
    category: "acessorios",
    price: 55.0,
    stock: 3,
    description: "Slick de silicone, antiaderente e fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000330-1",
    imageUrl: "/products/catalog/000330-1.jpg",
    name: "Slick forminha gelo",
    category: "acessorios",
    price: 100.0,
    stock: 1,
    description: "Slick de silicone, antiaderente e fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000121",
    imageUrl: "/products/catalog/000121.jpg",
    name: "Slick ganjah",
    category: "acessorios",
    price: 14.0,
    stock: 9,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "000047-1",
    imageUrl: "/products/catalog/000047-1.jpg",
    name: "Slick gelo quadrado",
    category: "acessorios",
    price: 30.0,
    stock: 3,
    description: "Slick de silicone, antiaderente e fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000219-1",
    imageUrl: "/products/catalog/000219-1.jpg",
    name: "Slick icebud 11ml",
    category: "acessorios",
    price: 20.0,
    stock: 3,
    description: "Slick de silicone, antiaderente e fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000221-1",
    imageUrl: "/products/catalog/000221-1.jpg",
    name: "Slick icebud 5ml",
    category: "acessorios",
    price: 10.0,
    stock: 7,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "000220-1",
    imageUrl: "/products/catalog/000220-1.jpg",
    name: "Slick icebud 7ml",
    category: "acessorios",
    price: 15.0,
    stock: 24,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "000217-1",
    imageUrl: "/products/catalog/000217-1.jpg",
    name: "Slick icebud dado 7ml",
    category: "acessorios",
    price: 20.0,
    stock: 13,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "000249-1",
    imageUrl: "/products/catalog/000249-1.jpg",
    name: "Slick icebud meleca",
    category: "acessorios",
    price: 40.0,
    stock: 2,
    description: "Slick de silicone, antiaderente e fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000212-1",
    imageUrl: "/products/catalog/000212-1.jpg",
    name: "Slick icebud nuvem",
    category: "acessorios",
    price: 25.0,
    stock: 9,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "000035-5",
    imageUrl: "/products/catalog/000035-5.jpg",
    name: "Slick lego cânhamo",
    category: "acessorios",
    price: 30.0,
    stock: 4,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "000222-1",
    imageUrl: "/products/catalog/000222-1.jpg",
    name: "Slick mini",
    category: "acessorios",
    price: 5.0,
    stock: 51,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "000017-5",
    imageUrl: "/products/catalog/000017-5.jpg",
    name: "Slick tambor",
    category: "acessorios",
    price: 15.0,
    stock: 19,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "2",
    name: "Suco natural",
    category: "acessorios",
    price: 8.0,
    stock: 0,
    description: "Suco natural, refrescante pra qualquer hora.",
    badge: "Esgotado"
  },
  {
    id: "000066",
    imageUrl: "/products/catalog/000066.jpg",
    name: "Sucreme",
    category: "acessorios",
    price: 55.0,
    stock: 15,
    description: "Sucreme cremoso, prático pra preparar na hora."
  },
  {
    id: "000223-1",
    imageUrl: "/products/catalog/000223-1.jpg",
    name: "Sucreme duplo",
    category: "acessorios",
    price: 160.0,
    stock: 2,
    description: "Sucreme cremoso, prático pra preparar na hora.",
    badge: "Últimas unidades"
  },
  {
    id: "000007",
    imageUrl: "/products/catalog/000007.jpg",
    name: "Tabaco acrema",
    category: "tabaco",
    price: 20.0,
    stock: 91,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000021",
    imageUrl: "/products/catalog/000021.jpg",
    name: "Tabaco amsterdam",
    category: "tabaco",
    price: 20.0,
    stock: 4,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000070-1",
    imageUrl: "/products/catalog/000070-1.jpg",
    name: "Tabaco bem bolado enrolado",
    category: "tabaco",
    price: 25.0,
    stock: 10,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000252-1",
    imageUrl: "/products/catalog/000252-1.jpg",
    name: "Tabaco bem bolado original",
    category: "tabaco",
    price: 20.0,
    stock: 0,
    description: "Tabaco para enrolar, sabor e queima equilibrados.",
    badge: "Esgotado"
  },
  {
    id: "000235-1",
    imageUrl: "/products/catalog/000235-1.jpg",
    name: "Tabaco bombaco",
    category: "tabaco",
    price: 30.0,
    stock: 13,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000236-1",
    imageUrl: "/products/catalog/000236-1.jpg",
    name: "Tabaco bombaco baunilha",
    category: "tabaco",
    price: 30.0,
    stock: 7,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000025",
    imageUrl: "/products/catalog/000025.jpg",
    name: "Tabaco bombaco café",
    category: "tabaco",
    price: 30.0,
    stock: 3,
    description: "Tabaco para enrolar, sabor e queima equilibrados.",
    badge: "Últimas unidades"
  },
  {
    id: "000032-5",
    imageUrl: "/products/catalog/000032-5.jpg",
    name: "Tabaco crazy sabores",
    category: "tabaco",
    price: 25.0,
    stock: 8,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000023",
    imageUrl: "/products/catalog/000023.jpg",
    name: "Tabaco cremaria",
    category: "tabaco",
    price: 15.0,
    stock: 14,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000242-1",
    imageUrl: "/products/catalog/000242-1.jpg",
    name: "Tabaco cremaria premium",
    category: "tabaco",
    price: 15.0,
    stock: 4,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000023-5",
    imageUrl: "/products/catalog/000023-5.jpg",
    name: "Tabaco D'ora sabores",
    category: "tabaco",
    price: 25.0,
    stock: 4,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000069-1",
    name: "Tabaco fracionado",
    category: "tabaco",
    price: 5.0,
    stock: 0,
    description: "Tabaco para enrolar, sabor e queima equilibrados.",
    badge: "Esgotado"
  },
  {
    id: "000240-1",
    imageUrl: "/products/catalog/000240-1.jpg",
    name: "Tabaco hi tobacco blend",
    category: "tabaco",
    price: 25.0,
    stock: 6,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000241-1",
    imageUrl: "/products/catalog/000241-1.jpg",
    name: "Tabaco hi tobacco grande",
    category: "tabaco",
    price: 25.0,
    stock: 3,
    description: "Tabaco para enrolar, sabor e queima equilibrados.",
    badge: "Últimas unidades"
  },
  {
    id: "000027",
    imageUrl: "/products/catalog/000027.jpg",
    name: "Tabaco hi tobacco pequeno",
    category: "tabaco",
    price: 15.0,
    stock: 15,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000038-5",
    imageUrl: "/products/catalog/000038-5.jpg",
    name: "Tabaco hippster",
    category: "tabaco",
    price: 20.0,
    stock: 10,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000243-1",
    imageUrl: "/products/catalog/000243-1.jpg",
    name: "Tabaco kumbaya",
    category: "tabaco",
    price: 20.0,
    stock: 9,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000029",
    name: "Tabaco Marajó",
    category: "tabaco",
    price: 20.0,
    stock: 0,
    description: "Tabaco para enrolar, sabor e queima equilibrados.",
    badge: "Esgotado"
  },
  {
    id: "000039-5",
    imageUrl: "/products/catalog/000039-5.jpg",
    name: "Tabaco marroquino",
    category: "tabaco",
    price: 20.0,
    stock: 11,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000013-5",
    imageUrl: "/products/catalog/000013-5.jpg",
    name: "Tabaco mirage grande",
    category: "tabaco",
    price: 30.0,
    stock: 9,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000024",
    imageUrl: "/products/catalog/000024.jpg",
    name: "Tabaco mirage pequeno",
    category: "tabaco",
    price: 20.0,
    stock: 13,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000022-5",
    imageUrl: "/products/catalog/000022-5.jpg",
    name: "Tabaco mirage sabores",
    category: "tabaco",
    price: 25.0,
    stock: 20,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000239-1",
    name: "Tabaco Montevideo",
    category: "tabaco",
    price: 15.0,
    stock: 0,
    description: "Tabaco para enrolar, sabor e queima equilibrados.",
    badge: "Esgotado"
  },
  {
    id: "000238-1",
    imageUrl: "/products/catalog/000238-1.jpg",
    name: "Tabaco rainbow",
    category: "tabaco",
    price: 15.0,
    stock: 4,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000001",
    imageUrl: "/products/catalog/000001.jpg",
    name: "Tabaco santorini",
    category: "tabaco",
    price: 25.0,
    stock: 90,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000122",
    imageUrl: "/products/catalog/000122.jpg",
    name: "Tabaco ta na mão",
    category: "tabaco",
    price: 20.0,
    stock: 10,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000248-1",
    imageUrl: "/products/catalog/000248-1.jpg",
    name: "Tabaco tab",
    category: "tabaco",
    price: 25.0,
    stock: 7,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000028",
    imageUrl: "/products/catalog/000028.jpg",
    name: "Tabaco tabaquim",
    category: "tabaco",
    price: 15.0,
    stock: 16,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000019-5",
    imageUrl: "/products/catalog/000019-5.jpg",
    name: "Tabaco tabash baunilha",
    category: "tabaco",
    price: 25.0,
    stock: 2,
    description: "Tabaco para enrolar, sabor e queima equilibrados.",
    badge: "Últimas unidades"
  },
  {
    id: "000020-5",
    imageUrl: "/products/catalog/000020-5.jpg",
    name: "Tabaco tabash menta",
    category: "tabaco",
    price: 25.0,
    stock: 6,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000237-1",
    imageUrl: "/products/catalog/000237-1.jpg",
    name: "Tabaco the og",
    category: "tabaco",
    price: 15.0,
    stock: 0,
    description: "Tabaco para enrolar, sabor e queima equilibrados.",
    badge: "Esgotado"
  },
  {
    id: "000022",
    imageUrl: "/products/catalog/000022.jpg",
    name: "Tabaco veio pimenta",
    category: "tabaco",
    price: 25.0,
    stock: -3,
    description: "Tabaco para enrolar, sabor e queima equilibrados.",
    badge: "Esgotado"
  },
  {
    id: "000313-1",
    imageUrl: "/products/catalog/000313-1.jpg",
    name: "Tapete meleca",
    category: "acessorios",
    price: 50.0,
    stock: 1,
    description: "Tapete de silicone, protege a superfície e facilita a limpeza.",
    badge: "Últimas unidades"
  },
  {
    id: "000314-1",
    imageUrl: "/products/catalog/000314-1.jpg",
    name: "Tesoura abduzido",
    category: "acessorios",
    price: 40.0,
    stock: 14,
    description: "Tesoura de precisão pra picar sem embolar."
  },
  {
    id: "000032",
    imageUrl: "/products/catalog/000032.jpg",
    name: "Tesoura de ferro especial",
    category: "acessorios",
    price: 35.0,
    stock: 7,
    description: "Tesoura de precisão pra picar sem embolar."
  },
  {
    id: "000078",
    imageUrl: "/products/catalog/000078.jpg",
    name: "Tesoura dobravel de metal",
    category: "acessorios",
    price: 20.0,
    stock: 10,
    description: "Tesoura de precisão pra picar sem embolar."
  },
  {
    id: "000001-1",
    imageUrl: "/products/catalog/000001-1.jpg",
    name: "Tesoura dobrável de plástico",
    category: "acessorios",
    price: 15.0,
    stock: 160,
    description: "Tesoura de precisão pra picar sem embolar."
  },
  {
    id: "000093",
    imageUrl: "/products/catalog/000093.jpg",
    name: "Tesoura dobrável ferro Mr. Baba",
    category: "acessorios",
    price: 25.0,
    stock: 0,
    description: "Tesoura de precisão pra picar sem embolar.",
    badge: "Esgotado"
  },
  {
    id: "000294-1",
    imageUrl: "/products/catalog/000294-1.jpg",
    name: "Tesoura dobrável grande",
    category: "acessorios",
    price: 35.0,
    stock: 10,
    description: "Tesoura de precisão pra picar sem embolar."
  },
  {
    id: "000016-5",
    name: "Tesoura gelo",
    category: "acessorios",
    price: 60.0,
    stock: 0,
    description: "Tesoura de precisão pra picar sem embolar.",
    badge: "Esgotado"
  },
  {
    id: "000108",
    imageUrl: "/products/catalog/000108.jpg",
    name: "Tesoura Hakuna",
    category: "acessorios",
    price: 40.0,
    stock: 67,
    description: "Tesoura de precisão pra picar sem embolar."
  },
  {
    id: "000041",
    name: "Tesoura metal garça",
    category: "acessorios",
    price: 20.0,
    stock: 0,
    description: "Tesoura de precisão pra picar sem embolar.",
    badge: "Esgotado"
  },
  {
    id: "000276-1",
    imageUrl: "/products/catalog/000276-1.jpg",
    name: "Tesoura metal icebud",
    category: "acessorios",
    price: 35.0,
    stock: 1,
    description: "Tesoura de precisão pra picar sem embolar.",
    badge: "Últimas unidades"
  },
  {
    id: "000021-5",
    imageUrl: "/products/catalog/000021-5.jpg",
    name: "Tesoura Na boa",
    category: "acessorios",
    price: 50.0,
    stock: 4,
    description: "Tesoura de precisão pra picar sem embolar."
  },
  {
    id: "000322-1",
    imageUrl: "/products/catalog/000322-1.jpg",
    name: "Tesoura simples",
    category: "acessorios",
    price: 10.0,
    stock: 1,
    description: "Tesoura de precisão pra picar sem embolar.",
    badge: "Últimas unidades"
  },
  {
    id: "000009-1",
    imageUrl: "/products/catalog/000009-1.jpg",
    name: "Tubeck bem bolado",
    category: "sedas",
    price: 42.0,
    stock: 7,
    description: "Tubo pra guardar seus pré-enrolados sem amassar."
  },
  {
    id: "000036-5",
    imageUrl: "/products/catalog/000036-5.jpg",
    name: "Tubeck cânhamo",
    category: "sedas",
    price: 10.0,
    stock: 8,
    description: "Tubo pra guardar seus pré-enrolados sem amassar."
  },
  {
    id: "000101-1",
    imageUrl: "/products/catalog/000101-1.jpg",
    name: "Tubeck g•rollz amarelo",
    category: "sedas",
    price: 12.0,
    stock: 32,
    description: "Tubo pra guardar seus pré-enrolados sem amassar."
  },
  {
    id: "000100-1",
    imageUrl: "/products/catalog/000100-1.jpg",
    name: "Tubeck g•rollz azul",
    category: "sedas",
    price: 12.0,
    stock: 24,
    description: "Tubo pra guardar seus pré-enrolados sem amassar."
  },
  {
    id: "000102-1",
    imageUrl: "/products/catalog/000102-1.jpg",
    name: "Tubeck g•rollz rosa",
    category: "sedas",
    price: 12.0,
    stock: 32,
    description: "Tubo pra guardar seus pré-enrolados sem amassar."
  },
  {
    id: "000260-1",
    imageUrl: "/products/catalog/000260-1.jpg",
    name: "Tubeck lion circus",
    category: "sedas",
    price: 10.0,
    stock: 0,
    description: "Tubo pra guardar seus pré-enrolados sem amassar.",
    badge: "Esgotado"
  },
  {
    id: "000089-1",
    imageUrl: "/products/catalog/000089-1.jpg",
    name: "Tubeck papelito",
    category: "sedas",
    price: 15.0,
    stock: 13,
    description: "Tubo pra guardar seus pré-enrolados sem amassar."
  },
  {
    id: "000104-1",
    imageUrl: "/products/catalog/000104-1.jpg",
    name: "Tubeck preto",
    category: "sedas",
    price: 8.0,
    stock: 4,
    description: "Tubo pra guardar seus pré-enrolados sem amassar."
  },
  {
    id: "000105-1",
    imageUrl: "/products/catalog/000105-1.jpg",
    name: "Tubeck Rosa",
    category: "sedas",
    price: 8.0,
    stock: 23,
    description: "Tubo pra guardar seus pré-enrolados sem amassar."
  },
  {
    id: "000012-1",
    name: "Tubeck sadhu",
    category: "sedas",
    price: 10.0,
    stock: 0,
    description: "Tubo pra guardar seus pré-enrolados sem amassar.",
    badge: "Esgotado"
  },
  {
    id: "000103-1",
    imageUrl: "/products/catalog/000103-1.jpg",
    name: "Tubeck squadafum",
    category: "sedas",
    price: 15.0,
    stock: 4,
    description: "Tubo pra guardar seus pré-enrolados sem amassar."
  },
  {
    id: "000106-1",
    imageUrl: "/products/catalog/000106-1.jpg",
    name: "Tubeck verde",
    category: "sedas",
    price: 8.0,
    stock: 25,
    description: "Tubo pra guardar seus pré-enrolados sem amassar."
  },
  {
    id: "9",
    name: "zAçúcar",
    category: "acessorios",
    price: 0.0,
    stock: 2,
    description: "Açúcar pra adoçar do seu jeito.",
    badge: "Últimas unidades"
  },
];
