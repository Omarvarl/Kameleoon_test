import { useState, useEffect } from 'react'
import axios from 'axios';
import { Test, Site, ITest, IStrategy, IChevronStyles } from './Types';

async function getTests(): Promise<Test[]> {
    const url = 'http://localhost:3100/tests';
    const response = await axios.get<Test[]>(url);
return response.data;
}

async function getTest(id: string): Promise<Test> {
    const url = `http://localhost:3100/tests/${id}`;
    const response = await axios.get<Test>(url);
    return response.data;
}

async function getSites(): Promise<Site[]> {
    const url = `http://localhost:3100/sites/`;
    const response = await axios.get<Site[]>(url);
    return response.data;
}

function getMarkColor(siteId: number):string {
    if (siteId === 1) {
      return '#E14165'
    } else if (siteId === 2) {
      return '#C2C2FF'
    }
  
    return '#8686FF'
  }

  export function setVisibility(foundedItems: ITest[]): string[] {
    const visibility = ['flex', 'none'];

    if (foundedItems.length) {
        visibility[0] = 'flex'
        visibility[1] = 'none'

    } else {
        visibility[0] = 'none'
        visibility[1] = 'flex'
    } 

    return visibility
  }

export function useTestsList(): ITest[] {
    const [testsList, setTestsList] = useState<ITest[]>([])

    useEffect(() => {
        (async () => {
          const tests = await getTests();
          const sites = await getSites();

          const result = tests.map(async test => {
            function getSite(id:number): string {
              const index = sites.findIndex((site => site.id === id))
              return sites[index].url
            }

            return {
              id: test.id,
              name: test.name,
              type: test.type,
              status: test.status,
              markColor: getMarkColor(test.siteId),
              site: getSite(test.siteId)
            }
          })

        setTestsList(await Promise.all(result))
        })();
      }, []);

      return testsList
}

export function useRenderTestList(): [ITest[], ITest[], (newLiat: ITest[]) => void] {
    const testsList = useTestsList()
    const [rendertestList, setRenderTestList] = useState<ITest[]>(testsList)
    useEffect(() => {
        setRenderTestList(testsList)
    }, [testsList])

    return [testsList, rendertestList, setRenderTestList]
}

export function reduceSiteName(site:string):string {
    const siteNameWithoutProtocol = site.split(`//`)[1]
    const clearSiteName = (siteNameWithoutProtocol.includes('www.'))
      ? siteNameWithoutProtocol.split('www.')[1]
      : siteNameWithoutProtocol
    return clearSiteName
}

export function useSortList(testsList: ITest[], sortStrategy: IStrategy) {
    const [list, setList] = useState<ITest[]>([])
    useEffect(() => {
        const initList: ITest[] = []

        for (let item in testsList) {
            initList.push({
                ...testsList[item],
                site: reduceSiteName(testsList[item].site)
            })
        }
        setList(handleSort(sortStrategy.type, sortStrategy.col, initList))
    }, [testsList, sortStrategy])
    return list
}

function handleSort(type: string, col: string, subject:ITest[]): ITest[] {
    const sign = {
        more: (type === 'ASC') ? 1 : -1,
        less: (type === 'ASC') ? -1 : 1,
    }

    subject.sort((a, b) => {
        if (a[col as keyof IChevronStyles] > b[col as keyof IChevronStyles]) {
            return sign.more
        } else if (a[col as keyof IChevronStyles] < b[col as keyof IChevronStyles]) {
            return sign.less
        } else {
            return (a.name > b.name) ? 1 : -1
        }
    })
    return subject
}

export function useTestName(params: string[]) {
    const [testName, setTestName] = useState<string>('')

    useEffect(() => {
        (async () => {
            const test = await getTest(params[2]);
            setTestName(await test.name);
      })();
    }, [setTestName, params]);
    return testName
}

export function changeCase(str: string): string {
    const letterArr = str.split('')
    const firstLetter = letterArr[0]
    letterArr.shift()
    return firstLetter + letterArr.join('').toLowerCase()
}

export function getStatusColor(status: string): string {
    if (status === 'Online') {
      return '#1BDA9D'
    } else if (status === 'Paused') {
      return '#FF8346'
    } else if (status === 'Stopped') {
      return '#FE4848'
    } else {
      return '#5C5C5C'
    }
}



