import {
  Button,
  Flex,
  HStack,
  InvertTheme,
  Menu,
  type MenuItems,
  Text,
} from "@stoplight/mosaic";
import { useContext, useMemo } from "react";

import { GlobalContext } from "../context";

export const DemoNavbar = () => {
  return (
    <>
      <InvertTheme>
        <Flex h="2xl" shrink={0} px={5} alignItems="center" bg="canvas-pure">
          <HStack w="2/3" alignItems="center" spacing={4}>
            <Text fontSize="lg" fontWeight="semibold" lineHeight="none">
              NovaOrderAPI Docs
            </Text>
            <ReleasePicker />
          </HStack>

          <HStack w="1/4" flex={1} justifyContent="end">
            {/* @ts-ignore */}
            <Button
              as="a"
              appearance="minimal"
              target="__blank"
              href="https://novaorder.tech"
            >
              NovaOrder
            </Button>
          </HStack>
        </Flex>
      </InvertTheme>
    </>
  );
};

const ReleasePicker = () => {
  const { releaseTag, setReleaseTag, releases } = useContext(GlobalContext);

  const menuItems = useMemo(() => {
    const items: MenuItems = [
      {
        type: "option_group",
        value: releaseTag,
        onChange: setReleaseTag,
        children: releases
          .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
          .map((release) => ({
            value: release.tag_name,
            title: `${release.tag_name} (${release.created_at.toLocaleDateString()})`,
          })),
      },
    ];

    return items;
  }, [releaseTag, setReleaseTag]);

  return (
    <Menu
      closeOnPress
      aria-label="Release Picker Menu"
      items={menuItems}
      renderTrigger={({ isOpen }) => (
        //@ts-ignore
        <Button iconRight={["fas", "caret-down"]} active={isOpen}>
          {releaseTag || "Select Release"}
        </Button>
      )}
    />
  );
};
