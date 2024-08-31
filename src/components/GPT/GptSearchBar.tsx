import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@/components/Button';
import Input from '@/components/Input';
import aiClient from '@/lib/groqAI';
import { createGptSchema } from '@/lib/validation';
import { searchMovies } from '@/services/api/movie.service';
import useGptStore from '@/store/useGptStore';
import type { GptBody } from '@/types/gpt';
import { SENSITIVE_CONTENT_KEYWORDS } from '@/utils/constants';

const GptSearchBar = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const {
    isGptEnabled,
    isSearching,
    setTitlesAndResults,
    setSearchError,
    setSearching,
  } = useGptStore();

  const gptSchema = createGptSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GptBody>({ resolver: yupResolver(gptSchema) });

  const onSubmit = async (data: GptBody) => {
    setSearching(true);
    setSearchError(false);
    try {
      const gptQuery = generateGptQuery(data.search, currentLanguage);
      const chatCompletion = await aiClient.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'llama3-8b-8192',
      });

      const content = chatCompletion.choices?.[0].message.content;

      if (
        !content ||
        SENSITIVE_CONTENT_KEYWORDS.some((keyword) => content.includes(keyword))
      ) {
        setSearchError(true);
        toast.error(t('gpt.error'));
        return;
      }

      const movieTitles = content.split(',').map((movie) => movie.trim());
      const searchResults = await fetchMovieData(movieTitles, currentLanguage);

      setTitlesAndResults({ titles: movieTitles, results: searchResults });
    } catch (error) {
      console.error('Error during GPT search:', error);
    } finally {
      setSearching(false);
      !isGptEnabled && reset();
    }
  };

  return (
    <div className="pt-[15%] md:pt-[10%] flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid w-full grid-cols-12 p-2 m-4 bg-black rounded-lg md:w-1/2"
      >
        <Input
          errors={errors}
          placeholder={t('gpt.searchPlaceholder')}
          register={register}
          name="search"
          wrapperClassName="col-span-10 px-4 py-2"
        />
        <Button
          text={t('gpt.searchAction')}
          type="submit"
          className="col-span-2 px-4 py-2 m-2 text-white rounded-lg btn btn-primary"
          isLoading={isSearching}
          disabled={isSearching}
        />
      </form>
    </div>
  );
};

const generateGptQuery = (searchTerm: string, responseLanguage: string) => `
  Act as a movie recommendation system. Suggest movies similar to "${searchTerm}". 
  Provide only the names of 5 movies, separated by ",", using language "${responseLanguage}", without any additional text or formatting. 
  Example format: Shiddat, 12th Fail, Mr. Robot, The Shawshank Redemption, Spirited Away.
  Remember, do not include any introduction or explanations, just the movie titles separated by commas.
  If you have any concerns or questions, just respond with "I cannot provide that information".
`;

const fetchMovieData = async (
  movieTitles: string[],
  currentLanguage: string
) => {
  return await Promise.all(
    movieTitles.map(async (movie) => {
      try {
        const movieData = await searchMovies({
          query: movie,
          language: currentLanguage,
        });
        return movieData.results;
      } catch (error) {
        console.error(`Failed to fetch data for movie: ${movie}`, error);
        return [];
      }
    })
  );
};

export default GptSearchBar;
