// Catálogo gerado a partir da exportação do Nex (catalogo_produtos.xls).
// Descrições geradas automaticamente por palavra-chave (o Nex não exporta descrição).
// Reimporte rodando o mesmo processo sempre que quiser atualizar preços/estoque.

export type CategoryId = "tabaco" | "sedas" | "acessorios";

export type Product = {
  id: string;
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
    name: "Alça puff",
    category: "acessorios",
    price: 50.0,
    stock: 3,
    description: "Item selecionado do nosso catálogo, direto pra sua sessão.",
    badge: "Últimas unidades"
  },
  {
    id: "000118",
    name: "Anel de silicone",
    category: "acessorios",
    price: 20.0,
    stock: 7,
    description: "Anel de silicone, resistente e confortável."
  },
  {
    id: "000246-1",
    name: "Aste de limpeza",
    category: "acessorios",
    price: 5.0,
    stock: 37,
    description: "Haste pra limpar cachimbos e piteiras com facilidade."
  },
  {
    id: "000298-1",
    name: "Bag Vault pequena",
    category: "acessorios",
    price: 110.0,
    stock: 2,
    description: "Bag com trava e vedação pra guardar com discrição.",
    badge: "Últimas unidades"
  },
  {
    id: "000300-1",
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
    name: "Balança de precisão",
    category: "acessorios",
    price: 30.0,
    stock: 3,
    description: "Balança de precisão pra medir certinho.",
    badge: "Últimas unidades"
  },
  {
    id: "000042-1",
    name: "Bandeja gelo",
    category: "acessorios",
    price: 90.0,
    stock: 1,
    description: "Bandeja espaçosa pra organizar tudo na hora de preparar.",
    badge: "Últimas unidades"
  },
  {
    id: "000027-5",
    name: "Bandeja média",
    category: "acessorios",
    price: 25.0,
    stock: 2,
    description: "Bandeja espaçosa pra organizar tudo na hora de preparar.",
    badge: "Últimas unidades"
  },
  {
    id: "000046-1",
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
    name: "Bandeja sadhu com pé",
    category: "acessorios",
    price: 220.0,
    stock: 2,
    description: "Bandeja espaçosa pra organizar tudo na hora de preparar.",
    badge: "Últimas unidades"
  },
  {
    id: "000128-1",
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
    name: "Bandeja sadhu mini",
    category: "acessorios",
    price: 25.0,
    stock: 5,
    description: "Bandeja espaçosa pra organizar tudo na hora de preparar."
  },
  {
    id: "000141-1",
    name: "Bolador hi tobacco pequeno",
    category: "acessorios",
    price: 15.0,
    stock: 12,
    description: "Item selecionado do nosso catálogo, direto pra sua sessão."
  },
  {
    id: "000058-1",
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
    name: "Bong de vidro pequeno",
    category: "acessorios",
    price: 30.0,
    stock: 2,
    description: "Bong pra uma tragada mais suave e filtrada.",
    badge: "Últimas unidades"
  },
  {
    id: "000110",
    name: "Bong de vidro Rick and Marty",
    category: "acessorios",
    price: 150.0,
    stock: 1,
    description: "Bong pra uma tragada mais suave e filtrada.",
    badge: "Últimas unidades"
  },
  {
    id: "000272-1",
    name: "Bong de vidro sadhu",
    category: "acessorios",
    price: 200.0,
    stock: 5,
    description: "Bong pra uma tragada mais suave e filtrada."
  },
  {
    id: "000003",
    name: "Cabo de iphone",
    category: "acessorios",
    price: 10.0,
    stock: 1,
    description: "Cabo de carregador, prático pro dia a dia.",
    badge: "Últimas unidades"
  },
  {
    id: "000004",
    name: "Cabo tipo c",
    category: "acessorios",
    price: 10.0,
    stock: 4,
    description: "Cabo de carregador, prático pro dia a dia."
  },
  {
    id: "000034-5",
    name: "Case cânhamo",
    category: "acessorios",
    price: 30.0,
    stock: 3,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000119",
    name: "Case colmeia",
    category: "acessorios",
    price: 52.0,
    stock: 1,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000042-5",
    name: "Case de pano",
    category: "acessorios",
    price: 30.0,
    stock: 5,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000304-1",
    name: "Case Dubai",
    category: "acessorios",
    price: 40.0,
    stock: 2,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000001-5",
    name: "Case Dubai couro",
    category: "acessorios",
    price: 90.0,
    stock: 5,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000074",
    name: "Case estampada",
    category: "acessorios",
    price: 35.0,
    stock: 1,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000076",
    name: "Case estampada grande",
    category: "acessorios",
    price: 60.0,
    stock: 3,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000015-5",
    name: "Case icebud grande emborrachado",
    category: "acessorios",
    price: 70.0,
    stock: 0,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Esgotado"
  },
  {
    id: "000014-5",
    name: "Case icebud média emborrachado",
    category: "acessorios",
    price: 60.0,
    stock: 5,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000073",
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
    name: "Case low dog com alça",
    category: "acessorios",
    price: 80.0,
    stock: 4,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000059",
    name: "Case low dog sem alça",
    category: "acessorios",
    price: 70.0,
    stock: -1,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Esgotado"
  },
  {
    id: "000082",
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
    name: "Case puff clássica vents",
    category: "acessorios",
    price: 160.0,
    stock: 1,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000317-1",
    name: "Case puff estojo",
    category: "acessorios",
    price: 90.0,
    stock: 1,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000084",
    name: "Case puff estojo pequeno",
    category: "acessorios",
    price: 70.0,
    stock: 2,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000318-1",
    name: "Case puff estojo pequeno vents",
    category: "acessorios",
    price: 90.0,
    stock: 1,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000083",
    name: "Case puff estojo vents",
    category: "acessorios",
    price: 120.0,
    stock: 1,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000320-1",
    name: "Case puff pro",
    category: "acessorios",
    price: 250.0,
    stock: 5,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000106",
    name: "Case puff pro brasilidades",
    category: "acessorios",
    price: 280.0,
    stock: 3,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000081",
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
    name: "Case sadhu canhamo media",
    category: "acessorios",
    price: 120.0,
    stock: 1,
    description: "Case pra guardar e transportar seus itens com estilo.",
    badge: "Últimas unidades"
  },
  {
    id: "000080",
    name: "Case sadhu estojo",
    category: "acessorios",
    price: 60.0,
    stock: 4,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000326-1",
    name: "Case sadhu full print mundial",
    category: "acessorios",
    price: 120.0,
    stock: 11,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000087",
    name: "Case sadhu grande full print",
    category: "acessorios",
    price: 120.0,
    stock: 8,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000085",
    name: "Case sadhu media",
    category: "acessorios",
    price: 100.0,
    stock: 6,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000086",
    name: "Case sadhu pequena",
    category: "acessorios",
    price: 80.0,
    stock: 5,
    description: "Case pra guardar e transportar seus itens com estilo."
  },
  {
    id: "000305-1",
    name: "Chaveiro porta clipper",
    category: "acessorios",
    price: 30.0,
    stock: 5,
    description: "Isqueiro recarregável, resistente e de fácil aceso."
  },
  {
    id: "000122-1",
    name: "Cinzeiro automotivo",
    category: "acessorios",
    price: 25.0,
    stock: 10,
    description: "Cinzeiro prático, fácil de limpar e guardar."
  },
  {
    id: "000033-5",
    name: "Cinzeiro automotivo cânhamo",
    category: "acessorios",
    price: 25.0,
    stock: 9,
    description: "Cinzeiro prático, fácil de limpar e guardar."
  },
  {
    id: "000121-1",
    name: "Cinzeiro de vidro",
    category: "acessorios",
    price: 30.0,
    stock: 13,
    description: "Cinzeiro prático, fácil de limpar e guardar."
  },
  {
    id: "000071",
    name: "Cinzeiro gelo",
    category: "acessorios",
    price: 40.0,
    stock: 4,
    description: "Cinzeiro prático, fácil de limpar e guardar."
  },
  {
    id: "000125-1",
    name: "Cinzeiro metal",
    category: "acessorios",
    price: 15.0,
    stock: 3,
    description: "Cinzeiro prático, fácil de limpar e guardar.",
    badge: "Últimas unidades"
  },
  {
    id: "000123-1",
    name: "Cinzeiro sadhu metal",
    category: "acessorios",
    price: 18.0,
    stock: 2,
    description: "Cinzeiro prático, fácil de limpar e guardar.",
    badge: "Últimas unidades"
  },
  {
    id: "000127-1",
    name: "Cinzeiro silicone quadrado",
    category: "acessorios",
    price: 15.0,
    stock: 6,
    description: "Cinzeiro prático, fácil de limpar e guardar."
  },
  {
    id: "000126-1",
    name: "Cinzeiro silicone redondo",
    category: "acessorios",
    price: 15.0,
    stock: 1,
    description: "Cinzeiro prático, fácil de limpar e guardar.",
    badge: "Últimas unidades"
  },
  {
    id: "000124-1",
    name: "Cinzeiro smoke haze",
    category: "acessorios",
    price: 25.0,
    stock: 2,
    description: "Cinzeiro prático, fácil de limpar e guardar.",
    badge: "Últimas unidades"
  },
  {
    id: "000003-5",
    name: "Clipper smoking",
    category: "acessorios",
    price: 10.0,
    stock: 42,
    description: "Isqueiro recarregável, resistente e de fácil aceso."
  },
  {
    id: "000231-1",
    name: "Coletor",
    category: "acessorios",
    price: 50.0,
    stock: 0,
    description: "Coletor de vidro, prático e fácil de limpar.",
    badge: "Esgotado"
  },
  {
    id: "000283-1",
    name: "Coletor de vidro",
    category: "acessorios",
    price: 30.0,
    stock: 4,
    description: "Coletor de vidro, prático e fácil de limpar."
  },
  {
    id: "000041-1",
    name: "Cuia abduzido",
    category: "acessorios",
    price: 20.0,
    stock: 4,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000040-1",
    name: "Cuia abduzido spa",
    category: "acessorios",
    price: 20.0,
    stock: 17,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000045-1",
    name: "Cuia aura",
    category: "acessorios",
    price: 70.0,
    stock: 7,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000043-1",
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
    name: "Cuia cânhamo",
    category: "acessorios",
    price: 20.0,
    stock: 17,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000107",
    name: "Cuia desenhada",
    category: "acessorios",
    price: 20.0,
    stock: 5,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000068",
    name: "Cuia gelo",
    category: "acessorios",
    price: 30.0,
    stock: 15,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000067",
    name: "Cuia ice bud e toca do narguile",
    category: "acessorios",
    price: 15.0,
    stock: 75,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000094",
    name: "Cuia lion circus",
    category: "acessorios",
    price: 25.0,
    stock: 10,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000072",
    name: "Cuia mini",
    category: "acessorios",
    price: 10.0,
    stock: 27,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000044-1",
    name: "Cuia raw",
    category: "acessorios",
    price: 38.0,
    stock: 47,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "00021-1",
    name: "Cuia sadhu compact",
    category: "acessorios",
    price: 20.0,
    stock: 8,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000120-1",
    name: "Cuia sadhu mini",
    category: "acessorios",
    price: 20.0,
    stock: 6,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000119-1",
    name: "Cuia sadhu shot",
    category: "acessorios",
    price: 25.0,
    stock: 28,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000069",
    name: "Cuia squadafum",
    category: "acessorios",
    price: 30.0,
    stock: 4,
    description: "Cuia pra preparar com mais espaço e conforto."
  },
  {
    id: "000070",
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
    name: "Dichavador cubo mágico",
    category: "acessorios",
    price: 60.0,
    stock: 2,
    description: "Dichavador pra triturar de forma uniforme, sem esforço.",
    badge: "Últimas unidades"
  },
  {
    id: "000061",
    name: "Dichavador de ferro da sadhu",
    category: "acessorios",
    price: 100.0,
    stock: 1,
    description: "Dichavador pra triturar de forma uniforme, sem esforço.",
    badge: "Últimas unidades"
  },
  {
    id: "000065",
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
    name: "Dichavador gato",
    category: "acessorios",
    price: 80.0,
    stock: 1,
    description: "Dichavador pra triturar de forma uniforme, sem esforço.",
    badge: "Últimas unidades"
  },
  {
    id: "000139-1",
    name: "Dichavador metal grande",
    category: "acessorios",
    price: 50.0,
    stock: 1,
    description: "Dichavador pra triturar de forma uniforme, sem esforço.",
    badge: "Últimas unidades"
  },
  {
    id: "000140-1",
    name: "Dichavador metal mini",
    category: "acessorios",
    price: 20.0,
    stock: 2,
    description: "Dichavador pra triturar de forma uniforme, sem esforço.",
    badge: "Últimas unidades"
  },
  {
    id: "000143-1",
    name: "Dichavador Rick",
    category: "acessorios",
    price: 80.0,
    stock: 2,
    description: "Dichavador pra triturar de forma uniforme, sem esforço.",
    badge: "Últimas unidades"
  },
  {
    id: "000114",
    name: "Dichavador Rick and Marty grande",
    category: "acessorios",
    price: 60.0,
    stock: 12,
    description: "Dichavador pra triturar de forma uniforme, sem esforço."
  },
  {
    id: "000113",
    name: "Dichavador Rick and Marty pequeno",
    category: "acessorios",
    price: 50.0,
    stock: 8,
    description: "Dichavador pra triturar de forma uniforme, sem esforço."
  },
  {
    id: "000142-1",
    name: "Dichavador slum",
    category: "acessorios",
    price: 10.0,
    stock: 2,
    description: "Dichavador pra triturar de forma uniforme, sem esforço.",
    badge: "Últimas unidades"
  },
  {
    id: "000277-1",
    name: "Espátula metal para meleca",
    category: "acessorios",
    price: 10.0,
    stock: 2,
    description: "Espátula de metal pra limpar sem desperdiçar nada.",
    badge: "Últimas unidades"
  },
  {
    id: "000251-1",
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
    name: "Filtro smoking",
    category: "sedas",
    price: 1.0,
    stock: 135,
    description: "Filtro pra deixar a tragada mais suave."
  },
  {
    id: "000112-1",
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
    name: "Gás butano",
    category: "acessorios",
    price: 30.0,
    stock: 7,
    description: "Gás butano pra recarregar isqueiros e maçaricos."
  },
  {
    id: "000214-1",
    name: "Isqueiro bic personalizado",
    category: "acessorios",
    price: 10.0,
    stock: 41,
    description: "Isqueiro prático pra acender sem complicação."
  },
  {
    id: "000055",
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
    name: "Isqueiro gti",
    category: "acessorios",
    price: 5.0,
    stock: 16,
    description: "Isqueiro prático pra acender sem complicação."
  },
  {
    id: "000057",
    name: "Isqueiro mini moon",
    category: "acessorios",
    price: 2.0,
    stock: 112,
    description: "Isqueiro prático pra acender sem complicação."
  },
  {
    id: "000104",
    name: "Isqueiro puff emborrachado",
    category: "acessorios",
    price: 45.0,
    stock: 11,
    description: "Isqueiro prático pra acender sem complicação."
  },
  {
    id: "000107-1",
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
    name: "Isqueiro simples",
    category: "acessorios",
    price: 3.0,
    stock: 100,
    description: "Isqueiro prático pra acender sem complicação."
  },
  {
    id: "000297-1",
    name: "Kit bandeja",
    category: "acessorios",
    price: 20.0,
    stock: 9,
    description: "Bandeja espaçosa pra organizar tudo na hora de preparar."
  },
  {
    id: "000112",
    name: "Kit bong de vidro",
    category: "acessorios",
    price: 250.0,
    stock: 1,
    description: "Bong pra uma tragada mais suave e filtrada.",
    badge: "Últimas unidades"
  },
  {
    id: "000100",
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
    name: "Kit montado de 100",
    category: "sedas",
    price: 100.0,
    stock: 3,
    description: "Kit completo com os itens essenciais pra sua sessão.",
    badge: "Últimas unidades"
  },
  {
    id: "000232-1",
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
    name: "Kit sadhu spliff branco",
    category: "sedas",
    price: 40.0,
    stock: 12,
    description: "Kit completo com os itens essenciais pra sua sessão."
  },
  {
    id: "000132-1",
    name: "Kit sadhu spliff preto",
    category: "sedas",
    price: 40.0,
    stock: 12,
    description: "Kit completo com os itens essenciais pra sua sessão."
  },
  {
    id: "000296-1",
    name: "Lúpulo",
    category: "acessorios",
    price: 30.0,
    stock: 1,
    description: "Lúpulo selecionado pra dar aquele toque especial.",
    badge: "Últimas unidades"
  },
  {
    id: "000056",
    name: "Maçarico blaz",
    category: "acessorios",
    price: 15.0,
    stock: 18,
    description: "Maçarico recarregável, chama forte e constante."
  },
  {
    id: "000116-1",
    name: "Maçarico blaz com tampa",
    category: "acessorios",
    price: 20.0,
    stock: 0,
    description: "Maçarico recarregável, chama forte e constante.",
    badge: "Esgotado"
  },
  {
    id: "000118-1",
    name: "Maçarico de 10",
    category: "acessorios",
    price: 10.0,
    stock: 0,
    description: "Maçarico recarregável, chama forte e constante.",
    badge: "Esgotado"
  },
  {
    id: "000115-1",
    name: "Maçarico fire",
    category: "acessorios",
    price: 25.0,
    stock: 1,
    description: "Maçarico recarregável, chama forte e constante.",
    badge: "Últimas unidades"
  },
  {
    id: "000117-1",
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
    name: "Maçarico pistola com led",
    category: "acessorios",
    price: 140.0,
    stock: 5,
    description: "Maçarico recarregável, chama forte e constante."
  },
  {
    id: "000012-5",
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
    name: "Maçarico sadhu",
    category: "acessorios",
    price: 35.0,
    stock: 15,
    description: "Maçarico recarregável, chama forte e constante."
  },
  {
    id: "000325-1",
    name: "Maçarico sadhu mundial",
    category: "acessorios",
    price: 35.0,
    stock: 7,
    description: "Maçarico recarregável, chama forte e constante."
  },
  {
    id: "000108-1",
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
    name: "Maçarico zengaz",
    category: "acessorios",
    price: 30.0,
    stock: 7,
    description: "Maçarico recarregável, chama forte e constante."
  },
  {
    id: "000018-5",
    name: "Maçarico zengaz grande",
    category: "acessorios",
    price: 60.0,
    stock: 2,
    description: "Maçarico recarregável, chama forte e constante.",
    badge: "Últimas unidades"
  },
  {
    id: "000288-1",
    name: "Papel dover grande",
    category: "sedas",
    price: 25.0,
    stock: 14,
    description: "Item selecionado do nosso catálogo, direto pra sua sessão."
  },
  {
    id: "000060",
    name: "Papel dover pequeno",
    category: "sedas",
    price: 20.0,
    stock: 12,
    description: "Item selecionado do nosso catálogo, direto pra sua sessão."
  },
  {
    id: "000245-1",
    name: "Pega rato",
    category: "acessorios",
    price: 20.0,
    stock: 6,
    description: "Item prático de limpeza e organização."
  },
  {
    id: "000004-5",
    name: "Piteira 710 larga",
    category: "sedas",
    price: 6.0,
    stock: 10,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000014-1",
    name: "Piteira 710 mega larga",
    category: "sedas",
    price: 8.0,
    stock: 1,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Últimas unidades"
  },
  {
    id: "000022-1",
    name: "Piteira A piteira eco",
    category: "sedas",
    price: 5.0,
    stock: 24,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000021-1",
    name: "Piteira A piteira gorilla",
    category: "sedas",
    price: 7.0,
    stock: 11,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000020-1",
    name: "Piteira A piteira mega longa",
    category: "sedas",
    price: 8.0,
    stock: 15,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000007-1",
    name: "Piteira abduzido extra larga",
    category: "sedas",
    price: 7.0,
    stock: 3,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Últimas unidades"
  },
  {
    id: "000009-5",
    name: "Piteira abduzido extra longa",
    category: "sedas",
    price: 9.0,
    stock: 20,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000008-1",
    name: "Piteira abduzido larga",
    category: "sedas",
    price: 6.0,
    stock: 4,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000010-5",
    name: "Piteira abduzido monster size",
    category: "sedas",
    price: 9.0,
    stock: 20,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000053-1",
    name: "Piteira Badauí",
    category: "sedas",
    price: 7.0,
    stock: 13,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000072-1",
    name: "Piteira bem bolado hiper larga marrom",
    category: "sedas",
    price: 7.0,
    stock: 20,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000071-1",
    name: "Piteira bem bolado hiper larga rosa",
    category: "sedas",
    price: 7.0,
    stock: 22,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000050",
    name: "Piteira bem bolado super larga marron",
    category: "sedas",
    price: 6.0,
    stock: 8,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000052",
    name: "Piteira bem bolado super larga rosa",
    category: "sedas",
    price: 6.0,
    stock: 22,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000051",
    name: "Piteira bem bolado super larga verde",
    category: "sedas",
    price: 6.0,
    stock: 29,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000055-1",
    name: "Piteira blue ice",
    category: "sedas",
    price: 7.0,
    stock: 18,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000026-1",
    name: "Piteira bud charlies",
    category: "sedas",
    price: 6.0,
    stock: 7,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000016-1",
    name: "Piteira cremaria extra larga",
    category: "sedas",
    price: 6.0,
    stock: 22,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000018-1",
    name: "Piteira cremaria larga",
    category: "sedas",
    price: 6.0,
    stock: 21,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000017-1",
    name: "Piteira cremaria mega larga",
    category: "sedas",
    price: 6.0,
    stock: 24,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000303-1",
    name: "Piteira de vidro",
    category: "sedas",
    price: 8.0,
    stock: 59,
    description: "Piteira de vidro reutilizável, fácil de limpar."
  },
  {
    id: "000312-1",
    name: "Piteira de vidro AK47",
    category: "sedas",
    price: 80.0,
    stock: 2,
    description: "Piteira de vidro reutilizável, fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000029-1",
    name: "Piteira de vidro bud charlies",
    category: "sedas",
    price: 120.0,
    stock: 6,
    description: "Piteira de vidro reutilizável, fácil de limpar."
  },
  {
    id: "000234-1",
    name: "Piteira de vidro de 15",
    category: "sedas",
    price: 15.0,
    stock: 17,
    description: "Piteira de vidro reutilizável, fácil de limpar."
  },
  {
    id: "000233-1",
    name: "Piteira de vidro de 20",
    category: "sedas",
    price: 20.0,
    stock: 90,
    description: "Piteira de vidro reutilizável, fácil de limpar."
  },
  {
    id: "000227-1",
    name: "Piteira de vidro de 40",
    category: "sedas",
    price: 40.0,
    stock: 7,
    description: "Piteira de vidro reutilizável, fácil de limpar."
  },
  {
    id: "000226-1",
    name: "Piteira de vidro de 60",
    category: "sedas",
    price: 60.0,
    stock: 8,
    description: "Piteira de vidro reutilizável, fácil de limpar."
  },
  {
    id: "000117",
    name: "Piteira de vidro duplo",
    category: "sedas",
    price: 30.0,
    stock: 1,
    description: "Piteira de vidro reutilizável, fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000323-1",
    name: "Piteira de vidro hippster",
    category: "sedas",
    price: 20.0,
    stock: 16,
    description: "Piteira de vidro reutilizável, fácil de limpar."
  },
  {
    id: "000054-1",
    name: "Piteira de vidro Nilo",
    category: "sedas",
    price: 35.0,
    stock: 2,
    description: "Piteira de vidro reutilizável, fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000225-1",
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
    name: "Piteira de vidro vapor de prata",
    category: "sedas",
    price: 70.0,
    stock: 4,
    description: "Piteira de vidro reutilizável, fácil de limpar."
  },
  {
    id: "000008",
    name: "Piteira gelo",
    category: "sedas",
    price: 7.0,
    stock: 69,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000013-1",
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
    name: "Piteira guru spirit mega larga branca",
    category: "sedas",
    price: 6.0,
    stock: 4,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000030-1",
    name: "Piteira guru spirit mega larga marrom",
    category: "sedas",
    price: 6.0,
    stock: 6,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000027-1",
    name: "Piteira guru spirit mega larga verge",
    category: "sedas",
    price: 6.0,
    stock: 5,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000301-1",
    name: "Piteira hippster club",
    category: "sedas",
    price: 10.0,
    stock: 38,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000039-1",
    name: "Piteira hornet",
    category: "sedas",
    price: 4.0,
    stock: 49,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000015-1",
    name: "Piteira king XXL",
    category: "sedas",
    price: 7.0,
    stock: 13,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000031-1",
    name: "Piteira lion circus extra larga",
    category: "sedas",
    price: 7.0,
    stock: 17,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000099",
    name: "Piteira lion circus longa",
    category: "sedas",
    price: 7.0,
    stock: 21,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000097",
    name: "Piteira lion circus mega longa",
    category: "sedas",
    price: 7.0,
    stock: 9,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000098",
    name: "Piteira lion circus ultra longa",
    category: "sedas",
    price: 7.0,
    stock: 22,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000024-1",
    name: "Piteira mirage longa",
    category: "sedas",
    price: 6.0,
    stock: 21,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000023-1",
    name: "Piteira mirage mega longa",
    category: "sedas",
    price: 7.0,
    stock: 5,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000025-1",
    name: "Piteira mirage super larga",
    category: "sedas",
    price: 6.0,
    stock: 4,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000049",
    name: "Piteira nilo",
    category: "sedas",
    price: 8.0,
    stock: 8,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000090-1",
    name: "Piteira papelito larga",
    category: "sedas",
    price: 6.0,
    stock: 18,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000092-1",
    name: "Piteira papelito longa",
    category: "sedas",
    price: 6.0,
    stock: 22,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "00095-1",
    name: "Piteira papelito mega longa",
    category: "sedas",
    price: 7.0,
    stock: 21,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000091-1",
    name: "Piteira papelito tradicional",
    category: "sedas",
    price: 5.0,
    stock: 29,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000093-1",
    name: "Piteira papelito ultra longa",
    category: "sedas",
    price: 6.0,
    stock: 18,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000032-1",
    name: "Piteira puff extra larga",
    category: "sedas",
    price: 7.0,
    stock: 15,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000033-1",
    name: "Piteira puff larga",
    category: "sedas",
    price: 7.0,
    stock: 17,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000035-1",
    name: "Piteira raw Matuê",
    category: "sedas",
    price: 8.0,
    stock: 41,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000041-5",
    name: "Piteira RD",
    category: "sedas",
    price: 6.0,
    stock: 48,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000271-1",
    name: "Piteira reggae",
    category: "sedas",
    price: 1.0,
    stock: 14,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000050-1",
    name: "Piteira sadhu larga branca",
    category: "sedas",
    price: 5.0,
    stock: 7,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000051-1",
    name: "Piteira sadhu larga marrom",
    category: "sedas",
    price: 4.0,
    stock: 6,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000052-1",
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
    name: "Piteira sadhu mega larga marrom",
    category: "sedas",
    price: 6.0,
    stock: 33,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000016",
    name: "Piteira sadhu mega larga preta",
    category: "sedas",
    price: 6.0,
    stock: 1,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Últimas unidades"
  },
  {
    id: "000059-1",
    name: "Piteira sadhu rosa",
    category: "sedas",
    price: 6.0,
    stock: 19,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000048-1",
    name: "Piteira sadhu slim branca",
    category: "sedas",
    price: 4.0,
    stock: 3,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Últimas unidades"
  },
  {
    id: "000049-1",
    name: "Piteira sadhu slim preta",
    category: "sedas",
    price: 4.0,
    stock: 48,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000053",
    name: "Piteira sadhu ultra larga",
    category: "sedas",
    price: 7.0,
    stock: 2,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Últimas unidades"
  },
  {
    id: "000291-1",
    name: "Piteira sadhu ultra larga mundial",
    category: "sedas",
    price: 7.0,
    stock: -2,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Esgotado"
  },
  {
    id: "000020",
    name: "Piteira sesh larga",
    category: "sedas",
    price: 5.0,
    stock: 12,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000037-1",
    name: "Piteira sesh small",
    category: "sedas",
    price: 3.0,
    stock: 23,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000034-1",
    name: "Piteira sesh XL",
    category: "sedas",
    price: 6.0,
    stock: 11,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000019-1",
    name: "Piteira squadafum",
    category: "sedas",
    price: 6.0,
    stock: 17,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000036-1",
    name: "Piteira the og larga",
    category: "sedas",
    price: 5.0,
    stock: 13,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000038-1",
    name: "Piteira the og small",
    category: "sedas",
    price: 3.0,
    stock: 23,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000003-1",
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
    name: "Piteira to na be larga",
    category: "sedas",
    price: 6.0,
    stock: 0,
    description: "Piteira pra dar mais conforto e filtrar a tragada.",
    badge: "Esgotado"
  },
  {
    id: "000005-1",
    name: "Piteira to na be mega longa",
    category: "sedas",
    price: 7.0,
    stock: 37,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000019",
    name: "Piteira to na be super larga",
    category: "sedas",
    price: 6.0,
    stock: 26,
    description: "Piteira pra dar mais conforto e filtrar a tragada."
  },
  {
    id: "000004-1",
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
    name: "Porta piteira de vidro grande",
    category: "sedas",
    price: 70.0,
    stock: 1,
    description: "Piteira de vidro reutilizável, fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000150-1",
    name: "Pote hermético duplo médio",
    category: "acessorios",
    price: 20.0,
    stock: 1,
    description: "Pote hermético que mantém o aroma e a frescura.",
    badge: "Últimas unidades"
  },
  {
    id: "000149-1",
    name: "Pote hermético duplo pequeno",
    category: "acessorios",
    price: 18.0,
    stock: 1,
    description: "Pote hermético que mantém o aroma e a frescura.",
    badge: "Últimas unidades"
  },
  {
    id: "000077",
    name: "Pote hermético Gordão head shop",
    category: "acessorios",
    price: 15.0,
    stock: 16,
    description: "Pote hermético que mantém o aroma e a frescura."
  },
  {
    id: "000148-1",
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
    name: "Pote hermético sadhu grande",
    category: "acessorios",
    price: 70.0,
    stock: 1,
    description: "Pote hermético que mantém o aroma e a frescura.",
    badge: "Últimas unidades"
  },
  {
    id: "000010-1",
    name: "Pote hermético sadhu médio",
    category: "acessorios",
    price: 60.0,
    stock: 1,
    description: "Pote hermético que mantém o aroma e a frescura.",
    badge: "Últimas unidades"
  },
  {
    id: "000079",
    name: "Praça completa",
    category: "acessorios",
    price: 60.0,
    stock: 4,
    description: "Kit completo com os itens essenciais pra sua sessão."
  },
  {
    id: "000134-1",
    name: "Pré bolado",
    category: "sedas",
    price: 20.0,
    stock: 27,
    description: "Pré-enrolado, prático e rápido pra usar na hora."
  },
  {
    id: "000267-1",
    name: "Seda 1 1/4 zomo marrom",
    category: "sedas",
    price: 1.0,
    stock: 38,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000160-1",
    name: "Seda acrema branca",
    category: "sedas",
    price: 6.0,
    stock: 137,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000161-1",
    name: "Seda acrema marrom",
    category: "sedas",
    price: 6.0,
    stock: 147,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000158-1",
    name: "Seda aleda clássica",
    category: "sedas",
    price: 4.0,
    stock: 17,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000159-1",
    name: "Seda aleda ouro",
    category: "sedas",
    price: 4.0,
    stock: 3,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Últimas unidades"
  },
  {
    id: "000076-1",
    name: "Seda bem bolado 1 1/4 100 folhas marrom",
    category: "sedas",
    price: 3.0,
    stock: 26,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000038",
    name: "Seda bem bolado 1 1/4 com piteira marrom",
    category: "sedas",
    price: 7.0,
    stock: 66,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000073-1",
    name: "Seda bem bolado 1 1/4 slim branca",
    category: "sedas",
    price: 3.0,
    stock: 4,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000037",
    name: "Seda bem bolado 100 folhas branca",
    category: "sedas",
    price: 6.0,
    stock: 31,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000034",
    name: "Seda bem bolado Kevin",
    category: "sedas",
    price: 5.0,
    stock: 21,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000035",
    name: "Seda bem bolado larga branca",
    category: "sedas",
    price: 4.0,
    stock: 85,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000080-1",
    name: "Seda bem bolado larga marrom",
    category: "sedas",
    price: 4.0,
    stock: 28,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000044",
    name: "Seda bem bolado longa branca",
    category: "sedas",
    price: 6.0,
    stock: 29,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000043",
    name: "Seda bem bolado longa marron",
    category: "sedas",
    price: 6.0,
    stock: 55,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000077-1",
    name: "Seda bem bolado metro",
    category: "sedas",
    price: 12.0,
    stock: 23,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000081-1",
    name: "Seda bem bolado planet hemp",
    category: "sedas",
    price: 5.0,
    stock: 7,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000082-1",
    name: "Seda bem bolado Sabotage",
    category: "sedas",
    price: 5.0,
    stock: 29,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000078-1",
    name: "Seda bem bolado slim branca",
    category: "sedas",
    price: 4.0,
    stock: 11,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000078-0",
    name: "Seda bem bolado slim marrom",
    category: "sedas",
    price: 4.0,
    stock: 47,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000036",
    name: "Seda bem bolado vermelha",
    category: "sedas",
    price: 4.0,
    stock: 67,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000254-1",
    name: "Seda black trunk",
    category: "sedas",
    price: 6.0,
    stock: 24,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000153-1",
    name: "Seda blunt king",
    category: "sedas",
    price: 12.0,
    stock: 124,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000164-1",
    name: "Seda bola aí branca",
    category: "sedas",
    price: 3.0,
    stock: 40,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000166-1",
    name: "Seda bola aí marrom",
    category: "sedas",
    price: 3.0,
    stock: 48,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000165-1",
    name: "Seda bola aí rosa",
    category: "sedas",
    price: 3.0,
    stock: 42,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000211-1",
    name: "Seda bros com piteira rosa",
    category: "sedas",
    price: 4.0,
    stock: 5,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000154-1",
    name: "Seda celulose 1 1/4 aleda",
    category: "sedas",
    price: 3.5,
    stock: 19,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000030",
    name: "Seda celulose aleda azul",
    category: "sedas",
    price: 5.0,
    stock: 87,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000031",
    name: "Seda celulose aleda verde",
    category: "sedas",
    price: 5.0,
    stock: 59,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000224-1",
    name: "Seda de vidro",
    category: "sedas",
    price: 12.0,
    stock: 3,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Últimas unidades"
  },
  {
    id: "000253-1",
    name: "Seda dólar",
    category: "sedas",
    price: 5.0,
    stock: 21,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000178-1",
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
    name: "Seda elements rosa",
    category: "sedas",
    price: 11.0,
    stock: 33,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000179-1",
    name: "Seda elements verde",
    category: "sedas",
    price: 7.0,
    stock: 20,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000180-1",
    name: "Seda elements vermelha",
    category: "sedas",
    price: 5.0,
    stock: 29,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000008-5",
    name: "Seda gelo",
    category: "sedas",
    price: 10.0,
    stock: 24,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000187-1",
    name: "Seda guru spirit 1 1/4 slim branca",
    category: "sedas",
    price: 2.0,
    stock: 14,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000199-1",
    name: "Seda guru spirit larga branca",
    category: "sedas",
    price: 3.0,
    stock: 35,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000188-1",
    name: "Seda guru spirit larga marrom",
    category: "sedas",
    price: 3.0,
    stock: 16,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000046",
    name: "Seda guru spirit longa larga branca",
    category: "sedas",
    price: 6.0,
    stock: 2,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Últimas unidades"
  },
  {
    id: "000048",
    name: "Seda guru spirit longa larga marrom",
    category: "sedas",
    price: 6.0,
    stock: 10,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000045",
    name: "Seda guru spirit longa slim branca",
    category: "sedas",
    price: 6.0,
    stock: 72,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000047",
    name: "Seda guru spirit longa slim marrom",
    category: "sedas",
    price: 6.0,
    stock: 1,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Últimas unidades"
  },
  {
    id: "000197-1",
    name: "Seda guru spirit slim branca",
    category: "sedas",
    price: 3.0,
    stock: 19,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000200-1",
    name: "Seda guru spirit slim marrom",
    category: "sedas",
    price: 3.0,
    stock: 5,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000329-1",
    name: "Seda king",
    category: "sedas",
    price: 3.0,
    stock: 15,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000208-1",
    name: "Seda king branca",
    category: "sedas",
    price: 3.0,
    stock: 28,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000102",
    name: "Seda king longa marrom",
    category: "sedas",
    price: 5.0,
    stock: 23,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000101",
    name: "Seda king longa slim",
    category: "sedas",
    price: 5.0,
    stock: 11,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000209-1",
    name: "Seda king marrom",
    category: "sedas",
    price: 3.0,
    stock: 32,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000328-1",
    name: "Seda king mini",
    category: "sedas",
    price: 2.0,
    stock: 40,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000109",
    name: "Seda la brisa branca",
    category: "sedas",
    price: 3.0,
    stock: 50,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000256-1",
    name: "Seda lion circus alfafa",
    category: "sedas",
    price: 6.0,
    stock: 10,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000257-1",
    name: "Seda lion circus com piteira",
    category: "sedas",
    price: 6.0,
    stock: 8,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000095",
    name: "Seda lion circus longa slim",
    category: "sedas",
    price: 6.0,
    stock: 43,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000255-1",
    name: "Seda lion circus marrom",
    category: "sedas",
    price: 4.0,
    stock: 27,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000096",
    name: "Seda lion circus mega longa slim",
    category: "sedas",
    price: 7.0,
    stock: 41,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000176-1",
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
    name: "Seda longa Badauí",
    category: "sedas",
    price: 8.0,
    stock: 27,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000191-1",
    name: "Seda mirage longa larga branca",
    category: "sedas",
    price: 6.0,
    stock: 19,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000189-1",
    name: "Seda mirage longa larga marrom",
    category: "sedas",
    price: 6.0,
    stock: 27,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000190-1",
    name: "Seda mirage longa slim marrom",
    category: "sedas",
    price: 6.0,
    stock: 11,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000012",
    name: "Seda mirage longa slim prata",
    category: "sedas",
    price: 6.0,
    stock: 81,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000193-1",
    name: "Seda mirage marrom",
    category: "sedas",
    price: 3.0,
    stock: 45,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000192-1",
    name: "Seda mirage slim branca",
    category: "sedas",
    price: 3.0,
    stock: 30,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000270-1",
    name: "Seda moon branca",
    category: "sedas",
    price: 1.0,
    stock: -23,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Esgotado"
  },
  {
    id: "000210-1",
    name: "Seda moon com piteira marrom",
    category: "sedas",
    price: 4.0,
    stock: 21,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000157-1",
    name: "Seda naar",
    category: "sedas",
    price: 6.0,
    stock: 48,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000163-1",
    name: "Seda O2 longa marrom",
    category: "sedas",
    price: 5.0,
    stock: 17,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000289-1",
    name: "Seda O2 longa slim",
    category: "sedas",
    price: 5.0,
    stock: 19,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000162-1",
    name: "Seda O2 marrom",
    category: "sedas",
    price: 4.0,
    stock: 47,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000290-1",
    name: "Seda O2 slim",
    category: "sedas",
    price: 4.0,
    stock: 42,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000171-1",
    name: "Seda OCB",
    category: "sedas",
    price: 7.0,
    stock: 78,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000085-1",
    name: "Seda papelito alfafa",
    category: "sedas",
    price: 6.0,
    stock: 43,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000084-1",
    name: "Seda papelito com bandeja branca",
    category: "sedas",
    price: 8.0,
    stock: 12,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000039",
    name: "Seda papelito com bandeja marron",
    category: "sedas",
    price: 8.0,
    stock: 37,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000040",
    name: "Seda papelito com piteira slim branca",
    category: "sedas",
    price: 7.0,
    stock: 22,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000086-1",
    name: "Seda papelito insano marrom",
    category: "sedas",
    price: 6.0,
    stock: 49,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000099-1",
    name: "Seda papelito longa marrom",
    category: "sedas",
    price: 6.0,
    stock: 10,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000042",
    name: "Seda papelito longa slim branca",
    category: "sedas",
    price: 6.0,
    stock: 40,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000098-1",
    name: "Seda papelito longa tradicional",
    category: "sedas",
    price: 6.0,
    stock: 7,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000095-1",
    name: "Seda papelito marrom",
    category: "sedas",
    price: 4.0,
    stock: 39,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000087-1",
    name: "Seda papelito preta",
    category: "sedas",
    price: 6.0,
    stock: 34,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000088-1",
    name: "Seda papelito rosa",
    category: "sedas",
    price: 6.0,
    stock: 44,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000096-1",
    name: "Seda papelito slim branca",
    category: "sedas",
    price: 4.0,
    stock: 78,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000097-1",
    name: "Seda papelito tradicional",
    category: "sedas",
    price: 4.0,
    stock: 40,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000040-5",
    name: "Seda pay pay longa",
    category: "sedas",
    price: 10.0,
    stock: 42,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000170-1",
    name: "Seda pay-pay",
    category: "sedas",
    price: 7.0,
    stock: 20,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000172-1",
    name: "Seda pay-pay cone",
    category: "sedas",
    price: 15.0,
    stock: 26,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000152-1",
    name: "Seda puff marrom",
    category: "sedas",
    price: 7.0,
    stock: 20,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000151-1",
    name: "Seda puff prata",
    category: "sedas",
    price: 7.0,
    stock: 0,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Esgotado"
  },
  {
    id: "000204-1",
    name: "Seda raw clássica",
    category: "sedas",
    price: 9.0,
    stock: 35,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000091",
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
    name: "Seda raw Matuê",
    category: "sedas",
    price: 13.0,
    stock: 27,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000293-1",
    name: "Seda raw orgânica",
    category: "sedas",
    price: 9.0,
    stock: 30,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000205-1",
    name: "Seda raw preta",
    category: "sedas",
    price: 11.0,
    stock: 11,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000068-1",
    name: "Seda sadhu 1 1/4 marrom",
    category: "sedas",
    price: 3.0,
    stock: 24,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000066-1",
    name: "Seda sadhu 1 1/4 prata",
    category: "sedas",
    price: 3.0,
    stock: 19,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000005",
    name: "Seda sadhu blue ice",
    category: "sedas",
    price: 8.0,
    stock: 19,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000067-1",
    name: "Seda sadhu com piteira marrom",
    category: "sedas",
    price: 6.0,
    stock: 3,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Últimas unidades"
  },
  {
    id: "000064-1",
    name: "Seda sadhu larga marrom",
    category: "sedas",
    price: 4.0,
    stock: 9,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000065-1",
    name: "Seda sadhu larga preta",
    category: "sedas",
    price: 4.0,
    stock: 19,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000009",
    name: "Seda sadhu longa marrom",
    category: "sedas",
    price: 7.0,
    stock: 72,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000010",
    name: "Seda sadhu longa prata",
    category: "sedas",
    price: 7.0,
    stock: 158,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000011",
    name: "Seda sadhu longa preta",
    category: "sedas",
    price: 7.0,
    stock: 17,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000324-1",
    name: "Seda sadhu longa slim mundial",
    category: "sedas",
    price: 5.0,
    stock: 1392,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000062-1",
    name: "Seda sadhu metro marrom",
    category: "sedas",
    price: 9.0,
    stock: 13,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000063-1",
    name: "Seda sadhu metro prata",
    category: "sedas",
    price: 9.0,
    stock: -1,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Esgotado"
  },
  {
    id: "000061-1",
    name: "Seda sadhu metro preta",
    category: "sedas",
    price: 9.0,
    stock: 3,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Últimas unidades"
  },
  {
    id: "000033",
    name: "Seda sadhu slim prata",
    category: "sedas",
    price: 4.0,
    stock: 82,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000206-1",
    name: "Seda smk branca",
    category: "sedas",
    price: 5.0,
    stock: 41,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000207-1",
    name: "Seda smk marrom",
    category: "sedas",
    price: 5.0,
    stock: 47,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000007-5",
    name: "Seda smoking azul",
    category: "sedas",
    price: 7.0,
    stock: 45,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000182-1",
    name: "Seda smoking kukuxumusu",
    category: "sedas",
    price: 7.0,
    stock: 13,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000015",
    name: "Seda smoking marron",
    category: "sedas",
    price: 7.0,
    stock: 84,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000201-1",
    name: "Seda smoking prata",
    category: "sedas",
    price: 7.0,
    stock: 35,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000014",
    name: "Seda smoking preta",
    category: "sedas",
    price: 7.0,
    stock: 50,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000006-5",
    name: "Seda smoking rosa",
    category: "sedas",
    price: 7.0,
    stock: 44,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000181-1",
    name: "Seda smoking supreme com piteira",
    category: "sedas",
    price: 14.0,
    stock: 10,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000005-5",
    name: "Seda smoking supreme marrom",
    category: "sedas",
    price: 7.0,
    stock: 47,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000013",
    name: "Seda smoking supreme prata",
    category: "sedas",
    price: 7.0,
    stock: 126,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000169-1",
    name: "Seda Snoop dogg",
    category: "sedas",
    price: 6.0,
    stock: 24,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000168-1",
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
    name: "Seda tatu do bem larga branca",
    category: "sedas",
    price: 4.0,
    stock: 10,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000311-1",
    name: "Seda tatu do bem longa marrom",
    category: "sedas",
    price: 5.0,
    stock: 24,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000310-1",
    name: "Seda tatu do bem longa slim branca",
    category: "sedas",
    price: 5.0,
    stock: 22,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000195-1",
    name: "Seda tatu do bem marrom",
    category: "sedas",
    price: 4.0,
    stock: 14,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000194-1",
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
    name: "Seda zomo azul",
    category: "sedas",
    price: 1.0,
    stock: 0,
    description: "Papel de seda pra enrolar com queima uniforme.",
    badge: "Esgotado"
  },
  {
    id: "000264-1",
    name: "Seda zomo mansão maromba branca",
    category: "sedas",
    price: 3.0,
    stock: 21,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000265-1",
    name: "Seda zomo mansão maromba marrom",
    category: "sedas",
    price: 3.0,
    stock: 19,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000263-1",
    name: "Seda zomo marrom",
    category: "sedas",
    price: 2.0,
    stock: 50,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000266-1",
    name: "Seda zomo slim branca",
    category: "sedas",
    price: 2.0,
    stock: 17,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000269-1",
    name: "Seda zomo verde",
    category: "sedas",
    price: 1.0,
    stock: 48,
    description: "Papel de seda pra enrolar com queima uniforme."
  },
  {
    id: "000115",
    name: "Shoulder bag colmeia",
    category: "acessorios",
    price: 110.0,
    stock: 2,
    description: "Bolsa transversal prática pro dia a dia.",
    badge: "Últimas unidades"
  },
  {
    id: "000043-5",
    name: "Slick 15ml nqt",
    category: "acessorios",
    price: 15.0,
    stock: 5,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "000218-1",
    name: "Slick com divisória",
    category: "acessorios",
    price: 20.0,
    stock: 15,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "000002-5",
    name: "Slick de silicone e vidro",
    category: "acessorios",
    price: 25.0,
    stock: 3,
    description: "Slick de silicone, antiaderente e fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000147-1",
    name: "Slick de vidro grande",
    category: "acessorios",
    price: 30.0,
    stock: 3,
    description: "Slick de silicone, antiaderente e fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000146-1",
    name: "Slick de vidro pequeno",
    category: "acessorios",
    price: 25.0,
    stock: 0,
    description: "Slick de silicone, antiaderente e fácil de limpar.",
    badge: "Esgotado"
  },
  {
    id: "000250-1",
    name: "Slick double Gordão Head Shop",
    category: "acessorios",
    price: 55.0,
    stock: 3,
    description: "Slick de silicone, antiaderente e fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000330-1",
    name: "Slick forminha gelo",
    category: "acessorios",
    price: 100.0,
    stock: 1,
    description: "Slick de silicone, antiaderente e fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000121",
    name: "Slick ganjah",
    category: "acessorios",
    price: 14.0,
    stock: 9,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "000047-1",
    name: "Slick gelo quadrado",
    category: "acessorios",
    price: 30.0,
    stock: 3,
    description: "Slick de silicone, antiaderente e fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000219-1",
    name: "Slick icebud 11ml",
    category: "acessorios",
    price: 20.0,
    stock: 3,
    description: "Slick de silicone, antiaderente e fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000221-1",
    name: "Slick icebud 5ml",
    category: "acessorios",
    price: 10.0,
    stock: 7,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "000220-1",
    name: "Slick icebud 7ml",
    category: "acessorios",
    price: 15.0,
    stock: 24,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "000217-1",
    name: "Slick icebud dado 7ml",
    category: "acessorios",
    price: 20.0,
    stock: 13,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "000249-1",
    name: "Slick icebud meleca",
    category: "acessorios",
    price: 40.0,
    stock: 2,
    description: "Slick de silicone, antiaderente e fácil de limpar.",
    badge: "Últimas unidades"
  },
  {
    id: "000212-1",
    name: "Slick icebud nuvem",
    category: "acessorios",
    price: 25.0,
    stock: 9,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "000035-5",
    name: "Slick lego cânhamo",
    category: "acessorios",
    price: 30.0,
    stock: 4,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "000222-1",
    name: "Slick mini",
    category: "acessorios",
    price: 5.0,
    stock: 51,
    description: "Slick de silicone, antiaderente e fácil de limpar."
  },
  {
    id: "000017-5",
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
    name: "Sucreme",
    category: "acessorios",
    price: 55.0,
    stock: 15,
    description: "Sucreme cremoso, prático pra preparar na hora."
  },
  {
    id: "000223-1",
    name: "Sucreme duplo",
    category: "acessorios",
    price: 160.0,
    stock: 2,
    description: "Sucreme cremoso, prático pra preparar na hora.",
    badge: "Últimas unidades"
  },
  {
    id: "000007",
    name: "Tabaco acrema",
    category: "tabaco",
    price: 20.0,
    stock: 91,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000021",
    name: "Tabaco amsterdam",
    category: "tabaco",
    price: 20.0,
    stock: 4,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000070-1",
    name: "Tabaco bem bolado enrolado",
    category: "tabaco",
    price: 25.0,
    stock: 10,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000252-1",
    name: "Tabaco bem bolado original",
    category: "tabaco",
    price: 20.0,
    stock: 0,
    description: "Tabaco para enrolar, sabor e queima equilibrados.",
    badge: "Esgotado"
  },
  {
    id: "000235-1",
    name: "Tabaco bombaco",
    category: "tabaco",
    price: 30.0,
    stock: 13,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000236-1",
    name: "Tabaco bombaco baunilha",
    category: "tabaco",
    price: 30.0,
    stock: 7,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000025",
    name: "Tabaco bombaco café",
    category: "tabaco",
    price: 30.0,
    stock: 3,
    description: "Tabaco para enrolar, sabor e queima equilibrados.",
    badge: "Últimas unidades"
  },
  {
    id: "000032-5",
    name: "Tabaco crazy sabores",
    category: "tabaco",
    price: 25.0,
    stock: 8,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000023",
    name: "Tabaco cremaria",
    category: "tabaco",
    price: 15.0,
    stock: 14,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000242-1",
    name: "Tabaco cremaria premium",
    category: "tabaco",
    price: 15.0,
    stock: 4,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000023-5",
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
    name: "Tabaco hi tobacco blend",
    category: "tabaco",
    price: 25.0,
    stock: 6,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000241-1",
    name: "Tabaco hi tobacco grande",
    category: "tabaco",
    price: 25.0,
    stock: 3,
    description: "Tabaco para enrolar, sabor e queima equilibrados.",
    badge: "Últimas unidades"
  },
  {
    id: "000027",
    name: "Tabaco hi tobacco pequeno",
    category: "tabaco",
    price: 15.0,
    stock: 15,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000038-5",
    name: "Tabaco hippster",
    category: "tabaco",
    price: 20.0,
    stock: 10,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000243-1",
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
    name: "Tabaco marroquino",
    category: "tabaco",
    price: 20.0,
    stock: 11,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000013-5",
    name: "Tabaco mirage grande",
    category: "tabaco",
    price: 30.0,
    stock: 9,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000024",
    name: "Tabaco mirage pequeno",
    category: "tabaco",
    price: 20.0,
    stock: 13,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000022-5",
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
    name: "Tabaco rainbow",
    category: "tabaco",
    price: 15.0,
    stock: 4,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000001",
    name: "Tabaco santorini",
    category: "tabaco",
    price: 25.0,
    stock: 90,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000122",
    name: "Tabaco ta na mão",
    category: "tabaco",
    price: 20.0,
    stock: 10,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000248-1",
    name: "Tabaco tab",
    category: "tabaco",
    price: 25.0,
    stock: 7,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000028",
    name: "Tabaco tabaquim",
    category: "tabaco",
    price: 15.0,
    stock: 16,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000019-5",
    name: "Tabaco tabash baunilha",
    category: "tabaco",
    price: 25.0,
    stock: 2,
    description: "Tabaco para enrolar, sabor e queima equilibrados.",
    badge: "Últimas unidades"
  },
  {
    id: "000020-5",
    name: "Tabaco tabash menta",
    category: "tabaco",
    price: 25.0,
    stock: 6,
    description: "Tabaco para enrolar, sabor e queima equilibrados."
  },
  {
    id: "000237-1",
    name: "Tabaco the og",
    category: "tabaco",
    price: 15.0,
    stock: 0,
    description: "Tabaco para enrolar, sabor e queima equilibrados.",
    badge: "Esgotado"
  },
  {
    id: "000022",
    name: "Tabaco veio pimenta",
    category: "tabaco",
    price: 25.0,
    stock: -3,
    description: "Tabaco para enrolar, sabor e queima equilibrados.",
    badge: "Esgotado"
  },
  {
    id: "000313-1",
    name: "Tapete meleca",
    category: "acessorios",
    price: 50.0,
    stock: 1,
    description: "Tapete de silicone, protege a superfície e facilita a limpeza.",
    badge: "Últimas unidades"
  },
  {
    id: "000314-1",
    name: "Tesoura abduzido",
    category: "acessorios",
    price: 40.0,
    stock: 14,
    description: "Tesoura de precisão pra picar sem embolar."
  },
  {
    id: "000032",
    name: "Tesoura de ferro especial",
    category: "acessorios",
    price: 35.0,
    stock: 7,
    description: "Tesoura de precisão pra picar sem embolar."
  },
  {
    id: "000078",
    name: "Tesoura dobravel de metal",
    category: "acessorios",
    price: 20.0,
    stock: 10,
    description: "Tesoura de precisão pra picar sem embolar."
  },
  {
    id: "000001-1",
    name: "Tesoura dobrável de plástico",
    category: "acessorios",
    price: 15.0,
    stock: 160,
    description: "Tesoura de precisão pra picar sem embolar."
  },
  {
    id: "000093",
    name: "Tesoura dobrável ferro Mr. Baba",
    category: "acessorios",
    price: 25.0,
    stock: 0,
    description: "Tesoura de precisão pra picar sem embolar.",
    badge: "Esgotado"
  },
  {
    id: "000294-1",
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
    name: "Tesoura metal icebud",
    category: "acessorios",
    price: 35.0,
    stock: 1,
    description: "Tesoura de precisão pra picar sem embolar.",
    badge: "Últimas unidades"
  },
  {
    id: "000021-5",
    name: "Tesoura Na boa",
    category: "acessorios",
    price: 50.0,
    stock: 4,
    description: "Tesoura de precisão pra picar sem embolar."
  },
  {
    id: "000322-1",
    name: "Tesoura simples",
    category: "acessorios",
    price: 10.0,
    stock: 1,
    description: "Tesoura de precisão pra picar sem embolar.",
    badge: "Últimas unidades"
  },
  {
    id: "000009-1",
    name: "Tubeck bem bolado",
    category: "sedas",
    price: 42.0,
    stock: 7,
    description: "Tubo pra guardar seus pré-enrolados sem amassar."
  },
  {
    id: "000036-5",
    name: "Tubeck cânhamo",
    category: "sedas",
    price: 10.0,
    stock: 8,
    description: "Tubo pra guardar seus pré-enrolados sem amassar."
  },
  {
    id: "000101-1",
    name: "Tubeck g•rollz amarelo",
    category: "sedas",
    price: 12.0,
    stock: 32,
    description: "Tubo pra guardar seus pré-enrolados sem amassar."
  },
  {
    id: "000100-1",
    name: "Tubeck g•rollz azul",
    category: "sedas",
    price: 12.0,
    stock: 24,
    description: "Tubo pra guardar seus pré-enrolados sem amassar."
  },
  {
    id: "000102-1",
    name: "Tubeck g•rollz rosa",
    category: "sedas",
    price: 12.0,
    stock: 32,
    description: "Tubo pra guardar seus pré-enrolados sem amassar."
  },
  {
    id: "000260-1",
    name: "Tubeck lion circus",
    category: "sedas",
    price: 10.0,
    stock: 0,
    description: "Tubo pra guardar seus pré-enrolados sem amassar.",
    badge: "Esgotado"
  },
  {
    id: "000089-1",
    name: "Tubeck papelito",
    category: "sedas",
    price: 15.0,
    stock: 13,
    description: "Tubo pra guardar seus pré-enrolados sem amassar."
  },
  {
    id: "000104-1",
    name: "Tubeck preto",
    category: "sedas",
    price: 8.0,
    stock: 4,
    description: "Tubo pra guardar seus pré-enrolados sem amassar."
  },
  {
    id: "000105-1",
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
    name: "Tubeck squadafum",
    category: "sedas",
    price: 15.0,
    stock: 4,
    description: "Tubo pra guardar seus pré-enrolados sem amassar."
  },
  {
    id: "000106-1",
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
