"use client";
import Image from "next/image";
import { useState } from "react";


function Carousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  if (!images || images.length === 0) return null;
  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  return (
    <div className="flex flex-col items-center mb-4">
      <div className="relative w-full flex items-center justify-center">
        <button type="button" onClick={prev} className="absolute left-0 px-2 py-1 text-2xl text-gray-400 hover:text-gray-700 dark:hover:text-white">&#8592;</button>
        <Image
          src={images[index]}
          alt={`Project screenshot ${index + 1}`}
          width={400}
          height={240}
          className="rounded shadow mx-auto"
        />
        <button type="button" onClick={next} className="absolute right-0 px-2 py-1 text-2xl text-gray-400 hover:text-gray-700 dark:hover:text-white">&#8594;</button>
      </div>
      <div className="flex gap-2 mt-2">
        {images.map((_, i) => (
          <button
            type="button"
            key={i}
            className={`w-2 h-2 rounded-full ${i === index ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

type Project = {
  title: string;
  description: string;
  paragraphs: string[];
  bulletPoints: string[];
  images: string[];
};

const projects: Project[] = [
  {
    title: "AVListner",
    description: "Subnet Monitoring for AV Devices Using TS and GO.",
    paragraphs: [
      "Using Go i created 2 Conponenets, Server and Agent. The Server is an API Server that listens for Imcoming hearbeat dava for online devices. The Agent is a small binary that runs on each device and sends periodic heartbeats to the server.",
      "All the Date is then. Funneled Into a React Frontend that displays the devices and their status. The Frontend is built with React and TypeScript."
    ],
    bulletPoints: [
      "Feature A implemented with React and TypeScript",
      "Responsive design with Tailwind CSS",
      "Docker Hostable"
    ],
    images: [
      "/project1-1.png",
      "/project1-2.png",
      "/project1-3.png"
    ]
  },
  {
    title: "Project Lana",
    description: "A brief description of your project goes here.",
    paragraphs: [
      "This is the first paragraph for Project Two. It explains the motivation behind the project.",
      "This is the second paragraph for Project Two. It highlights the impact and results achieved."
    ],
    bulletPoints: [
      "Integration with external APIs",
      "User authentication and authorization",
      "Comprehensive test coverage"
    ],
    images: [
      "/project2-1.png",
      "/project2-2.png"
    ]
  }
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setActiveProject(project);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setActiveProject(null);
  };



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-[#18181b] dark:to-[#09090b] px-4 py-12 sm:px-8">
      <header className="w-full max-w-3xl mx-auto flex flex-col items-center gap-4 mb-12">
        <Image
          src="/avatar.png"
          alt="Your portrait"
          width={96}
          height={96}
          className="rounded-full border-4 border-gray-200 dark:border-gray-700 shadow-lg"
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white">Hi, I'm Alastair!</h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 max-w-xl">I am a DEVOPS Engineer working on Web applciations using TypeScript, Dynamics365 and Sharepoint Development.</p>
      </header>

      <main className="w-full max-w-3xl mx-auto flex flex-col gap-16">
        {/* About Section */}
        <section id="about" className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">About Me</h2>
          <p className="text-gray-700 dark:text-gray-300">I am a Devops Engineer From Nottinghamshire, I work on Web applications, Sharepoint Power App Developement, Process automation using Python and GO. In My spare time i work on Swift Applications and FIVEM Mod Game Development.</p>
          <p className="text-gray-700 dark:text-gray-300">Work isnt my only Passion, I alos enjoy the Outdoors, From walking to Farming. Mainly on wekeedns and after work hours you can find me in the Fields with Sheep</p>
        </section>

        {/* Projects Section */}
        <section id="projects" className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Projects</h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <li
                key={project.title}
                className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 border border-gray-100 dark:border-zinc-800 cursor-pointer hover:shadow-lg transition"
                onClick={() => openModal(project)}
              >
                <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{project.description}</p>
                <span className="text-blue-600 dark:text-blue-400 hover:underline text-sm">View Project</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Modal */}
        {modalOpen && activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6 max-w-lg w-full relative animate-fade-in">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold"
                onClick={closeModal}
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{activeProject.title}</h3>
              {/* Image Carousel */}
              {activeProject.images.length > 0 && (
                <Carousel images={activeProject.images} />
              )}
              {/* Paragraphs */}
              {activeProject.paragraphs.map((para, idx) => (
                <p key={idx} className="text-gray-700 dark:text-gray-300 mb-2">{para}</p>
              ))}
              {/* Bullet Points */}
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 mb-2">
                {activeProject.bulletPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        )}








        {/* Contact Section */}
        <section id="contact" className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Contact</h2>
          <form className="flex flex-col gap-3" action="#" method="POST">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="rounded border border-gray-300 dark:border-zinc-700 px-3 py-2 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="rounded border border-gray-300 dark:border-zinc-700 px-3 py-2 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              className="rounded border border-gray-300 dark:border-zinc-700 px-3 py-2 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
            >
              Send Message
            </button>
          </form>
        </section>
      </main>

      <footer className="w-full max-w-3xl mx-auto mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} [Your Name]. All rights reserved.
      </footer>
    </div>
  );
}
