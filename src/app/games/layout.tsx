import { AuthGuard, GameAccessGuard } from "@/components/auth";

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <GameAccessGuard>{children}</GameAccessGuard>
    </AuthGuard>
  );
}
