
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Download, Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface KnowledgeDocument {
  id: string;
  title: string;
  description: string;
  uploaded_at: string;
  file_path: string;
  file_type?: string;
  indexed: boolean;
  tags?: string[];
  category_id?: string | null;
  url?: string | null;
}

interface Category {
  id: string;
  name: string;
}

const KnowledgeDocumentList: React.FC<{ refreshFlag: boolean }> = ({ refreshFlag }) => {
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const { data, error } = await supabase.from("knowledge_documents").select("*").order("uploaded_at", { ascending: false });
      if (!error) setDocuments(data as KnowledgeDocument[]);
      const { data: categoryData } = await supabase.from("knowledge_categories").select("*").order("name");
      if (categoryData) setCategories(categoryData as Category[]);
      setLoading(false);
    }
    fetchAll();
  }, [refreshFlag]);

  const filteredDocs = documents.filter(doc => {
    const matchesCategory = selectedCategory ? doc.category_id === selectedCategory : true;
    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      (doc.description || "").toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function fileUrl(path?: string) {
    if (!path) return "#";
    return `${supabase.storage.from("knowledge_docs").getPublicUrl(path).data.publicUrl}`;
  }

  return (
    <div>
      <div className="w-full flex flex-col md:flex-row gap-2 mb-4 items-stretch md:items-end">
        <div className="flex-1 flex items-center bg-cyber-gunmetal rounded-md overflow-hidden">
          <Search className="ml-3 text-gray-400" />
          <Input
            placeholder="Search documents..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="!bg-transparent border-none text-white"
          />
        </div>
        <select
          className="rounded-md p-2 bg-cyber-gunmetal border-cyber-gunmetal text-white"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <Loader2 className="animate-spin mr-2" /> Loading documents...
        </div>
      ) : filteredDocs.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No knowledge documents found.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredDocs.map((doc) => (
            <Card key={doc.id} className="border-cyber-gunmetal bg-cyber-dark">
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 px-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{doc.title}</span>
                    {doc.indexed ? (
                      <Badge className="bg-green-600 text-white">Indexed</Badge>
                    ) : (
                      <Badge className="bg-yellow-600 text-white">Pending</Badge>
                    )}
                    {doc.file_type && (
                      <Badge variant="secondary" className="bg-cyber-gunmetal text-gray-300 ml-2">{doc.file_type}</Badge>
                    )}
                  </div>
                  {doc.description && <div className="text-gray-400 text-sm mt-1">{doc.description}</div>}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {doc.tags && doc.tags.map(tag => (
                      <Badge key={tag} className="bg-cyber-gunmetal text-gray-300">{tag}</Badge>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Uploaded: {new Date(doc.uploaded_at).toLocaleString()}</div>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  {doc.file_path &&
                    <a
                      href={fileUrl(doc.file_path)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-2 py-1 bg-cyber-gunmetal rounded hover:bg-cyber-gunmetal/80 text-cyber-red transition"
                      title="Download/view file"
                    >
                      <Download className="h-4 w-4 mr-1" /> File
                    </a>
                  }
                  {doc.url && (
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-2 py-1 bg-cyber-gunmetal rounded hover:bg-cyber-gunmetal/80 text-cyber-red transition"
                    >
                      <Download className="h-4 w-4 mr-1" /> Link
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default KnowledgeDocumentList;
