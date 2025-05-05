'use client'
import { useParams, useRouter } from "next/navigation"
import { useSelector } from "react-redux";

export default function itemPage() {
    const params = useParams();
    const id = params.id;

    const mode = useSelector(state => state.config.mode)

    const router = useRouter();

    const back = () => {
        router.back();
    }
    return (
        <div className="container py-5 page-detail">
            <button className={`btn element`} onClick={back}>
                <i className="bi bi-arrow-left me-2"></i>
                Back
            </button>

            <div className="mt-5">
                Item {id}

            </div>
        </div>
    )
}