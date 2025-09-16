export default function Skeleton(props) {

    const {
        className = "",
        minWidth = "100%",
        minHeight = "100%",
    } = props;

    return (
        <>
            <div className={`placeholder-glow ${className}`}>
                <span className="placeholder" style={{ minWidth, minHeight }}></span>
            </div>
        </>
    )
}