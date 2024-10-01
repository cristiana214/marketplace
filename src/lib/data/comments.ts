type Comment = {
  commentId: number;
  userName: string;
  content: string;
  rating: number;
};

const comments: Comment[] = [
  {
    commentId: 1,
    userName: "John D.",
    content: "These tomatoes are amazing! So flavorful.",
    rating: 5,
  },
  {
    commentId: 2,
    userName: "Emily R.",
    content: "Great quality, will buy again.",
    rating: 4,
  },
];

export { comments };
