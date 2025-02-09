import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const timelineItems = [
  { year: 2020, event: "Started learning web development", description: "Began my journey into the world of coding, exploring HTML, CSS, and JavaScript.", emoji: "🚀" },
  { year: 2021, event: "Landed first internship", description: "Joined a startup as a front-end developer intern, gaining hands-on experience.", emoji: "👨‍💻" },
  { year: 2022, event: "Contributed to open-source projects", description: "Actively participated in open-source projects, enhancing my collaboration skills.", emoji: "🤝" },
  { year: 2023, event: "Launched personal website", description: "Designed and developed my personal website to showcase my projects and skills.", emoji: "🎉" },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-12">
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(195, 42%, 85%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(195, 42%, 85%) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "center center",
        }}
      />
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center justify-center mb-8">
          <Avatar className="h-[12.5rem] w-[12.5rem] transition-transform duration-300 hover:scale-105 mb-4">
            <AvatarImage src="sks.jpg" alt="Your Profile" />
            <AvatarFallback>SKS</AvatarFallback>
          </Avatar>
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-teal-100 bg-gradient-to-br from-teal-50 to-white dark:from-teal-900 dark:to-gray-800 dark:border-teal-700 max-w-3xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-teal-600 dark:text-teal-400 text-center">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground mb-4 dark:text-gray-400 text-center">
                Hello there! I'm Sahil Kumar Singh, a passionate web developer from India. I am passionate about <span className="underline">design</span>, <span className="underline">philosophy</span>, and <span className="underline">technology</span>. The purpose of this website is to share my journey and express my creativity. Feel free to explore my work, read my blogs, and connect with me😉.
              </p>

            </CardContent>
          </Card>
        </div>

        {/* <Card className="mb-8 shadow-md hover:shadow-xl transition-shadow duration-300 border-2 border-green-100 bg-gradient-to-br from-green-50 to-white dark:from-green-900 dark:to-gray-800 dark:border-green-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-400">Timeline</CardTitle>
            <CardDescription>Key milestones in my journey</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
              {timelineItems.map((item, index) => (
                <li key={index} className="mb-8 ml-6">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">{item.year}</h2>
                    </div>
                    <div className="flex-1">
                      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 dark:bg-gray-700 dark:hover:bg-gray-600">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{item.event}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                      </div>
                    </div>
                    <div className="ml-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-teal-800 dark:to-cyan-800 flex items-center justify-center text-white">
                        <span className="text-lg">{item.emoji}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}