import { CommentWithProfile, Post, PostWithProfile } from "./types";

export interface CommentsHeaderCompTypes {
  params: { userId: string; postId: string };
  post: PostWithProfile;
}

export interface CommentsCompTypes {
  params: { userId: string; postId: string };
}

export interface PostPageTypes {
  params: { userId: string; postId: string };
}

export interface ProfilePageTypes {
  params: { id: string };
}

export interface SingleCommentCompTypes {
  params: { userId: string; postId: string };
  comment: CommentWithProfile;
}

export interface PostUserCompTypes {
  post: Post;
}

export interface PostMainCompTypes {
  post: PostWithProfile;
}

export interface PostMainLikesCompTypes {
  post: PostWithProfile;
}

export interface TextInputCompTypes {
  string: string;
  inputType: string;
  placeholder: string;
  onUpdate: (newValue: string) => void;
  error: string;
}
