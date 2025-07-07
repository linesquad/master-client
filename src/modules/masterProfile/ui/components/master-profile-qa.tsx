import { useTranslation } from "react-i18next";
import { type QuestionAnswer, type TranslatedText } from "../../types";

interface MasterProfileQaProps {
  data: QuestionAnswer[];
}

export function MasterProfileQa({ data }: MasterProfileQaProps) {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-3">
        {t("profile.questionsAndAnswers")} ({data.length})
      </h4>
      <div className="space-y-4">
        {data.map((qa: QuestionAnswer, index: number) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"
          >
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Q:
              </span>
              <p className="mt-1 text-gray-900 dark:text-white">
                {typeof qa.question === "string"
                  ? qa.question
                  : qa.question?.[i18n.language as keyof TranslatedText] ||
                    qa.question?.en ||
                    ""}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                A:
              </span>
              <p className="mt-1 text-gray-700 dark:text-gray-300">
                {typeof qa.answer === "string"
                  ? qa.answer
                  : qa.answer?.[i18n.language as keyof TranslatedText] ||
                    qa.answer?.en ||
                    ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
