import Link from 'next/link'
import React from 'react'

interface CLinkProps{
  url: string;
  name: string;
  pathName: string;
}
const CLink:React.FC<CLinkProps> = ({url,name,pathName}) => {
  return (<Link className={`${pathName===url? 'font-semibold':''}`} href={url}>{name}</Link>
  )
}

export default CLink