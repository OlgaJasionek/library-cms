import { useEffect, useState } from "react";

export const useDocumentTitle = () => {
  const [documentTitle, setDoucmentTitle] = useState<string>("");
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return [setDoucmentTitle];
};
