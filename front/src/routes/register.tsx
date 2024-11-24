import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";

function Register() {
  return (
    <Card className="mx-auto max-w-md p-4 bg-red-100 text-black">
      <CardHeader title="Registro" />
      <CardContent>
        <Input placeholder="Nome" className="mb-4" />
        <Input placeholder="Email" type="email" className="mb-4" />
        <Input placeholder="Senha" type="password" className="mb-4" />
        <Button className="bg-red-500 hover:bg-red-600 text-white">Registrar</Button>
      </CardContent>
    </Card>
  );
}

export default Register;
