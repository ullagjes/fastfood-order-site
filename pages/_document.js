
import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}

//hver gang det lages et htmldokument, skal det lage et serverstylesheet. rendrer side, og hver gang den rendrer, skal den samle inn alle css-regler og legge inn i stylesheet. Legger på css på dokumentet
//finally går etter try/catch, går uansett om det er error eller ikke. Lager stylesheet.