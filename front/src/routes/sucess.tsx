import { Card, CardHeader, CardContent } from "@/components/ui/card";


function Success() {
  return (
    <Card className="mx-auto max-w-md p-4 bg-red-100 text-black">
      <CardHeader title="Compra Realizada!" />
      <CardContent>
        <p className="text-center">Comprado com Sucesso!</p>
      </CardContent>
    </Card>
  );
}

export default Success;
