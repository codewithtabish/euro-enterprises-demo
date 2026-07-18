"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, BookOpen, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// ============================================
// TYPES
// ============================================
type Blog = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  bannerImage: string;
  bannerImageAlt: string | null;
  featured: boolean;
  status: string;
  publishedAt: Date | null;
  createdAt: Date;
  tableOfContents: any;
  content: any;
};

type Props = {
  allBlogs: Blog[];
  featuredBlogs: Blog[];
};

// ============================================
// ANIMATION VARIANTS
// ============================================
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// ============================================
// HELPER: Get reading time
// ============================================
function getReadingTime(content: any): string {
  if (!content?.blocks) return "3 min read";
  let wordCount = 0;
  content.blocks.forEach((block: any) => {
    if (block.type === "paragraph") {
      wordCount += (block.data?.text || "").split(/\s+/).length;
    } else if (block.type === "raw") {
      const text = (block.data?.html || "").replace(/<[^>]+>/g, " ");
      wordCount += text.split(/\s+/).length;
    } else if (block.type === "header") {
      wordCount += (block.data?.text || "").split(/\s+/).length;
    }
  });
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

// ============================================
// CLIENT COMPONENT: Animated Blog List
// ============================================
export default function BlogListClient({ allBlogs, featuredBlogs }: Props) {
  const heroBlog = featuredBlogs[0] || allBlogs[0];
  const heroIndex = heroBlog ? allBlogs.findIndex((b) => b.id === heroBlog.id) : -1;
  const remainingBlogs = allBlogs.filter((_, i) => i !== heroIndex);
  const popularBlogs = remainingBlogs.slice(0, 3);
  const moreBlogs = remainingBlogs.slice(3);

  return (
    <div className="min-h-screen bg-background">
      {/* ============================================
          HERO SECTION
      ============================================ */}
      <section className="relative bg-primary py-20 md:py-28 overflow-hidden">
        {/* Animated background circles */}
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary-foreground/5"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary-foreground/5"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Badge 
              variant="secondary" 
              className="mb-6 px-4 py-1.5 text-sm font-medium bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
              Our Blog
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-5 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Insights and Trends Blog
          </motion.h1>

          <motion.p
            className="text-primary-foreground/75 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            Stay updated with the latest insights, trends, and tips across various
            topics to keep ahead of the curve.
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 space-y-20">

        {/* ============================================
            FEATURED BLOG (Hero Card)
        ============================================ */}
        {heroBlog && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <Link href={`/blogs/${heroBlog.slug}`} className="block group">
              <Card className="overflow-hidden border-border/50 shadow-md hover:shadow-xl transition-all duration-500 group-hover:border-primary/20">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <motion.div 
                    className="relative aspect-[16/10] md:aspect-auto md:min-h-[400px] overflow-hidden bg-muted"
                    variants={slideInLeft}
                  >
                    <Image
                      src={heroBlog.bannerImage}
                      alt={heroBlog.bannerImageAlt || heroBlog.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>

                  {/* Content Side */}
                  <motion.div variants={slideInRight}>
                    <CardContent className="p-7 md:p-10 flex flex-col justify-center h-full">
                      <div className="flex items-center gap-3 mb-5">
                        <Badge 
                          variant="outline" 
                          className="text-xs font-semibold text-primary border-primary/25 bg-primary/5"
                        >
                          Featured
                        </Badge>
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          {getReadingTime(heroBlog.content)}
                        </span>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                        {heroBlog.title}
                      </h2>

                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                        {heroBlog.shortDescription}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/40">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {heroBlog.publishedAt 
                              ? new Date(heroBlog.publishedAt).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : new Date(heroBlog.createdAt).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })
                            }
                          </span>
                        </div>

                        <motion.span 
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </motion.span>
                      </div>
                    </CardContent>
                  </motion.div>
                </div>
              </Card>
            </Link>
          </motion.section>
        )}

        {/* ============================================
            POPULAR POSTS SECTION
        ============================================ */}
        {popularBlogs.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div className="flex items-center gap-3 mb-8" variants={fadeInUp}>
              <div className="h-8 w-1.5 bg-primary rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Popular Posts
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {popularBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  variants={scaleIn}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <Link 
                    href={`/blogs/${blog.slug}`}
                    className="group block h-full"
                  >
                    <Card className="overflow-hidden border-border/50 h-full hover:shadow-lg transition-all duration-300 group-hover:border-primary/15">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        <Image
                          src={blog.bannerImage}
                          alt={blog.bannerImageAlt || blog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>

                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <Badge 
                            variant="outline" 
                            className="text-[10px] font-semibold text-muted-foreground border-border/50 bg-muted/20"
                          >
                            Article
                          </Badge>
                          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {getReadingTime(blog.content)}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-foreground mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
                          {blog.title}
                        </h3>

                        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-4">
                          {blog.shortDescription}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3 border-t border-border/30">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {blog.publishedAt 
                              ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : new Date(blog.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                            }
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ============================================
            ALL POSTS SECTION
        ============================================ */}
        {moreBlogs.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div className="flex items-center gap-3 mb-8" variants={fadeInUp}>
              <div className="h-8 w-1.5 bg-primary rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                All Posts
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {moreBlogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  variants={scaleIn}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <Link 
                    href={`/blogs/${blog.slug}`}
                    className="group block h-full"
                  >
                    <Card className="overflow-hidden border-border/50 h-full hover:shadow-lg transition-all duration-300 group-hover:border-primary/15">
                      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        <Image
                          src={blog.bannerImage}
                          alt={blog.bannerImageAlt || blog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>

                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <Badge 
                            variant="outline" 
                            className="text-[10px] font-semibold text-muted-foreground border-border/50 bg-muted/20"
                          >
                            Article
                          </Badge>
                          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {getReadingTime(blog.content)}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-foreground mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
                          {blog.title}
                        </h3>

                        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-4">
                          {blog.shortDescription}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3 border-t border-border/30">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {blog.publishedAt 
                              ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : new Date(blog.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                            }
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Empty State */}
        {allBlogs.length === 0 && (
          <motion.div 
            className="text-center py-24"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/30 mb-5" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No blogs yet
            </h3>
            <p className="text-muted-foreground">
              Check back later for new content.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}