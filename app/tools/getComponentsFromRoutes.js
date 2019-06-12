import { isArray } from 'lodash'

export default function(routes){
  if(!isArray(routes)){
    return null
  }

  let routeConfigs = {}

  routes.map(e => {
    routeConfigs[e.component.displayName] = e.component
  })

  return routeConfigs
}