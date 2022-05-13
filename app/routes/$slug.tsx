import * as React from 'react'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getMDXComponent } from 'mdx-bundler/client'
import { bundleMDX } from '~/util/mdx.server'
import { readContentFile } from '~/util/fs.server'

export const loader: LoaderFunction = async ({ params }) => {
  const post = params.slug
  if (!post) {
    throw new Response('Not Found', { status: 404 })
  }
  const source = await readContentFile(`${post}.mdx`)
  const data = await bundleMDX({
    source,
    files: {
      './demo.tsx': `
import * as React from 'react'

function Demo() {
  return <div>Neat demo!</div>
}

export default Demo
`
    }
  })
  return json(data)
}

export default function Post() {
  const { code, frontmatter } = useLoaderData()
  const Component = React.useMemo(() => getMDXComponent(code), [code])
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
  )
}
