# raycast-extensions

Keyboard-first Raycast extensions for macOS. First extension recreates Omarchy `Super+K`; future ones need not be Omarchy-related.

## Extensions

| Extension | Command | What it does |
|---|---|---|
| `keybindings` | Show Keybindings (`Cmd+K` via AeroSpace) | Fuzzy-searchable menu of your live AeroSpace keybindings, parsed from `~/.config/aerospace/aerospace.toml` — Omarchy `Super+K` equivalent |

## Dev

```sh
cd keybindings
npm install
npm run dev     # hot-reload into Raycast
```

## Source

- AeroSpace: https://github.com/nikitabobko/AeroSpace
- Omarchy keybindings: https://omarchy.org/manual/hotkeys/
- Prior art: https://psalabs.eu/articles/2026/08/omarchy-hyprland-workflow-on-macos/
