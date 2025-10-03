import "./globals.css";

export const metadata = {
  title: "TerraQuest - Satellite Data Explorer",
  description: "Learn about NASA's Terra Satellite through an interactive game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
