import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../src/app/hooks';
import './App.css';
import { mapBasicStats, setBasicStats, setFilteredBasicStats } from './features/homePage/statsSlice';
import { RootState } from './app/store';
import { sortConfirmedCountInAsc, sortConfirmedCountInDesc, sortInAscendingOrder, sortInDescendingOrder } from './app/helper';
import { Cards } from './features/homePage/Cards';

function App() {
  const dispatch = useAppDispatch()
  const [sortBy, setSortBy] = useState(['', '']);
  let filteredBasicStats: any = useAppSelector((state: RootState) => state.stats.filteredBasicStats)
  filteredBasicStats = [...filteredBasicStats]
  useEffect(() => {
    dispatch(mapBasicStats())
  }, [dispatch])

  useEffect(() => {
    console.log('start')
    if (filteredBasicStats && sortBy && sortBy.includes('state') && sortBy.includes('ascending')) {
      filteredBasicStats.sort(sortInAscendingOrder)
    } else if (filteredBasicStats && sortBy && sortBy.includes('state') && sortBy.includes('descending')) {
      filteredBasicStats.sort(sortInDescendingOrder)
    } 
    dispatch(setFilteredBasicStats(filteredBasicStats))
  }, [dispatch, sortBy])
  return (
    <>
      <div className="wrapper">
        <nav>
          <input type="checkbox" id="show-search" />
          <input type="checkbox" id="show-menu" />
          <label htmlFor="show-menu" className="menu-icon"><i className="fas fa-bars"></i></label>
          <div className="content">
            <div className="logo"><a href="#">Covid Tracker - India</a></div>
            <ul className="links">
              <li>
                <a href="#" className="desktop-link">Sort-by</a>
                <input type="checkbox" id="show-services" />
                <label htmlFor="show-services">Sort-by</label>
                <ul>
                  <li>
                    <a href="#" className="desktop-link">States</a>
                    <input type="checkbox" id="show-items" />
                    <label htmlFor="show-items">State</label>
                    <ul>
                      <li><a onClick={() => {setSortBy(['state', 'ascending'])}}>Ascending</a></li>
                      <li><a onClick={() => setSortBy(['state', 'descending'])}>Descending</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#" className="desktop-link">Confirmed Count</a>
                    <input type="checkbox" id="show-items" />
                    <label htmlFor="show-items">Confirmed Count</label>
                    <ul>
                      <li><a onClick={() => setSortBy(['count', 'ascending'])}>Ascending</a></li>
                      <li><a onClick={() => setSortBy(['count', 'descending'])}>Descending</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#" className="desktop-link">Affected %</a>
                    <input type="checkbox" id="show-items" />
                    <label htmlFor="show-items">Affected %</label>
                    <ul>
                      <li><a onClick={() => setSortBy(['affected', 'ascending'])}>Ascending</a></li>
                      <li><a onClick={() => setSortBy(['affected', 'descending'])}>Descending</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#" className="desktop-link">Vaccinated %</a>
                    <input type="checkbox" id="show-items" />
                    <label htmlFor="show-items">Vaccinated %</label>
                    <ul>
                      <li><a onClick={() => setSortBy(['vaccinated', 'ascending'])}>Ascending</a></li>
                      <li><a onClick={() => setSortBy(['vaccinated', 'descending'])}>Descending</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <label htmlFor="show-search" className="search-icon"><i className="fas fa-search"></i></label>
          <form action="#" className="search-box">
            <input type="text" placeholder="Type Something to Search..." required />
            <button type="submit" className="go-icon"><i className="fas fa-long-arrow-alt-right"></i></button>
          </form>
        </nav>
      </div>
      <div className = "dummy-text">
      {filteredBasicStats && filteredBasicStats.length>0 && filteredBasicStats.map((data: Object) => {
        return (<Cards indianState = {data}/>)
      })}
      </div>
    </>
  );
}

export default App;
