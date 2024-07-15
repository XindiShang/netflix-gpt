import { api } from '@/lib/api';
import { newsApiKey } from '@/lib/config';
import {
  type GetArticleResponse,
  type GetArticlesProps,
} from '@/types/article';

export const getArticles = async (
  params: GetArticlesProps
): Promise<GetArticleResponse> => {
  const { search } = params;
  const { data } = await api.get<GetArticleResponse>(
    `https://newsdata.io/api/1/latest?q=${search ?? ''}&apiKey=${newsApiKey}`
  );
  return data;
};
