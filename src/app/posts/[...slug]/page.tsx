import { allPosts } from 'contentlayer/generated';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MdxContent } from '~/app/components/markdown/mdx-content';

type Props = {
  params: {
    slug: string[];
  };
};

export async function generateStaticParams(): Promise<Props['params'][]> {
  return allPosts.map(({ url }) => ({
    slug: url.split('/').slice(1), // Remove posts from the start of the url
  }));
}

export default function Page({ params }: Props) {
  const post = allPosts.find((post) => post.url === `/posts/${params.slug.join('/')}`);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl py-8">
      <Link href="/" className="text-center font-semibold text-indigo-500">
        Home
      </Link>

      <div className="my-6">
        <h1 className="mb-1 text-3xl font-bold">{post.title}</h1>
        <time dateTime={post.publishedDate} className="block text-sm text-zinc-600">
          {post.publishedDate}
        </time>
      </div>

      <MdxContent code={post.body.code} />
    </article>
  );
}
