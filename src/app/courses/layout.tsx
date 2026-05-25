import { AuthGuard } from "@/components/auth";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
