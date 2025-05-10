import React from 'react';
import { LayoutDashboard, Users,ShipWheel , Truck ,MapPinCheck,TruckElectric,MapPinned} from 'lucide-react';
import { NavLink } from 'react-router-dom';


export const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'All Shipment', href: '/dashboard/all-shipment', icon: Truck },
        { name: 'Create Shipment', href: '/dashboard/create-shipment', icon: TruckElectric  },
        { name: 'Track Shipment', href: '/dashboard/track-shipment', icon: ShipWheel  },
        { name: 'Update Location', href: '/dashboard/update-location', icon: MapPinned },
        { name: 'Live Map View', href: '/dashboard/map-view', icon: MapPinCheck },
       
    ];

    return (
        <>
            <div className='flex flex-col w-full h-screen bg-gray-900 dark:bg-main-dark-bg'>
                <div className='flex items-center justify-center h-16 text-white text-2xl font-bold'>
                    Shipment Tracker
                </div>
                <nav className=' sidenav flex flex-col p-4 space-y-2'>
                    {navItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.href}
                            className={({ isActive }) =>
                                `flex items-center p-2 text-white rounded-md hover:bg-gray-700 ${
                                    isActive ? 'bg-gray-700' : ''
                                }`
                            }
                        >
                            <item.icon className='icon w-5 h-5 mr-3' />
                            <span className='SidebarName'>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    );
};

