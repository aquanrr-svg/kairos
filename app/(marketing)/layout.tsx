import Navbar from "../../components/Navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="landing-shell">
      <Navbar />
      {children}
    </div>
  );
}
