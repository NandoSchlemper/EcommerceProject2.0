import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { client } from "../api/index"; // Ajuste conforme a localização do seu cliente TRPC
import { useCookies } from "react-cookie";

interface ProductDialogProps {
  onClose: () => void;
  onAdd: (product: { name: string; price: number; description: string; stock: number }) => void;
}

export const ProductDialog: React.FC<ProductDialogProps> = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(1);
  const [cookie] = useCookies(["user_email"])


  const handleSubmit = async () => {
    try {
      const {id: userId} = await client.user.getUserId.query({email: cookie.user_email})

      // Envia a mutação para criar o produto via TRPC
      await client.product.createProduct.mutate({
        user_id: userId, // Substitua com o user_id real
        name,
        description,
        price,
        stock,
      });

      // Chama a função onAdd para atualizar o estado localmente
      onAdd({ name, price: Number(price), description, stock });

      // Fecha o modal
      onClose();
    } catch (err) {
      console.error("Erro ao criar produto:", err);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Incluir Produto</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Nome do Produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="Preço"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          placeholder="Quantidade em Estoque"
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />
        <Button onClick={handleSubmit}>Adicionar</Button>
      </DialogContent>
    </Dialog>
  );
};
