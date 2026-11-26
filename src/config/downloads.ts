export type DownloadLink = {
  label: string
  url: string
  external?: boolean
}

export const downloads = {
  version: '1.0.0',
  build: '1',
  android: {
    apk: {
      label: 'Descargar APK',
      url: 'https://download1078.mediafire.com/swy0uk94nycgZJlKUY8WriCCBjaVlwhUkXi4r57S5kW81ZzGOfensLQpCaYA_c-IWUa1y8iBC097p-b0987Gi9jcTCMcIHKqKYJsSbkeF31NBx7OAqr6iWvmOVroAj5z91wOI-x98X58nrCZmmmXCSnv243cUtMslKmztkGT77M/u9sgj884trbwql1/Equilibra.apk',
      external: true,
    } satisfies DownloadLink,
  },
} as const
