import React, { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface BikeGalleryProps {
    selectedImage: string;
    setSelectedImage: (img: string) => void;
    images: string[];
    name: string;
}

const BikeGallery: React.FC<BikeGalleryProps> = ({ selectedImage, setSelectedImage, images, name }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedIndex = images.findIndex((img) => img === selectedImage);

    // Lightbox slides format
    const slides = images.map((img) => ({ src: img }));

    return (
        <section className="mb-12">
            {/* Main Image with fixed ratio */}
            <div
                className="relative w-full max-w-4xl mx-auto mb-6 cursor-pointer rounded-lg overflow-hidden shadow-lg"
                style={{ aspectRatio: '16 / 9' }}
                onClick={() => setIsOpen(true)}
            >
                <img
                    src={selectedImage}
                    alt={name}
                    className="w-full h-full object-cover transition duration-300"
                />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex flex-wrap justify-center gap-4">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Gallery image ${index + 1}`}
                        className={`w-20 h-20 object-cover rounded-md cursor-pointer transition duration-300 ${selectedImage === img
                            ? 'border-2 border-blue-600'
                            : 'opacity-70 hover:opacity-100'
                            }`}
                        onClick={() => {
                            setSelectedImage(img);
                        }}
                    />
                ))}
            </div>

            {/* Lightbox */}
            {isOpen && (
                <Lightbox
                    open={isOpen}
                    close={() => setIsOpen(false)}
                    slides={slides}
                    index={selectedIndex}
                />
            )}
        </section>
    );
};

export default BikeGallery;