// "use client";

// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { carSchema, type CarFormData } from "@/schema/car";
// import { createCarAction } from "@/app/actions/sales_car_creation";
// import { getPresignedUrl } from "@/app/actions/upload-image";
// import { generateUniqueSlug } from "@/lib/slugify";
// import { toast, Toaster } from "sonner";

// import {
//   Car,
//   DollarSign,
//   Gauge,
//   Fuel,
//   Settings,
//   Palette,
//   Hash,
//   FileText,
//   Upload,
//   X,
//   Loader2,
//   CheckCircle2,
//   ImageIcon,
//   Star,
//   Info,
//   Sparkles,
//   Ruler,
//   Type,
//   AlertCircle,
//   CheckCircle,
//   ChevronDown,
//   Share2,
// } from "lucide-react";
// import Image from "next/image";
// import CarEditor from "./sale-car-editor";

// import { FuelType, Transmission } from "@/generated/prisma/enums";

// const fuelTypes = [
//   FuelType.PETROL,
//   FuelType.DIESEL,
//   FuelType.HYBRID,
//   FuelType.ELECTRIC,
// ] as const;
// const transmissions = [Transmission.AUTOMATIC, Transmission.MANUAL] as const;

// // ============================================
// // TYPES
// // ============================================
// interface UploadingFile {
//   id: string;
//   file: File;
//   preview: string;
//   status: "uploading" | "done" | "error";
//   url?: string;
//   alt?: string;
//   type: "gallery" | "cover" | "og";
// }

// // ============================================
// // MAIN CAR FORM COMPONENT
// // ============================================
// export const CarFormComp = () => {
//   const [editorContent, setEditorContent] = useState<{ blocks: any[] }>({
//     blocks: [],
//   });
//   const [contentValidated, setContentValidated] = useState(false);
//   const [files, setFiles] = useState<UploadingFile[]>([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//     reset,
//     watch,
//     trigger,
//     clearErrors,
//   } = useForm<CarFormData>({
//     resolver: zodResolver(carSchema) as any,
//     defaultValues: {
//       title: "",
//       slug: "",
//       coverImage: "",
//       brand: "",
//       model: "",
//       year: new Date().getFullYear(),
//       price: 0,
//       currency: "PKR",
//       mileage: null,
//       fuelType: null,
//       transmission: null,
//       engine: "",
//       color: "",
//       registration: "",
//       description: { blocks: [] },
//       images: [],
//       isAvailable: true,
//       ogImage: "",
//     },
//     mode: "onChange",
//   });

//   const isAvailable = watch("isAvailable");

//   // Watch all form values for button state
//   const watchedTitle = watch("title");
//   const watchedBrand = watch("brand");
//   const watchedModel = watch("model");
//   const watchedYear = watch("year");
//   const watchedPrice = watch("price");
//   const watchedFuelType = watch("fuelType");
//   const watchedTransmission = watch("transmission");
//   const watchedImages = watch("images");
//   const watchedCoverImage = watch("coverImage");
//   const watchedOgImage = watch("ogImage");

//   // ============================================
//   // REQUIRED FIELDS CHECK (for button + UI)
//   // ============================================
//   const areRequiredFieldsFilled = useMemo(() => {
//     const hasTitle = watchedTitle?.trim().length > 0;
//     const hasBrand = watchedBrand?.trim().length > 0;
//     const hasModel = watchedModel?.trim().length > 0;
//     const hasYear = Number(watchedYear) > 1900;
//     const hasPrice = Number(watchedPrice) > 0;
//     const hasFuelType =
//       watchedFuelType !== null &&
//       watchedFuelType !== undefined &&
//       Object.values(FuelType).includes(watchedFuelType as FuelType);
//     const hasTransmission =
//       watchedTransmission !== null &&
//       watchedTransmission !== undefined &&
//       Object.values(Transmission).includes(watchedTransmission as Transmission);
//     const hasDescription = editorContent?.blocks?.length > 0;
//     const hasImages = (watchedImages?.length ?? 0) > 0;
//     const hasCoverImage = watchedCoverImage?.trim().length > 0;
//     const hasOgImage = watchedOgImage?.trim().length > 0;
//     const noUploadingImages =
//       files.filter((f) => f.status === "uploading").length === 0;

//     return (
//       hasTitle &&
//       hasBrand &&
//       hasModel &&
//       hasYear &&
//       hasPrice &&
//       hasFuelType &&
//       hasTransmission &&
//       hasDescription &&
//       hasImages &&
//       hasCoverImage &&
//       hasOgImage &&
//       noUploadingImages
//     );
//   }, [
//     watchedTitle,
//     watchedBrand,
//     watchedModel,
//     watchedYear,
//     watchedPrice,
//     watchedFuelType,
//     watchedTransmission,
//     editorContent,
//     watchedImages,
//     watchedCoverImage,
//     watchedOgImage,
//     files,
//   ]);

