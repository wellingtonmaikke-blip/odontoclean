import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sobre } from "@/lib/content";

export default function SobrePage() {
  return (
    <>
      <Navbar />
      <section className="bg-brand-lightBlue/50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="pill">Nossa história</span>
          <h1 className="mt-4 section-title">{sobre.titulo}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 overflow-hidden rounded-xl2 shadow-premium">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1000&auto=format&fit=crop&q=80"
            alt="Equipe Método Fluxo organizando uma clínica odontológica"
            className="h-72 w-full object-cover"
          />
        </div>
        <div className="space-y-6">
          {sobre.paragrafos.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-brand-gray-700">
              {p}
            </p>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
