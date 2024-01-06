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
  productCategory: string;
  product: string;
  price: number;
  targetAudience: string;
  stock: number;
  description: string;
  image: string;
}
