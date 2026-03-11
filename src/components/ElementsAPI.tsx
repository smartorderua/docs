import "@stoplight/elements/styles.min.css";
import "@stoplight/elements-dev-portal/styles.min.css";

//@ts-ignore
import { API } from "@stoplight/elements";
import React, { useContext } from "react";

import { GlobalContext } from "../context";
import { getSchemaUrl } from "../utils";

export const ElementsAPI: React.FC = () => {
  const { releaseTag, layout } = useContext(GlobalContext);

  const releaseUrl = getSchemaUrl(releaseTag);
  const proxy = new URL(`https://cors-anywhere.com/${releaseUrl}`);

  console.log({ tag: releaseTag });

  return (
    <API
      apiDescriptionUrl={proxy.toString()}
      router="history"
      layout={layout}
    />
  );
};
