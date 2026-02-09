import React from 'react';
import { Tenant } from '@/types';
import { Icon } from './Icon';

interface LocalSectionProps {
    tenant: Tenant;
}

export const LocalSection: React.FC<LocalSectionProps> = ({ tenant }) => {
    const services = [
        {
            id: 'menu',
            title: 'Menu',
            icon: 'Menu_Alt_01',
            description: 'Sfoglia il nostro menu digitale'
        },
        {
            id: 'feedback',
            title: 'Lasciaci un feedback',
            icon: 'List_Checklist',
            description: 'La tua opinione è importante per noi'
        },
        {
            id: 'staff',
            title: 'Scrivi allo staff',
            icon: 'Chat_Conversation',
            description: 'Hai bisogno di aiuto? Contattaci subito'
        }
    ];

    return (
        <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
            {/* Header Section */}
            <div className="bg-white px-6 pt-12 pb-8 rounded-b-[3rem] shadow-sm border-b border-gray-100 mb-6">
                <div className="flex flex-col items-center">
                    <div className="w-28 h-28 mb-6 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm ring-4 ring-white">
                        {tenant.logoUrl ? (
                            <img
                                src={tenant.logoUrl}
                                alt={tenant.name}
                                className="w-full h-full object-contain p-6"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                                <Icon name="Building_01" className="w-12 h-12 text-gray-300" />
                            </div>
                        )}
                    </div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-center">
                        {tenant.name}
                    </h1>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full mt-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Sei nel locale</span>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="px-5 pb-24">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-4 ml-1">
                    Servizi Disponibili
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    {services.map((service) => (
                        <button
                            key={service.id}
                            className="group relative flex items-center gap-4 p-5 bg-white rounded-[2rem] border border-gray-100 shadow-sm transition-all duration-300 active:scale-[0.97] active:bg-gray-50"
                        >
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary/5 transition-colors duration-300">
                                <Icon name={service.icon} className="w-7 h-7" />
                            </div>

                            <div className="flex flex-col text-left">
                                <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-xs text-gray-500 font-medium">
                                    {service.description}
                                </p>
                            </div>

                            <div className="ml-auto w-8 h-8 rounded-full flex items-center justify-center text-gray-300">
                                <Icon name="Arrow_Right_SM" className="w-5 h-5" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LocalSection;
