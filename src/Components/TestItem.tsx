import { ITest } from "../Types"
import { NavLink } from "react-router-dom";
import { changeCase, getStatusColor } from "../hooks";


export default function TestItem({id, name, type, status, site, markColor}: ITest) {

  const clearStatus = changeCase(status);
  const clearType = (type.length === 3) ? type : changeCase(type).replace('_', '-');
  const statusColor = getStatusColor(clearStatus);

  const buttonText = (clearStatus === 'Draft') ? 'Finalize' : 'Result';
  const buttonColor = (clearStatus === 'Draft') ? '#7D7D7D' : '#2EE5AC';

  return (

      <tr>
          <td className='td-mark' style={{backgroundColor: markColor}}></td>
          <td className="td-name">{name}</td>
          <td className="td-type">{clearType}</td>
          <td className="td-status" style={{color: statusColor}}>{clearStatus}</td>
          <td className="td-site">{site}</td>
          <td className="td-button">
          <NavLink to={`/${buttonText.toLocaleLowerCase()}/${String(id)}`} className={'tr-wrapper'}>
            <button
              className="td-btn"
              style={{backgroundColor: buttonColor}}
            >
              { buttonText }
            </button>
          </NavLink>
          </td>
      </tr>
  )
}
