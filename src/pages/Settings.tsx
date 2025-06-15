
import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/hooks/useTheme";

const SETTINGS_LOGO_KEY = "soc-custom-logo";

const themeLabels: Record<string, string> = {
  "red-eagle": "Red Eagle (Default)",
  "midnight-blue": "Midnight Blue",
  "purple-hues": "Purple Hues"
};

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedLogo = localStorage.getItem(SETTINGS_LOGO_KEY);
    if (storedLogo) setLogoUrl(storedLogo);
  }, []);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Read file and save URL in localStorage for demo persist
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

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Header Logo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            {logoUrl ? (
              <img src={logoUrl} alt="Custom Logo" className="w-16 h-16 object-contain bg-cyber-gunmetal border p-1 rounded" />
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {Object.entries(themeLabels).map(([themeKey, label]) => (
              <label key={themeKey} className={`flex items-center px-3 py-2 rounded border
                ${theme === themeKey ? "border-cyber-red font-bold bg-cyber-gunmetal" : "border-cyber-gunmetal"}
              `}>
                <input
                  type="radio"
                  name="theme"
                  value={themeKey}
                  checked={theme === themeKey}
                  onChange={() => setTheme(themeKey as any)}
                  className="mr-3 accent-cyber-red"
                />
                {label}
              </label>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
