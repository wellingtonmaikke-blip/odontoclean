import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicoCard from "@/components/ServicoCard";
import { servicos } from "@/lib/content";

export default function ServicosPage() {
  const diagnostico = servicos.find((s) => s.id === "diagnostico")!;
  const outros = servicos.filter((s) => s.id !== "diagnostico");

  return (
    <>
      <Navbar />
      <section className="bg-brand-lightBlue/50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="pill">Nossos serviços</span>
          <h1 className="mt-4 section-title">Consultoria de eficiência operacional para clínicas odontológicas</h1>
          <p className="section-subtitle mx-auto text-center">
            Do diagnóstico à mentoria contínua: cada serviço foi pensado para reduzir desperdícios,
            atrasos e estresse no consultório — e aumentar a produtividade da sua equipe.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="rounded-xl2 bg-brand-gray-50 p-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-darkBlue">Comece por aqui</p>
          <p className="mt-2 text-brand-gray-600">
            Antes de contratar a implantação completa, recomendamos o <strong>Diagnóstico Operacional</strong> —
            um investimento baixo que já mostra, com pontuação de 0 a 100, onde estão os principais gargalos da sua clínica.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ServicoCard servico={diagnostico} ctaHref="/cadastro" />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {outros.map((s) => (
            <ServicoCard key={s.id} servico={s} ctaHref="/cadastro" />
          ))}
        </div>

        <div className="mt-16 rounded-xl2 bg-brand-gray-50 p-8 text-center">
          <h3 className="font-display text-xl font-bold text-brand-gray-900">
            Selo Clínica Organizada®
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-brand-gray-600">
            Após a Implantação Completa, sua clínica recebe certificado, manual personalizado, checklists
            e cronograma de auditoria — aumentando a percepção de valor e ajudando na fidelização dos pacientes.
          </p>
        </div>

        <div className="mt-8 rounded-xl2 bg-brand-gray-50 p-8 text-center">
          <h3 className="font-display text-xl font-bold text-brand-gray-900">
            Precisa de uma proposta personalizada?
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
