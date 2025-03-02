import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Github,
  Twitter,
  Play,
  Zap,
  Code,
  Eye,
  ScrollText,
  Pen,
  Clock,
  Brush,
} from "lucide-react";

const LandingPage: React.FC = () => {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, ease: "easeOut" },
    },
  };

  const pulse = {
    visible: {
      scale: [1, 1.05, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  // Refs and useInView for each section
  const heroRef = useRef(null);
  const highlightsRef = useRef(null);
  const creatorsRef = useRef(null);
  const featuresRef = useRef(null);
  const productivityRef = useRef(null);
  const intelligenceRef = useRef(null);
  const ctaRef = useRef(null);
  const footerRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const highlightsInView = useInView(highlightsRef, {
    once: true,
    margin: "-100px",
  });
  const creatorsInView = useInView(creatorsRef, {
    once: true,
    margin: "-100px",
  });
  const featuresInView = useInView(featuresRef, {
    once: true,
    margin: "-100px",
  });
  const productivityInView = useInView(productivityRef, {
    once: true,
    margin: "-100px",
  });
  const intelligenceInView = useInView(intelligenceRef, {
    once: true,
    margin: "-100px",
  });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  const footerInView = useInView(footerRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-sans flex flex-col">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative flex items-center justify-center min-h-screen px-6 w-full"
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={staggerContainer}
        style={{
          backgroundColor: "#99ffc2", // Fixed camelCase
          backgroundImage: `
              radial-gradient(at 14% 75%, hsla(86, 74%, 65%, 1) 0px, transparent 50%),
              radial-gradient(at 87% 52%, hsla(205, 69%, 69%, 1) 0px, transparent 50%),
              radial-gradient(at 45% 49%, hsla(267, 80%, 67%, 1) 0px, transparent 50%),
              radial-gradient(at 93% 76%, hsla(203, 96%, 78%, 1) 0px, transparent 50%),
              radial-gradient(at 41% 12%, hsla(123, 62%, 74%, 1) 0px, transparent 50%),
              radial-gradient(at 95% 20%, hsla(21, 82%, 61%, 1) 0px, transparent 50%),
              radial-gradient(at 43% 21%, hsla(116, 63%, 72%, 1) 0px, transparent 50%)
            `, // Combined gradients into a single string with commas
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative z-10 text-center max-w-4xl text-white">
          <motion.h1
            className="text-4xl md:text-[100px] font-extrabold tracking-tight mb-4 md:mb-8"
            variants={fadeInUp}
          >
            Content Creator
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl font-semibold mb-6"
            variants={fadeInUp}
          >
            The ultimate batch content creator
          </motion.p>
          <motion.p className="text-xl text-gray-200 mb-8" variants={fadeInUp}>
            Built for creators.
          </motion.p>
          <motion.div className="flex gap-4 justify-center" variants={fadeInUp}>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3 shadow-lg"
              onClick={() => alert("Get Started!")}
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
          <motion.div
            className="mt-6 flex gap-4 justify-center text-gray-200"
            variants={fadeInUp}
          >
            <a
              href="/documentation"
              className="flex items-center hover:underline"
            >
              Documentation <ScrollText className="ml-2 w-4 h-4" />
            </a>
            <a href="/create" className="flex items-center hover:underline">
              Create <Pen className="ml-2 w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Highlights Section */}
      <motion.section
        ref={highlightsRef}
        className="py-16 max-w-6xl mx-auto px-6"
        initial="hidden"
        animate={highlightsInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-4xl md:text-8xl font-bold text-start mb-12"
          variants={fadeInUp}
        >
          Get the Highlights
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Real-Time Conversion",
              desc: "Experience the magic of seeing your Markdown transform into perfectly structured HTML instantly as you type. Whether you’re drafting a quick note or building a complex webpage, Markdown Renderer keeps pace with your creativity, delivering flawless results without delay.",
              icon: (
                <Clock color="orange" className="w-10 h-10 text-gray-800" />
              ),
            },
            {
              title: "Custom Templates",
              desc: "Take control of your HTML output with fully customizable templates that let you shape your content with precision. Define the structure that suits your project—be it a blog, portfolio, or documentation—and watch Markdown Renderer bring your vision to life effortlessly.",
              icon: <Code color="green" className="w-10 h-10 text-gray-800" />,
            },
            {
              title: "Seamless CSS Styling",
              desc: "Unleash your design flair with seamless CSS integration that lets you style your HTML exactly as you envision. From subtle tweaks to bold overhauls, Markdown Renderer ensures every element looks beautiful, giving you the freedom to create outputs that are uniquely yours.",
              icon: <Brush color="blue" className="w-10 h-10 text-gray-800" />,
            },
          ].map((highlight, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="border-none shadow-md rounded-2xl flex flex-col justify-between">
                <CardContent className="pt-8 text-start flex flex-col justify-center items-start flex-grow gap-1">
                  <div className="mb-4">{highlight.icon}</div>
                  <p className="text-xl font-semibold mb-4">
                    {highlight.title}
                  </p>
                  <p className="text-gray-600 text-sm">{highlight.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Built for Creators Section */}
      <motion.section
        ref={creatorsRef}
        className="py-16 bg-white"
        initial="hidden"
        animate={creatorsInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            variants={fadeInUp}
          >
            Built for Creators
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-8"
            variants={fadeInUp}
          >
            Turn your Markdown into stunning HTML with a real-time editor that’s
            as fast as your ideas. Built from the ground up for writers,
            developers, and designers.
          </motion.p>
          <motion.div className="flex justify-center" variants={fadeInUp}>
            <div
              className="w-full max-w-lg h-64 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400"
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1740680209886-c461a9c692f3?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
              }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        className="py-16 max-w-6xl mx-auto px-6"
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.div variants={staggerContainer} className="space-y-16">
          <motion.div variants={fadeInUp}>
            <Card className="border-none shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  Lightning-Fast Rendering
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-600">
                  Experience real-time conversion—up to 5x faster than
                  traditional tools.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card className="border-none shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  Limitless Customization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-600">
                  Define your HTML with custom templates and CSS that’s uniquely
                  yours.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card className="border-none shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  Timeless Interface
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-600">
                  A minimalist design that’s easy to use and gorgeous to look
                  at.
                </p>
                <ul className="mt-4 space-y-4 text-gray-600">
                  <li>
                    <strong>Sleek Design:</strong> Stunningly simple, remarkably
                    robust.
                  </li>
                  <li>
                    <strong>Rock-Solid Stability:</strong> Reliable and
                    crash-resistant.
                  </li>
                  <li>
                    <strong>Quick Access Tools:</strong> Jump to features with
                    one tap.
                  </li>
                  <li>
                    <strong>Universal Compatibility:</strong> Syncs across all
                    platforms.
                  </li>
                  <li>
                    <strong>Light & Dark Modes:</strong> Switch to match your
                    mood.
                  </li>
                </ul>
                <div className="mt-6 w-full h-40 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
                  Placeholder: Back view of Markdown Renderer UI in light and
                  dark modes
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Productivity & Performance Section */}
      <motion.section
        ref={productivityRef}
        className="py-16 bg-gray-50"
        initial="hidden"
        animate={productivityInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            variants={fadeInUp}
          >
            All-Day Productivity
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 text-center mb-8"
            variants={fadeInUp}
          >
            Up to 10x more efficient than manual coding—create from dawn to dusk
            and beyond.
          </motion.p>
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div variants={fadeInUp}>
              <Card className="border-none shadow-md rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    Next-Gen Engine
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    90% faster execution than traditional tools.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="border-none shadow-md rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    Open-Source Power
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Endless possibilities with a vibrant community.
                  </p>
                  <a
                    href="#"
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    Learn more about open-source
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Creative Intelligence Section */}
      <motion.section
        ref={intelligenceRef}
        className="py-16 max-w-6xl mx-auto px-6"
        initial="hidden"
        animate={intelligenceInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          variants={fadeInUp}
        >
          Creative Intelligence
        </motion.h2>
        <motion.p
          className="text-xl text-gray-600 text-center mb-8"
          variants={fadeInUp}
        >
          Ideas, unlocked—with smart features that keep your data secure.
        </motion.p>
        <motion.div variants={staggerContainer} className="space-y-8">
          <motion.div variants={fadeInUp}>
            <Card className="border-none shadow-md rounded-2xl">
              <CardContent className="pt-6">
                <p className="text-lg font-semibold">Boost Your Workflow</p>
                <p className="text-gray-600 mt-2">
                  Live previews and instant exports at your fingertips.
                </p>
                <div className="mt-4 w-full h-40 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
                  Placeholder: Partial view of Markdown Renderer showing live
                  preview capabilities
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card className="border-none shadow-md rounded-2xl">
              <CardContent className="pt-6">
                <p className="text-lg font-semibold">Express Your Vision</p>
                <p className="text-gray-600 mt-2">
                  Craft custom templates with a few clicks.
                </p>
                <div className="mt-4 w-full h-40 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
                  Placeholder: Markdown Renderer screen showing template
                  creation
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card className="border-none shadow-md rounded-2xl">
              <CardContent className="pt-6">
                <p className="text-lg font-semibold">Privacy First</p>
                <p className="text-gray-600 mt-2">
                  Your work stays yours with local processing.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        className="py-16 bg-gradient-to-r from-gray-100 to-gray-200"
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeInUp}
          className="max-w-lg mx-auto text-center"
        >
          <Card className="border-none shadow-lg rounded-2xl bg-white">
            <CardContent className="pt-8">
              <h2 className="text-4xl font-bold mb-6">
                Why Markdown Renderer?
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                The best place to start creating.
              </p>
              <div className="flex gap-4 justify-center">
                <Input
                  placeholder="Enter your email"
                  className="max-w-xs rounded-full border-gray-300"
                />
                <motion.div variants={pulse} animate="visible">
                  <Button
                    variant="outline"
                    className="rounded-full border-gray-300 hover:bg-gray-100"
                  >
                    Sign Up for Updates
                  </Button>
                </motion.div>
              </div>
              <Badge
                variant="secondary"
                className="mt-6 bg-gray-200 text-gray-700"
              >
                Free Forever
              </Badge>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        ref={footerRef}
        className="bg-gray-900 text-white p-8"
        initial="hidden"
        animate={footerInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.div
          className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8"
          variants={fadeInUp}
        >
          <div className="text-2xl font-bold">Markdown Renderer</div>
          <div className="flex gap-8">
            {["Home", "Features", "FAQ", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex gap-6">
            <a href="#" aria-label="Github">
              <Github className="w-6 h-6 text-gray-300 hover:text-white" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="w-6 h-6 text-gray-300 hover:text-white" />
            </a>
          </div>
        </motion.div>
        <motion.div
          className="text-center text-sm text-gray-400 mt-6"
          variants={fadeInUp}
        >
          © 2025 Markdown Renderer. Crafted with precision.
        </motion.div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
