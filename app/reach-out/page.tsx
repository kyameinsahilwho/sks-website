import { Github, Linkedin, Twitter, Instagram, Youtube, PenTool } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function ContactSection() {
  return (
    <div className="relative flex flex-col min-h-[calc(100vh-4rem)] md:flex-row items-center justify-center gap-6 p-5 overflow-hidden bg-white dark:bg-gray-900 antialiased">
      {/* SVG Background */}
      
      {/* Image Card */}
      <Card className="w-80 rounded-none border-[10px] border-white dark:border-gray-800 shadow-lg overflow-hidden relative z-10">
        <CardContent className="p-0">
          <Image
            src="/psyduck.jpg" // Ensure this file is placed in the public folder
            width={320}
            height={400}
            alt="Scenic Mountain View"
            className="object-cover rounded-none"
          />
        </CardContent>
      </Card>

      {/* Contact Info */}
      <div className="text-center md:text-left max-w-lg relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          If you really, really, really want to reach out to me!
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mt-2 text-lg">
          Mail me ~ <span className="font-semibold"> kyameinsahilwho at gmail dot com</span>
        </p>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-start gap-4 mt-4 text-gray-700 dark:text-gray-300">
          <a target="_blank" href="https://github.com/kyameinsahilwho">
            <Github className="w-10 h-10 hover:text-black dark:hover:text-white cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-125" />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/kyameinsahilwho">
            <Linkedin className="w-10 h-10 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-125" />
          </a>
          <a target="_blank" href="https://x.com/kyameinsahilwho">
            <Twitter className="w-10 h-10 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-125" />
          </a>
          <a target="_blank" href="https://www.instagram.com/kyameinsahilwho">
            <Instagram className="w-10 h-10 hover:text-pink-500 dark:hover:text-pink-300 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-125" />
          </a>
          <a target="_blank" href="https://www.youtube.com/@kyameinsahilwho">
            <Youtube className="w-10 h-10 hover:text-red-600 dark:hover:text-red-400 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-125" />
          </a>
          <a target="_blank" href="https://kyameinsahilwho.medium.com/">
            <PenTool className="w-10 h-10 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-125" />
          </a>
        </div>
      </div>
    </div>
  );
}
