import React from 'react';
import { IconBadge } from '@/components/icon-badge';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import { LucideIcon } from 'lucide-react';
 
interface InfoCardProps {
    numberOfItems: number;
    variant?: 'default' | 'success';
    label: string;
    icon: LucideIcon;
}

const InfoCard = ({ 
    icon: Icon, 
    label, 
    numberOfItems,
    variant 
}: InfoCardProps) => {

    return (
    <div className='border rounded-md flex items-center gap-x-2 p-3'>
        <IconBadge 
            variant={variant}
            icon={Icon}
        />
        <div>
            <p className='font-medium'>
                {label}
            </p>
            <p className='text-sm text-gray-500'>
                {numberOfItems} courses
            </p>
        </div>

    </div>

    );
};

export default InfoCard;