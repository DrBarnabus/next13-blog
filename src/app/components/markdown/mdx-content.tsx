'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';

type Props = {
  code: string;
};

export function MdxContent({ code }: Props) {
  const Component = useMDXComponent(code);

  return (
    <section>
      <Component />
    </section>
  );
}
