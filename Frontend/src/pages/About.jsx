import Navbar from "../Components/Navbar";
import { FaUserTie, FaBuilding, FaShieldAlt, FaRocket } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-[#eef1ff] text-[#1f2937]">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#cfd6f6] via-[#c9e4de] to-[#f3d9b1]" />

        <div className="relative z-10 max-w-6xl mx-auto px-8 py-28">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold">
            About Us
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl">
            We believe hiring should feel
            <span className="block text-indigo-600">
              clear, human, and intentional
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-700 max-w-2xl">
            Our platform exists to remove friction from hiring and job
            discovery — replacing noise with clarity and better matches.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Our mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              The hiring world is broken by clutter, fake listings,
              and impersonal systems. We’re fixing that with a
              transparent, secure, and thoughtfully designed
              platform that respects people’s time.
            </p>
          </div>

          <div className="grid gap-6">
            {[
              {
                icon: <FaShieldAlt />,
                text: "Privacy-first & secure by design",
              },
              {
                icon: <FaRocket />,
                text: "Fast, distraction-free workflows",
              },
              {
                icon: <FaUserTie />,
                text: "Profiles that show real intent",
              },
              {
                icon: <FaBuilding />,
                text: "Built for modern teams",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-[#f3f6ff] p-6 rounded-2xl"
              >
                <div className="text-indigo-600 text-xl">
                  {item.icon}
                </div>
                <p className="text-gray-700 font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SITE DETAILS */}
      <section className="grid md:grid-cols-2">
        <div className="p-20 bg-[#f3f6ff]">
          <h2 className="text-3xl font-extrabold mb-6">
            For Job Seekers
          </h2>
          <p className="text-lg text-gray-700 max-w-md">
            Discover meaningful roles, apply confidently,
            and track progress without stress or confusion.
          </p>
        </div>

        <div className="p-20 bg-[#e9f7f3]">
          <h2 className="text-3xl font-extrabold mb-6">
            For Employers
          </h2>
          <p className="text-lg text-gray-700 max-w-md">
            Hire with clarity. Review real candidates,
            move faster, and build teams that actually fit.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">
            How it works
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Create your profile",
                desc: "Sign up and set your intent in minutes.",
              },
              {
                step: "02",
                title: "Connect meaningfully",
                desc: "Apply or post jobs with clarity and focus.",
              },
              {
                step: "03",
                title: "Move forward",
                desc: "Track progress and make confident decisions.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-10 rounded-3xl bg-[#f9fafb] hover:shadow-xl transition"
              >
                <div className="text-4xl font-extrabold text-indigo-600 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[#1f2937] text-center text-white">
        <h2 className="text-4xl font-extrabold">
          We’re building hiring with intention.
        </h2>
        <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
          Whether you’re looking for work or building a team,
          we’d love to be part of your journey.
        </p>

        <div className="mt-10">
          <a
            href="/contact"
            className="bg-[#f3d9b1] text-[#1f2937] px-12 py-5 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
