import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import yaml from 'js-yaml'

const docsDirectory = path.join(process.cwd(), '../docs')

function listSlugs(): string[] {
  return fs
    .readdirSync(docsDirectory)
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => filename.replace(/\.mdx$/, ''))
}

function get(slug: string): { title: string; content: string } {
  const source = fs.readFileSync(path.join(docsDirectory, `${slug}.mdx`), {
    encoding: 'utf8'
  })

  const { data, content } = matter(source)
  return { title: data.title, content }
}

export interface DocMetadata {
  slug: string
  title: string
}

export type DocGroup = { title: string; docs: DocMetadata[] }

function getGroups(): DocGroup[] {
  const slugToTitle: { [slug: string]: string } = Object.fromEntries(
    listSlugs().map(slug => [slug, get(slug).title])
  )

  const rawGroups = yaml.load(
    fs.readFileSync(path.join(docsDirectory, 'docs.yaml'), {
      encoding: 'utf8'
    })
  ) as { title: string; items: string[] }[]

  return rawGroups.map(g => ({
    title: g.title,

    // Package READMEs don't have a title
    docs: g.items.map(slug => ({ slug, title: slugToTitle[slug] ?? slug }))
  }))
}

export const docQueries = {
  listSlugs,
  get,
  getGroups
}
