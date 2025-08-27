import { getPost, getAllSlugs, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, User, ArrowLeft, Share2 } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={urlFor(value).width(800).height(400).url()}
          alt={value.alt || "Blog image"}
          width={800}
          height={400}
          className="rounded-lg w-full"
        />
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold my-6">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold my-5">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold my-4">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 leading-relaxed my-4">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-600 pl-6 italic my-6 text-gray-600">
        {children}
      </blockquote>
    ),
  },
};

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-4xl py-8">
      {/* Back button */}
      <div className="mb-8">
        <Link href="/blogs">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Button>
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-6 mb-12">
        {post.mainImage && (
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
            <Image
              src={urlFor(post.mainImage).width(1200).height(600).url()}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5" />
              <span>{format(new Date(post.publishedAt), "MMMM dd, yyyy")}</span>
            </div>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.categories.map((category, index) => (
                <Badge key={index} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg prose-gray max-w-none">
        {post.content && (
          <PortableText
            value={post.content}
            components={portableTextComponents}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="text-center sm:text-left">
            <p className="font-semibold text-lg">Written by {post.author}</p>
            <p className="text-gray-600">
              Published on {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/blogs">
              <Button variant="outline">More Posts</Button>
            </Link>
            <Link href="/write">
              <Button>Write a Post</Button>
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
