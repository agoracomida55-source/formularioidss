import RegistrationForm from "@/components/registration-form"
import { createClient } from "@/lib/supabase"
import { redirect } from "next/navigation"

interface PageProps {
  params: { representanteId: string }
}

export default async function RepresentantePage({ params }: PageProps) {
  const { representanteId } = params

  const supabase = createClient()

  const { data: representative } = await supabase
    .from('representatives')
    .select('id, name, whatsapp, active')
    .eq('id', representanteId)
    .eq('active', true)
    .maybeSingle()

  if (!representative) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-6 md:py-12 px-2 md:px-4">
        <div className="container mx-auto max-w-4xl w-full px-3 sm:px-6 md:px-8">
          <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 text-center">
            <div className="mb-6">
              <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Acesso Não Autorizado</h1>
            <p className="text-gray-600 mb-4">
              O código de representante <strong>{representanteId}</strong> não está autorizado ou não existe.
            </p>
            <p className="text-sm text-gray-500">
              Entre em contato com o suporte se você acredita que isso é um erro.
            </p>
          </div>
          <footer className="text-center mt-6 md:mt-8 text-xs sm:text-sm text-gray-600 px-2">
            <p>2025 © Federal Associados (CNPJ 29.383-343-0001/64) - Todos os direitos reservados |</p>
          </footer>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-6 md:py-12 px-2 md:px-4">
      <div className="container mx-auto max-w-4xl w-full px-3 sm:px-6 md:px-8">
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8">
          <RegistrationForm
            representanteId={representanteId}
            representativeWhatsapp={representative.whatsapp}
          />
        </div>
        <footer className="text-center mt-6 md:mt-8 text-xs sm:text-sm text-gray-600 px-2">
          <p>2025 © Federal Associados (CNPJ 29.383-343-0001/64) - Todos os direitos reservados |</p>
        </footer>
      </div>
    </main>
  )
}
