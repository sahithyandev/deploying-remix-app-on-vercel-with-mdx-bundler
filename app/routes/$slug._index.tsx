import type { LoaderArgs} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { useMemo } from "react";
import { bundleMDX } from "mdx-bundler";
import {getMDXComponent} from 'mdx-bundler/client'

import { readContentFile } from "~/util/fs.server";

export const loader = async ({ params }:LoaderArgs) => {
  const post = params.slug;
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  const source = await readContentFile(`${post}.mdx`);
  const data = await bundleMDX({
    source,
    files: {
      "./demo.tsx": `
import * as React from 'react'
function Demo() {
  return <div>Neat demo!</div>
}
export default Demo
`,
    },
  });

  return json(data);
};

export default function Post() {
  const { code, frontmatter } = useLoaderData<typeof loader>();
  const Component = useMemo(() =>getMDXComponent(code), [code]);

  return (
    <>
      <header>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.description}</p>
      </header>
      <main>
        <Component />
      </main>
    </>
  );
}
