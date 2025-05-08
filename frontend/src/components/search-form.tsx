import type React from "react";

interface SearchGifFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  input: string;
  onChangeInput: (value: string) => void;
  placeholder: string;
  buttonText: string;
}

const SearchGifForm: React.FC<SearchGifFormProps> = ({
  handleSubmit,
  input,
  onChangeInput,
  placeholder,
  buttonText
}) => (
  <form onSubmit={handleSubmit} className="search-form">
    <input
      type="text"
      value={input}
      onChange={(e) => onChangeInput(e.target.value)}
      placeholder={placeholder}
    />
    <button type="submit">{buttonText}</button>
  </form>
);

export default SearchGifForm;
