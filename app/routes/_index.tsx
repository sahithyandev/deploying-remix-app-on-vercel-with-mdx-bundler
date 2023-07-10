import { json} from "@remix-run/node";
import type { LoaderArgs,  V2_MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { readContentDir } from "~/util/fs.server";

export const loader=async(_:LoaderArgs)=>{
  const files = await readContentDir();
  return json(files);
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const files=useLoaderData<typeof loader>()

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {files.map((file: string) => (
          <li key={file.replace(/\.mdx$/, "")}>
            <Link to={"/" + file.replace(/\.mdx$/, "")}>{file}</Link>
          </li>
        ))}
      </ul>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
