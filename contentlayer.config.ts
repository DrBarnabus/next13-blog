import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'Title of the post',
      required: true,
    },
    publishedDate: {
      type: 'date',
      description: 'Date that the post was published',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [
      /** Add support for GitHub Flavoured Markdown */
      remarkGfm,
    ],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'github-light',
          grid: false,
          onVisitHighlightedChars(node) {
            node.properties.className = ['word'];
          },
        } satisfies Partial<PrettyCodeOptions>,
      ],
    ],
  },
});
