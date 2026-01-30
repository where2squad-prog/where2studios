export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      clients: {
        Row: {
          created_at: string
          id: string
          ig_handle: string
          is_active: boolean
          name: string
          profile_url: string
        }
        Insert: {
          created_at?: string
          id?: string
          ig_handle: string
          is_active?: boolean
          name: string
          profile_url: string
        }
        Update: {
          created_at?: string
          id?: string
          ig_handle?: string
          is_active?: boolean
          name?: string
          profile_url?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          budget: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          ip_address: string | null
          message: string
          name: string
          phone: string | null
          referral: string | null
          service: string | null
          timeline: string | null
        }
        Insert: {
          budget?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          ip_address?: string | null
          message: string
          name: string
          phone?: string | null
          referral?: string | null
          service?: string | null
          timeline?: string | null
        }
        Update: {
          budget?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          message?: string
          name?: string
          phone?: string | null
          referral?: string | null
          service?: string | null
          timeline?: string | null
        }
        Relationships: []
      }
      ig_public_posts: {
        Row: {
          caption_snippet: string | null
          captured_at: string | null
          client_id: string
          id: string
          is_excluded: boolean
          is_pinned: boolean
          media_type: string | null
          permalink: string
          posted_at: string | null
          public_comments: number | null
          public_likes: number | null
          public_views: number | null
          raw: Json | null
          shortcode: string
          thumbnail_url: string | null
          updated_at: string
        }
        Insert: {
          caption_snippet?: string | null
          captured_at?: string | null
          client_id: string
          id?: string
          is_excluded?: boolean
          is_pinned?: boolean
          media_type?: string | null
          permalink: string
          posted_at?: string | null
          public_comments?: number | null
          public_likes?: number | null
          public_views?: number | null
          raw?: Json | null
          shortcode: string
          thumbnail_url?: string | null
          updated_at?: string
        }
        Update: {
          caption_snippet?: string | null
          captured_at?: string | null
          client_id?: string
          id?: string
          is_excluded?: boolean
          is_pinned?: boolean
          media_type?: string | null
          permalink?: string
          posted_at?: string | null
          public_comments?: number | null
          public_likes?: number | null
          public_views?: number | null
          raw?: Json | null
          shortcode?: string
          thumbnail_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ig_public_posts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      ig_social_global_rankings: {
        Row: {
          computed_at: string
          id: string
          post_id: string
          rank: number
          score: number
        }
        Insert: {
          computed_at?: string
          id?: string
          post_id: string
          rank: number
          score?: number
        }
        Update: {
          computed_at?: string
          id?: string
          post_id?: string
          rank?: number
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "ig_social_global_rankings_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "ig_public_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      ig_social_rankings: {
        Row: {
          client_id: string
          computed_at: string
          id: string
          post_id: string
          rank: number
          score: number
        }
        Insert: {
          client_id: string
          computed_at?: string
          id?: string
          post_id: string
          rank: number
          score?: number
        }
        Update: {
          client_id?: string
          computed_at?: string
          id?: string
          post_id?: string
          rank?: number
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "ig_social_rankings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ig_social_rankings_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "ig_public_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category: string
          created_at: string
          description: string | null
          display_order: number | null
          featured: boolean | null
          id: string
          result: string | null
          thumbnail_url: string | null
          title: string
          video_url: string | null
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          featured?: boolean | null
          id?: string
          result?: string | null
          thumbnail_url?: string | null
          title: string
          video_url?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          featured?: boolean | null
          id?: string
          result?: string | null
          thumbnail_url?: string | null
          title?: string
          video_url?: string | null
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          action: string
          created_at: string
          id: string
          identifier: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          identifier: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          identifier?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
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
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
