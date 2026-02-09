
import React from 'react';

// Coolicons Sprite Icon Component
// Usage: <Icon name="settings" className="w-6 h-6" />

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: string;
}

export const Icon: React.FC<IconProps> = ({ name, className, ...props }) => {
    return (
        <svg className={`ci text-current ${className || ''}`} {...props}>
            <use href={`/coolicons-sprite.svg#${name}`} />
        </svg>
    );
};
