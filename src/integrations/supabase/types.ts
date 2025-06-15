export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      knowledge_categories: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      knowledge_documents: {
        Row: {
          category_id: string | null
          description: string | null
          file_path: string | null
          file_type: string | null
          id: string
          indexed: boolean | null
          tags: string[] | null
          title: string
          uploaded_at: string | null
          url: string | null
        }
        Insert: {
          category_id?: string | null
          description?: string | null
          file_path?: string | null
          file_type?: string | null
          id?: string
          indexed?: boolean | null
          tags?: string[] | null
          title: string
          uploaded_at?: string | null
          url?: string | null
        }
        Update: {
          category_id?: string | null
          description?: string | null
          file_path?: string | null
          file_type?: string | null
          id?: string
          indexed?: boolean | null
          tags?: string[] | null
          title?: string
          uploaded_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_documents_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "knowledge_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          full_name: string
          id: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          full_name?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      shift_summaries: {
        Row: {
          created_at: string
          created_by: string | null
          external_threat_intel: string | null
          file_attachment_path: string | null
          id: string
          previous_summary_id: string | null
          report_text: string | null
          shift_date: string
          shift_end: string | null
          shift_lead_id: string | null
          shift_lead_name: string | null
          shift_start: string | null
          team_notes: string | null
          updated_at: string | null
          updated_by: string | null
          version: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          external_threat_intel?: string | null
          file_attachment_path?: string | null
          id?: string
          previous_summary_id?: string | null
          report_text?: string | null
          shift_date: string
          shift_end?: string | null
          shift_lead_id?: string | null
          shift_lead_name?: string | null
          shift_start?: string | null
          team_notes?: string | null
          updated_at?: string | null
          updated_by?: string | null
          version?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          external_threat_intel?: string | null
          file_attachment_path?: string | null
          id?: string
          previous_summary_id?: string | null
          report_text?: string | null
          shift_date?: string
          shift_end?: string | null
          shift_lead_id?: string | null
          shift_lead_name?: string | null
          shift_start?: string | null
          team_notes?: string | null
          updated_at?: string | null
          updated_by?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "shift_summaries_previous_summary_id_fkey"
            columns: ["previous_summary_id"]
            isOneToOne: false
            referencedRelation: "shift_summaries"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_summary_iocs: {
        Row: {
          description: string | null
          external_link: string | null
          id: string
          ioc_type: string | null
          ioc_value: string | null
          shift_summary_id: string
        }
        Insert: {
          description?: string | null
          external_link?: string | null
          id?: string
          ioc_type?: string | null
          ioc_value?: string | null
          shift_summary_id: string
        }
        Update: {
          description?: string | null
          external_link?: string | null
          id?: string
          ioc_type?: string | null
          ioc_value?: string | null
          shift_summary_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shift_summary_iocs_shift_summary_id_fkey"
            columns: ["shift_summary_id"]
            isOneToOne: false
            referencedRelation: "shift_summaries"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_summary_kb_updates: {
        Row: {
          description: string | null
          id: string
          kb_doc_id: string | null
          shift_summary_id: string
          title: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          kb_doc_id?: string | null
          shift_summary_id: string
          title?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          kb_doc_id?: string | null
          shift_summary_id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shift_summary_kb_updates_shift_summary_id_fkey"
            columns: ["shift_summary_id"]
            isOneToOne: false
            referencedRelation: "shift_summaries"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_summary_priorities: {
        Row: {
          id: string
          priority_text: string | null
          shift_summary_id: string
        }
        Insert: {
          id?: string
          priority_text?: string | null
          shift_summary_id: string
        }
        Update: {
          id?: string
          priority_text?: string | null
          shift_summary_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shift_summary_priorities_shift_summary_id_fkey"
            columns: ["shift_summary_id"]
            isOneToOne: false
            referencedRelation: "shift_summaries"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_summary_tickets: {
        Row: {
          analyst_comment: string | null
          id: string
          recommended_next_actions: string | null
          shift_summary_id: string
          status: string | null
          ticket_id: string
        }
        Insert: {
          analyst_comment?: string | null
          id?: string
          recommended_next_actions?: string | null
          shift_summary_id: string
          status?: string | null
          ticket_id: string
        }
        Update: {
          analyst_comment?: string | null
          id?: string
          recommended_next_actions?: string | null
          shift_summary_id?: string
          status?: string | null
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shift_summary_tickets_shift_summary_id_fkey"
            columns: ["shift_summary_id"]
            isOneToOne: false
            referencedRelation: "shift_summaries"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "soc_analyst"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "soc_analyst"],
    },
  },
} as const
