/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';

type Props = {
  code: string;
};

function a({ href, children }: React.HTMLProps<HTMLAnchorElement>) {
  if (href && href.startsWith('/')) {
    return <Link href={href}>{children} next/link</Link>;
  }

  if (href && href.startsWith('#')) {
    return <a href={href}>{children} relative &lt;a&gt;</a>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children} external &lt;a&gt;
    </a>
  );
}

function pre({ children }: React.HTMLProps<HTMLPreElement>) {
  const ref = useRef<HTMLPreElement>(null);
  const [focusWithin, setFocusWithin] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const getClipboardTextFromChildren = (element: React.ReactElement | string): string => {
    if (typeof element === 'string') return element;
    if (typeof element.props.children === 'string') return element.props.children;

    if (Array.isArray(element.props.children)) {
      return element.props.children
        .map((child: React.ReactElement | string) => getClipboardTextFromChildren(child))
        .join('');
    }

    if (typeof element.props.children === 'object') {
      return getClipboardTextFromChildren(element.props.children);
    }

    return '';
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getClipboardTextFromChildren(children as React.ReactElement));

    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 3000);
  };

  useLayoutEffect(() => {
    ref.current?.parentElement?.classList.add('not-prose');
  }, [ref]);

  return (
    <pre
      ref={ref}
      className="relative"
      onMouseEnter={() => setFocusWithin(true)}
      onMouseLeave={() => setFocusWithin(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={() => setFocusWithin(false)}
    >
      {(focusWithin || hasCopied) && (
        <button
          className="group absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded bg-white dark:bg-zinc-700"
          onClick={handleCopy}
          disabled={hasCopied}
          aria-label={hasCopied ? 'Copied' : 'Copy code'}
        >
          {hasCopied ? <div className="h-6 w-6 animate-pulse">✅</div> : <div className="h-6 w-6">📃</div>}
        </button>
      )}

      {children}
    </pre>
  );
}

export function MdxContent({ code }: Props) {
  const Component = useMDXComponent(code);

  return (
    <section className="prose prose-base prose-zinc max-w-none pb-4 pt-8 prose-headings:drop-shadow-sm prose-a:text-indigo-500 prose-a:no-underline hover:prose-a:text-indigo-300 hover:prose-a:underline prose-blockquote:border-l-zinc-300 prose-ul:my-4 prose-li:my-0 prose-li:marker:text-zinc-300 prose-hr:border-zinc-300">
      <Component components={{ a, pre }} />
    </section>
  );
}
