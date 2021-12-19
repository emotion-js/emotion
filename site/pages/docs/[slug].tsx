import fs from 'fs'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import path from 'path'
import matter from 'gray-matter'
import { ReactElement, useState } from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Title, DocWrapper } from '../../components'

const docsDirectory = path.join(process.cwd(), '../docs')

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = fs.readdirSync(docsDirectory)

  return {
    paths: filenames.map(filename => {
      return {
        params: {
          slug: filename.replace(/.mdx/i, '')
        }
      }
    }),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.slug as string

  const source = fs.readFileSync(path.join(docsDirectory, `${slug}.mdx`), {
    encoding: 'utf8'
  })
  const { content, data } = matter(source)

  const mdx = await serialize(content)

  return {
    props: {
      slug,
      title: data.title,
      mdx
    }
  }
}

export default function DocsPage({
  slug,
  title,
  mdx
}: InferGetStaticPropsType<typeof getStaticProps>): ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <DocWrapper sidebarOpen={sidebarOpen} onSidebarOpenChange={setSidebarOpen}>
      <div
        css={{
          alignItems: 'center',
          gap: 8
          // borderBottom: `1px solid ${colors.lighten(0.25, colors.border)}`
        }}
        className="docSearch-content"
      >
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <Title>{title}</Title>
          {/* <markdownComponents.a
            css={{ fontSize: 12, marginLeft: 'auto' }}
            href={
              doc.frontmatter.title
                ? `https://github.com/emotion-js/emotion/edit/main/docs/${this.props.pageContext.slug}.mdx`
                : `https://github.com/emotion-js/emotion/edit/main/packages/${this.props.pageContext.slug}/README.md`
            }
          >
            ✏️ <span css={{ marginLeft: 2 }}>Edit this page</span>
          </markdownComponents.a> */}
        </div>

        <div>
          <MDXRemote {...mdx} />
        </div>
        {/* <div>
          <MDXProvider
            components={{
              'live-code': createLiveCode(
                avatar.childImageSharp.resolutions.src
              ),
              ...markdownComponents
            }}
          >
            <MDXRenderer children={doc.body} />
          </MDXProvider>
        </div> */}
      </div>
    </DocWrapper>
  )
}
