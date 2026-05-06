"use client";

import useGeoRedirect from "@/hooks/useGeoRedirect";
import GeoRedirectBanner from "@/components/GeoRedirectBanner";

export default function GeoRedirectWrapper() {
  const { geoData, showRedirectBanner, redirectToLocalPage, dismissBanner } = useGeoRedirect();

  if (!showRedirectBanner || !geoData) return null;

  return (
    <GeoRedirectBanner
      countryCode={geoData.countryCode}
      countryName={geoData.countryName}
      onRedirect={redirectToLocalPage}
      onDismiss={dismissBanner}
    />
  );
}
