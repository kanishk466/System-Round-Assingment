import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const admin = {
  email: 'admin@codesfortomorrow.com',
  password: await bcrypt.hash('Admin123!@#', 10),
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (email !== admin.email) return res.status(400).json({ message: 'Invalid Credentials' });

  const validPass = await bcrypt.compare(password, admin.password);
  if (!validPass) return res.status(400).json({ message: 'Invalid Credentials' });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
