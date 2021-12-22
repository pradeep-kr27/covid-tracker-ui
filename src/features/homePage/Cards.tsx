import React from 'react';

import { RootState } from '../../app/store';

export function Cards(indianState: any) {
    const key: any = (Object.values(indianState))[0]
    const IState = Object.keys(key)[0]
    let allDistricts = key[IState].districts[key[IState].districts.length-1].TOTAL
    let total =  allDistricts[allDistricts.length-1].total
    return (
        <>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{IState}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Total</h6>
                    {total.confirmed && (<p className="card-text">Confirmed: {total.confirmed}</p>)}
                    {total.deceased && (<p className="card-text">Deceased: {total.deceased}</p>)}
                    {total.recovered && (<p className="card-text">Recovered: {total.recovered}</p>)}
                    {total.tested && (<p className="card-text">Tested: {total.tested}</p>)}
                    {total.vaccinated1 && (<p className="card-text">Vaccinated1: {total.vaccinated1}</p>)}
                    {total.vaccinated2 && (<p className="card-text">deceased: {total.vaccinated2}</p>)}
                </div>
            </div>
        </>
    )
}