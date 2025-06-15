
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import KnowledgeDocumentList from "@/components/knowledge/KnowledgeDocumentList";
import KnowledgeUpload from "@/components/knowledge/KnowledgeUpload";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const Knowledge = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex justify-between items-center mt-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Knowledge Base</h1>
            <p className="text-gray-400 max-w-lg">
              Manage your document knowledge base for RAG. Upload, categorize, and index new documents for your AI assistant.
            </p>
          </div>
          <KnowledgeUpload onUpload={() => setRefreshFlag((r) => !r)} />
        </div>
        <Card className="bg-cyber-darker border-cyber-gunmetal">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <FileText className="h-5 w-5 text-cyber-red" />
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <KnowledgeDocumentList refreshFlag={refreshFlag} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Knowledge;
