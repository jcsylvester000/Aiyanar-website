import type { StaticImageData } from "next/image";
import resortBlueHour from "@/assets/images/aiyanar-resort-blue-hour-anilao.jpg";
import clubhouseSunset from "@/assets/images/aiyanar-clubhouse-sunset.jpg";
import poolSunset from "@/assets/images/aiyanar-infinity-pool-sunset-anilao.jpg";
import macroTriptych from "@/assets/images/anilao-macro-pygmy-seahorse-squid-octopus.jpg";
import poolDay from "@/assets/images/aiyanar-infinity-pool-day-cabana.jpg";
import roomsNight from "@/assets/images/aiyanar-rooms-pool-night.jpg";
import suite from "@/assets/images/aiyanar-suite-room.jpg";
import deluxe from "@/assets/images/aiyanar-deluxe-room.jpg";
import sundeckBar from "@/assets/images/aiyanar-sundeck-bar-sunset.jpg";
import dining from "@/assets/images/aiyanar-clubhouse-open-air-dining.jpg";
import diveCentre from "@/assets/images/aiyanar-dive-centre.jpg";
import squid from "@/assets/images/anilao-juvenile-squid-macro.jpg";
import nudibranchs from "@/assets/images/anilao-nudibranchs-soft-coral.jpg";
import aerialPool from "@/assets/images/aiyanar-resort-aerial-pool-lawn.jpg";
import aerialTrainingPool from "@/assets/images/aiyanar-infinity-pool-dive-training-aerial.jpg";
import diveBriefing from "@/assets/images/aiyanar-dive-briefing.jpg";
import padiClass from "@/assets/images/aiyanar-padi-dive-class.jpg";
import foodInasal from "@/assets/images/aiyanar-grilled-chicken-inasal.jpg";
import anilaoBancas from "@/assets/images/anilao-bancas-dusk.jpg";

/**
 * Image library. Every image carries alt text and its source (aiyanar.com upload) so licences can be checked.
 * placeholder: true = interim web capture (~577 px tall). Replace with originals / 2026 catalog / new shoot before launch;
 * the content guard reports the count and REQUIRE_FINAL_ASSETS=true fails the build while any remain.
 */
export type LibraryImage = { src: StaticImageData; alt: string; source: string; placeholder: boolean; note?: string };
const img = (src: StaticImageData, alt: string, source: string, placeholder = true, note?: string): LibraryImage => ({ src, alt, source, placeholder, note });

export const images = {
  resortBlueHour: img(resortBlueHour, "Aiyanar’s terraced clubhouse lit up at blue hour above Balayan Bay", "2020/06/hero2.jpg"),
  clubhouseSunset: img(clubhouseSunset, "Clubhouse steps and terraces at sunset", "2020/06/aiyanar-home.jpg"),
  poolSunset: img(poolSunset, "Infinity pool with beanbags facing the sunset over Anilao", "2020/06/hero3.jpg"),
  macroTriptych: img(macroTriptych, "Pygmy seahorse, juvenile squid and an octopus riding a jellyfish, photographed in Anilao", "2020/06/hero4.jpg", true, "Triptych: prefer single originals"),
  poolDay: img(poolDay, "Infinity pool by day with a red poolside cabana and the sea beyond", "2020/06/poolside1.jpg"),
  roomsNight: img(roomsNight, "Guest rooms reflected in the pool at night", "2020/06/facility3.jpg"),
  suite: img(suite, "Suite with two queen beds and a sea-view balcony", "2020/06/suite1.jpg", true, "Has overlay text; pre-2025 photo"),
  deluxe: img(deluxe, "Deluxe room with a private ocean-view balcony", "2020/06/deluxe1.jpg", true, "Has overlay text; pre-renovation"),
  sundeckBar: img(sundeckBar, "Sundeck bar under string lights at sunset", "2020/06/579A3745_Bar.jpg"),
  dining: img(dining, "Open-air clubhouse restaurant with a sea view", "2020/06/579A3755_Dining.jpg"),
  diveCentre: img(diveCentre, "Dive centre gear area with rinse tubs", "2020/06/dive-center-img01.jpg"),
  squid: img(squid, "Juvenile squid on a dark background, Anilao macro", "2020/08/uw-room-img.jpg"),
  nudibranchs: img(nudibranchs, "Nudibranchs on soft coral in Anilao", "2020/06/diving-img-01.jpg"),
  aerialPool: img(aerialPool, "Aerial view of the pool, lawn and cabanas", "2020/08/DJI_0438a.jpg"),
  aerialTrainingPool: img(aerialTrainingPool, "Aerial view of the two-sided pool showing the 15-ft dive training side", "2020/06/DJI_0430.jpg"),
  diveBriefing: img(diveBriefing, "Dive guide giving a briefing before a boat dive", "2020/06/courses.jpg"),
  padiClass: img(padiClass, "PADI dive class during a briefing at Aiyanar", "2025/03/P4A8468-1.jpg"),
  foodInasal: img(foodInasal, "Grilled chicken plate from the clubhouse kitchen", "2020/08/AIYANAR210171.jpg"),
  anilaoBancas: img(anilaoBancas, "Bancas on calm water at dusk in Anilao", "2020/06/banner-anilao.jpg"),
} satisfies Record<string, LibraryImage>;

export type ImageKey = keyof typeof images;
