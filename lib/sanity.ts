import { client, writeClient } from "@/sanity/config";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author: string;
  excerpt?: string;
  mainImage?: any;
  categories?: string[];
  publishedAt: string;
  content?: any[];
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author,
      excerpt,
      mainImage,
      categories,
      publishedAt
    }
  `);
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  return client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      author,
      excerpt,
      mainImage,
      categories,
      publishedAt,
      content
    }
  `,
    { slug }
  );
}

export async function getFeaturedPosts(limit: number = 3): Promise<BlogPost[]> {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc)[0...${limit}] {
      _id,
      title,
      slug,
      author,
      excerpt,
      mainImage,
      categories,
      publishedAt
    }
  `);
}

export async function getAllSlugs(): Promise<string[]> {
  const data = await client.fetch(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`
  );
  return data.map((item: { slug: string }) => item.slug);
}

export async function createPost(postData: {
  title: string;
  author: string;
  excerpt: string;
  content: string;
  categories: string[];
  mainImage?: any;
}) {
  const slug = postData.title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

  const doc = {
    _type: "post",
    title: postData.title,
    slug: { _type: "slug", current: slug },
    author: postData.author,
    excerpt: postData.excerpt,
    categories: postData.categories,
    publishedAt: new Date().toISOString(),
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            marks: [],
            text: postData.content,
          },
        ],
      },
    ],
    mainImage: postData.mainImage,
  };

  return writeClient.create(doc);
}
