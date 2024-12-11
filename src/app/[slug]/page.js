
import EntityInfo from '@/components/EntityInfo/EntityInfo'
import React from 'react'




const page = async ({params}) => {
  const url = await params
  const id =url.slug
  return (
    <>
    <EntityInfo id={id} />
    </>
  )
}

export default page
