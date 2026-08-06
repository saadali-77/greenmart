"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const MotionLink = motion(Link);

export default function Hero() {
  return (
    <section className="bg-green-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
            Delivering in 30 minutes
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-4 text-5xl font-bold text-green-700 leading-tight"
          >
            Fresh Groceries Delivered To Your Door
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-gray-600 text-lg max-w-md"
          >
            Shop fresh fruits, vegetables, dairy products and daily essentials from GreenMart.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4">
            <MotionLink
              href="/products"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-block"
            >
              Shop Now
            </MotionLink>
            <MotionLink
              href="/categories"
              whileHover={{ scale: 1.04, backgroundColor: "#dcfce7" }}
              whileTap={{ scale: 0.97 }}
              className="border border-green-600 text-green-700 px-8 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Browse Categories
            </MotionLink>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex gap-8 border-t border-green-200 pt-6"
          >
            {[
              { value: "12k+", label: "Orders delivered" },
              { value: "30 min", label: "Avg. delivery" },
              { value: "4.8★", label: "Customer rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-green-700">{stat.value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          className="relative h-96 rounded-2xl overflow-hidden shadow-xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&q=80"
            alt="Fresh fruits and vegetables"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}