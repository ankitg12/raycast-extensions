import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { useMemo } from "react";
import { parseKeybindings } from "./parse";

export default function Command() {
  const bindings = useMemo(() => parseKeybindings(), []);
  const sections = useMemo(() => {
    const map = new Map<string, typeof bindings>();
    for (const b of bindings) {
      const list = map.get(b.section) ?? [];
      list.push(b);
      map.set(b.section, list);
    }
    return [...map.entries()];
  }, [bindings]);

  return (
    <List searchBarPlaceholder="Filter keybindings… (Omarchy Super+K)">
      {sections.map(([section, items]) => (
        <List.Section key={section} title={section}>
          {items.map((b) => (
            <List.Item
              key={b.key}
              title={b.pretty}
              subtitle={b.command}
              accessories={[{ text: b.key }]}
              actions={
                <ActionPanel>
                  <Action.CopyToClipboard
                    title="Copy Action"
                    content={b.command}
                  />
                  <Action.CopyToClipboard title="Copy Key" content={b.key} />
                </ActionPanel>
              }
            />
          ))}
        </List.Section>
      ))}
    </List>
  );
}
