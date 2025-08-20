interface InputProps {
  text: string;
  onClick: () => void;
  isLoading?: boolean;
  width?: string;
}

export const GeneralButton: React.FC<InputProps> = ({ text, onClick, isLoading, width }) => {
  return (
    <button
    type="button"
      onClick={onClick}
      disabled={isLoading}
      className={`hover:bg-[#5095ca] hover:scale-[102%] transition-all cursor-pointer rounded-lg  py-3 flex justify-center items-center font-bold text-white text-[16px]
        ${isLoading ? 'bg-azul/70 cursor-not-allowed' : 'bg-azul'} ${width ? width : "w-full"}`}
    >
      {isLoading ? (
        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        text
      )}
    </button>
  );
};
