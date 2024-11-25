import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { client } from "@/api";

function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Por favor, digite um email.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Fazendo a requisição para o servidor com o email do usuário
      const response = await client.auth.login.mutate({email: email});

      if (!response) {
        throw new Error("Erro ao enviar o magic link.");
      }

      // Se a requisição for bem-sucedida, mostrar a mensagem de sucesso
      setSuccess("Link enviado com sucesso. Verifique seu email.");
    } catch (err) {
      console.error("Erro ao enviar magic link", err);
      setError("Houve um erro ao enviar o magic link. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-md p-4 bg-red-100 text-black">
      <CardHeader title="Login" />
      <CardContent>
        <form onSubmit={handleLogin}>
          <Input
            placeholder="Email"
            type="email"
            className="mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <Button
            type="submit"
            className="bg-gold-500 hover:bg-gold-600 text-black"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar Link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default Login;
