export type DocumentTypes = "cpf" | "cnpj" | "unknown";

export const getDocumentType = (document: string | null): DocumentTypes => {
  if (!document) {
    return "unknown";
  }

  const requestedDocumentNumber = document.replace(/[^\d]/g, "");

  if (requestedDocumentNumber.length === 11) {
    return "cpf";
  }

  if (requestedDocumentNumber.length === 14) {
    return "cnpj";
  }

  return "unknown";
};
