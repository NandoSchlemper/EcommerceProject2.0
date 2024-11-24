import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";


function Login() {
  return (
    <Card className="mx-auto max-w-md p-4 bg-red-100 text-black">
      <CardHeader title="Login" />
      <CardContent>
        <Input placeholder="Email" type="email" className="mb-4" />
        <Button className="bg-gold-500 hover:bg-gold-600 text-black">Enviar Link</Button>
      </CardContent>
    </Card>
  );
}

export default Login;
