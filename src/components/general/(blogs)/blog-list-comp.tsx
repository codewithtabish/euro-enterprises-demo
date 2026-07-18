import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllBlogsAction, getFeaturedBlogsAction } from "@/app/actions/blogs-all-actions";

// ============================================
// SERVER COMPONENT: Blog List
// ============================================
export default async function BlogListComponent() {
  // Fetch data on server
  const [allBlogsResult, featuredBlogsResult] = await Promise.all([
    getAllBlogsAction(),
    getFeaturedBlogsAction(),
  ]);

  const allBlogs = allBlogsResult.success ? allBlogsResult.data : [];
  const featuredBlogs = featuredBlogsResult.success ? featuredBlogsResult.data : [];

  // Get the first featured blog for hero section, rest for popular
  const heroBlog = featuredBlogs[0] || allBlogs[0];
  const popularBlogs = allBlogs.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* ============================================
          HERO SECTION
      ============================================ */}
      <section className="relative bg-primary py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge 
            variant="secondary" 
            className="mb-6 px-4 py-1.5 text-sm font-medium bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20"
          >
            <BookOpen className="w-3.5 h-3.5 mr-1.5" />
            Our Blog
          </Badge>

          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 tracking-tight">
            Insights and Trends Blog
          </h1>

          <p className="text-primary-foreground/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest insights, trends, and tips across various
            topics to keep ahead of the curve.
          </p>
        </div>

        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">

        {/* ============================================
            FEATURED BLOG (Hero Card)
        ============================================ */}
        {heroBlog && (
          <section>
            <Link href={`/blogs/${heroBlog.slug}`} className="block group">
              <Card className="overflow-hidden border-border/60 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-primary/30">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[360px] overflow-hidden bg-muted">
                    <Image
                      src={heroBlog.bannerImage}
                      alt={heroBlog.bannerImageAlt || heroBlog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
                  </div>

                  {/* Content Side */}
                  <CardContent className="p-6 md:p-10 flex flex-col justify-center">
                    <Badge 
                      variant="outline" 
                      className="w-fit mb-4 text-xs font-semibold text-primary border-primary/30 bg-primary/5"
                    >
                      Technology
                    </Badge>

                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                      {heroBlog.title}
                    </h2>

                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                      Discover how AI is transforming industries and learn about the latest
                      advancements in artificial intelligence. Discover how AI is transforming
                      industries and learn about the latest advancements in artificial intelligence.
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {heroBlog.publishedAt 
                            ? new Date(heroBlog.publishedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : new Date(heroBlog.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                          }
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </section>
        )}

        {/* ============================================
            POPULAR POSTS SECTION
        ============================================ */}
        {popularBlogs.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Popular Posts
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularBlogs.map((blog) => (
                <Link 
                  key={blog.id} 
                  href={`/blogs/${blog.slug}`}
                  className="group block"
                >
                  <Card className="overflow-hidden border-border/60 h-full hover:shadow-lg transition-all duration-300 group-hover:border-primary/20 hover:-translate-y-1">
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
                      <Badge 
                        variant="outline" 
                        className="mb-3 text-[10px] font-semibold text-muted-foreground border-border/60 bg-muted/30"
                      >
                        Business
                      </Badge>

                      <h3 className="text-base font-bold text-foreground mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>

                      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                        Learn proven strategies to grow your business and stay
                        competitive in the ever-evolving market landscape.
                      </p>

                      <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
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
              ))}
            </div>
          </section>
        )}

        {/* ============================================
            ALL BLOGS SECTION
        ============================================ */}
        {allBlogs.length > 3 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                All Posts
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allBlogs.slice(3).map((blog:any) => (
                <Link 
                  key={blog.id} 
                  href={`/blogs/${blog.slug}`}
                  className="group block"
                >
                  <Card className="overflow-hidden border-border/60 h-full hover:shadow-lg transition-all duration-300 group-hover:border-primary/20 hover:-translate-y-1">
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
                      <Badge 
                        variant="outline" 
                        className="mb-3 text-[10px] font-semibold text-muted-foreground border-border/60 bg-muted/30"
                      >
                        Article
                      </Badge>

                      <h3 className="text-base font-bold text-foreground mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>

                      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
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
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {allBlogs.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/40 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No blogs yet
            </h3>
            <p className="text-muted-foreground">
              Check back later for new content.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}