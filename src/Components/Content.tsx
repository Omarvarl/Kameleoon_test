import NotFoundBox from "./NotFoundBox"
import Table from "./Table"
import { ITest } from "../Types"


export default function Content({foundedItems, search}: {foundedItems: ITest[], search: (value:string) => void}) {
    const content = (foundedItems.length)
        ? <Table {...foundedItems} />
        : <NotFoundBox search={search} />;
  return (
    <div className='table-box'>
        { content }
    </div>

  )
}
