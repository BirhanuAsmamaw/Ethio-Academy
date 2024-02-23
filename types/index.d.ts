export type CourseType= {
  cover?: string;
  videoUrl?: string;
  price: number;
  rating?: number;
  descriptions: string;
  requirements: string;
  whoShouldTake?: string;
  chapters: any[];
  creator: any;  
  customer?: any| null; 
  reviews: any[];
}
