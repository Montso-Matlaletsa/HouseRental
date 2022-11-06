export interface User {
  Full_Name: string;
  Email: string;
  location: string;
  password: string;
}

export interface House {
  id: number;
  price: string;
  category: string;
  location: string;
  place: string;
  status: string;
  landlord: string;
  image: any | undefined;
  description: string;
  rating: number;
  requesters?: string[];
}
