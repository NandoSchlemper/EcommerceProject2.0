import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, Card } from "@/components/ui/card";

function Cart() {
  const carrinho = [
    { id: 1, nome: 'Produto 1', preco: 'R$ 100' },
    { id: 2, nome: 'Produto 2', preco: 'R$ 200' },
  ];

  return (
    <Card className="mx-auto max-w-md p-4 bg-gold-50 text-black">
      <CardHeader>
        <h2 className="text-lg font-bold">Carrinho</h2>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {carrinho.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b pb-2">
              <span>{item.nome}</span>
              <span className="font-medium">{item.preco}</span>
            </li>
          ))}
        </ul>
        <Button className="mt-6 w-full bg-red-500 text-white hover:bg-red-600">
          Comprar
        </Button>
      </CardContent>
    </Card>
  );
}

export default Cart;
