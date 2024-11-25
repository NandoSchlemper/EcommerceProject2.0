import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Usando useNavigate no React Router v6
import { client } from "../api/index"; // Supondo que a configuração do cliente TRPC esteja nesse caminho
import { useCookies } from "react-cookie";

function MagicLink() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cookies, setCookies] = useCookies(['user_email'])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!token) {
      console.error("Token não fornecido");
      setError("Token não fornecido");
      setLoading(false);
      return;
    }

    const validateToken = async () => {
      try {
        // Chama o TRPC para validar o token
        const response = await client.auth.verify.query({ token });
        
        // Se o token for válido, redireciona para a home
        if (response.email) {
          setCookies('user_email', response.email, {path: '/'})
          console.log(cookies.user_email)
          navigate("/home"); // Redireciona para a página /home
        } else {
          setError("Token inválido ou expirado");
          navigate("/login")
        }
      } catch (err) {
        console.error("Erro ao validar o token", err);
        setError("Erro ao validar o token");
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token, navigate]);

  if (loading) {
    return <p>Validando o token...</p>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return null;
}

export default MagicLink;
