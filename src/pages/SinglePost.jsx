import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { PortableText } from '@portabletext/react';
import { client, urlFor } from '../lib/sanityClient';

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0] {
          title,
          mainImage,
          publishedAt,
          author,
          category,
          body,
          excerpt
        }`;
        const data = await client.fetch(query, { slug });
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Custom PortableText components to style Sanity rich text with Tailwind
  const portableTextComponents = {
    types: {
      image: ({ value }) => (
        <img
          src={urlFor(value).auto('format').url()}
          alt={value.alt || ' '}
          className="w-full h-auto rounded-xl my-8 shadow-md"
          loading="lazy"
        />
      ),
    },
    marks: {
      link: ({ children, value }) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
        return (
          <a href={value.href} rel={rel} className="text-secondary hover:underline font-medium">
            {children}
          </a>
        );
      },
    },
    block: {
      h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-bold text-primary mt-12 mb-6 font-heading">{children}</h1>,
      h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold text-primary mt-10 mb-5 font-heading">{children}</h2>,
      h3: ({ children }) => <h3 className="text-xl md:text-2xl font-bold text-primary mt-8 mb-4 font-heading">{children}</h3>,
      normal: ({ children }) => <p className="text-gray-700 leading-relaxed mb-6 font-body">{children}</p>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-secondary pl-6 py-2 italic text-gray-600 bg-gray-50 my-8 rounded-r-lg">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2 marker:text-secondary">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2 marker:text-secondary">{children}</ol>,
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl font-bold text-primary mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">The insight you're looking for doesn't exist or has been removed.</p>
        <Link to="/insights" className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
          Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | JOEADAK Insights</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article className="pt-32 pb-20 bg-white">
        {/* Post Header */}
        <header className="container-custom max-w-4xl mx-auto mb-12 text-center">
          {post.category && (
            <span className="inline-block bg-secondary/10 text-secondary font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-6">
              {post.category}
            </span>
          )}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight"
          >
            {post.title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-6 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                <i className="fas fa-user"></i>
              </div>
              <span className="font-semibold text-primary">{post.author}</span>
            </div>
            <span>•</span>
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </motion.div>
        </header>

        {/* Featured Image */}
        {post.mainImage && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="container-custom max-w-5xl mx-auto mb-16"
          >
            <img 
              src={urlFor(post.mainImage).width(1200).height(600).url()} 
              alt={post.mainImage.alt || post.title}
              className="w-full rounded-2xl shadow-xl object-cover h-[400px] md:h-[500px]"
            />
          </motion.div>
        )}

        {/* Body Content */}
        <div className="container-custom max-w-3xl mx-auto prose prose-lg prose-primary">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>

        {/* Footer actions */}
        <div className="container-custom max-w-3xl mx-auto mt-16 pt-8 border-t border-gray-200 text-center">
          <Link to="/insights" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors">
            <i className="fas fa-arrow-left"></i> Back to all insights
          </Link>
        </div>
      </article>
    </>
  );
};

export default SinglePost;