//   // ============================================
//   // SLUG GENERATOR
//   // ============================================
//   const handleGenerateSlug = useCallback(() => {
//     const title = getValues("title");
//     if (!title?.trim()) {
//       toast.error("Please enter a title first");
//       return;
//     }
//     setIsGeneratingSlug(true);
//     const slug = generateUniqueSlug(title);
//     setValue("slug", slug, { shouldValidate: true });
//     setTimeout(() => setIsGeneratingSlug(false), 600);
//   }, [getValues, setValue]);

//   // ============================================
//   // EDITOR HANDLER
//   // ============================================
//   const handleEditorChange = useCallback(
//     (data: { blocks: any[] }) => {
//       setEditorContent(data);
//       const hasBlocks = data?.blocks && data.blocks.length > 0;
//       setValue("description", data, { shouldValidate: true });
//       setContentValidated(true);
//       if (hasBlocks) clearErrors("description");
//     },
//     [setValue, clearErrors],
//   );

//   // ============================================
//   // SYNC IMAGES TO FORM STATE
//   // ============================================
//   const syncImagesToForm = useCallback(() => {
//     const galleryImages = files
//       .filter((f) => f.type === "gallery" && f.status === "done" && f.url)
//       .map((f) => ({ url: f.url!, alt: f.alt || "" }));

//     setValue("images", galleryImages, { shouldValidate: true });
//     if (galleryImages.length > 0) clearErrors("images");

//     // Sync coverImage
//     const coverFile = files.find(
//       (f) => f.type === "cover" && f.status === "done",
//     );
//     if (coverFile?.url) {
//       setValue("coverImage", coverFile.url, { shouldValidate: true });
//     }

//     // Sync ogImage
//     const ogFile = files.find((f) => f.type === "og" && f.status === "done");
//     if (ogFile?.url) {
//       setValue("ogImage", ogFile.url, { shouldValidate: true });
//     }
//   }, [files, setValue, clearErrors]);

//   useEffect(() => {
//     syncImagesToForm();
//   }, [syncImagesToForm]);

//   // ============================================
//   // UPLOAD SINGLE IMAGE (Cover or OG)
//   // ============================================
//   const uploadSingleImage = useCallback(
//     async (file: File, type: "cover" | "og") => {
//       const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
//       const preview = URL.createObjectURL(file);

//       // Remove existing file of same type
//       setFiles((prev) => {
//         const existing = prev.find((f) => f.type === type);
//         if (existing?.preview?.startsWith("blob:")) {
//           URL.revokeObjectURL(existing.preview);
//         }
//         return prev
//           .filter((f) => f.type !== type)
//           .concat({
//             id,
//             file,
//             preview,
//             status: "uploading",
//             type,
//             alt: type === "cover" ? "Cover image" : "OG image",
//           });
//       });

//       try {
//         const { presignedUrl, fileUrl } = await getPresignedUrl(
//           file.type,
//           file.name,
//         );

//         const uploadRes = await fetch(presignedUrl, {
//           method: "PUT",
//           body: file,
//           headers: { "Content-Type": file.type },
//         });

//         if (!uploadRes.ok) throw new Error("Upload failed");

//         setFiles((prev) =>
//           prev.map((f) =>
//             f.id === id ? { ...f, status: "done", url: fileUrl } : f,
//           ),
//         );

//         toast.success(`${type === "cover" ? "Cover" : "OG"} image uploaded!`, {
//           icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
//         });
//       } catch (error) {
//         console.error("Upload error:", error);
//         setFiles((prev) =>
//           prev.map((f) => (f.id === id ? { ...f, status: "error" } : f)),
//         );
//         toast.error(`Failed to upload ${type} image`);
//       }
//     },
//     [],
//   );

//   // ============================================
//   // GALLERY IMAGE HANDLERS
//   // ============================================
//   const handleAddGalleryImages = useCallback(
//     async (newFiles: FileList | null) => {
//       if (!newFiles) return;

//       const currentGallery = files.filter(
//         (f) => f.type === "gallery" && f.status === "done",
//       ).length;
//       if (currentGallery >= 10) {
//         toast.error("Maximum 10 gallery images allowed");
//         return;
//       }

//       const validFiles = Array.from(newFiles)
//         .filter((file) => {
//           if (!file.type.startsWith("image/")) {
//             toast.error(`${file.name} is not an image`);
//             return false;
//           }
//           if (file.size > 5 * 1024 * 1024) {
//             toast.error(`${file.name} exceeds 5MB limit`);
//             return false;
//           }
//           return true;
//         })
//         .slice(0, 10 - currentGallery);

//       if (validFiles.length === 0) return;

