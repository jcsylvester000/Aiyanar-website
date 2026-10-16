import { gallery, galleryCategories } from "@/content/gallery";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/env";
import { JsonLd } from "@/lib/jsonld";
import { PageHero } from "@/components/sections/page-hero";
import { GalleryGrid } from "@/components/sections/gallery-grid";

export const metadata = pageMetadata({
  title: "Photo Gallery",
  description: "Photos of Aiyanar Beach & Dive Resort in Anilao: the infinity pool at sunset, rooms, the dive centre, macro underwater life, food and the Sundeck Bar.",
  path: "/gallery/",
});

/** P45 Gallery (FR-GA1): resort · rooms · dive · underwater · food · events. */
export default function GalleryPage() {
  const photos = gallery.map((g) => ({ key: g.image, src: images[g.image].src, alt: images[g.image].alt, category: g.category }));
  const cats = galleryCategories.filter((c) => photos.some((p) => p.category === c));
  return (
    <>
      <PageHero image="aerialPool" eyebrow="Gallery" title="Golden hour, every day" intro="The resort, the rooms, the reef and the sunset." crumbs={[{ name: "Gallery", path: "/gallery/" }]} />
      <section aria-label="Photos" className="section-y">
        <div className="container-site">
          <GalleryGrid photos={photos} categories={cats} />
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "Aiyanar photo gallery",
          url: absoluteUrl("/gallery/"),
          image: photos.map((p) => ({ "@type": "ImageObject", contentUrl: absoluteUrl(p.src.src), caption: p.alt })),
        }}
      />
    </>
  );
}
