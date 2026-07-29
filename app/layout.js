export const metadata = {
  title: "NCBT - National CBT",
  description: "India's Trusted Platform for Nursing, Pharmacist & Paramedical Government Exam Prep",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: "#f9fafb" }}>
        {children}
      </body>
    </html>
  );
}
