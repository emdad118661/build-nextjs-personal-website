import './globals.css';

export const metadata = {
  title: "Emdadul Haque | MERN Stack Developer",
  description: "Personal portfolio of Emdadul Haque, a MERN Stack Developer with expertise in MongoDB, Express.js, React.js, Node.js, and Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-950 text-gray-100 antialiased">{children}</body>
    </html>
  );
}
