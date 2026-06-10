/**
 * Centralized Framer Motion animation variants for HarvestTrack.
 *
 * Every named export is a `Variants` object ready to pass directly to the
 * `variants` prop. Pair container variants with item variants so Framer Motion
 * can orchestrate staggered entrances automatically.
 *
 * @example
 *   import { containerVariants, itemVariants } from "@/src/utils/animations/variants";
 *
 *   <motion.div variants={containerVariants} initial="hidden" animate="visible">
 *     <motion.p variants={itemVariants}>Hello</motion.p>
 *   </motion.div>
 */

import type { Transition, Variants } from "framer-motion";

// ─── Transition presets ───────────────────────────────────────────────────────
// Keep durations consistent across the site by referencing these instead of
// hardcoding numbers inline.

/** Shared eased duration presets. */
export const transitions = {
  fast: { duration: 0.2, ease: "easeOut" } satisfies Transition,
  normal: { duration: 0.3, ease: "easeOut" } satisfies Transition,
  medium: { duration: 0.45, ease: "easeOut" } satisfies Transition,
  slow: { duration: 0.5, ease: "easeOut" } satisfies Transition,
} as const;

// ─── Containers ───────────────────────────────────────────────────────────────
// Apply to the *parent* motion element. Children receive staggered entrances
// automatically when they consume one of the `item*` variants below.

/**
 * Standard stagger container.
 * Best for: Hero text column, CTA sections, two-column layouts.
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

/**
 * Slower stagger container — each child waits a little longer before entering.
 * Best for: feature grids, testimonial lists, pricing tiers.
 */
export const containerVariantsSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

/**
 * Tight stagger for layered image composites (dashboard screenshots, mockups).
 * Best for: the right-side panel in Hero, product screenshot sections.
 */
export const imageContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: { opacity: 0 },
};

// ─── Items ────────────────────────────────────────────────────────────────────
// Use as `variants` on direct children of a container variant above.

/**
 * Subtle 12 px fade-up — the default child animation.
 * Best for: body copy, badges, button rows, list items.
 */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

/**
 * Larger 24 px fade-up for elements that need more visual presence.
 * Best for: standalone headings, hero sub-headings entering without a container.
 */
export const itemVariantsLarge: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25 } },
};

// ─── Badges ───────────────────────────────────────────────────────────────────

/**
 * Pill / chip badge that scales from 90 % while fading in.
 * Best for: "Built for evangelists" badge, status chips, tag labels.
 * Can be used standalone *or* as a child of a container variant.
 */
export const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

// ─── Buttons ─────────────────────────────────────────────────────────────────

/**
 * CTA row — subtle scale-up combined with a short fade-up.
 * Best for: primary/secondary button groups, download link rows.
 * Designed to sit inside a `containerVariants` parent.
 */
export const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

// ─── Sections ─────────────────────────────────────────────────────────────────

/**
 * Top-level `<section>` fade-in driven by scroll visibility.
 *
 * @example
 *   const ref = useRef(null);
 *   const isInView = useInView(ref, { once: true, amount: 0.2 });
 *
 *   <motion.section
 *     ref={ref}
 *     variants={sectionVariants}
 *     initial="hidden"
 *     animate={isInView ? "visible" : "hidden"}
 *   >
 *
 * Best for: Hero, Features, Testimonials, Pricing — any full-width section.
 */
export const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// ─── Images ───────────────────────────────────────────────────────────────────

/**
 * Dashboard screenshot or product illustration panel.
 * Scales subtly from 97 % while fading in for a polished reveal.
 *
 * Pair with `imageContainerVariants` on the wrapping `motion.div` to stagger
 * multiple image layers (shadow decorations, overlapping cards, etc.).
 *
 * Best for: Hero right-panel mockup, feature screenshots, app store previews.
 */
export const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.3 } },
};
