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
                  <Button className="bg-[#4ade80] text-black"> + </Button>
                  <Button className="bg-[#f87171] text-black">Delete</Button>
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