//       const newUploads: UploadingFile[] = validFiles.map((file) => ({
//         id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//         file,
//         preview: URL.createObjectURL(file),
//         status: "uploading",
//         type: "gallery",
//         alt: "",
//       }));

//       setFiles((prev) => [...prev, ...newUploads]);
//       setIsUploading(true);

//       await Promise.all(
//         newUploads.map(async (upload) => {
//           try {
//             const { presignedUrl, fileUrl } = await getPresignedUrl(
//               upload.file.type,
//               upload.file.name,
//             );

//             const uploadRes = await fetch(presignedUrl, {
//               method: "PUT",
//               body: upload.file,
//               headers: { "Content-Type": upload.file.type },
//             });

//             if (!uploadRes.ok) throw new Error("Upload failed");

//             setFiles((prev) =>
//               prev.map((f) =>
//                 f.id === upload.id ? { ...f, status: "done", url: fileUrl } : f,
//               ),
//             );

//             toast.success(`${upload.file.name} uploaded!`, {
//               icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
//             });
//           } catch (error) {
//             console.error("Upload error:", error);
//             setFiles((prev) =>
//               prev.map((f) =>
//                 f.id === upload.id ? { ...f, status: "error" } : f,
//               ),
//             );
//             toast.error(`Failed to upload ${upload.file.name}`);
//           }
//         }),
//       );

//       setIsUploading(false);
//     },
//     [files],
//   );

//   const removeImage = useCallback(
//     (id: string) => {
//       setFiles((prev) => {
//         const file = prev.find((f) => f.id === id);
//         if (file?.preview?.startsWith("blob:")) {
//           URL.revokeObjectURL(file.preview);
//         }
//         const next = prev.filter((f) => f.id !== id);

//         // If removed image was cover or OG, clear those fields
//         const removedUrl = file?.url;
//         if (removedUrl) {
//           const currentCover = getValues("coverImage");
//           const currentOg = getValues("ogImage");
//           if (currentCover === removedUrl)
//             setValue("coverImage", "", { shouldValidate: true });
//           if (currentOg === removedUrl)
//             setValue("ogImage", "", { shouldValidate: true });
//         }

//         return next;
//       });
//       toast.info("Image removed");
//     },
//     [getValues, setValue],
//   );

//   const updateImageAlt = useCallback((id: string, alt: string) => {
//     setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, alt } : f)));
//   }, []);

//   // ============================================
//   // SUBMIT — CALLS SERVER ACTION
//   // ============================================
//   const onSubmit = useCallback(
//     async (data: CarFormData) => {
//       const isValid = await trigger();
//       if (!isValid) {
//         toast.error("Please fix all errors before submitting");
//         return;
//       }

//       if (!areRequiredFieldsFilled) {
//         toast.error("Please fill all required fields before submitting");
//         return;
//       }

//       const payload: CarFormData = {
//         ...data,
//         description: editorContent,
//       };

//       setIsSaving(true);
//       const toastId = toast.loading("Creating car listing...", {
//         id: "create-car",
//       });

//       try {
//         const result = await createCarAction(payload);

//         if (result.success) {
//           toast.success("Car listing created successfully!", {
//             id: toastId,
//             icon: <CheckCircle className="h-4 w-4 text-green-500" />,
//             duration: 4000,
//           });

//           reset();
//           setEditorContent({ blocks: [] });
//           setFiles([]);
//           setContentValidated(false);
//         } else {
//           toast.error(result.error || "Failed to create car listing", {
//             id: toastId,
//             icon: <AlertCircle className="h-4 w-4 text-red-500" />,
//             duration: 5000,
//           });

//           if (result.errors) {
//             Object.entries(result.errors).forEach(([field, messages]) => {
//               if (Array.isArray(messages)) {
//                 messages.forEach((msg) => {
//                   toast.error(`${field}: ${msg}`, {
//                     icon: <AlertCircle className="h-4 w-4 text-red-500" />,
//                   });
//                 });
//               }
//             });
//           }
//         }
//       } catch (error) {
//         console.error("Submit error:", error);
//         toast.error("Something went wrong. Please try again.", {
//           id: toastId,
//           icon: <AlertCircle className="h-4 w-4 text-red-500" />,
//         });
//       } finally {
//         setIsSaving(false);
//       }
//     },
//     [editorContent, reset, areRequiredFieldsFilled, trigger],
//   );

//   const handlePreview = useCallback(async () => {
//     let editorData;

//     const previewPayload = {
//       content: editorData,
//     };

//     sessionStorage.setItem(
//       "blog_preview_content",
//       JSON.stringify(previewPayload),
//     );
//     window.open("/dashboard/sales/preview", "_blank");
//   }, [editorContent]);

//   const hasContent = editorContent?.blocks?.length > 0;
//   const uploadedCount = files.filter(
//     (f) => f.type === "gallery" && f.status === "done",
//   ).length;
//   const uploadingCount = files.filter((f) => f.status === "uploading").length;

