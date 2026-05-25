import { AuthGuard } from "@/components/auth";

export default function RankLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}

