"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2, text-black">
        <li>Sites</li>
        <li>Aplicativos</li>
        <li>Softweres</li>
        <li>Instalações</li>
        <li>Automação</li>
        <li>Servios Personalizados</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-black" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/about-image.png" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-black mb-4">Sobre Nós</h2>
          <p className="text-base lg:text-lg, text-black">
            Somos uma equipe de desenvolvedores onde estamos aqui para
            resolver seus problemas envolvendo tecnologia, estamos a bastante
            tempo no mercado como desenvolvedores consolidando uma equipe sólida
            pronta para resolver qualquer desafio ou ideia proposta!
          </p>
          <br></br>
          <p className="text-base lg:text-lg, text-black">
            Crie seus projetos com a equipe certa, da forma que você sempre sonhou
            estamos aqui prontos para dar vida ao seu site, aplicativo ou sistema!
          </p>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
