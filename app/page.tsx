import { useEffect, useState } from "react";
import FormularioDeInscricao from "@/componentes/formulário-de-registro";
import { supabase } from "@/lib/supabase";

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
    } else {
      setCarregando(false);
    }
  }, []);

  if (carregando) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-blue-50">
        <p>Carregando informações do representante...</p>
      </main>
    );
  }

  if (!representante) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h1 className="text-xl font-semibold text-red-600 mb-4">
            Você não tem autorização para abrir esse formulário
          </h1>
          <p className="mb-6">Clique no botão abaixo e solicite o seu acesso.</p>
          <a
            href="https://wa.me/5584981321396?text=Olá! Quero solicitar acesso ao formulário."
            target="_blank"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Solicitar Acesso
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-6 md:py-12 px-4 md:px-8">
      <div className="w-auto max-w-4xl bg-white rounded-xl shadow-xl p-6 md:p-8">
        <FormularioDeInscricao
          representanteId={representante.id}
          nomeDoRepresentante={representante.nome}
          representanteWhatsapp={representante.whatsapp}
        />
      </div>
      <footer className="text-center mt-6 md:mt-8 text-sm text-gray-600 px-2">
        <p>© 2025 Federal Associados (CNPJ 29.383.343/0001-64) - Todos os direitos reservados</p>
      </footer>
    </main>
  );
}

