import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import yaml from 'js-yaml'

const docsDirectory = path.join(process.cwd(), '../docs')
const packagesDirectory = path.join(process.cwd(), '../packages')

function readYaml(): { title: string; items: string[] }[] {
  return yaml.load(
    fs.readFileSync(path.join(docsDirectory, 'docs.yaml'), {
      encoding: 'utf8'
    })
  ) as { title: string; items: string[] }[]
}

function listMdxSlugs(): string[] {
  const slugs = []

  for (const group of readYaml()) {
    slugs.push(...group.items.filter(s => !s.startsWith('@emotion')))
  }

  return slugs
}

function listPackageNames(): string[] {
  const group = readYaml().find(g => g.title === 'Packages')
  if (!group) throw new Error('Could not find "Packages" group in docs.yaml.')

  return group.items.map(p => p.replace('@emotion/', ''))
}

export interface DocMetadata {
  slug: string
  title: string
}

export type DocGroup = { title: string; docs: DocMetadata[] }

function listGroups(): DocGroup[] {
  const mdxSlugToTitle: { [slug: string]: string } = Object.fromEntries(
    listMdxSlugs().map(slug => [slug, getMdx(slug).title])
  )

  return readYaml().map(g => ({
    title: g.title,

    // Package READMEs don't have a title
    docs: g.items.map(slug => ({ slug, title: mdxSlugToTitle[slug] ?? slug }))
  }))
}

function getMdx(slug: string): { title: string; content: string } {
  const source = fs.readFileSync(path.join(docsDirectory, `${slug}.mdx`), {
    encoding: 'utf8'
  })

  const { data, content } = matter(source)
  return { title: data.title, content }
}

function getReadme(packageName: string): string {
  const source = fs.readFileSync(
    path.join(packagesDirectory, packageName, 'README.md'),
    { encoding: 'utf8' }
  )

  // Remove initial <h1>
  return source.replace(/# .*\n/, '')
}

export const docQueries = {
  listMdxSlugs,
  listPackageNames,
  listGroups,
  getMdx,
  getReadme
}
