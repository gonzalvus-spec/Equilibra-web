export type DownloadLink = {
  label: string
  url: string | null
  external?: boolean
}

// En producción puede reemplazarse con VITE_IOS_DOWNLOAD_URL o VITE_IOS_MEDIAFIRE_URL.
export const iosMediafireUrl =
  import.meta.env.VITE_IOS_MEDIAFIRE_URL ||
  'https://www.mediafire.com/file/TU_ID_IOS_IPA/equilibra-1.0.0.ipa/file'

export const downloads = {
  version: '1.0.0',
  build: '1',
  android: {
    apk: {
      label: 'Descargar APK',
      url: 'https://www.mediafire.com/file/TU_ID_ANDROID_APK/equilibra-1.0.0.apk/file',
      external: true,
    } satisfies DownloadLink,
    googlePlay: {
      label: 'Google Play',
      url: null,
      external: true,
    } satisfies DownloadLink,
  },
  ios: {
    available: true,
    appStore: {
      label: 'App Store',
      url: null,
      external: true,
    } satisfies DownloadLink,
    testFlight: {
      label: 'TestFlight',
      url: null,
      external: true,
    } satisfies DownloadLink,
    ipa: {
      label: 'Descargar para iOS',
      url: iosMediafireUrl,
      external: true,
    } satisfies DownloadLink,
  },
} as const