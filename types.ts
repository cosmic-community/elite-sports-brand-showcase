// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Product type
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    product_name: string;
    description: string;
    price: string;
    category?: Category;
    available_colors?: string;
    available_sizes?: string;
    product_images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    featured: boolean;
    new_arrival: boolean;
    collection?: Collection;
  };
}

// Category type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    category_name: string;
    description?: string;
    category_icon?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Collection type
export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    collection_name: string;
    description: string;
    season_year?: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    featured_collection: boolean;
  };
}

// Athlete type
export interface Athlete extends CosmicObject {
  type: 'athletes';
  metadata: {
    athlete_name: string;
    sport: string;
    bio: string;
    achievements?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    action_photos?: Array<{
      url: string;
      imgix_url: string;
    }>;
    instagram_handle?: string;
    featured_athlete: boolean;
  };
}

// Story type with proper story_type structure
type StoryType = 'innovation' | 'athlete' | 'community' | 'sustainability';

export interface Story extends CosmicObject {
  type: 'stories';
  metadata: {
    story_title: string;
    story_type: {
      key: StoryType;
      value: string;
    };
    content: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    related_athlete?: Athlete;
    related_products?: Product[];
    featured_story: boolean;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}