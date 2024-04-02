"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  
  {
    id: 1,
    title: "Website E-Comerce",
    description: "Project 1 description",
    image: "/images/projects/1.png",
    tag: ["Todos", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  
  {
    id: 2,
    title: "Aplicativo para Celular",
    description: "Project 2 description",
    image: "/images/projects/2.png",
    tag: ["Todos", "Celular"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Sistemas de backup",
    description: "Project 3 description",
    image: "/images/projects/3.png",
    tag: ["Todos", "Softwere"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Automação de Sistemas",
    description: "Project 4 description",
    image: "/images/projects/4.png",
    tag: ["Todos", "Automações"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Aplicativo de Gerenciamento",
    description: "Authentication and CRUD operations",
    image: "/images/projects/5.png",
    tag: ["Todos", "Celular"],
    gitUrl: "/",
    previewUrl: "/",
  },
];

const ServicesPriceSection = () => {
  const [tag, setTag] = useState("Todos");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-black mt-4 mb-8 md:mb-12">
        Serviços
      </h2>
      <div className="text-black flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="Todos"
          isSelected={tag === "Todos"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Celular"
          isSelected={tag === "Celular"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Software"
          isSelected={tag === "Softwere"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Automações"
          isSelected={tag === "Automações"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ServicesPriceSection;
