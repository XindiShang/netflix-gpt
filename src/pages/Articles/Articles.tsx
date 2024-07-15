import { useMemo, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { formatDate } from '@/lib/helper';
import { useArticlesQuery } from '@/services/queries/article.query';
import { type Article } from '@/types/article';

export type Filter = { search?: string };

export interface ArticleListProps {
  articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  if (!articles?.length) {
    return <div>No articles found</div>;
  }

  return (
    <>
      {articles.map((article) => (
        <div
          key={article.link}
          className="w-full px-1 my-1 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
        >
          <article className="overflow-hidden rounded-lg shadow-lg">
            <a href={article.link} target="_blank" rel="noreferrer">
              {article.image_url ? (
                <img
                  alt="Placeholder"
                  className="block w-full h-auto"
                  src={article.image_url}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[215px] w-[370px] bg-gray-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
            </a>

            <header className="flex items-center justify-between p-2 leading-tight md:p-4">
              <h1 className="text-lg">
                <a
                  className="text-black no-underline hover:underline"
                  href={article.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {article.title}
                </a>
              </h1>
              <p className="text-sm text-grey-darker">
                {formatDate(article.pubDate)}
              </p>
            </header>

            <footer className="flex items-center justify-between p-2 leading-none md:p-4">
              <a
                className="flex items-center text-black no-underline hover:underline"
                href="#"
              >
                <img
                  alt="Placeholder"
                  className="block rounded-full"
                  src="https://picsum.photos/32/32/?random"
                />
                <p className="ml-2 text-sm">Author Name</p>
              </a>
              <a
                className="no-underline text-grey-darker hover:text-red-dark"
                href="#"
              >
                <span className="hidden">Like</span>
                <i className="fa fa-heart"></i>
              </a>
            </footer>
          </article>
        </div>
      ))}
    </>
  );
};

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const filter = useMemo<Filter>(
    () => ({
      search: debouncedSearchTerm?.length ? debouncedSearchTerm : undefined,
    }),
    [debouncedSearchTerm]
  );
  const { isLoading, data } = useArticlesQuery(filter);

  return (
    <div className="container px-4 mx-auto my-12 md:px-12">
      <div className="flex justify-center w-full">
        <div className="mb-3 xl:w-[40%]">
          <div className="relative flex flex-wrap items-stretch w-full mb-4 input-group">
            <input
              type="search"
              className="relative flex-auto block w-auto min-w-0 px-3 py-2 m-0 mr-2 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Enter search term"
              aria-label="Search"
              aria-describedby="button-addon3"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ArticleList articles={data?.results ?? []} />
        )}
      </div>
    </div>
  );
};

export default Articles;
