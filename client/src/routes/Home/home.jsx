import React from 'react';
import backgroundImage from '../../assets/img.jpg';
import './Home.css';

const Hero = () => {
  return (
    <div className="hero" style={{ backgroundImage: `url(${backgroundImage})`}} >
      <h1>Discover and Share Your Love for Books</h1>
      <p>Your personal book diary</p>
      <div>
        <button>Browse Books</button>
        <button>Add a Book</button>
      </div>
    </div>
  );
};

const featuredBooks = [
  { title: "'To Kill a Mockingbird' by Harper Lee", description: "Set in the racially charged atmosphere of 1930s Alabama, this classic novel follows young Scout Finch as she navigatesa world of prejudice and injustice. Her father, Atticus Finch, is an honorable lawyer defending a black man wrongly accused of raping a white woman. The story highlights themes ofempathy, morality, and social justice." },
  { title: "'1984' by George Orwell", description: "A dystopian masterpiece, '1984' explores a totalitarian world under the watchful eye of Big Brother. Protagonist Winston Smith works for the oppressive government, rewriting history to fit the Party's propaganda. The novel delves into themes of surveillance, censorship, and the loss of individuality, making it a powerful warning against the dangers of absolute power." },
  { title: "'1984' by George Orwell", description: "A dystopian masterpiece, '1984' explores a totalitarian world under the watchful eye of Big Brother. Protagonist Winston Smith works for the oppressive government, rewriting history to fit the Party's propaganda. The novel delves into themes of surveillance, censorship, and the loss of individuality, making it a powerful warning against the dangers of absolute power." },
];

const FeaturedBooks = () => {
  return (
    <div className="featured-books">
      <h2>Featured Books</h2>
      <div className="books-carousel">
        {featuredBooks.map((book, index) => (
          <div key={index} className="book">
            <h3>{book.title}</h3>
            <p>{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const recentReviews = [
  { title: "Book One", rating: 5, review: "Amazing book!" },
  { title: "Book Two", rating: 4, review: "Really enjoyed it." },
  // Add more reviews as needed
];

const RecentReviews = () => {
  return (
    <div className="recent-reviews">
      <h2>Recent Reviews</h2>
      <ul>
        {recentReviews.map((review, index) => (
          <li key={index}>
            <h3>{review.title}</h3>
            <p>Rating: {review.rating}</p>
            <p>{review.review}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const testimonials = [
  { user: "User One", testimonial: "This app helped me keep track of my reading!" },
  { user: "User Two", testimonial: "I love discovering new books here." },
  // Add more testimonials as needed
];

const UserTestimonials = () => {
  return (
    <div className="user-testimonials">
      <h2>User Testimonials</h2>
      <ul>
        {testimonials.map((testimonial, index) => (
          <li key={index}>
            <p>"{testimonial.testimonial}"</p>
            <p>- {testimonial.user}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        <div className="step">
          <h3>1. Add Books</h3>
          <p>Add the books you have read along with a description, rating, and category.</p>
        </div>
        <div className="step">
          <h3>2. Review Books</h3>
          <p>Write reviews for the books and rate them.</p>
        </div>
        <div className="step">
          <h3>3. Browse Recommendations</h3>
          <p>Explore books by category or discover random books.</p>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="Home">
      <Hero />
      <FeaturedBooks />
      <RecentReviews />
      <UserTestimonials />
      <HowItWorks />
    </div>
  );
};

export default Home;

