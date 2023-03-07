import { Html, Head, Main, NextScript } from 'next/document'

import { getCssText } from '~/styles'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
