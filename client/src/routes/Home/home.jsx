import React, { useState, useEffect, useRef } from 'react';
import backgroundImage from '../../assets/img.jpg';
import add  from '../../assets/add.png';
import review from '../../assets/review.png';
import browse from '../../assets/search.png';
import './Home.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero" style={{ backgroundImage: `url(${backgroundImage})`}} >
      <h1>Discover and Share Your Love for Books</h1>
      <p>Your personal book diary</p>
      <div>
         <Link to="/books">
             <button>Browse Books</button>
          </Link>
          <Link to="/createbook">
              <button>Add a Book</button>
          </Link>
      </div>
    </div>
  );
};

const featuredBooks = [
  { title: "'To Kill a Mockingbird' by Harper Lee", description: "Set in the racially charged atmosphere of 1930s Alabama, this classic novel follows young Scout Finch as she navigatesa world of prejudice and injustice. Her father, Atticus Finch, is an honorable lawyer defending a black man wrongly accused of raping a white woman. The story highlights themes ofempathy, morality, and social justice." },
  { title: "'1984' by George Orwell", description: "A dystopian masterpiece, '1984' explores a totalitarian world under the watchful eye of Big Brother. Protagonist Winston Smith works for the oppressive government, rewriting history to fit the Party's propaganda. The novel delves into themes of surveillance, censorship, and the loss of individuality, making it a powerful warning against the dangers of absolute power." },
  { title: "'1984' by George Orwell", description: "A dystopian masterpiece, '1984' explores a totalitarian world under the watchful eye of Big Brother. Protagonist Winston Smith works for the oppressive government, rewriting history to fit the Party's propaganda. The novel delves into themes of surveillance, censorship, and the loss of individuality, making it a powerful warning against the dangers of absolute power." },
  { title: "'To Kill a Mockingbird' by Harper Lee", description: "Set in the racially charged atmosphere of 1930s Alabama, this classic novel follows young Scout Finch as she navigatesa world of prejudice and injustice. Her father, Atticus Finch, is an honorable lawyer defending a black man wrongly accused of raping a white woman. The story highlights themes ofempathy, morality, and social justice." },
];

const FeaturedBooks = () => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="featured-books">
      <h2>Featured Books</h2>
      <div className="carousel-container">
        <button onClick={scrollLeft} className="carousel-btn left-btn">‹</button>
        <div className="books-carousel" ref={carouselRef}>
          {featuredBooks.map((book, index) => (
            <div key={index} className="book">
              <h3>{book.title}</h3>
              <p>{book.description}</p>
            </div>
          ))}
        </div>
        <button onClick={scrollRight} className="carousel-btn right-btn">›</button>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <div className="section-title">
        <h2>Function</h2>
      </div>
      <div className="steps">
        <div className="step">
          <div className="step-icon">
            <img src= {add} alt="Add Books Icon" />
          </div>
          <h3>Add Books</h3>
          <p>Add the books you have read along with a description, rating, and category.</p>
        </div>
        <div className="step">
          <div className="step-icon">
            <img src={review} alt="Review Books Icon" />
          </div>
          <h3>Review Books</h3>
          <p>Write reviews for the books and rate them.</p>
        </div>
        <div className="step">
          <div className="step-icon">
            <img src={browse} alt="Browse Recommendations Icon" />
          </div>
          <h3>Browse Recommendations</h3>
          <p>Explore books by category or discover random books.</p>
        </div>
      </div>
    </div>
  );
};


const Home = () => {
  const [recentReviews, setRecentReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchRecentReviews = async () => {
      try {
        const response = await fetch('https://crud-bookapplication-2.onrender.com/api/books');
        if (!response.ok) {
          throw new Error('Failed to fetch recent reviews');
        }
        const data = await response.json();
        setRecentReviews(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recent reviews:', error);
        setError('Error fetching recent reviews. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchRecentReviews();
  }, []);

  useEffect(() => {
    let scrollInterval;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (carouselRef.current) {
          carouselRef.current.scrollLeft += 1;
        }
      }, 20);
    };

    const stopScroll = () => {
      clearInterval(scrollInterval);
    };

    if (!isLoading && !error && recentReviews.length > 0) {
      startScroll();
      if (carouselRef.current) {
        carouselRef.current.addEventListener('mouseenter', stopScroll);
        carouselRef.current.addEventListener('mouseleave', startScroll);
      }
    }

    return () => {
      clearInterval(scrollInterval);
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('mouseenter', stopScroll);
        carouselRef.current.removeEventListener('mouseleave', startScroll);
      }
    };
  }, [isLoading, error, recentReviews.length]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i} className={i <= rating ? "star filled" : "star empty"}>&#9733;</span>);
    }
    return stars;
  };

  return (
    <div className="Home">
      <Hero />
      <FeaturedBooks />

      {/* Recent Reviews Section */}
      <section className="recent-reviews-section">
        <div className="section-title">
          <h2>Recent Book Reviews</h2>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="carousel-wrapper">
            <div className="carousel">
              {recentReviews.map((review, index) => (
                <div key={index} className="book-card">
                  <div className="image-container">
                    <img src={`https://crud-bookapplication-2.onrender.com/uploads/${review.thumbnail}`} alt={review.title} className="book-cover" />
                  </div>
                  <div className="book-details">
                    <h3>{review.title}</h3>
                    <div className="rating">
                      {renderStars(review.rating)}
                    </div>
                    <p className="review-text">{review.review}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <HowItWorks />
    </div>
  );
};

export default Home;

