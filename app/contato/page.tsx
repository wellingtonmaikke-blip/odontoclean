"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { contato } from "@/lib/content";

export default function ContatoPage() {
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Aqui você pode integrar com um endpoint real (ex: /api/contato) ou serviço de e-mail.
    setEnviado(true);
  }

  return (
    <>
      <Navbar />
      <section className="bg-brand-lightBlue/50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="pill">Fale conosco</span>
          <h1 className="mt-4 section-title">{contato.titulo}</h1>
          <p className="section-subtitle mx-auto text-center">{contato.texto}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3 card">
            {enviado ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-mint/15 text-brand-mintDark">
                  ✓
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-brand-gray-900">Mensagem enviada!</h3>
                <p className="mt-2 text-brand-gray-600">Nossa equipe entrará em contato em breve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label-field">Nome completo</label>
                    <input required className="input-field" placeholder="Seu nome" />
                  </div>
                  <div>
                    <label className="label-field">Nome da clínica</label>
                    <input required className="input-field" placeholder="Nome da clínica" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label-field">E-mail</label>
                    <input required type="email" className="input-field" placeholder="voce@clinica.com" />
                  </div>
                  <div>
                    <label className="label-field">Telefone / WhatsApp</label>
                    <input required className="input-field" placeholder="(00) 00000-0000" />
                  </div>
                </div>
                <div>
                  <label className="label-field">Mensagem</label>
                  <textarea required rows={5} className="input-field" placeholder="Conte um pouco sobre a sua clínica e o que você precisa..." />
                </div>
                <button type="submit" className="btn-primary w-full sm:w-auto">Enviar mensagem</button>
              </form>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h3 className="font-display font-bold text-brand-gray-900">Telefone</h3>
              <p className="mt-1 text-brand-gray-600">{contato.telefone}</p>
            </div>
            <div className="card">
              <h3 className="font-display font-bold text-brand-gray-900">WhatsApp</h3>
              <p className="mt-1 text-brand-gray-600">{contato.whatsapp}</p>
            </div>
            <div className="card">
              <h3 className="font-display font-bold text-brand-gray-900">E-mail</h3>
              <p className="mt-1 text-brand-gray-600">{contato.email}</p>
            </div>
            <div className="card">
              <h3 className="font-display font-bold text-brand-gray-900">Endereço</h3>
              <p className="mt-1 text-brand-gray-600">{contato.endereco}</p>
            </div>
            <div className="card">
              <h3 className="font-display font-bold text-brand-gray-900">Horário de atendimento</h3>
              <p className="mt-1 text-brand-gray-600">{contato.horario}</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
