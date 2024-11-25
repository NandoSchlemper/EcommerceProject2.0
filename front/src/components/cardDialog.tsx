import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface CartDialogProps {
  onClose: () => void;
  cart: { name: string; price: number }[];
}

export const CartDialog: React.FC<CartDialogProps> = ({ onClose, cart }) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Carrinho</DialogTitle>
        </DialogHeader>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={index} className="flex justify-between py-2">
              <span>{item.name}</span>
              <span>R$ {item.price.toFixed(2)}</span>
            </div>
          ))
        ) : (
          <p className="text-center">Carrinho vazio</p>
        )}
        <Button onClick={onClose}>Fechar</Button>
      </DialogContent>
    </Dialog>
  );
};
