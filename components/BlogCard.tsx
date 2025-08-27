import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, User } from 'lucide-react'
import { BlogPost, urlFor } from '@/lib/sanity'
import { format } from 'date-fns'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const cardClass = featured 
    ? "group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur" 
    : "group hover:shadow-lg transition-all duration-300"

  return (
    <Link href={`/blog/${post.slug.current}`}>
      <Card className={cardClass}>
        {post.mainImage && (
          <div className="relative overflow-hidden rounded-t-lg">
            <Image
              src={urlFor(post.mainImage).width(800).height(400).url()}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <CalendarDays className="h-4 w-4" />
              <span>{format(new Date(post.publishedAt), 'MMM dd, yyyy')}</span>
            </div>
          </div>
          
          <h3 className={`font-semibold group-hover:text-blue-600 transition-colors ${featured ? 'text-xl' : 'text-lg'}`}>
            {post.title}
          </h3>
        </CardHeader>
        
        <CardContent>
          {post.excerpt && (
            <p className="text-gray-600 mb-4 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.categories.slice(0, 3).map((category, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}