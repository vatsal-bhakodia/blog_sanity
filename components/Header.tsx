"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenTool, Home, BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            BlogSpace
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-blue-600 transition-colors flex items-center space-x-1"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link
            href="/blogs"
            className="text-sm font-medium hover:text-blue-600 transition-colors flex items-center space-x-1"
          >
            <BookOpen className="h-4 w-4" />
            <span>All Blogs</span>
          </Link>
        </nav>

        <Link href="/write">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <PenTool className="h-4 w-4 mr-2" />
            Write Post
          </Button>
        </Link>
      </div>
    </header>
  );
}
