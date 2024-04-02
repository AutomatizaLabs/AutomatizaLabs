"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Servicos",
    id: "servicos",
    content: (
      <ul className="list-disc pl-2 text-lg">
        <li>Sites Personalizados</li> 
        <li>Sites Pre-Moldados</li>
        <li>Testes Automatizados</li>
        <li>Atualização de Sites</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2 text-lg">
        <li>Adaptação de Sites para Celulares</li>
        <li>Aplicações para Celular</li>
        <li>Instalação de Softwares</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2 text-lg">
        <li>Softwares para controle</li>
        <li>Softwares de Backup</li>
      </ul>
    ),
  },
  {
    title: "Automações",
    id: "automations",
    content: (
      <ul className="list-disc pl-2 text-lg">
        <li>Automação de Páginas</li>
        <li>Testes Automatizados</li>
        <li>Automação de Emails</li>
        <li>Automação de Postagens</li>
        <li>Chat Bots</li>

      </ul>
    ),
  },
];

const ServicesSection = () => {
  const [tab, setTab] = useState("servicos");
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
          <h2 className="text-4xl font-bold text-black mb-4">Serviços Prestados</h2>
          <p className="text-base lg:text-lg">
           Verifique nossos serviços disponíveis abaixo, 
           aqui você pode escolher o que mais lhe atrai e 
           ver os valores de cada serviço e pacotes completos,
           podendo montar uma ordem mais completa e customizada
           para seus fins pessoais!
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("servicos")}
              active={tab === "servicos"}
            >
              {" "}
              Web{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Mobile{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Softwares{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("automations")}
              active={tab === "automations"}
            >
              {" "}
              Automações{" "}
            </TabButton>
          </div>
          <div className="mt-4">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
