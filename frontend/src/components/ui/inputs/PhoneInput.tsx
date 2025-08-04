import React from 'react';
import { default as PhoneNumberInput } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PhoneInputProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    className?: string;
    defaultCountry?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
    label = 'Телефон',
    value,
    onChange,
    required = false,
    className = '',
    defaultCountry = 'ua'
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-semibold text-black mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <PhoneNumberInput
                country={defaultCountry}
                value={value}
                onChange={onChange}
                inputClass="!bg-transparent !text-black !text-lg !w-full !border-b !border-gray-300 !py-1 !focus:outline-none !focus:border-black !transition-colors !duration-200 placeholder:!text-neutral-500"
                containerClass="!w-full"
                buttonClass="!border-none"
                inputStyle={{ borderRadius: 0 }}
                specialLabel={''}
            />
        </div>
    );
};

export default PhoneInput;