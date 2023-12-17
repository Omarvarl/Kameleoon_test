import TestItem from './TestItem';
import { ITest } from '../Types'
import { LuChevronUp } from "react-icons/lu";
import { useState } from 'react';
import './Table.css'
import { IChevronStyles, IStrategy } from '../Types';
import { useSortList } from '../hooks';


function Table(testsList: ITest[]) {
    const [sortStrategy, setStrategy] = useState<IStrategy>({type: 'ASC', col:'type'});
    const list = useSortList(testsList, sortStrategy);

    const initChevronsStyles: IChevronStyles = {
        name: {display: 'none', transform: ''},
        type: {display: 'inline-block', transform: ''},
        status: {display: 'none', transform: ''},
        site: {display: 'none', transform: ''},
    };

    const [chevronsStyles, setChevronsStyles] = useState(initChevronsStyles);

    function colSort(col: string): void {
        const style = chevronsStyles[col as keyof IChevronStyles];

        if (style.transform === 'rotate(0)') {
            style.transform = 'rotate(180deg)';
            setStrategy({type: 'DESC', col: col});

        } else {
            style.transform = 'rotate(0)';
            setStrategy({type: 'ASC', col: col});
        }


        for (let i in chevronsStyles) {
            chevronsStyles[i as keyof IChevronStyles] = {
                display: 'none',
                transform: ''
            }
        }

        if (style.display === 'none') {
            style.display = 'inline-block';
        }

        setChevronsStyles({
            ...chevronsStyles,
            [col as keyof IChevronStyles]: style
        });
    }

  return (
    <table>
        <thead className="headers">
            <tr>
                <th></th>
                <th>
                    <span onClick={() => colSort('name')}>
                        NAME
                        <LuChevronUp style={chevronsStyles.name} />
                    </span>
                </th>

                <th>
                    <span onClick={() => colSort('type')}>
                        TYPE
                        <LuChevronUp style={chevronsStyles.type} />
                    </span>
                </th>

                <th>
                    <span onClick={() => colSort('status')}>
                        STATUS
                        <LuChevronUp style={chevronsStyles.status} />
                    </span>
                </th>

                <th>
                    <span onClick={() => colSort('site')}>
                        SITE
                        <LuChevronUp style={chevronsStyles.site} />
                    </span>

                </th>
                
                <th></th>
            </tr>
        </thead>
        <tbody>
            { list.length ? list.map(item => <TestItem {...item} key={item.id} />) : [] }
        </tbody>
    </table>
  )
}

export default Table