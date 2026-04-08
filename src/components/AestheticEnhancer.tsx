"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { applyAestheticEnhancements } from "@/ai/flows/ai-aesthetic-enhancer";
import { Loader2, Sparkles, Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AestheticEnhancer() {
  const [image, setImage] = useState<string | null>(null);
  const [effect, setEffect] = useState("Glitch, neon pink accents, grainy texture, zine collage overlay");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhance = async () => {
    if (!image) {
      toast({ title: "Erro", description: "Por favor, selecione uma imagem primeiro.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const response = await applyAestheticEnhancements({
        mediaContent: image,
        mediaType: "image",
        effectDescription: effect,
      });
      setResult(response.processedMediaDataUri);
    } catch (error) {
      console.error(error);
      toast({ title: "Erro", description: "Falha ao processar a estética.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 px-6 max-w-4xl mx-auto" id="enhancer">
      <Card className="bg-secondary/30 border-primary/30 zine-shadow rounded-none">
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center gap-2">
            <Sparkles className="text-primary" /> 
            AI Aesthetic Enhancer
          </CardTitle>
          <CardDescription className="text-muted-foreground italic">
            Transform your project visuals into experimental zine-art.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block p-8 border-2 border-dashed border-primary/40 hover:border-primary transition-colors cursor-pointer text-center">
                <Input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                {image ? (
                  <img src={image} alt="Preview" className="max-h-48 mx-auto" />
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="mb-2 text-primary" />
                    <span className="text-sm">Clique para subir imagem</span>
                  </div>
                )}
              </label>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest font-bold">Effect Description</span>
                <Input 
                  value={effect} 
                  onChange={(e) => setEffect(e.target.value)}
                  className="bg-background/50 border-primary/20 focus:border-primary"
                />
              </div>

              <Button 
                onClick={handleEnhance} 
                disabled={loading || !image}
                className="w-full bg-primary hover:bg-primary/80 text-white font-bold"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
                APPLY AESTHETIC
              </Button>
            </div>

            <div className="flex items-center justify-center border-2 border-primary/10 bg-black/40 relative min-h-[300px]">
              {result ? (
                <div className="p-4">
                  <img src={result} alt="Enhanced Result" className="max-w-full h-auto zine-shadow" />
                </div>
              ) : (
                <div className="text-center text-muted-foreground italic p-10">
                  <ImageIcon className="mx-auto mb-2 opacity-20" size={48} />
                  O resultado aparecerá aqui...
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}