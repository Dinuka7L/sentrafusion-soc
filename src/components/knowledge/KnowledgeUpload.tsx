
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface KnowledgeUploadProps {
  onUpload: () => void;
}

interface Category {
  id: string;
  name: string;
}

const KnowledgeUpload: React.FC<KnowledgeUploadProps> = ({ onUpload }) => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase.from("knowledge_categories").select("*").order("name");
      if (!error && data) setCategories(data as Category[]);
    }
    fetchCategories();
  }, []);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title) {
      toast({ title: "Title and file are required!", variant: "destructive" });
      return;
    }
    setUploading(true);

    // Upload file to storage
    const path = `${Date.now()}_${file.name}`;
    const { error: storageError } = await supabase.storage
      .from("knowledge_docs")
      .upload(path, file, { upsert: false });

    if (storageError) {
      toast({ title: "Upload failed", description: storageError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    // Insert document record
    const { error: dbError } = await supabase.from("knowledge_documents").insert([
      {
        title,
        description,
        file_path: path,
        category_id: categoryId || null,
        file_type: file.type,
        tags: [],
      },
    ]);

    if (dbError) {
      toast({ title: "Failed to save document info", description: dbError.message, variant: "destructive" });
    } else {
      toast({ title: "Document uploaded", description: "Your document has been uploaded!" });
      setTitle("");
      setDescription("");
      setCategoryId("");
      setFile(null);
      onUpload();
    }
    setUploading(false);
  }

  return (
    <form onSubmit={handleUpload} className="flex gap-2 flex-col sm:flex-row items-start">
      <Input
        required
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="sm:w-48 bg-cyber-gunmetal border-cyber-gunmetal text-white"
      />
      <select
        className="rounded-md p-2 bg-cyber-gunmetal border-cyber-gunmetal text-white"
        value={categoryId}
        onChange={e => setCategoryId(e.target.value)}
      >
        <option value="">No category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <Input
        type="file"
        accept=".pdf,.csv,.doc,.docx,.md,.txt"
        onChange={e => setFile(e.target.files?.[0] || null)}
        className="bg-cyber-gunmetal border-cyber-gunmetal text-white"
        required
      />
      <Button type="submit" disabled={uploading} className="bg-cyber-red hover:bg-cyber-red-dark">
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
};

export default KnowledgeUpload;
