import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

// Extend the Request type to include user
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Expecting "Bearer TOKEN"

  if (!token) {
    res.status(401).json({ message: 'Access Denied: No Token Provided' });
    return; // Return here to prevent further execution
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Invalid or Expired Token' });
      return; // Return here to prevent further execution
    }

    req.user = decoded as JwtPayload; // Attach user data to the request object
    next(); // Proceed to the next middleware
  });
};





