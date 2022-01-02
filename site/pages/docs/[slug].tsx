import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'
import Head from 'next/head'
import { ReactElement } from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import remarkPrism from 'remark-prism'
import { DocWrapper, ResponsiveTable, Title } from '../../components'
import { docQueries } from '../../queries'
import { remarkFixLinks } from '../../util/remark-fix-links'
import { mediaQueries, styleConstants } from '../../util'
import {
  remarkLiveEditor,
  EmotionLiveEditor
} from '../../components/live-editor'

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
    mdxOptions: {
      // remarkLiveEditor must come before remarkPrism
      remarkPlugins: [remarkLiveEditor, remarkPrism, remarkFixLinks]
    }
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

interface DocTitleProps {
  title: string
  slug: string
}

function DocTitle({ title, slug }: DocTitleProps): ReactElement {
  let editUrl

  if (slug.startsWith('@emotion/')) {
    const packageName = slug.replace('@emotion/', '')
    editUrl = `https://github.com/emotion-js/emotion/edit/main/packages/${packageName}/README.md`
  } else {
    editUrl = `https://github.com/emotion-js/emotion/edit/main/docs/${slug}.mdx`
  }

  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}
    >
      <Title
        css={{
          marginBottom: 0
        }}
      >
        {title}
      </Title>
      <a
        css={{
          display: 'none',

          [mediaQueries.mdUp]: {
            display: 'block',
            fontSize: styleConstants.fontSizeSm,
            fontWeight: 'normal !important' as 'normal'
          }
        }}
        href={editUrl}
      >
        ✏️ <span css={{ marginLeft: '0.25rem' }}>Edit this page</span>
      </a>
    </div>
  )
}

export default function DocsPage({
  slug,
  title,
  mdx,
  docGroups
}: InferGetStaticPropsType<typeof getStaticProps>): ReactElement {
  return (
    <>
      <Head>
        <title>Emotion – {title}</title>
      </Head>
      <DocWrapper activeSlug={slug} docGroups={docGroups}>
        <DocTitle title={title} slug={slug} />
        <MDXRemote
          {...mdx}
          components={{
            table: ResponsiveTable,
            'live-editor': EmotionLiveEditor
          }}
        />
      </DocWrapper>
    </>
  )
}
