import { BsChevronLeft } from "react-icons/bs";
import './Result.css'
import {NavLink, Outlet, useLocation} from "react-router-dom";
import { useTestName } from "../hooks";


export default function Result() {
    const params = useLocation().pathname.split('/');
    const header = (params[1] === 'result') ? 'Results' : 'Finalize';
    const testName = useTestName(params);

  return (
    <div className="result">
        <div className="result-content">
            <div className="header-name">
                <header>
                    <span>{header}</span>
                </header>
                <div className="test-name">
                    { testName }
                </div>
            </div>
            <div className="some-information"></div>
            <NavLink
                to="/"
                style={{textDecoration: 'none'}}
             >
                <button className="back-btn">
                    <BsChevronLeft />
                    <span>Back</span>
                </button>
            </NavLink>
        </div>
        <Outlet />
    </div>
  )
}
