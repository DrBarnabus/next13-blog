import { allPosts } from 'contentlayer/generated';
import Link from 'next/link';

export default function Page() {
  const posts = allPosts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  return (
    <div className="mt-4 flex flex-col space-y-4">
      <h1 className="mx-4 text-3xl font-bold">Example Blog</h1>

      {posts.map((post) => (
        <div key={post.url} className="mx-4 bg-zinc-200 p-4">
          <Link href={post.url}>
            <h2 className="text-lg font-bold">{post.title}</h2>
            <time dateTime={post.publishedDate} className="block text-sm text-zinc-600">
              {post.publishedDate}
            </time>
          </Link>
        </div>
      ))}
    </div>
  );
}
