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
    api.get(`/${filter.region ? `region/${filter.region}` : 'all'}?fields=name,flags,population,region,capital,cca3`).then((res) => {
      // console.log(res.data)
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
    setShowList(list.filter(item => new RegExp(val.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(item.name.common)))
  }

  useEffect(() => {
    handleSearch(filter.name);
  }, [filter.name, list]);

  return (
    <div className="container py-5 page-home">
      <div className="row g-2 justify-content-between">
        <div className="col-12 col-lg-4">
          <div className="input-group">
            <div className="input-group-text px-4 element">
              <i className="bi bi-search"></i>
            </div>
            <input type="text" className="form-control py-3" value={filter.name} onChange={(e) => { setFilter((prev) => { return { ...prev, name: e.target.value } }) }} placeholder="Search for a country..." />
          </div>
        </div>
        <div className="col-12 col-lg-2">
          <select className="form-select px-4 py-3" value={filter.region} onChange={(e) => { setFilter((prev) => { return { ...prev, region: e.target.value } }); fetchList() }}>
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
          <div className="spinner-grow mt-5"></div>
          :
          !showList.length ?
            <p className="text-danger fw-800 mt-5 fs-4">No Item Found!</p>
            :
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 gy-5 gx-md-5 mt-1">
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
