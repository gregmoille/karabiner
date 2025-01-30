import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle, shell } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
          {
            set_variable: {
              name: "hyper_sublayer_o",
              value: 0,
            },
          },
          {
            set_variable: {
              name: "hyper_sublayer_r",
              value: 0,
            },
          },
          {
            set_variable: {
              name: "hyper_sublayer_b",
              value: 0,
            },
          },
        ],
        // to_if_alone: [
        //   {
        //     key_code: "escape",
        //   },
        // ],
        type: "basic",
      },
    ],
  },
  ...createHyperSubLayers({
    spacebar: open(
      "raycast://"
    ),
    // b = "B"rowse
    b: {
      t: open("https://twitter.com"),
      r: open("https://reddit.com"),
    }, 
    // o = "Open" applications
    o: {
      1: open("1Password"),
      a: app("Adobe Acrobat"),
      g: app("Google Chrome"),
      b: app("Safari"),
      c: app("Notion Calendar"),
      v: app("Visual Studio Code"),
      k: app("klayout"),
      s: app("Slack"),
      e: app("Mail"),
      n: app("Notion"),
      t: app("iTerm2"),
      f: app("Finder"),
      m: app("Messages"),
      z: app("Zotero"),
      p: app("skim"),
      i: app("/Applications/Adobe\ Illustrator\ 2025/Adobe\ Illustrator"),
    },
    // r = "Raycast"
    r: {
      v: open("raycast://extensions/thomas/visual-studio-code/index"),
      g: open("raycast://extensions/moored/git-repos/list"),
      p: open("raycast://extensions/khasbilegt/1password/item-list"),
      e: open("raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"),
      z: open("raycast://extensions/reckoning-dev/zotero/commandSearchZotero"),
      h: open("raycast://extensions/gbgk/glyph-search/index"),
      u: open("raycast://script-commands/get-current-url"),
      m: open("raycast://extensions/yug2005/mail/see-recent-mail"),
      s: open("raycast://extensions/mommertf/slack/unread-messages"),
    },
  }),
  {
    description: "Change Backspace to Spacebar when Minecraft is focused",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "delete_or_backspace",
        },
        to: [
          {
            key_code: "spacebar",
          },
        ],
        conditions: [
          {
            type: "frontmost_application_if",
            file_paths: [
              "^/Users/mxstbr/Library/Application Support/minecraft/runtime/java-runtime-gamma/mac-os-arm64/java-runtime-gamma/jre.bundle/Contents/Home/bin/java$",
            ],
          },
        ],
      },
    ],
  },
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: true,
      },
      profiles: [
        {
          name: "Default",
          virtual_hid_keyboard: { 
            keyboard_type_v2: "ansi" 
          },
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
