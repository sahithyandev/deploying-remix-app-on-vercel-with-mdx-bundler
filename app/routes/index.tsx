import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { readContentDir } from '~/util/fs.server'

export const loader: LoaderFunction = async () => {
  const files = await readContentDir()
  return json(files)
}

export default function Index() {
  const files = useLoaderData()
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {files.map((file: string) => (
          <li key={file.replace(/\.mdx$/, '')}>
            <Link to={'/' + file.replace(/\.mdx$/, '')}>{file}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
