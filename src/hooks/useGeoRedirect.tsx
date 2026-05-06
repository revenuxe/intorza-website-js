import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { countries } from "@/data/countries";

interface GeoData {
  countryCode: string;
  countryName: string;
  city: string;
  region: string;
}

const GEO_REDIRECT_KEY = "intorza_geo_redirect_dismissed";
const GEO_DATA_KEY = "intorza_geo_data";

export const useGeoRedirect = () => {
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [showRedirectBanner, setShowRedirectBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const detectGeo = async () => {
      try {
        // Check if user has dismissed the banner
        const dismissed = localStorage.getItem(GEO_REDIRECT_KEY);
        if (dismissed) {
          setIsLoading(false);
          return;
        }

        // Check if we already have cached geo data
        const cachedGeo = localStorage.getItem(GEO_DATA_KEY);
        if (cachedGeo) {
          const parsed = JSON.parse(cachedGeo);
          setGeoData(parsed);
          checkRedirectNeeded(parsed);
          setIsLoading(false);
          return;
        }

        // Fetch geo data from free IP geolocation API
        const response = await fetch("https://ipapi.co/json/", {
          headers: {
            "Accept": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch geo data");
        }

        const data = await response.json();
        
        const geoInfo: GeoData = {
          countryCode: data.country_code?.toLowerCase() || "",
          countryName: data.country_name || "",
          city: data.city || "",
          region: data.region || "",
        };

        // Cache the geo data
        localStorage.setItem(GEO_DATA_KEY, JSON.stringify(geoInfo));
        setGeoData(geoInfo);
        checkRedirectNeeded(geoInfo);
      } catch (error) {
        console.log("Geo detection failed, using default:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const checkRedirectNeeded = (geo: GeoData) => {
      // Only show banner on homepage
      if (pathname !== "/") {
        setShowRedirectBanner(false);
        return;
      }

      // Check if we have a localized page for this country
      const countryExists = countries.some(
        c => c.code.toLowerCase() === geo.countryCode
      );

      // Show banner if country page exists and user is on main homepage
      if (countryExists && geo.countryCode !== "in") {
        setShowRedirectBanner(true);
      }
    };

    detectGeo();
  }, [pathname]);

  const dismissBanner = () => {
    localStorage.setItem(GEO_REDIRECT_KEY, "true");
    setShowRedirectBanner(false);
  };

  const redirectToLocalPage = () => {
    if (geoData?.countryCode) {
      const country = countries.find(c => c.code === geoData.countryCode);
      if (country) {
        router.push(`/${country.slug}`);
      } else {
        router.push(`/${geoData.countryCode}`);
      }
      dismissBanner();
    }
  };

  return {
    geoData,
    showRedirectBanner,
    isLoading,
    dismissBanner,
    redirectToLocalPage,
  };
};

export default useGeoRedirect;
