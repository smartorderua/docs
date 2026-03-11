import {
  Flex,
  Provider as MosaicProvider,
  useIconStore,
} from "@stoplight/mosaic";
import React, { useEffect, useState } from "react";

import { DemoNavbar } from "./components/Navbar";
import { ElementsAPI } from "./components/ElementsAPI";
import { GlobalContext, type Release } from "./context";

const RELEASES_URL =
  "https://api.github.com/repos/smartorderua/contracts/releases";

export function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [releases, setReleases] = useState<Release[]>([]);

  const [releaseTag, setReleaseTag] = useState("");

  const setDefaultStyle = useIconStore((state) => state.setDefaultStyle);

  React.useEffect(() => {
    setDefaultStyle("fal");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log({ releaseTag });
  }, [releaseTag]);

  useEffect(() => {
    fetch(RELEASES_URL)
      .then((res) => res.json())
      .then((data) => {
        const releases: Release[] = data.map((release: any) => ({
          tag_name: release.tag_name,
          created_at: new Date(release.created_at),
        }));

        setReleaseTag(
          releases.sort(
            (a, b) => b.created_at.getTime() - a.created_at.getTime(),
          )[0].tag_name,
        );
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
    <MosaicProvider>
      <GlobalContext.Provider
        value={{
          releases,
          releaseTag,
          setReleaseTag,
        }}
      >
        <Flex direction="col" bg="canvas" h="screen">
          <DemoNavbar />
          <ElementsAPI />
        </Flex>
      </GlobalContext.Provider>
    </MosaicProvider>
  );
}
