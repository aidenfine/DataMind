import { useProModal } from "@/hooks/use-pro-modal"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge";
import { tools } from "@/helpers/tools";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";

export const ProModal = () => {
    const proModal = useProModal();
    const [loading, setLoading] = useState(false);
  
    const onSubscribe = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/stripe");
  
        window.location.href = response.data.url;
      } catch (error) {
        // toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex flex-col items-center justify-center pb-2 gap-y-4">
                        <div className="flex items-center font-bold gap-x-2">
                            Upgrade
                            <Badge className="py-1 text-sm uppercase">
                                pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="pt-2 space-y-2 font-medium text-center text-zinc-900">
                        {tools.map((tools) => (
                            <Card 
                            key={tools.label}
                            className="flex items-center justify-between p-3 border-black-5">
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tools.bgColor)}>
                                        <tools.icon className={cn("w-6 h-6", tools.color)} />
                                    </div>
                                    <div className="text-sm font-semibold">
                                        {tools.label}
                                    </div>
                                </div>
                                <Check className="w-5 h-5 text-primary"/>
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                    onClick={onSubscribe}
                    size="lg"
                    variant="upgrade"
                    className="w-full"
                    >
                        Upgrade
                        <Zap  className="w-4 h-4 ml-2"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )

}