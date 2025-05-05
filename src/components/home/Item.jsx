import helper from "@/utils/helper";

export default function Item(props) {

    return (
        <div className="card overflow-hidden">
            <div className="ratio ratio-16x9 overflow-hidden element">

            </div>
            <div className="p-4 pb-5">
                <h5 className="fw-800">Germany</h5>
                <div className="mt-4 d-stack gap-2">
                    <p>Population: {helper.displayNumber(123456789)}</p>
                    <p>Population: {helper.displayNumber(123456789)}</p>
                    <p>Population: {helper.displayNumber(123456789)}</p>
                </div>
            </div>
        </div>
    )
}