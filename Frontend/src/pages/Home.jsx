import Navbar from "../Components/Navbar";
import { FaUserTie, FaBuilding, FaBriefcase } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f6f7fb] text-[#1f2937]">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-100 via-sky-100 to-amber-100" />

        <div className="relative max-w-7xl mx-auto px-8 py-32 grid md:grid-cols-2 gap-20 items-center">
          {/* TEXT */}
          <div>
            <span className="inline-block mb-6 px-5 py-1.5 rounded-full bg-indigo-600/10 text-indigo-700 text-sm font-semibold">
              A better way to hire
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Hiring that feels
              <span className="block text-indigo-600 mt-2">
                simple & human
              </span>
            </h1>

            <p className="mt-8 text-lg text-gray-700 max-w-xl leading-relaxed">
              A modern hiring platform designed to connect
              people and companies with clarity — no noise,
              no pressure, just meaningful matches.
            </p>

            <div className="mt-12 flex flex-wrap gap-5">
              <a className="bg-indigo-600 text-white px-9 py-4 rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition">
                Explore Jobs
              </a>
              <a className="bg-white text-gray-900 px-9 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition">
                Start Hiring
              </a>
            </div>
          </div>

          {/* VISUAL */}
          <div className="relative">
            <div className="absolute -top-16 -left-16 w-80 h-80 bg-indigo-300 rounded-full blur-3xl opacity-30" />
            <img
              src="https://illustrations.popsy.co/amber/work-from-home.svg"
              alt="Hiring illustration"
              className="relative z-10 w-full max-w-lg mx-auto"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16">
            Everything you need.
            <span className="block text-indigo-600 mt-2">
              Nothing you don’t.
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <FaBriefcase />,
                title: "Curated Jobs",
                desc: "High-quality roles from verified companies only.",
                bg: "bg-indigo-50"
              },
              {
                icon: <FaUserTie />,
                title: "Human Profiles",
                desc: "Skills, intent, and personality — not just resumes.",
                bg: "bg-emerald-50"
              },
              {
                icon: <FaBuilding />,
                title: "Smart Hiring",
                desc: "Clear dashboards for faster, better decisions.",
                bg: "bg-amber-50"
              }
            ].map((item, i) => (
              <div
                key={i}
                className={`${item.bg} p-10 rounded-3xl transition hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="text-3xl mb-6 text-indigo-600">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE SPLIT */}
      <section className="py-24 bg-[#f6f7fb]">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-12">
          <div className="p-12 rounded-3xl bg-white shadow-sm">
            <h2 className="text-3xl font-extrabold mb-4">
              For Job Seekers
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-md">
              Discover roles that actually fit your goals,
              track applications effortlessly, and apply
              with confidence.
            </p>
          </div>

          <div className="p-12 rounded-3xl bg-white shadow-sm">
            <h2 className="text-3xl font-extrabold mb-4">
              For Employers
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-md">
              Hire faster with clarity and connect with
              candidates who genuinely care about your
              mission.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[#1f2937] text-center text-white">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Not another job board.
        </h2>

        <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          A thoughtfully designed hiring experience —
          built for people, not algorithms.
        </p>

        <div className="mt-12">
          <a className="inline-block bg-[#f3d9b1] text-[#1f2937] px-14 py-5 rounded-xl font-semibold hover:opacity-90 transition">
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
