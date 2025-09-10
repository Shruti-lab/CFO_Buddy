import React from 'react';
import { Link } from 'react-router-dom';

const LoginPrompt = () => {
  return (
    <div className="text-center pt-6 border-t border-border">
      <p className="text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default LoginPrompt;