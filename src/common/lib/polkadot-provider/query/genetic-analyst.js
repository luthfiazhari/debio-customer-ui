export async function queryGeneticAnalysts(api, geneticAnalysisTrackingId) {
  let res = (await api.query.geneticAnalysts.geneticAnalysts(geneticAnalysisTrackingId)).toHuman()
  return res
}

export async function queryGeneticAnalystServices(api, serviceId) {
  let res = (await api.query.geneticAnalystServices.geneticAnalystServices(serviceId)).toHuman()
  return res
}
