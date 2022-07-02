import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'
import { ReactElement, useState } from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { Title, DocWrapper } from '../../components'
import { docQueries } from '../../queries'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: docQueries.listSlugs().map(slug => ({
      params: {
        slug
      }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params!.slug as string

  const { title, content } = docQueries.get(slug)
  const mdx = await serialize(content)

  const docGroups = docQueries.getGroups()

  return {
    props: {
      slug,
      title,
      mdx,
      docGroups
    }
  }
}

export default function DocsPage({
  slug,
  title,
  mdx,
  docGroups
}: InferGetStaticPropsType<typeof getStaticProps>): ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(false) // TODO:SAM move this into DocWrapper?

  return (
    <DocWrapper
      sidebarOpen={sidebarOpen}
      onSidebarOpenChange={setSidebarOpen}
      docGroups={docGroups}
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
    </DocWrapper>
  )
}
