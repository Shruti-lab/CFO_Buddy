import React from 'react';
import Icon from '../../../components/AppIcon';

const TestimonialCard = ({ testimonial, author, business, rating }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-border card-shadow">
      <div className="flex items-center space-x-1 mb-3">
        {[...Array(5)]?.map((_, i) => (
          <Icon
            key={i}
            name="Star"
            size={16}
            className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
      </div>
      <blockquote className="text-sm text-muted-foreground mb-4 italic">
        "{testimonial}"
      </blockquote>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-primary-foreground">
            {author?.split(' ')?.map(n => n?.[0])?.join('')}
          </span>
        </div>
        <div>
          <div className="text-sm font-medium text-foreground">{author}</div>
          <div className="text-xs text-muted-foreground">{business}</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;