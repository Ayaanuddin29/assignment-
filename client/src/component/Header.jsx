import { Link } from "react-router-dom"
import "../App.css"
export const Header=()=>{
    return(
        <div class='head'>
            <div>
              <h1>Clinix Sphere</h1>
            </div>
            <div>
            <nav>
        <ul>
          <li>
            <Link to="/">Health Dashboard</Link>
          </li>
          <li>
            <Link to="/add-record">Add Health Record</Link>
          </li>
        </ul>
      </nav>
            </div>
      </div>
    )
}