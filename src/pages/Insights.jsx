import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { client, urlFor } from '../lib/sanityClient';

const Insights = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          mainImage,
          publishedAt,
          category,
          author
        }`;
        const data = await client.fetch(query);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching insights:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Insights & News | JOEADAK TRADING ENTERPRISE</title>
        <meta name="description" content="Stay updated with the latest business strategies, administrative tips, and company news from JOEADAK." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gray-50">
        <div className="container-custom relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6"
          >
            Insights & <span className="text-secondary">News</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Discover our latest thoughts, strategies, and success stories in business administration and planning.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <i className="fas fa-newspaper text-4xl mb-4 text-gray-300"></i>
              <p>No insights published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article 
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:-translate-y-2 transition-transform duration-300"
                >
                  <Link to={`/insights/${post.slug.current}`} className="block relative h-56 overflow-hidden">
                    {post.mainImage ? (
                      <img 
                        src={urlFor(post.mainImage).width(600).height(400).url()} 
                        alt={post.mainImage.alt || post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <i className="fas fa-image text-3xl text-gray-400"></i>
                      </div>
                    )}
                    {post.category && (
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {post.category}
                      </span>
                    )}
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span><i className="far fa-calendar-alt mr-1"></i> {new Date(post.publishedAt).toLocaleDateString()}</span>
                      <span><i className="far fa-user mr-1"></i> {post.author}</span>
                    </div>
                    <h2 className="text-xl font-bold text-primary mb-3 hover:text-secondary transition-colors">
                      <Link to={`/insights/${post.slug.current}`}>{post.title}</Link>
                    </h2>
                    <p className="text-gray-600 mb-6 flex-grow text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link 
                      to={`/insights/${post.slug.current}`}
                      className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all mt-auto text-sm"
                    >
                      Read More <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Insights;
