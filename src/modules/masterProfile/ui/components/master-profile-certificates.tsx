import { useTranslation } from "react-i18next";
import { Award } from "lucide-react";
import { type Certificate, type TranslatedText } from "../../types";

interface MasterProfileCertificatesProps {
  data: Certificate[];
}

export function MasterProfileCertificates({ data }: MasterProfileCertificatesProps) {
  const { t, i18n } = useTranslation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          {t("profile.certificates")}
        </h3>
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((cert: Certificate) => (
              <div
                key={cert.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <div className="flex items-start gap-4">
                  {cert.imageUrl && (
                    <img
                      src={cert.imageUrl}
                      alt={"image"}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="text-gray-900 dark:text-white font-medium mb-1">
                      {typeof cert.title === "string"
                        ? cert.title
                        : cert.title?.[i18n.language as keyof TranslatedText] ||
                          cert.title?.en ||
                          ""}
                    </h4>
                    {cert.issuedBy && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                        Issued by:{" "}
                        {typeof cert.issuedBy === "string"
                          ? cert.issuedBy
                          : cert.issuedBy?.[
                              i18n.language as keyof TranslatedText
                            ] ||
                            cert.issuedBy?.en ||
                            ""}
                      </p>
                    )}
                    <p className="text-gray-500 dark:text-gray-500 text-xs">
                      Uploaded: {formatDate(cert.uploadedAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-400 py-8">
            <Award className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
            <p>{t("profile.noCertificatesTitle")}</p>
          </div>
        )}
      </div>
    </>
  );
}
