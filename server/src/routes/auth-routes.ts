import { Router, Request, Response } from 'express';
import { User } from '../models/user.js'; // Ensure this is the correct path
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Create a JWT token if the credentials are correct
    const payload = { username: user.username }; // You can add more user info to the payload if needed
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' }); // Adjust expiration time as needed

    // Send the token as the response
    return res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;


