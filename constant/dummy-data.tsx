'use client'
import Image, { StaticImageData } from "next/image";
import { RESTAURANTSIMG } from "@/public/image/image";

/* ─── types ─────────────────────────────────────────────────── */
export interface Card {
  category: string;
  title: string;
  src: string | StaticImageData;
  content: React.ReactNode;
}

/* ─── compact restaurant content ────────────────────────────── */
const RestaurantContent = ({
  description,
  tags,
  hours,
  rating,
  reviews,
  priceRange,
  highlights,
  imgSrc,
  imgAlt,
}: {
  description: string;
  tags: string[];
  hours: string;
  rating: number;
  reviews: number;
  priceRange: string;
  highlights: { icon: string; label: string; value: string }[];
  imgSrc: string | StaticImageData;   // ← fixed type
  imgAlt: string;
}) => (
  <div className="bg-card border rounded-2xl overflow-hidden">
    {/* image strip */}
    <div className="relative w-full h-36">
      <Image
        src={imgSrc}
        alt={imgAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 600px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* rating + price badges over image */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <span className="text-xs font-bold bg-black/50 text-white backdrop-blur-sm px-2 py-0.5 rounded-full">
          ⭐ {rating} · {reviews.toLocaleString()} reviews
        </span>
        <span className="text-xs font-bold bg-black/50 text-white backdrop-blur-sm px-2 py-0.5 rounded-full">
          {priceRange}
        </span>
      </div>

      {/* hours top-right */}
      <span className="absolute top-3 right-3 text-xs font-medium bg-black/50 text-white backdrop-blur-sm px-2 py-0.5 rounded-full">
        🕐 {hours}
      </span>
    </div>

    <div className="p-4 space-y-3">
      {/* tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span
            key={t}
            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary"
          >
            {t}
          </span>
        ))}
      </div>

      {/* description */}
      <p className="text-sm leading-relaxed opacity-70 line-clamp-2">
        {description}
      </p>

      {/* highlights row */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        {highlights.map((h) => (
          <div
            key={h.label}
            className="flex flex-col items-center gap-0.5 bg-muted/50 rounded-xl py-2 px-1 text-center"
          >
            <span className="text-lg">{h.icon}</span>
            <p className="text-xs font-bold leading-none">{h.value}</p>
            <p className="text-[10px] opacity-50 leading-none mt-0.5">{h.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── static restaurant data ─────────────────────────────────── */
export const data: Card[] = [
  {
    category: "North Indian · Mughlai",
    title: "Bukhara — The Kebab Legend",
    src: RESTAURANTSIMG.RESTAURANTSONE,
    content: (
      <RestaurantContent
        description="Bukhara has been Delhi's most iconic dining destination for over four decades — famous for its 18-hour slow-cooked dal and legendary wood-fired kebabs."
        tags={["Dine-in", "Takeaway", "Pure Veg Options"]}
        hours="12 PM – 11:30 PM"
        rating={4.8}
        reviews={12400}
        priceRange="₹₹₹"
        highlights={[
          { icon: "🛵", label: "Delivery", value: "25–35 min" },
          { icon: "🍖", label: "Must try", value: "Dal Bukhara" },
          { icon: "📍", label: "Location", value: "CP, Delhi" },
        ]}
        imgSrc={RESTAURANTSIMG.RESTAURANTSONE}
        imgAlt="Signature kebab platter at Bukhara"
      />
    ),
  },
  {
    category: "South Indian · Coastal",
    title: "Dakshin — Flavours of the South",
    src: RESTAURANTSIMG.RESTAURANTSTWO,
    content: (
      <RestaurantContent
        description="Dakshin celebrates the culinary diversity of Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh — from crispy paper dosas to fragrant coconut curries."
        tags={["Dine-in", "Family Friendly", "Veg Friendly"]}
        hours="7 AM – 10:30 PM"
        rating={4.6}
        reviews={8750}
        priceRange="₹₹"
        highlights={[
          { icon: "🛵", label: "Delivery", value: "20–30 min" },
          { icon: "🥥", label: "Must try", value: "Chettinad Curry" },
          { icon: "📍", label: "Location", value: "Bandra, Mumbai" },
        ]}
        imgSrc={RESTAURANTSIMG.RESTAURANTSTWO}
        imgAlt="Crispy paper dosa with sambar at Dakshin"
      />
    ),
  },
  {
    category: "Street Food · Chaat",
    title: "Haldiram's — Chaat Since 1937",
    src: RESTAURANTSIMG.RESTAURANTSTHREE,
    content: (
      <RestaurantContent
        description="Nearly a century of perfecting chaats, sweets, and snacks. From pani puri to aloo tikki — comfort food doesn't get more authentic than Haldiram's."
        tags={["Quick Bites", "Sweets", "Takeaway"]}
        hours="8 AM – 11 PM"
        rating={4.4}
        reviews={31200}
        priceRange="₹"
        highlights={[
          { icon: "🛵", label: "Delivery", value: "15–25 min" },
          { icon: "🥗", label: "Must try", value: "Papdi Chaat" },
          { icon: "📍", label: "Location", value: "Chandni Chowk" },
        ]}
        imgSrc={RESTAURANTSIMG.RESTAURANTSTHREE}
        imgAlt="Papdi chaat platter at Haldiram's"
      />
    ),
  },
  {
    category: "Chinese · Pan-Asian",
    title: "China Garden — Cantonese Classics",
    src: RESTAURANTSIMG.RESTAURANTSFOUR,
    content: (
      <RestaurantContent
        description="Mumbai's go-to for Cantonese cuisine since 1984. The legendary dim sum brunch and tableside Peking duck carving make every visit an occasion."
        tags={["Dine-in", "Bar Available", "Reservations Recommended"]}
        hours="12–3 PM, 7–11:30 PM"
        rating={4.5}
        reviews={6300}
        priceRange="₹₹₹"
        highlights={[
          { icon: "🛵", label: "Delivery", value: "30–45 min" },
          { icon: "🦆", label: "Must try", value: "Peking Duck" },
          { icon: "📍", label: "Location", value: "Kemps Corner" },
        ]}
        imgSrc={RESTAURANTSIMG.RESTAURANTSFOUR}
        imgAlt="Dim sum basket at China Garden"
      />
    ),
  },
  {
    category: "Biryani · Hyderabadi",
    title: "Paradise — Dum Biryani Royale",
    src: RESTAURANTSIMG.RESTAURANTSFIVE,
    content: (
      <RestaurantContent
        description="Synonymous with Hyderabadi dum biryani since 1953 — basmati, slow-cooked meat, and aromatic spices sealed under dough, opened at the table in a cloud of saffron steam."
        tags={["Dine-in", "Takeaway", "Bulk Orders"]}
        hours="11 AM – 11:30 PM"
        rating={4.7}
        reviews={22100}
        priceRange="₹₹"
        highlights={[
          { icon: "🛵", label: "Delivery", value: "20–35 min" },
          { icon: "🍚", label: "Must try", value: "Mutton Biryani" },
          { icon: "📍", label: "Location", value: "Secunderabad" },
        ]}
        imgSrc={RESTAURANTSIMG.RESTAURANTSFIVE}
        imgAlt="Dum biryani opened at table at Paradise"
      />
    ),
  },
  {
    category: "Bakery · Café",
    title: "Theobroma — Patisserie & More",
    src: RESTAURANTSIMG.RESTAURANTSSIX,
    content: (
      <RestaurantContent
        description="'Food of the gods' — melt-in-your-mouth brownies, flaky croissants, and artisanal sandwiches. Theobroma turns every visit into a small celebration."
        tags={["Café", "Desserts", "All-Day Breakfast"]}
        hours="8 AM – 10:30 PM"
        rating={4.6}
        reviews={14800}
        priceRange="₹₹"
        highlights={[
          { icon: "🛵", label: "Delivery", value: "20–30 min" },
          { icon: "🍫", label: "Must try", value: "Choc Brownie" },
          { icon: "📍", label: "Location", value: "Colaba, Mumbai" },
        ]}
        imgSrc={RESTAURANTSIMG.RESTAURANTSSIX}
        imgAlt="Brownie selection at Theobroma"
      />
    ),
  },
];