import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";


export default function Register() {
    return (
        <Card className="p-6 bg-red-100 shadow-lg rounded-lg">
          <CardHeader>
            <h2 className="text-lg font-bold text-center mb-4">Registrar</h2>
          </CardHeader>
          <CardContent>
            <form>
              <div className="mb-4">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Digite seu nome" />
              </div>
              <div className="mb-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Digite seu email" />
              </div>
              <Button className="w-full bg-red-500 text-white hover:bg-red-600">
                Registrar
              </Button>
            </form>
          </CardContent>
        </Card>
    );
  }
  
