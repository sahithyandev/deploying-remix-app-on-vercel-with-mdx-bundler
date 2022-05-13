/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildTarget: 'vercel',
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === 'development' ? undefined : './server.js',
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "api/index.js",
  // publicPath: "/build/",
  serverDependenciesToBundle: [
    'decode-named-character-reference',
    'character-entities',
    'ccount',
    'bail',
    'trough',
    'vfile',
    'vfile-message',
    'property-information',
    'space-separated-tokens',
    'comma-separated-tokens',
    'vfile-location',
    'web-namespaces',
    'zwitch',
    'html-void-elements',
    'stringify-entities',
    'character-entities-legacy',
    'character-entities-html4',
    'html-whitespace-sensitive-tag-names'
  ]
}
