import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";

function MagicLink() {
  return (
    <Card className="mx-auto max-w-md p-4 bg-gold-100 text-black">
      <CardHeader title="Validação de Link" />
      <CardContent>
        <p>Validando o token...</p>
      </CardContent>
    </Card>
  );
}

export default MagicLink;
