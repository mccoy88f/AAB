import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  transpilePackages: ['@aab/ui', '@aab/core', '@aab/types'],
}

export default withNextIntl(nextConfig)
