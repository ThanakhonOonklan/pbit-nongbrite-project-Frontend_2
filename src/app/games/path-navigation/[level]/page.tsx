import { PATH_PATTERN_SETS } from "@/constants/games/path-navigation-levels";
import PathNavigationClientPage from "./client-page";

export default async function PathNavigationGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const levelNum = Number(level);

  const patternSet = PATH_PATTERN_SETS[levelNum];
  let initialPatternIndex = 0;

  if (patternSet && patternSet.length > 0) {
    initialPatternIndex = Math.floor(Math.random() * patternSet.length);
  }

  return <PathNavigationClientPage level={level} initialPatternIndex={initialPatternIndex} />;
}
