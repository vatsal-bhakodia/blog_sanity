"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createPost } from "@/lib/sanity";
import { ArrowLeft, PenTool, Plus, X } from "lucide-react";
import Link from "next/link";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    setCategories(categories.filter((cat) => cat !== categoryToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author || !content) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createPost({
        title,
        author,
        excerpt,
        content,
        categories,
      });

      if (result) {
        router.push(`/blog/${result.slug.current}`);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/blogs">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to posts
            </Button>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Write a New Post
          </h1>
          <p className="text-gray-600 mt-2">
            Share your thoughts with the community
          </p>
        </div>
        <PenTool className="h-12 w-12 text-gray-300" />
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create Your Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title *
              </label>
              <Input
                id="title"
                placeholder="Enter your post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
                required
              />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <label htmlFor="author" className="text-sm font-medium">
                Author *
              </label>
              <Input
                id="author"
                placeholder="Your name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <label htmlFor="excerpt" className="text-sm font-medium">
                Excerpt
              </label>
              <Textarea
                id="excerpt"
                placeholder="Brief description of your post (optional)"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
              />
              <p className="text-xs text-gray-500">
                A short summary that will appear in the post preview
              </p>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Categories</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addCategory())
                  }
                />
                <Button
                  type="button"
                  onClick={addCategory}
                  disabled={!newCategory.trim()}
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="text-sm"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => removeCategory(category)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content *
              </label>
              <Textarea
                id="content"
                placeholder="Write your blog post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="resize-y"
                required
              />
              <p className="text-xs text-gray-500">
                Write your post content. You can use line breaks for paragraphs.
              </p>
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <PenTool className="mr-2 h-4 w-4" />
                    Publish Post
                  </>
                )}
              </Button>
              <Link href="/blogs">
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Writing Tips</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              • Write a compelling title that captures the essence of your post
            </li>
            <li>• Use the excerpt to provide a brief, engaging summary</li>
            <li>• Add relevant categories to help readers find your content</li>
            <li>• Structure your content with clear paragraphs</li>
            <li>
              • Your post will be published immediately and visible to all
              readers
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
