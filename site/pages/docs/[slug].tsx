import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'
import { ReactElement } from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import remarkPrism from 'remark-prism'
import { DocWrapper } from '../../components'
import { docQueries } from '../../queries'
import { DocTitle } from '../../components/doc-title'
import { remarkFixLinks } from '../../util/remark-fix-links'

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

  // mdxOptions is duplicated in an attempt to prevent the client-side bundle
  // from containing any mdx/remark JS
  const mdx = await serialize(content, {
    mdxOptions: { remarkPlugins: [remarkPrism, remarkFixLinks] }
  })

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
      <DocTitle title={title} slug={slug} />
      <MDXRemote {...mdx} />
    </DocWrapper>
  )
}
