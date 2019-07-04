import json from './metroManila.json'

export default function () {
  const ref = json.features
  let tmp = []
  let brgys = [
    {
      name: 'Barangay 395',
      population:632
    },
    {
      name: 'Barangay 396',
      population:1709
    },
    {
      name: 'Barangay 397',
      population:2111
    },
    {
      name: 'Barangay 398',
      population:2228
    },
    {
      name: 'Barangay 399',
      population:909
    },
    {
      name: 'Barangay 404',
      population:903
    },
    {
      name: 'Karuhatan',
      population:40996
    },
    {
      name: 'Marulas',
      population:53978
    },
    {
      name: 'Lower Bicutan',
      population: 49829
    },
    {
      name: 'Barangay 401',
      population: 2058
    },
    {
      name: 'Barangay 400',
      population: 1327
    }
  ]

  ref.forEach(element => {
    brgys.forEach(brgy => {
      if (element.properties.NAME_3 == brgy.name) {
        element.properties['POPULATION'] = brgy.population
      }
    })
  });
  console.log(JSON.stringify(ref))
}