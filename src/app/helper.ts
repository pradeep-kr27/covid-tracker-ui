export const sortInAscendingOrder = (a: Object,b: Object)=> {
    if(Object.keys(a)[0]>Object.keys(b)[0])
      return 1;
    if(Object.keys(b)[0]>Object.keys(a)[0])
      return -1;
    return 0;
  }

export const sortInDescendingOrder = (a: Object,b: Object)=> {
    if(Object.keys(a)[0]>Object.keys(b)[0])
      return -1;
    if(Object.keys(b)[0]>Object.keys(a)[0])
      return 1;
    return 0;
  }

  export const sortConfirmedCountInAsc = (a: any, b: any)=> {
  
    const keyA: any = (Object.values(a))[0]
    const StateA = Object.keys(keyA)[0]
    let allDistrictsA = keyA[StateA].districts[keyA[StateA].districts?.length-1].TOTAL
    let totalA =  allDistrictsA?allDistrictsA[allDistrictsA.length-1].total:''
    const keyB: any = (Object.values(b))[0]
    const StateB = Object.keys(keyB)[0]
    let allDistrictsB = keyB[StateB].districts[keyB[StateB].districts?.length-1].TOTAL
    let totalB = allDistrictsB? allDistrictsB[allDistrictsB.length-1].total:''
    if (totalA && totalB && totalA.confirmed && totalB.confirmed && (totalA.confirmed - totalB.confirmed))
      return 1;
    if (totalA && totalB && totalA.confirmed && totalB.confirmed && (totalA.confirmed - totalB.confirmed))
      return -1;
    return 0
}

export const sortConfirmedCountInDesc = (a: any, b: any)=> {
  
    let stateA = a[Object.keys(a)[0]]
    let allDistrictsA =stateA.districts[stateA.districts.length-1].TOTAL
    let totalA =  allDistrictsA[allDistrictsA.length-1].total
    let stateB = b[Object.keys(b)[0]]
    let allDistrictsB =stateB.districts[stateB.districts.length-1].TOTAL
    let totalB =  allDistrictsB[allDistrictsB.length-1].total
    if (totalA.confirmed && totalB.confirmed && (totalA.confirmed - totalB.confirmed))
      return -1;
    if (totalA.confirmed && totalB.confirmed && (totalA.confirmed - totalB.confirmed))
      return 1;
    return 0
}