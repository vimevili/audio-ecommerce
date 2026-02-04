export default interface IReview {
  id: string;
  userId: string;
  userName: string;
  userPicture: string | null;
  rate: number;
  content: string | null;
}
