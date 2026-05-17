"use client";

import Link from "next/link";
import { ArrowRight, Download, Heart, Play } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center"
      style={{
        backgroundImage: `url('/devotional_evangelism.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Preload image optimization */}
      <link rel="preload" as="image" href="/devotional_evangelism.webp" />

      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent pointer-events-none" />

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes gentleShake {
          0%, 100% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          25% {
            transform: translateX(-2px) translateY(-1px) rotate(0.5deg);
          }
          50% {
            transform: translateX(2px) translateY(1px) rotate(-0.5deg);
          }
          75% {
            transform: translateX(-1px) translateY(2px) rotate(0.3deg);
          }
        }

        @keyframes floatUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.6s ease-out forwards;
        }

        .animate-shake {
          animation: gentleShake 3s ease-in-out infinite;
        }

        .animate-float-up {
          animation: floatUp 0.9s ease-out forwards;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full animate-fade-in-up delay-100 border border-white/20">
              <div className="w-2 h-2 bg-[#2E9E52] rounded-full" />
              <span className="text-sm font-semibold text-white">
                Built for evangelists & churches
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in-up delay-200">
                Turn outreach contacts into{" "}
                <span className="text-[#2E9E52]">lasting disciples</span>.
              </h1>
              <p className="text-lg text-white/90 leading-relaxed max-w-xl animate-fade-in-up delay-300">
                HarvestTrack gives missionaries a QR-powered contact capture
                flow, structured follow-up tasks, and a pipeline that mirrors
                the real spiritual journey — from first hello to joining a
                church.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2E9E52] text-white font-semibold rounded-lg hover:bg-[#268547] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50 hover:scale-105 animate-fade-in-up delay-400"
              >
                Try the dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md border border-white/40 text-white font-semibold rounded-lg hover:bg-white/30 transition-all duration-300 hover:scale-105 animate-fade-in-up delay-500"
              >
                See a public QR form
              </Link>
            </div>

            {/* Download Links */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5  text-white font-medium rounded-lg hover:bg-white/25 transition-all duration-300  hover:scale-105 animate-fade-in-up delay-50"
              >
                <Download className="w-4 h-4" />
                Download for iOS
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5  text-white font-medium rounded-lg hover:bg-white/25 transition-all duration-300  hover:scale-105 animate-fade-in-up delay-50"
              >
                <Play className="w-4 h-4" />
                Get it on Google Play
              </Link>
            </div>
          </div>

          {/* Right Side - Dashboard Mockup */}
          <div className="relative hidden lg:block animate-float-up delay-300">
            <div className="relative z-20 animate-shake">
              {/* Browser window mockup with glass effect */}
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/50">
                {/* Browser chrome */}
                <div className="bg-gray-100/80 backdrop-blur-md px-4 py-3 flex items-center gap-2 border-b border-gray-200/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-xs text-gray-600 ml-3">
                    app.harvesttrack.app/dashboard
                  </span>
                </div>

                {/* Dashboard content */}
                <div className="p-6 space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Contacts (30D)
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        412
                      </p>
                      <p className="text-xs text-green-600 mt-1">+18%</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        QR Scans
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        1,284
                      </p>
                      <p className="text-xs text-green-600 mt-1">+34%</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Discipled
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        67
                      </p>
                      <p className="text-xs text-green-600 mt-1">+9</p>
                    </div>
                  </div>

                  {/* Activity list */}
                  <div className="space-y-3 pt-6 border-t border-gray-100">
                    {[
                      { name: "Amara Okafor", action: "moved to Discipleship" },
                      { name: "David Mensah", action: "call follow-up due" },
                      { name: "Grace Mwangi", action: "joined Sunday service" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 border p-3 rounded-lg bg-gradient-to-r from-green-50 to-white border-green-100 animate-fade-in-up"
                        style={{ animationDelay: `${700 + idx * 100}ms` }}
                      >
                        <div className="w-6 h-6 mt-0.5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Heart className="w-3 h-3 text-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            — {item.action}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shadow decorations */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent rounded-2xl blur-xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