//   const coverFile = files.find((f) => f.type === "cover");
//   const ogFile = files.find((f) => f.type === "og");

//   const isSubmitDisabled =
//     isSaving || isUploading || uploadingCount > 0 || !areRequiredFieldsFilled;

//   const buttonContent = useMemo(() => {
//     if (isSaving) {
//       return (
//         <>
//           <Loader2 className="animate-spin h-4 w-4" />
//           Saving to database...
//         </>
//       );
//     }
//     if (isUploading || uploadingCount > 0) {
//       return (
//         <>
//           <Loader2 className="animate-spin h-4 w-4" />
//           Uploading {uploadingCount} image{uploadingCount > 1 ? "s" : ""}...
//         </>
//       );
//     }
//     if (!areRequiredFieldsFilled) {
//       return (
//         <>
//           <AlertCircle className="h-4 w-4" />
//           Fill all required fields
//         </>
//       );
//     }
//     return (
//       <>
//         <Car className="h-4 w-4" />
//         Publish Listing
//       </>
//     );
//   }, [isSaving, isUploading, uploadingCount, areRequiredFieldsFilled]);

//   // ============================================
//   // RENDER
//   // ============================================
//   return (
//     <>
//       <Toaster position="top-right" richColors closeButton />
//       <form
//         onSubmit={handleSubmit(onSubmit, (errors) => {
//           console.log("Validation Errors:", errors);
//           Object.entries(errors).forEach(([field, error]) => {
//             if (error?.message) {
//               toast.error(`${field}: ${error.message}`, {
//                 icon: <AlertCircle className="h-4 w-4 text-red-500" />,
//               });
//             }
//           });
//         })}
//         className="space-y-8 max-w-5xl mx-auto p-6 md:p-8 rounded-2xl bg-card border shadow-sm"
//       >
//         {/* Header */}
//         <div className="text-center space-y-2">
//           <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
//             List Your Car
//           </h2>
//           <p className="text-muted-foreground text-sm">
//             Fill in the details below to create your car listing
//           </p>
//         </div>

//         {/* Availability Toggle */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-foreground">
//             Status
//           </label>
//           <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
//             <div className="flex items-center gap-3">
//               <div
//                 className={`p-2 rounded-lg ${isAvailable ? "bg-emerald-500/20" : "bg-muted"}`}
//               >
//                 <Star
//                   className={`h-5 w-5 ${isAvailable ? "text-emerald-500 fill-emerald-500" : "text-muted-foreground"}`}
//                 />
//               </div>
//               <div>
//                 <p className="text-sm font-semibold text-foreground">
//                   Availability
//                 </p>
//                 <p className="text-xs text-muted-foreground">
//                   {isAvailable
//                     ? "This car is available for purchase"
//                     : "This car is currently unavailable"}
//                 </p>
//               </div>
//             </div>
//             <button
//               type="button"
//               onClick={() =>
//                 setValue("isAvailable", !isAvailable, { shouldValidate: true })
//               }
//               className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
//                 isAvailable ? "bg-emerald-500" : "bg-muted-foreground/30"
//               }`}
//             >
//               <span
//                 className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
//                   isAvailable ? "translate-x-6" : "translate-x-1"
//                 }`}
//               />
//             </button>
//           </div>
//         </div>

//         {/* Title */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-foreground">
//             Car Name / Title <span className="text-destructive">*</span>
//           </label>
//           <input
//             type="text"
//             {...register("title")}
//             className={`w-full px-4 py-3 rounded-xl text-sm bg-background border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
//               ${errors.title ? "border-destructive focus:border-destructive" : "border-input hover:border-primary/50 focus:border-primary"}`}
//             placeholder="e.g., 2023 Toyota Corolla Altis Grande"
//           />
//           {errors.title && (
//             <p className="text-sm font-medium text-destructive">
//               {errors.title.message}
//             </p>
//           )}
//         </div>

//         {/* Slug with Auto-Generate */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-foreground">
//             Slug{" "}
//             <span className="text-muted-foreground font-normal text-xs">
//               (URL-friendly name)
//             </span>
//           </label>
//           <div className="flex items-center gap-3">
//             <input
//               type="text"
//               {...register("slug")}
//               className={`flex-1 px-4 py-3 rounded-xl text-sm bg-background border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
//                 ${errors.slug ? "border-destructive focus:border-destructive" : "border-input hover:border-primary/50 focus:border-primary"}`}
//               placeholder="2023-toyota-corolla-altis"
//             />
//             <button
//               type="button"
//               onClick={handleGenerateSlug}
//               disabled={isGeneratingSlug}
//               className="px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 shrink-0 bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 active:scale-95 transition-all duration-200 disabled:opacity-50"
//             >
//               <Sparkles
//                 className={`h-4 w-4 ${isGeneratingSlug ? "animate-spin text-amber-500" : ""}`}
//               />
//               Auto
//             </button>
//           </div>
//           {errors.slug && (
//             <p className="text-sm font-medium text-destructive">
//               {errors.slug.message}
//             </p>
//           )}
//         </div>

//         {/* Brand & Model */}
//         <div className="grid gap-6 sm:grid-cols-2">
//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-foreground">
//               Brand <span className="text-destructive">*</span>
//             </label>
//             <div className="relative">
//               <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <input
//                 type="text"
//                 {...register("brand")}
//                 className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-background border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
//                   ${errors.brand ? "border-destructive focus:border-destructive" : "border-input hover:border-primary/50 focus:border-primary"}`}
//                 placeholder="e.g., Toyota"
//               />
//             </div>
//             {errors.brand && (
//               <p className="text-sm font-medium text-destructive">
//                 {errors.brand.message}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-foreground">
//               Model <span className="text-destructive">*</span>
//             </label>
//             <input
//               type="text"
//               {...register("model")}
//               className={`w-full px-4 py-3 rounded-xl text-sm bg-background border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
//                 ${errors.model ? "border-destructive focus:border-destructive" : "border-input hover:border-primary/50 focus:border-primary"}`}
//               placeholder="e.g., Corolla"
//             />
//             {errors.model && (
//               <p className="text-sm font-medium text-destructive">
//                 {errors.model.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Year & Color */}
//         <div className="grid gap-6 sm:grid-cols-2">
//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-foreground">
//               Year <span className="text-destructive">*</span>
//             </label>
//             <input
//               type="number"
//               {...register("year", {
//                 setValueAs: (v) => (v === "" ? undefined : Number(v)),
//               })}
//               className={`w-full px-4 py-3 rounded-xl text-sm bg-background border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
//                 ${errors.year ? "border-destructive focus:border-destructive" : "border-input hover:border-primary/50 focus:border-primary"}`}
//               placeholder="2023"
//             />
//             {errors.year && (
//               <p className="text-sm font-medium text-destructive">
//                 {errors.year.message}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
//               <Palette className="h-3.5 w-3.5" />
//               Color
//             </label>
//             <input
//               type="text"
//               {...register("color")}
//               className={`w-full px-4 py-3 rounded-xl text-sm bg-background border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
//                 ${errors.color ? "border-destructive focus:border-destructive" : "border-input hover:border-primary/50 focus:border-primary"}`}
//               placeholder="e.g., Pearl White"
//             />
//             {errors.color && (
//               <p className="text-sm font-medium text-destructive">
//                 {errors.color.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Price & Registration */}
//         <div className="grid gap-6 sm:grid-cols-2">
//           <div className="space-y-2">
//             <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
//               <DollarSign className="h-3.5 w-3.5" />
//               Price <span className="text-destructive">*</span>
//             </label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">
//                 PKR
//               </span>
//               <input
//                 type="number"
//                 {...register("price", {
//                   setValueAs: (v) => (v === "" ? undefined : Number(v)),
//                 })}
//                 className={`w-full pl-12 pr-4 py-3 rounded-xl text-sm bg-background border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
//                   ${errors.price ? "border-destructive focus:border-destructive" : "border-input hover:border-primary/50 focus:border-primary"}`}
//                 placeholder="2500000"
//               />
//             </div>
//             {errors.price && (
//               <p className="text-sm font-medium text-destructive">
//                 {errors.price.message}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
//               <Hash className="h-3.5 w-3.5" />
//               Registration
//             </label>
//             <input
//               type="text"
//               {...register("registration")}
//               className={`w-full px-4 py-3 rounded-xl text-sm bg-background border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
//                 ${errors.registration ? "border-destructive focus:border-destructive" : "border-input hover:border-primary/50 focus:border-primary"}`}
//               placeholder="e.g., LEA-1234"
//             />
//             {errors.registration && (
//               <p className="text-sm font-medium text-destructive">
//                 {errors.registration.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Vehicle Details Card */}
//         <div className="rounded-xl border border-border bg-card p-5 space-y-5">
//           <div className="flex items-center gap-2">
//             <Settings className="h-5 w-5 text-primary" />
//             <h3 className="text-sm font-semibold text-foreground">
//               Vehicle Details
//             </h3>
//           </div>

