import { ContactForm } from "@/components/sections/contact/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { icon: <Github className="h-5 w-5" />, href: "https://github.com", label: "GitHub" },
  { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", label: "Twitter" },
  { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: <Mail className="h-5 w-5" />, href: "mailto:hello@example.com", label: "Email" },
];

export default function ReachOutPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold">Get in Touch</h1>
        <Card>
          <CardContent className="grid gap-8 p-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xl font-semibold">Contact Me</h2>
              <ContactForm />
            </div>
            <div>
              <h2 className="mb-4 text-xl font-semibold">Connect</h2>
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}