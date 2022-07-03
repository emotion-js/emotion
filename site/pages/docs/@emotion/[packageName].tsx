import { GetStaticPaths, GetStaticPropsContext } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import remarkPrism from 'remark-prism'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { docQueries } from '../../../queries'
import { remarkFixLinks } from '../../../util/remark-fix-links'
import DocsPage from '../[slug]'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: docQueries.listPackageNames().map(packageName => ({
      params: {
        packageName
      }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const packageName = params!.packageName as string

  const content = docQueries.getReadme(packageName)

  // mdxOptions is duplicated in an attempt to prevent the client-side bundle
  // from containing any mdx/remark JS

  // READMEs should not contain live code blocks
  const mdx = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkPrism, remarkFixLinks],

      // rehypeSlug must come first
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
    }
  })

  const fullPackageName = `@emotion/${packageName}`

  return {
    props: {
      slug: fullPackageName,
      title: fullPackageName,
      mdx,
      docGroups: docQueries.listGroups()
    }
  }
}

export default DocsPage