//           <div className="grid gap-6 sm:grid-cols-2">
//             <div className="space-y-2">
//               <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
//                 <Gauge className="h-3.5 w-3.5" />
//                 Mileage (km)
//               </label>
//               <input
//                 type="number"
//                 {...register("mileage", {
//                   setValueAs: (v) => (v === "" ? null : Number(v)),
//                 })}
//                 className={`w-full px-4 py-3 rounded-xl text-sm bg-background border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
//                   ${errors.mileage ? "border-destructive focus:border-destructive" : "border-input hover:border-primary/50 focus:border-primary"}`}
//                 placeholder="e.g., 45000"
//               />
//               {errors.mileage && (
//                 <p className="text-sm font-medium text-destructive">
//                   {errors.mileage.message}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-foreground">
//                 Engine
//               </label>
//               <input
//                 type="text"
//                 {...register("engine")}
//                 className={`w-full px-4 py-3 rounded-xl text-sm bg-background border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
//                   ${errors.engine ? "border-destructive focus:border-destructive" : "border-input hover:border-primary/50 focus:border-primary"}`}
//                 placeholder="e.g., 1.8L VVT-i"
//               />
//               {errors.engine && (
//                 <p className="text-sm font-medium text-destructive">
//                   {errors.engine.message}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
//                 <Fuel className="h-3.5 w-3.5" />
//                 Fuel Type <span className="text-destructive">*</span>
//               </label>
//               <div className="relative">
//                 <select
//                   {...register("fuelType")}
//                   className={`w-full px-4 py-3 rounded-xl text-sm bg-background border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 appearance-none pr-10
//                     ${errors.fuelType ? "border-destructive focus:border-destructive" : "border-input hover:border-primary/50 focus:border-primary"}`}
//                 >
//                   <option value="">Select fuel type</option>
//                   {fuelTypes.map((type) => (
//                     <option key={type} value={type}>
//                       {type}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
//               </div>
//               {errors.fuelType && (
//                 <p className="text-sm font-medium text-destructive">
//                   {errors.fuelType.message}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-foreground">
//                 Transmission <span className="text-destructive">*</span>
//               </label>
//               <div className="relative">
//                 <select
//                   {...register("transmission")}
//                   className={`w-full px-4 py-3 rounded-xl text-sm bg-background border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 appearance-none pr-10
//                     ${errors.transmission ? "border-destructive focus:border-destructive" : "border-input hover:border-primary/50 focus:border-primary"}`}
//                 >
//                   <option value="">Select transmission</option>
//                   {transmissions.map((type) => (
//                     <option key={type} value={type}>
//                       {type}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
//               </div>
//               {errors.transmission && (
//                 <p className="text-sm font-medium text-destructive">
//                   {errors.transmission.message}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Cover Image Upload Section */}
//         <div className="space-y-3">
//           <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
//             <ImageIcon className="h-4 w-4 text-muted-foreground" />
//             Cover Image <span className="text-destructive">*</span>
//           </label>
//           <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-2">
//             <div className="flex items-center gap-2 text-sm font-medium text-foreground">
//               <Ruler className="h-4 w-4 text-primary" />
//               Recommended Dimensions
//             </div>
//             <p className="text-xs text-muted-foreground">
//               •{" "}
//               <span className="font-medium text-foreground">1200 × 800 px</span>{" "}
//               (landscape, 3:2 ratio) — Best for listing thumbnails and card
//               previews
//             </p>
//           </div>

//           {coverFile?.status === "done" && coverFile.url ? (
//             <div className="relative aspect-3/2 w-full max-w-md rounded-xl overflow-hidden border-2 border-primary shadow-sm group">
//               <Image
//                 src={coverFile.url}
//                 alt="Cover preview"
//                 fill
//                 className="object-cover"
//                 unoptimized
//               />
//               <div className="absolute top-2 left-2 flex items-center gap-1 bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded-full text-[10px] font-medium shadow-sm">
//                 <Star className="h-3 w-3 fill-current" />
//                 Cover
//               </div>
//               <button
//                 type="button"
//                 onClick={() => removeImage(coverFile.id)}
//                 className="absolute top-2 right-2 rounded-full bg-destructive/90 backdrop-blur-sm p-1.5 text-destructive-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
//               >
//                 <X className="h-3 w-3" />
//               </button>
//             </div>
//           ) : coverFile?.status === "uploading" ? (
//             <div className="relative aspect-3/2 w-full max-w-md rounded-xl overflow-hidden border border-border bg-muted flex items-center justify-center">
//               <Loader2 className="animate-spin h-6 w-6 text-primary" />
//             </div>
//           ) : (
//             <div
//               className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer"
//               onClick={() =>
//                 document.getElementById("cover-image-input")?.click()
//               }
//             >
//               <div className="flex flex-col items-center gap-2">
//                 <div className="rounded-full bg-primary/10 p-3 mb-2">
//                   <Upload className="h-7 w-7 text-primary" />
//                 </div>
//                 <p className="font-medium text-foreground text-sm">
//                   Click to upload cover image
//                 </p>
//                 <p className="text-xs text-muted-foreground">
//                   PNG, JPG, WEBP — Max 5MB
//                 </p>
//                 <input
//                   id="cover-image-input"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) uploadSingleImage(file, "cover");
//                     e.target.value = "";
//                   }}
//                 />
//               </div>
//             </div>
//           )}
//           {errors.coverImage && (
//             <p className="text-sm font-medium text-destructive">
//               {errors.coverImage.message}
//             </p>
//           )}
//         </div>

