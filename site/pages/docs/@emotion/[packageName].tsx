import { GetStaticPaths, GetStaticPropsContext } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { docQueries } from '../../../queries'
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
  const mdx = await serialize(content)

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
