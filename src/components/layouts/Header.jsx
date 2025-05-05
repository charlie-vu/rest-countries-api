import { configActions } from "@/store/configSlice";
import { useDispatch, useSelector } from "react-redux"

export default function Header() {
    const mode = useSelector(state => state.config.mode);
    const dispatch = useDispatch();

    const toggleTheme = () => {
        dispatch(configActions.toggleMode())
    }
    return (
        <header>
            <div className="container">
                <div className="d-flex gap-3 flex-wrap justify-content-between align-items-center py-4">
                    <h4 className="fw-800">Where in the world?</h4>
                    <button className={`btn rounded-pill btn-outline-${mode === 'light' ? 'dark' : 'light'} no-transition fw-500`} onClick={toggleTheme}>
                        {mode === 'light' ?
                            <>
                                <i className="bi bi-moon me-2"></i> Dark Mode
                            </> :
                            <>
                                <i className="bi bi-brightness-high-fill me-2"></i> Light Mode
                            </>
                        }
                    </button>
                </div>
            </div>
        </header>
    )
}