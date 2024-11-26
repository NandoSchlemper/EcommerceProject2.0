import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableCell, TableRow } from "@/components/ui/table";
import { ProductDialog } from "@/components/productDialog";
import { CartDialog } from "@/components/cardDialog";
import { client } from "@/api";

// Definição da interface do produto para a aplicação
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // Buscar produtos do backend na montagem do componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await client.product.getAllProducts.query(); // Substitua pela URL correta
        if (response) {
          const formattedProducts = response.map((item) => ({
            id: item.id || crypto.randomUUID(), // Gera um UUID se o id for nulo
            name: item.name,
            description: item.description || "Sem descrição",
            price: Number.parseFloat(item.price), // Converte preço para número
            stock: item.stock || 0,
          }));
          setProducts(formattedProducts);
        }
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <Button onClick={() => setShowAddProduct(true)}>Incluir Produtos</Button>
        <Button onClick={() => setShowCart(true)}>Carrinho ({cart.length})</Button>
      </div>

      {showAddProduct && <ProductDialog onClose={() => setShowAddProduct(false)} />}
      {showCart && <CartDialog onClose={() => setShowCart(false)} cart={cart} />}

      {/* Tabela de Produtos */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Estoque</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>R$ {product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell className="flex gap-2">
                <Button onClick={() => addToCart(product)}>Adicionar ao Carrinho</Button>
                <Button variant="destructive" onClick={() => {/* Lógica de exclusão futura */}}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
