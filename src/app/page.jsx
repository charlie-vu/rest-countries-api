'use client'
import Item from "@/components/home/Item";
import Skeleton from "@/components/ui/skeleton";
import api from "@/plugins/axios";
import { AnimatePresence, motion } from "framer-motion";
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

  const [error, setError] = useState('')

  const regionOptions = [
    'africa',
    'america',
    'asia',
    'europe',
    'oceania',
  ]

  useEffect(() => {
    fetchList();
  }, [])

  const fetchList = () => {
    setLoading(true)
    setList([])
    setShowList([])
    api.get(`/${filter.region ? `region/${filter.region}` : 'all'}?fields=name,flags,population,region,capital,cca3`).then((res) => {
      // console.log(res.data)
      setList(res.data)
    }).catch((e) => {
      console.log(e)
      setError('Failed to load countries. Please try again.')
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 500);
    })
  }

  // ====== Debounce Search
  const handleSearch = useCallback(
    _.debounce((val) => {
      setShowList(list.filter(item =>
        new RegExp(val.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(item.name.common)
      ));
    }, 500),
    [list]
  );

  // const handleSearch = (val) => {
  //   setShowList(list.filter(item => new RegExp(val.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(item.name.common)))
  // }

  useEffect(() => {
    handleSearch(filter.name)
  }, [filter.name, list])

  useEffect(() => {
    return () => handleSearch.cancel();
  }, [handleSearch])

  useEffect(() => {
    fetchList();
  }, [filter.region])

  // Variants for item animation
  const itemVariants = {
    hidden: { opacity: 0, y: -18 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -18 },

  };

  return (
    <div className="container py-5 page-home" aria-busy={loading}>
      <section aria-labelledby="country-filters" className="row g-2 justify-content-between">
        <div className="col-12 col-lg-4">
          <div className="input-group">
            <div className="input-group-text px-4 element">
              <i className="bi bi-search"></i>
            </div>
            <label htmlFor="search" className="visually-hidden">Search for a country</label>
            <input id="search" type="text" className="form-control py-3" value={filter.name} onChange={(e) => { setFilter((prev) => { return { ...prev, name: e.target.value } }) }} placeholder="Search for a country..." />
          </div>
        </div>
        <div className="col-12 col-lg-2">
          <label htmlFor="region" className="visually-hidden">Filter countries by region</label>
          <select id="region" className="form-select px-4 py-3" value={filter.region} onChange={(e) => { setFilter((prev) => { return { ...prev, region: e.target.value } }) }}>
            <option value="">Filter by Region</option>
            {
              regionOptions.map((item, i) =>
                <option key={`${item}-${i}`} value={item}>{_.capitalize(item)}</option>
              )
            }
          </select>
        </div>
      </section>

      <section aria-labelledby="countries" className="mt-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 gy-5 gx-md-5">

          {
            loading ?

              [...Array(8)].map((_, i) =>
                <div key={`placeholder-${i}`} className="col">
                  <div className="card overflow-hidden h-100 border-0 shadow-sm" aria-hidden="true">
                    <div className="ratio ratio-16x9 shadow-sm">
                      <Skeleton />
                    </div>
                    <div className="p-4">
                      <h5 className="placeholder-glow">
                        <span className="placeholder col-12"></span>
                      </h5>
                      <p className="placeholder-glow d-flex gap-2 flex-wrap mt-3">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                      </p>
                    </div>
                  </div>
                </div>
              )

              :

              <AnimatePresence mode="wait">
                {
                  showList.map((item, i) =>
                    <motion.div
                      key={item.cca3}
                      className="col"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3, delay: i % 8 * 0.05 }}
                      layout
                    >
                      <Item item={item} />
                    </motion.div>
                  )
                }
              </AnimatePresence>
          }


        </div>

        {
          error &&
          <p role="alert" className="text-danger fw-800 mt-5 fs-4">{error}</p>
        }

        {
          (!loading && !error && showList.length === 0 && filter.name) &&
          <p role="status" className="text-danger fw-800 mt-5 fs-4">No Item Found!</p>
        }

      </section>




    </div>
  );
}