//         {/* OG Image Upload Section */}
//         <div className="space-y-3">
//           <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
//             <Share2 className="h-4 w-4 text-muted-foreground" />
//             Open Graph Image (SEO) <span className="text-destructive">*</span>
//           </label>
//           <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-2">
//             <div className="flex items-center gap-2 text-sm font-medium text-foreground">
//               <Ruler className="h-4 w-4 text-primary" />
//               Recommended Dimensions
//             </div>
//             <p className="text-xs text-muted-foreground">
//               •{" "}
//               <span className="font-medium text-foreground">1200 × 630 px</span>{" "}
//               (landscape, 1.91:1 ratio) — Perfect for Facebook, WhatsApp,
//               LinkedIn, Twitter cards
//             </p>
//           </div>

//           {ogFile?.status === "done" && ogFile.url ? (
//             <div className="relative aspect-[1.91/1] w-full max-w-md rounded-xl overflow-hidden border-2 border-blue-500 shadow-sm group">
//               <Image
//                 src={ogFile.url}
//                 alt="OG preview"
//                 fill
//                 className="object-cover"
//                 unoptimized
//               />
//               <div className="absolute top-2 left-2 flex items-center gap-1 bg-blue-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-[10px] font-medium shadow-sm">
//                 <Share2 className="h-3 w-3" />
//                 OG Image
//               </div>
//               <button
//                 type="button"
//                 onClick={() => removeImage(ogFile.id)}
//                 className="absolute top-2 right-2 rounded-full bg-destructive/90 backdrop-blur-sm p-1.5 text-destructive-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
//               >
//                 <X className="h-3 w-3" />
//               </button>
//             </div>
//           ) : ogFile?.status === "uploading" ? (
//             <div className="relative aspect-[1.91/1] w-full max-w-md rounded-xl overflow-hidden border border-border bg-muted flex items-center justify-center">
//               <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
//             </div>
//           ) : (
//             <div
//               className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer"
//               onClick={() => document.getElementById("og-image-input")?.click()}
//             >
//               <div className="flex flex-col items-center gap-2">
//                 <div className="rounded-full bg-blue-500/10 p-3 mb-2">
//                   <Upload className="h-7 w-7 text-blue-500" />
//                 </div>
//                 <p className="font-medium text-foreground text-sm">
//                   Click to upload OG image
//                 </p>
//                 <p className="text-xs text-muted-foreground">
//                   PNG, JPG, WEBP — Max 5MB
//                 </p>
//                 <input
//                   id="og-image-input"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) uploadSingleImage(file, "og");
//                     e.target.value = "";
//                   }}
//                 />
//               </div>
//             </div>
//           )}
//           {errors.ogImage && (
//             <p className="text-sm font-medium text-destructive">
//               {errors.ogImage.message}
//             </p>
//           )}
//         </div>

//         {/* Gallery Images */}
//         <div className="space-y-3">
//           <div className="flex items-start justify-between">
//             <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
//               <ImageIcon className="h-4 w-4 text-muted-foreground" />
//               Car Gallery Images <span className="text-destructive">*</span>
//             </label>
//             <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
//               <Info className="h-3 w-3" />
//               <span>Min 1, Max 10 images</span>
//             </div>
//           </div>

//           {errors.images && (
//             <p className="text-sm font-medium text-destructive flex items-center gap-1">
//               <AlertCircle className="h-3.5 w-3.5" />
//               {errors.images.message || "At least 1 image is required"}
//             </p>
//           )}

//           <p className="text-xs text-muted-foreground leading-relaxed">
//             Upload high-quality photos of your car. Include exterior shots,
//             interior, engine bay, and any damage.
//           </p>

