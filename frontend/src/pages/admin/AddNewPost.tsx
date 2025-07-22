import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import { toast } from "react-toastify";
import { AlignClass } from 'quill/formats/align';
import { uploadAdminBlog } from "../../endpoints/blogs";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";
Quill.register(AlignClass, true);

interface CustomToolbarHandlerContext {
    quill: Quill;
}

const modules = {
    toolbar: {
        container: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ align: [] }],
            [{ list: "ordered" }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            ["clean"],
        ],
        handlers: {
            image: function (this: CustomToolbarHandlerContext) {
                const url = prompt("Enter image URL (must end with .jpg/.png/.gif):");
                if (url && /\.(jpg|jpeg|png|gif|webp)$/i.test(url)) {
                    const range = this.quill.getSelection();
                    this.quill.insertEmbed(range?.index || 0, "image", url);
                } else if (url) {
                    toast.error("Invalid image URL. Must end with .jpg/.png/.gif");
                }
            },
        },
    },
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
    const quillRefs = useRef<{ [lang: string]: ReactQuill | null }>({ uk: null, en: null, ru: null });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        Object.keys(quillRefs.current).forEach((lang) => {
            const editor = quillRefs.current[lang]?.getEditor();
            if (!editor) return;

            editor.root.addEventListener("paste", (e: ClipboardEvent) => {
                if (!e.clipboardData) return;
                const types = Array.from(e.clipboardData.items).map(item => item.type);
                if (types.includes("image/png") || types.includes("image/jpeg") || types.includes("image/gif")) {
                    e.preventDefault();
                    toast.warn("Please insert image links instead of pasting media.");
                }
            });
        });
    }, []);

    const handleTitleChange = (lang: "uk" | "en" | "ru", value: string) => {
        setTitles(prev => ({ ...prev, [lang]: value }));
    };

    const handleContentChange = (lang: "uk" | "en" | "ru", value: string) => {
        setContents(prev => ({ ...prev, [lang]: value }));
    };

    const handleFileChange = (key: keyof typeof images, file: File | null) => {
        setImages(prev => ({ ...prev, [key]: file }));
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        if (!titles.uk || !titles.en || !titles.ru) {
            toast.warn("All titles must be filled.");
            return;
        }
        if (!contents.uk || !contents.en || !contents.ru) {
            toast.warn("All contents must be filled.");
            return;
        }
        if (Object.values(images).some((file) => file && file.size > 5 * 1024 * 1024)) {
            toast.warn("Images must be under 5MB.");
            return;
        }

        const formData = new FormData();

        formData.append("title_uk", titles.uk);
        formData.append("title_en", titles.en);
        formData.append("title_ru", titles.ru);
        formData.append("content_uk", contents.uk);
        formData.append("content_en", contents.en);
        formData.append("content_ru", contents.ru);

        if (images.banner_uk) formData.append("banner_uk", images.banner_uk);
        if (images.banner_en) formData.append("banner_en", images.banner_en);
        if (images.banner_ru) formData.append("banner_ru", images.banner_ru);
        if (images.poster) formData.append("poster", images.poster);

        try {
            await uploadAdminBlog(formData);
            toast.success("Blog post uploaded successfully!");
            setTitles({ uk: "", en: "", ru: "" });
            setContents({ uk: "", en: "", ru: "" });
            setImages({ banner_en: null, banner_uk: null, banner_ru: null, poster: null });
            Object.values(quillRefs.current).forEach((ref) => {
                if (ref?.getEditor) {
                    const editor = ref.getEditor();
                    editor.history.clear();
                }
            });
        } catch (error: any) {
            toast.error(`Upload failed: ${error.message}`);
        } finally {
            setIsSubmitting(false)
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
            {isSubmitting && <FullScreenLoader />}
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
                                    ref={(el) => {
                                        quillRefs.current[lang] = el;
                                    }}
                                    value={contents[lang as "uk" | "en" | "ru"]}
                                    onChange={(value: any) => handleContentChange(lang as "uk" | "en" | "ru", value)}
                                    modules={modules}
                                    formats={formats}
                                    theme="snow"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 flex justify-end">
                        <button
                            disabled={isSubmitting}
                            className={`px-6 py-2 rounded-lg text-white ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                }`}
                            onClick={handleSubmit}
                        >
                            {isSubmitting ? "Uploading..." : "Submit Post"}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddNewPost;