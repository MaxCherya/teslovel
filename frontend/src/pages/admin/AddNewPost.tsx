import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { AlignClass } from 'quill/formats/align';
Quill.register(AlignClass, true);

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'align': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean'],
    ],
};

const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'align', 'list', 'bullet',
    'blockquote', 'code-block',
    'link', 'image', 'video'
];

const AddNewPost: React.FC = () => {
    const [titles, setTitles] = useState({ uk: "", en: "", ru: "" });
    const [contents, setContents] = useState({ uk: "", en: "", ru: "" });
    const [images, setImages] = useState<{
        banner_en: File | null;
        banner_uk: File | null;
        banner_ru: File | null;
        poster: File | null;
    }>({
        banner_en: null,
        banner_uk: null,
        banner_ru: null,
        poster: null,
    });

    const handleTitleChange = (lang: "uk" | "en" | "ru", value: string) => {
        setTitles(prev => ({ ...prev, [lang]: value }));
    };

    const handleContentChange = (lang: "uk" | "en" | "ru", value: string) => {
        setContents(prev => ({ ...prev, [lang]: value }));
    };

    const handleFileChange = (key: keyof typeof images, file: File | null) => {
        setImages(prev => ({ ...prev, [key]: file }));
    };

    const handleSubmit = () => {
        console.log(contents); // For now
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
            <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 lg:pt-8 pt-25 pb-8">
                <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-full mx-auto border border-gray-100 space-y-6">
                    <h1 className="text-2xl font-bold text-gray-800">Add New Blog Post</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["banner_en", "banner_uk", "banner_ru", "poster"].map((field) => (
                            <div key={field}>
                                <label className="block text-sm font-medium text-gray-700 capitalize">
                                    {field.replace("_", " ")}
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleFileChange(field as keyof typeof images, e.target.files?.[0] || null)
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["uk", "en", "ru"].map((lang) => (
                            <div key={lang}>
                                <label className="block text-sm font-medium text-gray-700">
                                    Title ({lang.toUpperCase()})
                                </label>
                                <input
                                    type="text"
                                    value={titles[lang as "uk" | "en" | "ru"]}
                                    onChange={(e) =>
                                        handleTitleChange(lang as "uk" | "en" | "ru", e.target.value)
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6">
                        {["uk", "en", "ru"].map((lang) => (
                            <div key={lang}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Content ({lang.toUpperCase()})
                                </label>
                                <ReactQuill
                                    value={contents[lang as "uk" | "en" | "ru"]}
                                    onChange={(value: any) =>
                                        handleContentChange(lang as "uk" | "en" | "ru", value)
                                    }
                                    modules={modules}
                                    formats={formats}
                                    theme="snow"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 flex justify-end">
                        <button
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                            onClick={handleSubmit}
                        >
                            Submit Post
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddNewPost;