import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'
import { ReactElement } from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { Title, DocWrapper, markdownCss } from '../../components'
import { docQueries } from '../../queries'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: docQueries.listMdxSlugs().map(slug => ({
      params: {
        slug
      }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params!.slug as string

  const { title, content } = docQueries.getMdx(slug)
  const mdx = await serialize(content)

  return {
    props: {
      slug,
      title,
      mdx,
      docGroups: docQueries.listGroups()
    }
  }
}

export default function DocsPage({
  slug,
  title,
  mdx,
  docGroups
}: InferGetStaticPropsType<typeof getStaticProps>): ReactElement {
  return (
    <DocWrapper activeSlug={slug} docGroups={docGroups}>
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

      <div css={markdownCss}>
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
