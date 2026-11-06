import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { buttonStyles } from "@/lib/button-styles";

export function EditorialBanner() {
  return (
    <section
      className="relative overflow-hidden bg-dusty-rose text-white"
      aria-labelledby="everyday-edit-heading"
    >
      {/* Subtle organic decorative rings */}
      <div
        className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-white/20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-soft-pink/20 blur-xl"
        aria-hidden="true"
      />

      <div className="container-page section-pad relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory px-3.5 py-1.5 text-caption font-semibold uppercase tracking-[0.14em] text-dusty-rose-deep shadow-xs">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              The Everyday Edit
            </span>

            <h2
              id="everyday-edit-heading"
              className="mt-6 font-serif text-h1 font-medium text-white leading-[1.08]"
            >
              Carry less.{" "}
              <span className="italic text-soft-pink">Choose better.</span>
            </h2>

            <p className="mt-5 max-w-xl text-lead text-white/90 leading-relaxed font-sans">
              A considered bag does more than hold your things — it quietly organises
              the day. Designed with purpose-placed pockets, balanced strap drops,
              and materials that grow richer with age.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/collections"
                className={buttonStyles({
                  variant: "primary",
                  size: "lg",
                  className: "bg-charcoal text-white hover:bg-black border-charcoal shadow-sm",
                })}
              >
                Explore Collection
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/our-story"
                className="inline-flex items-center gap-1.5 text-small font-semibold text-white/90 underline-offset-4 hover:underline hover:text-white"
              >
                Our Design Ethos &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: Prominent Product Photography Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[24rem] overflow-hidden rounded-xl border border-white/30 bg-white/10 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85"
                alt="Swami Jap bag craftsmanship, textures and thoughtful everyday details"
                className="h-full w-full object-cover transition-transform duration-700 ease-editorial hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-md border border-white/20 bg-white/95 p-3.5 text-charcoal backdrop-blur-sm">
                <p className="text-micro font-semibold uppercase tracking-[0.14em] text-dusty-rose-deep">
                  Signature Detail
                </p>
                <p className="font-serif text-small font-medium text-charcoal mt-0.5">
                  Reinforced Stitching &amp; Hand-Polished Hardware
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditorialBanner;
