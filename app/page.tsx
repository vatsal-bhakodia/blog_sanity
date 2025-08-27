import { getFeaturedPosts } from "@/lib/sanity";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, PenTool, Users, BookOpen, Sparkles } from "lucide-react";

export default async function Home() {
  const featuredPosts = await getFeaturedPosts(6);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="container mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Share Your Stories
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              A modern blog platform where everyone can share their thoughts,
              ideas, and experiences with the world.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/write">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <PenTool className="mr-2 h-5 w-5" />
                Start Writing
              </Button>
            </Link>
            <Link href="/blogs">
              <Button size="lg" variant="outline">
                <BookOpen className="mr-2 h-5 w-5" />
                Read Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <PenTool className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">Easy Writing</h3>
            <p className="text-gray-600">
              Create beautiful blog posts with our intuitive writing interface.
              No technical skills required.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold">Open Community</h3>
            <p className="text-gray-600">
              Join a community where everyone can share their voice. No
              registration barriers.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">Beautiful Design</h3>
            <p className="text-gray-600">
              Your content deserves to look great. We provide a clean, modern
              reading experience.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="container mx-auto">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold">Latest Stories</h2>
              <p className="text-gray-600">
                Discover the newest posts from our community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <BlogCard key={post._id} post={post} featured />
              ))}
            </div>

            <div className="text-center">
              <Link href="/blogs">
                <Button size="lg" variant="outline">
                  View All Posts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto py-16 text-center text-white space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto pb-4">
            Join our community of writers and readers. Create your first blog
            post in minutes.
          </p>
          <Link href="/write">
            <Button size="lg" variant="secondary">
              <PenTool className="mr-2 h-5 w-5" />
              Write Your First Post
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
