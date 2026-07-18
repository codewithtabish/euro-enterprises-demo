
// ============================================
// BLOG POST (Database Model)
// ============================================
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  ogImage: string;
  isFeatured:boolean,
  content: any;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// BLOG FORM DATA
// ============================================
export interface BlogFormData {
  title: string;
  slug: string;
  coverImage: string;
  ogImage: string;
    isFeatured:boolean,
  content: any;
}

