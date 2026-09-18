/**
 * Produtos mockados da Vitrine pública (app/vitrine). Propositalmente sem
 * campo de categoria — a categoria de cada um é descoberta na hora, lendo
 * o nome com `parseProductCategory` (utils/categoryParser.ts). Isso é o
 * que a tarefa pediu: "a função que lê o nome do produto e o classifica
 * automaticamente", vista funcionando no lado do cliente.
 */

export type StorefrontProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

const IMG_BAG = "/products/vault77-bag.jpg";
const IMG_BANDEJA = "/products/bandeja-narcos.jpg";
const IMG_CASE = "/products/rick-and-morty-tray.jpg";

export const MOCK_STOREFRONT_PRODUCTS: StorefrontProduct[] = [
  { id: "1", name: "Tabaco Marajó", price: 28.0, imageUrl: IMG_BANDEJA },
  { id: "2", name: "Tabaco hi tobacco blend", price: 34.0, imageUrl: IMG_BANDEJA },
  { id: "3", name: "Seda King Size Extra", price: 12.0, imageUrl: IMG_BAG },
  { id: "4", name: "Seda raw clássica", price: 9.0, imageUrl: IMG_BAG },
  { id: "5", name: "Piteira de vidro", price: 18.0, imageUrl: IMG_BAG },
  { id: "6", name: "Piteira sadhu larga preta", price: 15.0, imageUrl: IMG_BAG },
  { id: "7", name: "Alça puff", price: 50.0, imageUrl: IMG_BAG },
  { id: "8", name: "Anel de silicone", price: 20.0, imageUrl: IMG_BAG },
  { id: "9", name: "Bag Vault pequena", price: 110.0, imageUrl: IMG_BAG },
  { id: "10", name: "Bag Vault transversal", price: 120.0, imageUrl: IMG_BAG },
  { id: "11", name: "Bong de vidro pequeno", price: 180.0, imageUrl: IMG_CASE },
  { id: "12", name: "Cuia sadhu mini", price: 45.0, imageUrl: IMG_CASE },
  { id: "13", name: "Dichavador metal grande", price: 60.0, imageUrl: IMG_CASE },
  { id: "14", name: "Bandeja Narcos", price: 65.0, imageUrl: IMG_BANDEJA },
  { id: "15", name: "Cinzeiro de vidro", price: 40.0, imageUrl: IMG_BANDEJA },
  { id: "16", name: "Case Rick and Morty", price: 80.0, imageUrl: IMG_CASE },
  { id: "17", name: "Isqueiro clipper", price: 8.0, imageUrl: IMG_CASE },
  { id: "18", name: "Maçarico blaz", price: 55.0, imageUrl: IMG_CASE },
  { id: "19", name: "Slick de vidro pequeno", price: 25.0, imageUrl: IMG_BAG },
  { id: "20", name: "Tesoura metal garça", price: 22.0, imageUrl: IMG_BAG },
  { id: "21", name: "Pote hermético raw medio", price: 30.0, imageUrl: IMG_BAG },
  { id: "22", name: "Polpa açaí", price: 14.0, imageUrl: IMG_BANDEJA },
  { id: "23", name: "Suco natural", price: 10.0, imageUrl: IMG_BANDEJA },
  { id: "24", name: "Kit montado de 50", price: 95.0, imageUrl: IMG_CASE },
];
