import React from "react";

export const Context = React.createContext()

const FiltersProvider = ({children})=>{
    const categories = ["Men","Women","Kids","Accessories"]
    const filters = ['Top', 'Bottom', 'Jacket']

    const [category,setCategory] = React.useState(categories[0].toLowerCase())
    const [filtersChecked,setFiltersChecked] = React.useState({Top:false,Bottom:false,Jacket:false})

    const updateCategory = value => setCategory(value.toLowerCase())
    const updateFilters = event => setFiltersChecked(prevState=> ({...prevState ,[event.target.name]:event.target.checked }) )
    const filtersKeys = ()=>{
        return Object.entries(filtersChecked)
            .map(([key,value])=> value && key )
            .filter(obj=> !!obj)
    }
    const value = React.useMemo(()=>{
        return{
                categories,
                filters,
                category,
                updateCategory,
                updateFilters,
                filtersChecked:filtersKeys(),
            }
    },[ category,filtersChecked])

    return <Context.Provider value={value} > {children} </Context.Provider>
}

export const withContext = Component=> ()=> {
    return( <Context.Consumer> 
                {(value)=> <Component value={value} /> }
            </Context.Consumer>)
}


export default FiltersProvider