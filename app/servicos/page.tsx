import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlanCard from "@/components/PlanCard";
import { planos } from "@/lib/content";

export default function ServicosPage() {
  return (
    <>
      <Navbar />
      <section className="bg-brand-lightBlue/50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="pill">Nossos planos</span>
          <h1 className="mt-4 section-title">Serviços de limpeza e higienização sob medida</h1>
          <p className="section-subtitle mx-auto text-center">
            Três níveis de atendimento, pensados para diferentes portes e necessidades de clínicas
            odontológicas. Todos os planos incluem equipe treinada e produtos de grau hospitalar.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {planos.map((p) => (
            <PlanCard key={p.id} plano={p} ctaHref="/cadastro" />
          ))}
        </div>

        <div className="mt-16 rounded-xl2 bg-brand-gray-50 p-8 text-center">
          <h3 className="font-display text-xl font-bold text-brand-gray-900">
            Precisa de um plano personalizado?
          </h3>
          <p className="mt-2 text-brand-gray-600">
            Clínicas com múltiplas unidades ou necessidades específicas podem solicitar uma proposta sob medida.
          </p>
          <a href="/contato" className="btn-primary mt-6 inline-flex">Solicitar proposta personalizada</a>
        </div>
      </section>
      <Footer />
    </>
  );
}
