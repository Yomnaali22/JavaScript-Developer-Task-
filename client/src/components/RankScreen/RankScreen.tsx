import React, { useEffect, useState } from "react";
import { fetchScores } from "../../api/api";

const RankScreen = ({ score }: { score: number }) => {
  const [scores, setScores] = useState<number[]>([]);

  // filtering the scores that are below the student score
  const filteredScores = scores.filter((thescore) => thescore < score);

  const rank = Math.round((filteredScores.length / scores.length) * 100);

  useEffect(() => {
    fetchScores(setScores, "/rank", score);
  }, []);

  return (
    <div>
      <h1>your rank is {rank} amongst peers</h1>
    </div>
  );
};

export default RankScreen;
