export interface User {
  emailAddress: string;
  isOnline: boolean;
  newsletter: boolean;
  profilePhoto: string;
  role: string;
  username: string;
}

export interface Article {
  productName: string;
  category: string;
  price: number;
  targetAudience: string;
  stock: number;
  description: string;
  image: string;
}
