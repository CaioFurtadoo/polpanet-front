

export const PasswordRequirements = () => {
    return(
        <div className="flex flex-col gap-3 text-preto text-[14px]">
            A senha deve corresponder aos seguintes requisitos:
            <ul className="flex list-disc ml-5 flex-col gap-1 text-erro">
                <li>Possuir, ao menos, 8 caracteres;</li>
                <li>Possuir letras maiúsculas e minúsculas;</li>
                <li>Possuir algum caractere especial;</li>
                <li>Possuir números e letras.</li>
            </ul>
        </div>
    )
}