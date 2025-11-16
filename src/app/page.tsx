import { Navbar } from "@/components/layout/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-bold">Landingpage</h1>
      </div>
    </div>
  );
}
