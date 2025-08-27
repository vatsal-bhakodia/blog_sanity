import { BookOpen, Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span className="font-semibold text-lg">BlogSpace</span>
            </div>
            <p className="text-sm text-gray-600">
              A modern blog platform where everyone can share their thoughts and
              ideas.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a
                href="/"
                className="block hover:text-blue-600 transition-colors"
              >
                Home
              </a>
              <a
                href="/blogs"
                className="block hover:text-blue-600 transition-colors"
              >
                All Blogs
              </a>
              <a
                href="/write"
                className="block hover:text-blue-600 transition-colors"
              >
                Write a Post
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2 text-sm">
              <a
                href="#"
                className="block hover:text-blue-600 transition-colors"
              >
                Technology
              </a>
              <a
                href="#"
                className="block hover:text-blue-600 transition-colors"
              >
                Design
              </a>
              <a
                href="#"
                className="block hover:text-blue-600 transition-colors"
              >
                Lifestyle
              </a>
              <a
                href="#"
                className="block hover:text-blue-600 transition-colors"
              >
                Business
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 BlogSpace. Built with Next.js and Sanity CMS.</p>
        </div>
      </div>
    </footer>
  );
}
