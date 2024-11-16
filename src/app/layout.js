import "./globals.css";

export const metadata = {
  title: "Home Service Booking",
  description: "Home Service Booking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
