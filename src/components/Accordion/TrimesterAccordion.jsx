export const Trimesteraccordion = (props) => {
    const {children,judul} = props
    return (
        <>
        <div className="mt-2 collapse bg-base-200">
            <input type="radio" name="my-accordion-1" />
            <div className="text-xl font-medium collapse-title">{judul}</div>
            <div className="overflow-auto collapse-content">
                {children}
            </div>
        </div>
        </>
    )
}