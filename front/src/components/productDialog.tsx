import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { client } from "../api/index"; // Ajuste conforme a localização do seu cliente TRPC
import { useCookies } from "react-cookie";

interface ProductDialogProps {
  onClose: () => void;
}

export const ProductDialog: React.FC<ProductDialogProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(1);
  const [cookie] = useCookies(["user_email"])


  const handleSubmit = async () => {
    try {
      const user = cookie.user_email

      await client.product.createProduct.mutate({
        user_id: user.id,
        name,
        description,
        price,
        stock,
      });

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