//           {/* Drop Zone */}
//           <div
//             className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer"
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={(e) => {
//               e.preventDefault();
//               handleAddGalleryImages(e.dataTransfer.files);
//             }}
//             onClick={() =>
//               document.getElementById("gallery-images-input")?.click()
//             }
//           >
//             <div className="flex flex-col items-center gap-2">
//               <div className="rounded-full bg-primary/10 p-3 mb-2">
//                 <Upload className="h-7 w-7 text-primary" />
//               </div>
//               <p className="font-medium text-foreground text-sm">
//                 Drop images here or click to browse
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 PNG, JPG, WEBP — Max 5MB each
//               </p>
//               <input
//                 id="gallery-images-input"
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 className="hidden"
//                 onChange={(e) => handleAddGalleryImages(e.target.files)}
//               />
//             </div>
//           </div>

//           {/* Gallery Grid */}
//           {files.filter((f) => f.type === "gallery").length > 0 && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {files
//                 .filter((f) => f.type === "gallery")
//                 .map((file, index) => (
//                   <div key={file.id} className="space-y-2">
//                     <div className="relative group aspect-4/3 rounded-xl overflow-hidden border border-border bg-muted shadow-sm">
//                       <Image
//                         src={file.preview}
//                         alt={file.alt || `Car image ${index + 1}`}
//                         fill
//                         unoptimized
//                         className="object-cover transition-transform duration-500 group-hover:scale-105"
//                         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                       />
//                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                         <button
//                           type="button"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             removeImage(file.id);
//                           }}
//                           className="rounded-full bg-destructive/90 backdrop-blur-sm p-2 text-destructive-foreground shadow-lg transition-all hover:bg-destructive hover:scale-110 active:scale-95"
//                         >
//                           <X className="h-4 w-4" />
//                         </button>
//                       </div>
//                       {file.status === "uploading" && (
//                         <div className="absolute bottom-2 left-2 right-2">
//                           <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
//                             <div
//                               className="h-full bg-primary transition-all duration-300 animate-pulse"
//                               style={{ width: "60%" }}
//                             />
//                           </div>
//                         </div>
//                       )}
//                       {file.status === "error" && (
//                         <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
//                           <span className="text-xs font-medium text-red-500 bg-white px-2 py-1 rounded">
//                             Failed
//                           </span>
//                         </div>
//                       )}
//                       {file.status === "done" && (
//                         <div className="absolute top-2 left-2 flex items-center gap-1 bg-green-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-[10px] font-medium shadow-sm">
//                           <CheckCircle2 className="h-3 w-3" />
//                           Done
//                         </div>
//                       )}
//                     </div>
//                     {file.status === "done" && (
//                       <input
//                         type="text"
//                         value={file.alt || ""}
//                         onChange={(e) =>
//                           updateImageAlt(file.id, e.target.value)
//                         }
//                         placeholder="Alt text (optional)"
//                         className="w-full px-3 py-2 rounded-lg text-xs bg-background border border-border focus:outline-none focus:ring-1 focus:ring-ring"
//                       />
//                     )}
//                   </div>
//                 ))}
//             </div>
//           )}

//           {files.filter((f) => f.type === "gallery").length > 0 && (
//             <div className="flex items-center justify-between text-xs text-muted-foreground">
//               <span>
//                 {uploadedCount} uploaded
//                 {uploadingCount > 0 ? `, ${uploadingCount} uploading...` : ""}
//               </span>
//               <span>
//                 {files.filter((f) => f.type === "gallery").length} / 10
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Description */}
//         <div className="space-y-3">
//           <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
//             <FileText className="h-4 w-4 text-muted-foreground" />
//             Description <span className="text-destructive">*</span>
//           </label>

//           <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-2">
//             <div className="flex items-center gap-2 text-sm font-medium text-foreground">
//               <Type className="h-4 w-4 text-primary" />
//               What to Include
//             </div>
//             <ul className="text-xs text-muted-foreground space-y-1 pl-6">
//               <li>
//                 •{" "}
//                 <span className="font-medium text-foreground">Condition:</span>{" "}
//                 Overall state, scratches, dents, rust
//               </li>
//               <li>
//                 •{" "}
//                 <span className="font-medium text-foreground">
//                   Service History:
//                 </span>{" "}
//                 Recent maintenance, oil changes, parts replaced
//               </li>
//               <li>
//                 • <span className="font-medium text-foreground">Features:</span>{" "}
//                 AC, power steering, alloy rims, navigation
//               </li>
//               <li>
//                 •{" "}
//                 <span className="font-medium text-foreground">
//                   Accident History:
//                 </span>{" "}
//                 Any past damage or repairs
//               </li>
//               <li>
//                 •{" "}
//                 <span className="font-medium text-foreground">
//                   Reason for Selling:
//                 </span>{" "}
//                 Why you are selling the car
//               </li>
//             </ul>
//           </div>

//           <CarEditor
//             value={editorContent}
//             onChange={handleEditorChange}
//             placeholder="Describe your car in detail. Include condition, features, history, reason for selling..."
//           />

//           {(errors.description || (!hasContent && contentValidated)) && (
//             <p className="text-sm font-medium text-destructive">
//               {errors.description?.message || "Description is required"}
//             </p>
//           )}
//           {!hasContent && !contentValidated && (
//             <p className="text-xs text-muted-foreground">
//               Start writing your car description in the editor above
//             </p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isSubmitDisabled}
//           className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm flex items-center justify-center gap-2
//             ${
//               isSubmitDisabled
//                 ? "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
//                 : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] hover:shadow-md"
//             }`}
//         >
//           {buttonContent}
//         </button>
//       </form>
//     </>
//   );
// };

// CarFormComp.displayName = "CarFormComp";
