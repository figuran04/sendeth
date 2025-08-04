// hooks/useFormData.js
import { useState } from "react";

export function useFormData(initialValues = { toAddress: "", amount: "" }) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => setFormData(initialValues);

  return {
    formData,
    setFormData,
    handleChange,
    resetForm,
  };
}
