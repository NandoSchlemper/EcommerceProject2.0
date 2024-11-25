import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableCell, TableRow } from "@/components/ui/table";
import {useState} from 'react'
import { ProductDialog } from "@/components/productDialog";
import { CartDialog } from "@/components/cardDialog";
// name: string; price: number; description: string; stock: number

interface Product {
  name: string,
  price: number,
  description: string,
  stock: number
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <Button onClick={() => setShowAddProduct(true)}>Incluir Produtos</Button>
        <Button onClick={() => setShowCart(true)}>Carrinho ({cart.length})</Button>
      </div>

      {/* Dialogs */}
      {showAddProduct && <ProductDialog onClose={() => setShowAddProduct(false)} onAdd={setProducts} />}
      {showCart && <CartDialog onClose={() => setShowCart(false)} cart={cart} />}

      {/* Tabela de Produtos */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {products.map((product, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <TableRow key={index}>
              <TableCell>{product.name}</TableCell>
              <TableCell>R$ {product.price}</TableCell>
              <TableCell>
                <Button onClick={() => addToCart(product)}>Adicionar ao Carrinho</Button>
                <Button variant="destructive" onClick={() => {/* Lógica de exclusão */}}>Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

