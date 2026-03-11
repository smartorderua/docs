import { useEffect, useState } from "react";
import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";

import { getSchemaUrl } from "./utils";

type Release = {
  tag_name: string;
  created_at: Date;
};

const RELEASES_URL =
  "https://api.github.com/repos/smartorderua/contracts/releases";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [releases, setReleases] = useState<Release[]>([]);

  useEffect(() => {
    fetch(RELEASES_URL)
      .then((res) => res.json())
      .then((data) => {
        const releases: Release[] = data.map((release: any) => ({
          tag_name: release.tag_name,
          created_at: new Date(release.created_at),
        }));

        setReleases(releases);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch releases");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ApiReferenceReact
      configuration={{
        sources: releases.map((release) => ({
          title: `${
            release.tag_name
          } (${release.created_at.toLocaleDateString()})`,
          url: new URL(
            `https://cors-anywhere.com/${getSchemaUrl(release.tag_name)}`,
          ).toString(),
          agent: { disabled: true },
        })),

        authentication: {
          preferredSecurityScheme: "BearerAuth",
        },
        servers: [
          {
            url: "https://api.novaorder.tech",
            description: "Production server",
          },
        ],
        layout: "modern",
        hideModels: false,
        baseServerURL: "https://api.novaorder.tech",
        showOperationId: true,
      }}
    />
  );
}

export default App;
