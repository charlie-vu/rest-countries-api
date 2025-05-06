'use client'
import Item from "@/components/home/Item";
import { useEffectMounted } from "@/hooks/utils";
import api from "@/plugins/axios";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const [showList, setShowList] = useState([])
  const [filter, setFilter] = useState({
    name: '',
    region: '',
  })
  const regionOptions = [
    'africa',
    'america',
    'asia',
    'europe',
    'oceania',
  ]

  useEffectMounted(() => {
    fetchList();
  }, [])

  const fetchList = () => {
    setList([])
    setShowList([])

    setLoading(true)
    api.get(`/${filter.region ? `region/${filter.region}` : 'all'}?fields=name,flags,population,region,capital`).then((res) => {
      console.log(res.data)
      setList(res.data)
    }).catch((e) => {
      console.log(e)
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 300);
    })
  }

  // ====== Debounce Search
  // const handleSearch = useCallback(
  //   _.debounce((val) => {
  //     console.log(`SEARCHING::`, val);

  //     setShowList(list.filter(item => new RegExp(val).test(item.name.common)))
  //     console.log(showList)

  //   }, 500), []
  // )

  const handleSearch = (val) => {
    setShowList(list.filter(item => new RegExp(val, 'i').test(item.name.common)))
  }

  useEffect(() => {
    handleSearch(filter.name);
  }, [filter.name, list]);

  return (
    <div className="container py-5 page-home">
      <div className="row g-2 justify-content-between">
        <div className="col-12 col-lg-4">
          <input type="text" className="form-control" value={filter.name} onChange={(e) => { setFilter((prev) => { return { ...prev, name: e.target.value } }) }} placeholder="Search for a country..." />
        </div>
        <div className="col-12 col-lg-2">
          <select className="form-select" value={filter.region} onChange={(e) => { setFilter((prev) => { return { ...prev, region: e.target.value } }); fetchList() }}>
            <option value="">Filter by Region</option>
            {
              regionOptions.map((item, i) =>
                <option key={`${item}-${i}`} value={item}>{_.capitalize(item)}</option>
              )
            }
          </select>
        </div>
      </div>

      {
        loading ?
          <div className="spinner-grow m-5"></div>
          :
          !showList.length ?
            <p className="text-danger fw-800 mt-5">No Item Found!</p>
            :
            <div className="row row-cols-1 row-cols-lg-4 g-5 mt-1">
              {
                showList.map((item, i) =>
                  <div key={`country-${i}`} className="col">
                    <Item item={item} />
                  </div>
                )
              }
            </div>
      }


    </div>
  );
}
