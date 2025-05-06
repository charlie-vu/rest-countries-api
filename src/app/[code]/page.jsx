'use client'
import { useEffectMounted } from "@/hooks/utils";
import api from "@/plugins/axios";
import helper from "@/utils/helper";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function itemPage() {
    const params = useParams();
    const code = params.code;

    const mode = useSelector(state => state.config.mode)

    const router = useRouter();

    const back = () => {
        router.back();
    }

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchItem = () => {
        setLoading(true)
        api.get(`/alpha/${code}`).then((res) => {
            console.log(res.data)
            setItem(res.data[0])
        }).catch((e) => {
            console.log(e)
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchItem()
    }, [])

    const [borderList, setBorderList] = useState([])
    const [loadingBorders, setLoadingBorders] = useState(false)
    const fetchBorderList = () => {
        setLoadingBorders(true)
        api.get(`/alpha?codes=${item.borders.join(',')}`).then((res) => {
            console.log('BORDERS:: ', res.data)
            setBorderList(res.data)
        }).catch((e) => {
            console.log(e)
        }).finally(() => {
            setLoadingBorders(false)
        })
    }
    useEffect(() => {
        if (item?.borders?.length) {
            fetchBorderList();
        }
    }, [item?.borders])

    return (
        <div className="container py-5 page-detail">
            <button className={`btn btn-${mode} border-0 min-w-120px d-block`} onClick={back}>
                <i className="bi bi-arrow-left me-2"></i>
                Back
            </button>

            {
                loading ?
                    <div className="spinner-grow mt-5"></div> :
                    !item ?
                        <p className="mt-5 fs-4 fw-800">No Item Found!</p> :
                        <div className="row gy-5 gx-md-5 mt-1">
                            <div className="col col-12 col-lg-5">
                                <div className="h-100 d-flex align-items-center">
                                    <img src={item.flags.svg} alt={item.flags.alt} className="w-100 shadow" />
                                </div>
                            </div>
                            <div className="col">
                                <div className="p-lg-5">
                                    <h2 className="fw-600 mb-4">{item.name.common}</h2>
                                    <div className="row row-cols-1 row-cols-lg-2 g-4">
                                        <div className="col">
                                            <div className="d-stack gap-2">
                                                <p><strong>Native Name:</strong> {item.altSpellings[1] || item.name.common}</p>
                                                <p><strong>Population:</strong> {helper.displayNumber(item.population)}</p>
                                                <p><strong>Region:</strong> {item.region}</p>
                                                <p><strong>Sub Region:</strong> {item.subregion}</p>
                                                <p><strong>Capital:</strong> {item.capital}</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="d-stack gap-2">
                                                <p><strong>Top Level Domain:</strong> {item.tld[0]}</p>
                                                <p><strong>Currencies:</strong> {_.sortBy(_.map(item.currencies, 'name')).join(', ')}</p>
                                                <p><strong>Languages:</strong> {_.sortBy(_.values(item.languages)).join(', ')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <strong className="me-2 mb-2 d-inline-block">Border Countries:</strong>
                                        {
                                            (!item.borders || !item.borders.length) && 'no information'
                                        }
                                        {
                                            loadingBorders ?
                                                <div className="spinner-grow spinner-grow-sm mx-4"></div> :
                                                <div className="d-inline-flex flex-wrap gap-2">
                                                    {
                                                        borderList.map((item, i) =>
                                                            <button key={`border-${item.name.common}-${i}`} className={`btn btn-${mode} py-1 min-w-120px`} onClick={() => { router.push(`/${item.cca3}`) }}>{item.name.common}</button>

                                                        )
                                                    }
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
            }

        </div>
    )
}