import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { client } from "../api/index"; // Caminho onde você configurou o TRPC client

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Envia os dados para o servidor
      const response = await client.auth.register.mutate({name, email});
      console.log("Usuário registrado:", response);

      // colocar um navigate aqui
    } catch (err) {
      console.error("Erro ao registrar o usuário", err);
      setError("Houve um erro ao registrar o usuário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-red-100 shadow-lg rounded-lg">
      <CardHeader>
        <h2 className="text-lg font-bold text-center mb-4">Registrar</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-red-500 text-white hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
