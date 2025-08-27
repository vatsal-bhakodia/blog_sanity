"use client";

import { useState, useEffect } from "react";
import { getAllPosts, BlogPost } from "@/lib/sanity";
import BlogCard from "@/components/BlogCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
        setFilteredPosts(allPosts);

        // Extract unique categories
        const categories = Array.from(
          new Set(
            allPosts.flatMap((post) => post.categories || []).filter(Boolean)
          )
        );
        setAllCategories(categories);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (post.excerpt &&
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((post) =>
        post.categories?.includes(selectedCategory)
      );
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedCategory]);

  if (loading) {
    return (
      <div className="container mx-auto py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl pb-2 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          All Blog Posts
        </h1>
        <p className="text-xl text-gray-600">
          Explore stories from our community
        </p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        {allCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {allCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <Filter className="h-12 w-12 text-gray-300 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-600">
            No posts found
          </h3>
          <p className="text-gray-500">
            {searchQuery || selectedCategory
              ? "Try adjusting your search criteria"
              : "Be the first to write a post!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}

      {/* Results count */}
      <div className="text-center text-gray-600">
        <p>
          Showing {filteredPosts.length} of {posts.length} posts
          {selectedCategory && ` in "${selectedCategory}"`}
        </p>
      </div>
    </div>
  );
}
