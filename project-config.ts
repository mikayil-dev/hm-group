interface ProjectConfig {
  adapter: 'static' | 'node';
  site: {
    name: string;
    url: string;
    lang: string;
  };
  contact: {
    email: string;
    phone?: string;
    instagram?: string;
  };
  adSense: {
    enabled: boolean;
    publisherId: string;
    adsTxt: string;
  };
  analytics: {
    hostUrl: string;
    id: string;
  };
  head: {
    titleSeperator: string;
    titleSuffix: string;
    description: string;
  };
  modules: {
    blog: {
      enabled: boolean;
    };
  };
}

export default {
  adapter: 'static',
  site: {
    name: 'HM KFZ-Zulassung & Transfer',
    url: 'https://group-hm.de',
    lang: 'de',
  },
  contact: {
    email: (import.meta.env.CONTACT_EMAIL as string) ?? 'kontakt@group-hm.de',
    phone: (import.meta.env.CONTACT_PHONE as string) ?? '',
    instagram: 'https://www.instagram.com/hm_kfz_sv/',
  },
  adSense: {
    enabled: false,
    publisherId: (import.meta.env.ADSENSE_PUBLISHER_ID as string) ?? '',
    adsTxt: (import.meta.env.ADSENSE_ADS_TXT as string) ?? '',
  },
  analytics: {
    hostUrl: (import.meta.env.ANALYTICS_HOST_URL as string) ?? '',
    id: (import.meta.env.ANALYTICS_ID as string) ?? '',
  },
  head: {
    titleSeperator: ' | ',
    titleSuffix: 'HM KFZ-Zulassung & Transfer',
    description:
      'HM KFZ-Zulassung & Transfer – Ihr zuverlässiger Partner für alle organisatorischen Aufgaben rund um Ihr Fahrzeug. Wir übernehmen für Sie Behördengänge, Zulassungen und Fahrzeugtransfers.',
  },
  modules: {
    blog: {
      enabled: false,
    },
  },
} as ProjectConfig;
