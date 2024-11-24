import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, Card } from "@/components/ui/card";
import { Table, TableHeader, TableCell, TableRow, TableBody } from "@/components/ui/table";

function Home() {
  const produtos = [
    { id: 1, nome: 'Produto 1', preco: 'R$ 100' },
    { id: 2, nome: 'Produto 2', preco: 'R$ 200' },
  ];

  return (
    <Card className="p-4 bg-red-50 text-black">
      <CardHeader title="Lista de Produtos" />
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produtos.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell>{produto.nome}</TableCell>
                <TableCell>{produto.preco}</TableCell>
                <TableCell>
                  <Button className="mr-2 bg-gold-500 text-black">Adicionar ao Carrinho</Button>
                  <Button className="bg-black text-white">Criar Produto</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Home;
