
import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { useTheme } from "@/hooks/useTheme";

const SETTINGS_LOGO_KEY = "soc-custom-logo";
const SETTINGS_LOGO_SIZE_KEY = "soc-custom-logo-size";
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
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>(theme);
  const [pendingTheme, setPendingTheme] = useState(false);
  const [logoSize, setLogoSize] = useState<number>(defaultLogoSize);
  const [logoSizeChanged, setLogoSizeChanged] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load logo and size from storage on mount
  useEffect(() => {
    const storedLogo = localStorage.getItem(SETTINGS_LOGO_KEY);
    if (storedLogo) setLogoUrl(storedLogo);

    const storedSize = localStorage.getItem(SETTINGS_LOGO_SIZE_KEY);
    if (storedSize) setLogoSize(Number(storedSize));
  }, []);

  // Track pending theme change
  useEffect(() => {
    setPendingTheme(selectedTheme !== theme);
  }, [selectedTheme, theme]);

  // Track pending logo size change
  useEffect(() => {
    const storedSize = localStorage.getItem(SETTINGS_LOGO_SIZE_KEY);
    setLogoSizeChanged(Number(storedSize) !== logoSize);
  }, [logoSize]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const result = event.target?.result as string;
        setLogoUrl(result);
        localStorage.setItem(SETTINGS_LOGO_KEY, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoUrl(null);
    localStorage.removeItem(SETTINGS_LOGO_KEY);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleThemeSave = () => {
    setTheme(selectedTheme as any);
    localStorage.setItem(SETTINGS_THEME_KEY, selectedTheme);
  };

  const handleLogoSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoSize(Number(e.target.value));
  };

  const handleLogoSizeSave = () => {
    localStorage.setItem(SETTINGS_LOGO_SIZE_KEY, String(logoSize));
    setLogoSizeChanged(false);
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
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Custom Logo"
                  style={{
                    width: logoSize,
                    height: logoSize,
                    minWidth: minLogoSize,
                    minHeight: minLogoSize,
                    maxWidth: maxLogoSize,
                    maxHeight: maxLogoSize,
                    objectFit: "contain"
                  }}
                  className="object-contain bg-cyber-gunmetal border p-1 rounded"
                />
              ) : (
                <span className="text-gray-400 italic text-sm">No logo uploaded.</span>
              )}
              <label className="cursor-pointer">
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                  ref={fileInputRef}
                />
                <Button onClick={() => fileInputRef.current?.click()} size="sm" type="button">
                  {logoUrl ? "Change" : "Upload"}
                </Button>
              </label>
              {logoUrl && (
                <Button variant="outline" size="sm" type="button" onClick={handleRemoveLogo}>
                  Remove
                </Button>
              )}
            </div>
            {/* Logo size slider */}
            <div className="flex items-center gap-2 mt-6">
              <label htmlFor="logo-size" className="text-xs text-gray-400 w-20">Logo Size</label>
              <input
                id="logo-size"
                type="range"
                min={minLogoSize}
                max={maxLogoSize}
                value={logoSize}
                onChange={handleLogoSizeChange}
                className="w-40 accent-cyber-red"
              />
              <span className="ml-2 font-mono text-gray-300">{logoSize}px</span>
              <Button className="ml-2" size="sm" variant={logoSizeChanged ? "default" : "outline"} onClick={handleLogoSizeSave} disabled={!logoSizeChanged}>
                Save
              </Button>
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
