import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import { toast } from "react-toastify";
import { AlignClass } from 'quill/formats/align';
import { uploadAdminBlog } from "../../endpoints/blogs";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";
import { useTranslation } from "react-i18next";
Quill.register(AlignClass, true);

interface CustomToolbarHandlerContext {
    quill: Quill;
}

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

    const { t } = useTranslation("", { keyPrefix: "blog.add" });

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
                        toast.error(t("validation.invalid_image_url"))
                    }
                },
            },
        },
    };

    useEffect(() => {
        Object.keys(quillRefs.current).forEach((lang) => {
            const editor = quillRefs.current[lang]?.getEditor();
            if (!editor) return;

            editor.root.addEventListener("paste", (e: ClipboardEvent) => {
                if (!e.clipboardData) return;
                const types = Array.from(e.clipboardData.items).map(item => item.type);
                if (types.includes("image/png") || types.includes("image/jpeg") || types.includes("image/gif")) {
                    e.preventDefault();
                    toast.warn(t("validation.no_paste_images"))
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
        if (!file) return;

        const img = new Image();
        img.onload = () => {
            const { width, height } = img;

            const expectedDimensions = {
                banner_en: [1584, 396],
                banner_uk: [1584, 396],
                banner_ru: [1584, 396],
                poster: [500, 500],
            } as const;

            const [expectedWidth, expectedHeight] = expectedDimensions[key];

            if (width === expectedWidth && height === expectedHeight) {
                setImages((prev) => ({ ...prev, [key]: file }));
            } else {
                toast.error(t("validation.invalid_dimensions", {
                    field: key.replace("_", " ").toUpperCase(),
                    width: expectedWidth,
                    height: expectedHeight
                }))
            }
        };
        img.onerror = () => {
            alert("Failed to read image dimensions. Please upload a valid image file.");
        };

        img.src = URL.createObjectURL(file);
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;

        if (!titles.uk || !titles.en || !titles.ru) {
            toast.warn(t("validation.titles_required"))
            return;
        }
        if (!contents.uk || !contents.en || !contents.ru) {
            toast.warn(t("validation.contents_required"))
            return;
        }
        if (Object.values(images).some((file) => file && file.size > 5 * 1024 * 1024)) {
            toast.warn(t("validation.image_too_large"))
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
            setIsSubmitting(true);
            await uploadAdminBlog(formData);
            toast.success(t("success"))
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
            toast.error(t("error", { message: error.message }))
        } finally {
            setIsSubmitting(false)
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
            {isSubmitting && <FullScreenLoader />}
            <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 lg:pt-8 pt-25 pb-8">
                <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-full mx-auto border border-gray-100 space-y-6">
                    <h1 className="text-2xl font-bold text-gray-800">{t("title")}</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["banner_en", "banner_uk", "banner_ru", "poster"].map((field) => (
                            <div key={field}>
                                <label className="block text-sm font-medium text-gray-700 capitalize">
                                    {t(`fields.${field}`)}
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
                                    {t("titleLabel")} ({lang.toUpperCase()})
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
                                    {t("contentLabel")} ({lang.toUpperCase()})
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
                            {isSubmitting ? t("uploading") : t("submit")}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddNewPost;