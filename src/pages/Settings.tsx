
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { useTheme } from "@/hooks/useTheme";
// Import the hardcoded logo
import logoImg from '@/assets/logo.png';

const SETTINGS_THEME_KEY = "soc-theme";

const themeOptions = [
  {
    key: "red-eagle",
    label: "Red Eagle (Default)",
    colors: {
      bg: "#1e1e1e",
      accent: "#c62828",
      secondary: "#424242"
    }
  },
  {
    key: "midnight-blue",
    label: "Midnight Blue",
    colors: {
      bg: "#141c30",
      accent: "#258fff",
      secondary: "#293660"
    }
  },
  {
    key: "purple-hues",
    label: "Purple Hues",
    colors: {
      bg: "#24172c",
      accent: "#a97fdc",
      secondary: "#5036a0"
    }
  }
];

const minLogoSize = 32;
const maxLogoSize = 120;
const defaultLogoSize = 48;

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<string>(theme);
  const [pendingTheme, setPendingTheme] = useState(false);

  useEffect(() => {
    document.body.classList.remove("theme-red-eagle", "theme-midnight-blue", "theme-purple-hues");
    document.body.classList.add("theme-" + selectedTheme);
  }, [selectedTheme]);

  useEffect(() => {
    setPendingTheme(selectedTheme !== theme);
  }, [selectedTheme, theme]);

  const handleThemeSave = () => {
    setTheme(selectedTheme as any);
    localStorage.setItem(SETTINGS_THEME_KEY, selectedTheme);
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Header Logo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <img
                src={logoImg}
                alt="Logo"
                style={{
                  width: defaultLogoSize,
                  height: defaultLogoSize,
                  minWidth: minLogoSize,
                  minHeight: minLogoSize,
                  maxWidth: maxLogoSize,
                  maxHeight: maxLogoSize,
                  objectFit: "contain"
                }}
                className="object-contain bg-cyber-gunmetal border p-1 rounded"
              />
              <span className="text-gray-400 text-sm italic">Logo is fixed. To update, replace the logo file in <code className="px-1">src/assets/logo.png</code></span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme Colors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-3">
                {themeOptions.map((opt) => (
                  <label
                    key={opt.key}
                    className={`flex items-center space-x-3 px-3 py-2 rounded border transition shadow
                      ${selectedTheme === opt.key ? "border-cyber-red ring-2 ring-cyber-red bg-cyber-gunmetal/70 scale-105" : "border-cyber-gunmetal bg-cyber-gunmetal/40"}
                      hover:scale-105 hover:border-cyber-red/60 cursor-pointer duration-200`}
                  >
                    <input
                      type="radio"
                      name="theme"
                      value={opt.key}
                      checked={selectedTheme === opt.key}
                      onChange={() => setSelectedTheme(opt.key)}
                      className="mr-2 accent-cyber-red"
                    />
                    {/* Color Preview */}
                    <span className="flex items-center space-x-1">
                      <span className="w-6 h-6 rounded shadow border border-gray-700 mr-2" style={{ background: opt.colors.bg, boxShadow: `0 2px 8px 0 ${opt.colors.accent}44` }}>
                        <span className="block w-full h-2 rounded-b" style={{ background: opt.colors.accent, marginTop: 16 }}></span>
                      </span>
                      <span className="text-white">{opt.label}</span>
                    </span>
                  </label>
                ))}
              </div>
              <Button
                className="w-32 mt-4"
                onClick={handleThemeSave}
                disabled={!pendingTheme}
              >
                {pendingTheme ? 'Save Changes' : 'Saved'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
