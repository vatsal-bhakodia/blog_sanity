import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-2xl py-16 text-center space-y-8">
      <FileQuestion className="h-16 w-16 text-gray-300 mx-auto" />
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Post Not Found</h1>
        <p className="text-gray-600">
          The blog post you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <div className="flex gap-4 justify-center">
        <Link href="/blogs">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Posts
          </Button>
        </Link>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
