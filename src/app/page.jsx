'use client'
import Item from "@/components/home/Item";
import Skeleton from "@/components/ui/skeleton";
import { useEffectMounted } from "@/hooks/utils";
import api from "@/plugins/axios";
import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const [showList, setShowList] = useState([])
  const [filter, setFilter] = useState({
    name: '',
    region: '',
  })
  const [hasFetched, setHasFetched] = useState(false)
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
    handleSearch(filter.name);
  }, [filter.name, list]);
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
          <select className="form-select px-4 py-3" value={filter.region} onChange={(e) => { setFilter((prev) => { return { ...prev, region: e.target.value } }) }}>
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
          // <div className="spinner-grow mt-5"></div>

          <div className="card border-0 shadow-sm mt-5 overflow-hidden" aria-hidden="true" style={{ maxWidth: 300 }}>
            <div className="ratio ratio-16x9 shadow-sm">
              <Skeleton />
            </div>
            <div className="p-4">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-12"></span>
              </h5>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
            </div>
          </div>

          :
          !showList.length && !!filter.name ?
            <p className="text-danger fw-800 mt-5 fs-4">No Item Found!</p>
            :
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 gy-5 gx-md-5 mt-1">
              <AnimatePresence>
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
                    >
                      <Item item={item} />
                    </motion.div>
                  )
                }
              </AnimatePresence>
            </div>
      }


    </div>
  );
}
