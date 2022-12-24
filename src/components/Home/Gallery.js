import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../../lib/queries'
import Card from './Card'
import { Context } from '../../context'


const styles = {
    gallery : {
      height: 'calc(100vh - 120px)', 
      overflow: 'scroll'
    }
}



// main
function Gallery({category}) {
  let array = []
  const {filtersChecked} = React.useContext(Context)
  const {loading, error, data } = useQuery(GET_PRODUCTS,{variables:{category}})

  const ProductWithFilter =  ()=>{
    if(!filtersChecked.length){
      return data?.productByCategory
    }
    filtersChecked.forEach(filter => {
      array = [
        ...array,
        ...data?.productByCategory?.filter(product => product.filter === filter.toLowerCase())
      ]
    });
    return array
  }

  const products = ProductWithFilter()

  if(loading) return <div className='text-center fw-bolder h2 mt-5'> loading ... </div>
  if(error) return <div className='text-center fw-bolder h2 mt-5'> Sorry an error occured : {error.message}  </div>
  if(!data) return <div className='text-center fw-bolder h2 mt-5'> No data found !  </div>

  console.dir(data)
  return(<div className="col-md-8 order-md-2 col-lg-9">
      <div className="container-fluid" style={styles.gallery}>
        <div className="row">
           {
              products?.map(product=> <Card key={product?.id} {...product} /> )
           }
        </div>
      </div>
    </div>)
  }
export default Gallery