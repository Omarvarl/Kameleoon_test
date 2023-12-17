import './Dashboard.css'
import { useRenderTestList } from '../hooks';
import Content from '../Components/Content';

export default function Dashboard() {

    const [testsList, renderList, setRenderList] = useRenderTestList();
  
    function search(value: string) {
      const foundedItems = testsList.filter(elm => {
          if (value) {
              return elm.name.toLowerCase().includes(value.toLowerCase());
          } else {
              return elm;
          }
        })
      setRenderList(foundedItems);
    }


  return (
    <div className='dashboard'>
      <div className="content">
        <header>
            <span>Dashboard</span>
        </header>
        <div className="tst">
          
        </div>
        <form>
            <input
              id='search'
              type="text"
              placeholder='What test are you looking for?'
              onChange={(e: React.ChangeEvent) => {
                const target = e.target as HTMLInputElement
                search(target.value)
              }}
            />
            <label htmlFor="search">{`${renderList.length} tests`}</label>
        </form>

        <Content foundedItems={renderList} search={search} />

      </div>
        
    </div>
  )
}
