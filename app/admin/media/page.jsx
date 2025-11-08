"use client"
import Breadcrumbs from '@/components/adminComponents/Breadcrumb'
import UploadMedia from '@/components/adminComponents/uploadMedia'
import { ADMIN_DASHBOARD } from '@/routes/AdminPanelRoutes'
 import React from 'react'

 const breadCrumbData=[
{ href: ADMIN_DASHBOARD, label: "Home"  },
{ href: '', label: "Media"  }

 ]

const Media = () => {

  return (
    <div>
        <Breadcrumbs breadCrumbData={breadCrumbData} />
        <UploadMedia/>
    </div>
  )
}

export default Media