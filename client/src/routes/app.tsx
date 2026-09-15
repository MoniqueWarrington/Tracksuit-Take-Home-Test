import { useEffect, useState } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import type { Insight } from "../schemas/insight.ts";
import { mapInsight } from "../maps/insight.ts";

export const App = () => {
  const [insights, setInsights] = useState<Insight[]>([]);

  const fetchInsights = () => {
    return fetch("/api/insights")
      .then((response) => response.json())
      .then((result) => result.map(mapInsight))
      .then(setInsights);
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <main className={styles.main}>
      <Header onInsightCreated={fetchInsights} />
      <Insights
        className={styles.insights}
        insights={insights}
        onInsightDeleted={fetchInsights}
      />
    </main>
  );
};