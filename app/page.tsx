'use client';

import { useEffect, useState } from "react";
import FormularioDeInscricao from "@/componentes/formulario-de-inscricao";
";
import supabase from "@/lib/supabase";

export default function Lar() {
  const [representante, setRepresentante] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
      supabase
        .from("representantes")
        .select("*")
        .eq("id", id)
        .single()
        .then(({ data }) => {
          setRepresentante(data);
          setCarregando(false);
        })
        .catch(() => setCarregando(false));
    }
  }, []);

  if (carregando) return <p>Carregando...</p>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 flex items-center justify-center py-6 md:py-12 px-2 md:px-4">
      <div className="max-w-4xl w-full px-3 sm:px-6 md:px-8">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
          <FormularioDeInscricao
            representanteId={representante?.id}
            nomeRepresentante={representante?.nome}
            representanteWhatsapp={representante?.whatsapp}
          />
        </div>
      </div>
    </main>
  );
}


