export const metadata = {
  title: "TerraQuest - Satellite Data Explorer | NASA Terra Mission",
  description:
    "Embark on an interactive space mission with NASA's Terra satellite. Learn about Earth observation, climate monitoring, and space technology through an immersive gaming experience.",
  keywords:
    "NASA, Terra satellite, space game, Earth observation, climate science, interactive learning, space mission, satellite data",
  openGraph: {
    title: "TerraQuest - Satellite Data Explorer",
    description:
      "Learn about NASA's Terra Satellite through an interactive space game",
    type: "website",
    url: "https://your-domain.com/games/satellite-data-explorer",
    images: [
      {
        url: "/assets/terra-game-preview.jpg",
        width: 1200,
        height: 630,
        alt: "TerraQuest - Interactive NASA Terra Satellite Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TerraQuest - Satellite Data Explorer",
    description:
      "Learn about NASA's Terra Satellite through an interactive space game",
    images: ["/assets/terra-game-preview.jpg"],
  },
};

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#0b1a2a" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className="bg-gradient-to-br from-black via-[#0a1428] to-[#0b1a2a] antialiased overflow-x-hidden">
        {/* Space Background Effects */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Animated Stars Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1),_transparent_70%)] animate-pulse"></div>

          {/* Twinkling Stars Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(1px 1px at 20px 30px, #fff, transparent),
                               radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
                               radial-gradient(1px 1px at 90px 40px, #fff, transparent),
                               radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
                               radial-gradient(2px 2px at 160px 30px, rgba(59,130,246,0.8), transparent)`,
              backgroundRepeat: "repeat",
              backgroundSize: "200px 100px",
              animation: "twinkle 4s ease-in-out infinite alternate",
            }}
          ></div>

          {/* Nebula Effects */}
          <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-cyan-600/10 blur-3xl rounded-full top-1/4 left-1/4 animate-pulse"></div>
          <div
            className="absolute w-80 h-80 bg-gradient-to-r from-purple-600/8 via-indigo-600/5 to-blue-600/8 blur-3xl rounded-full bottom-1/4 right-1/4 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">{children}</div>

        {/* Performance Optimization Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Optimize animations for performance
              if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.style.setProperty('--animation-duration', '0s');
              }
              
              // Preload critical game assets
              const preloadImages = [
                '/assets/terra-thumb.jpg',
                '/assets/Terra.glb'
              ];
              
              preloadImages.forEach(src => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = src.endsWith('.glb') ? 'fetch' : 'image';
                link.href = src;
                document.head.appendChild(link);
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
