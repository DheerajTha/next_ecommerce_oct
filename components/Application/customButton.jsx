import React from 'react'
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const CustomButton = ({type, text, className, onClick, loading, disabled, ...props }) => {
  return (
    <Button 
    className={cn("", className )} 
    type={type} 
    loading={disabled} 
    onClick={onClick} 
    {...props} >

        {loading && 
        <Loader2 className='animate-spin' />
        }
        {text}
    </Button>
  )
}

export default CustomButton;